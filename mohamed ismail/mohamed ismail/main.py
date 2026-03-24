try:
    from fastapi import FastAPI, Depends, HTTPException, status, Request
    from fastapi.responses import JSONResponse, FileResponse
    from fastapi.staticfiles import StaticFiles
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    import jwt
    import uvicorn
except ImportError as e:
    import sys
    print(f"Error: Missing library - {e}")
    print("Please run: pip install -r requirements.txt")
    sys.exit(1)

from datetime import datetime, timedelta
import time
import os
from typing import Dict, Any, Optional

# --- Config & Setup ---
SECRET_KEY = "edupro-super-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 1 week

# --- Master Account Constants ---
MASTER_CODE = "1234560"
MASTER_EMAIL = "ahmed01159412878@gmail.com"

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

import json

# --- Simple JSON Database Persistence ---
DB_FILE = "db.json"

def load_db():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"activation_codes": {}, "email_devices": {}}

def save_db(data):
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

db_data = load_db()
activation_codes: Dict[str, Dict[str, Any]] = db_data.get("activation_codes", {})
email_devices: Dict[str, str] = db_data.get("email_devices", {})

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
    is_master = (req.code == MASTER_CODE or email_lower == MASTER_EMAIL)
    
    # 3. Validate Device Binding (No email sharing across devices)
    # Master account bypasses device binding for easier management
    if not is_master and email_lower in email_devices:
        if email_devices[email_lower] != req.device_id:
            raise HTTPException(status_code=400, detail="هذا البريد الإلكتروني مسجل ومستخدم مسبقاً على جهاز آخر. لا يمكنك استخدامه هنا.")
    
    # [NEW] Sticky Email->Code Binding check
    # If the email is already registered elsewhere, it must use the SAME code
    if not is_master:
        for existing_code, info in activation_codes.items():
            if info.get("email") == email_lower and existing_code != req.code:
                raise HTTPException(status_code=400, detail="هذا البريد الإلكتروني مرتبط بالفعل بكود (أي دي) آخر. يرجى استخدام الكود الأصلي.")
            
    # 4. Check Code Usage
    grade = req.grade
    if req.code in activation_codes:
        existing = activation_codes[req.code]
        # Check and enforce Device Binding for existing Code (Non-master only)
        if not is_master and existing["device_id"] != req.device_id:
             raise HTTPException(status_code=400, detail="هذا الكود مفعل مسبقاً على جهاز آخر. لا يمكنك استخدامه هنا.")
             
        if existing["email"] == email_lower:
            # Same user, authorized device. Allow re-entry.
            grade = existing["grade"] 
        elif not is_master:
            raise HTTPException(status_code=400, detail="هذا الكود (الأي دي) مفعل مسبقاً بايميل مختلف.")
    else:
        # First time this ID is seen, register it
        activation_codes[req.code] = {
            "used": True,
            "full_name": req.full_name,
            "email": email_lower,
            "device_id": req.device_id,
            "grade": req.grade,
            "is_master": is_master
        }
        # Bind email to this device_id globally
        if not is_master and email_lower not in email_devices:
            email_devices[email_lower] = req.device_id
        
        # PERSIST TO FILE
        save_db({"activation_codes": activation_codes, "email_devices": email_devices})
    
    # 5. Generate Long-Lived Session Token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": req.code, "grade": grade, "is_master": is_master, "full_name": req.full_name}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "grade": grade, "is_master": is_master, "full_name": req.full_name, "message": "تم التفعيل بنجاح"}

# --- Protected Educational Routes ---
@app.get("/api/materials/{grade_id}")
async def get_secure_materials(grade_id: int, current_user: dict = Depends(get_current_user)):
    user_grade = current_user.get("grade")
    is_master = current_user.get("is_master", False)
    
    if not is_master and user_grade != grade_id:
        raise HTTPException(status_code=403, detail="غير مصرح لك بالوصول لمواد هذه المرحلة الدراسية. حسابك مسجل لمرحلة أخرى.")
        
    return {
        "status": "success", 
        "grade": grade_id, 
        "user_id": current_user.get("sub"),
        "message": "Authorized access to secure materials"
    }

@app.get("/api/auth/me")
async def get_me_profile(current_user: dict = Depends(get_current_user)):
    code = current_user.get("sub")
    is_master = current_user.get("is_master", False)
    
    # Try to find name in memory registry
    name = "Student"
    if code and code in activation_codes:
        name = activation_codes[code].get("full_name", "Student")
    elif is_master:
        name = "Master Developer"
        
    return {
        "full_name": name,
        "is_master": is_master,
        "grade": current_user.get("grade")
    }

# --- Static Frontend Serving ---
try:
    frontend_path = os.path.dirname(os.path.abspath(__file__))
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")
except Exception as e:
    print(f"Warning: Could not mount static files: {e}")

if __name__ == "__main__":
    import uvicorn
    import socket

    def is_port_in_use(port):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            return s.connect_ex(('localhost', port)) == 0

    print("\n" + "="*50)
    print("🚀 EDU PRO BACKEND STARTING...")
    print("="*50)
    
    port = 8000
    if is_port_in_use(port):
        print(f"❌ ERROR: Port {port} is already being used by another app!")
        print("💡 Solution: Close other terminal windows or restart your computer.")
    else:
        print(f"✅ Port {port} is available.")
        print(f"🌍 Access the platform at: http://127.0.0.1:{port}")
        print("="*50 + "\n")
        
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
