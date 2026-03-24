from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta
import time
import os
from typing import Dict, Any, Optional

# --- Config & Setup ---
SECRET_KEY = "edupro-super-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 1 week

app = FastAPI(title="EduPro Secure Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Rate Limiter (Memory-based for demonstration) ---
request_counts = {}
RATE_LIMIT = 30  # Max requests
RATE_WINDOW = 60  # seconds

@app.middleware("http")
async def security_middleware(request: Request, call_next):
    # Rate Limiting Logic
    client_ip = request.client.host
    current_time = time.time()
    
    if client_ip not in request_counts:
        request_counts[client_ip] = {"count": 1, "window_start": current_time}
    else:
        record = request_counts[client_ip]
        if current_time - record["window_start"] > RATE_WINDOW:
            record["count"] = 1
            record["window_start"] = current_time
        else:
            record["count"] += 1
            if record["count"] > RATE_LIMIT:
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Too many requests. Please try again later."}
                )
    
    # Process Request
    response = await call_next(request)
    
    # Security Headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response

# --- Dynamic Database for Infinite Users ---
# Stores IDs dynamically as users register them
from typing import Dict, Any, Optional
import time

activation_codes: Dict[str, Dict[str, Any]] = {}
email_devices: Dict[str, str] = {} # Tracks which device_id owns which email

class ActivationRequest(BaseModel):
    full_name: str
    email: str
    code: str
    device_id: str
    grade: int

# --- JWT Helpers ---
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# --- Authentication & Activation Route ---
@app.post("/api/auth/activate")
async def activate_account(req: ActivationRequest):
    # 1. Validate Triple Name
    if len(req.full_name.strip().split()) < 3:
        raise HTTPException(status_code=400, detail="يجب إدخال الاسم ثلاثي على الأقل")
    
    # 2. Validate Code format (Must be >= 1234560)
    try:
        code_int = int(req.code)
        if code_int < 1234560:
            raise ValueError()
    except ValueError:
        raise HTTPException(status_code=400, detail="رقم الأي دي غير صحيح. يجب أن يبدأ من 1234560 وأعلى.")
        
    email_lower = req.email.strip().lower()
    
    # 3. Validate Device Binding (No email sharing across devices)
    if email_lower in email_devices:
        if email_devices[email_lower] != req.device_id:
            raise HTTPException(status_code=400, detail="هذا البريد الإلكتروني مسجل ومستخدم مسبقاً على جهاز آخر. لا يمكنك استخدامه هنا.")
            
    # 4. Check Code Usage
    grade = req.grade
    if req.code in activation_codes:
        existing = activation_codes[req.code]
        if existing["email"] == email_lower:
            # Same user, authorized device. Allow re-entry.
            grade = existing["grade"] # Override dropdown with what they originally registered
        else:
            raise HTTPException(status_code=400, detail="هذا الكود (الأي دي) مفعل مسبقاً من قِبل طالب آخر.")
    else:
        # First time this ID is seen, register it
        activation_codes[req.code] = {
            "used": True,
            "full_name": req.full_name,
            "email": email_lower,
            "device_id": req.device_id,
            "grade": req.grade
        }
        # Bind email to this device_id globally
        if email_lower not in email_devices:
            email_devices[email_lower] = req.device_id
    
    # 5. Generate Long-Lived Session Token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": req.code, "grade": grade}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "grade": grade, "message": "تم التفعيل بنجاح"}

# --- Protected Educational Routes ---
@app.get("/api/materials/{grade_id}")
async def get_secure_materials(grade_id: int, current_user: dict = Depends(get_current_user)):
    user_grade = current_user.get("grade")
    if user_grade != grade_id:
        raise HTTPException(status_code=403, detail="غير مصرح لك بالوصول لمواد هذه المرحلة الدراسية. حسابك مسجل لمرحلة أخرى.")
        
    return {
        "status": "success", 
        "grade": grade_id, 
        "user_id": current_user.get("sub"),
        "message": "Authorized access to secure materials"
    }

# --- Static Frontend Serving ---
try:
    frontend_path = os.path.dirname(os.path.abspath(__file__))
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")
except Exception as e:
    print(f"Warning: Could not mount static files: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
