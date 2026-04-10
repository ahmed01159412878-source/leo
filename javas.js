// =========================================================================
// DICTIONARY FOR TRANSLATION
// =========================================================================
const translations = {
  ar: {
    title: "المنصة التعليمية - Educational Platform",
    nav_logo: "EduPro",
    nav_home: "الرئيسية",
    nav_grades: "المراحل الدراسية",
    nav_study: "منطقة المذاكرة",
    nav_contact: "تواصل معنا",
    nav_login: "تسجيل الدخول",
    nav_logout: "تسجيل الخروج",
    auth_login_title: "تسجيل الدخول",
    auth_register_title: "إنشاء حساب جديد",
    auth_username: "اسم المستخدم",
    auth_password: "كلمة المرور",
    auth_login_btn: "دخول",
    auth_register_btn: "إنشاء حساب",
    auth_no_account: "ليس لديك حساب؟",
    auth_has_account: "لديك حساب بالفعل؟",
    auth_register_link: "إنشاء حساب",
    auth_login_link: "تسجيل الدخول",
    hero_badge: "أفضل منصة تعليمية",
    hero_title: "رحلتك نحو <span>التفوق</span> تبدأ من هنا",
    hero_subtitle: "نوفر لطلاب المرحلة الثانوية أفضل المصادر التعليمية والاختبارات الدورية لضمان أعلى الدرجات بطريقة احترافية وممتعة.",
    hero_cta: "ابدأ التعلم الآن",
    hero_cta_alt: "نظم وقتك",
    grades_title: "المراحل الدراسية",
    grades_subtitle: "اختر مرحلتك الدراسية للوصول إلى المحتوى التعليمي الخاص بك",
    grade_1: "الصف الأول الثانوي",
    grade_2: "الصف الثاني الثانوي",
    grade_3: "الصف الثالث الثانوي",
    resource_pdf: "مكتبة الـ PDF",
    resource_course: "الكورسات والشرح",
    resource_exam: "الامتحانات الشهرية",
    resource_quiz: "الاختبارات القصيرة",
    study_title: "منطقة المذاكرة (بومودورو)",
    study_subtitle: "حدد وقت المذاكرة وركز على أهدافك بعيداً عن المشتتات",
    timer_start: "ابدأ",
    timer_pause: "إيقاف",
    timer_reset: "إعادة ضبط",
    timer_msg_idle: "جاهز للتركيز؟ اضبط الوقت واضغط ابدأ.",
    timer_msg_running: "جاري المذاكرة... حافظ على تركيزك!",
    timer_msg_paused: "التوقيت متوقف. استرح قليلاً ثم عد مجدداً.",
    timer_msg_done: "انتهى الوقت! عمل رائع، خذ استراحة.",
    contact_title: "تواصل معنا",
    contact_subtitle: "هل لديك استفسار؟ لا تتردد في مراسلتنا",
    contact_info_title: "معلومات التواصل",
    contact_location: "العنوان",
    contact_email: "البريد الإلكتروني",
    form_name: "الاسم كامل",
    form_email: "البريد الإلكتروني",
    form_msg: "رسالتك",
    form_submit: "إرسال الرسالة",
    footer_desc: "منصتك الأولى للتفوق في المرحلة الثانوية. نقدم لك كافة المصادر والمراجع لضمان نجاحك.",
    footer_rights: "جميع الحقوق محفوظة."
  },
  en: {
    title: "EduPro - Educational Platform",
    nav_logo: "EduPro",
    nav_home: "Home",
    nav_grades: "Grades",
    nav_study: "Study Zone",
    nav_contact: "Contact Us",
    nav_login: "Login",
    nav_logout: "Logout",
    auth_login_title: "Login",
    auth_register_title: "Create New Account",
    auth_username: "Username",
    auth_password: "Password",
    auth_login_btn: "Login",
    auth_register_btn: "Register",
    auth_no_account: "Don't have an account?",
    auth_has_account: "Already have an account?",
    auth_register_link: "Sign Up",
    auth_login_link: "Login",
    hero_badge: "Top Educational Platform",
    hero_title: "Your Journey to <span>Excellence</span> Starts Here",
    hero_subtitle: "Providing high school students with the best educational resources and periodic exams to ensure top scores in a professional and engaging way.",
    hero_cta: "Start Learning Now",
    hero_cta_alt: "Manage Time",
    grades_title: "Study Material",
    grades_subtitle: "Select your grade to access your specialized educational content",
    grade_1: "1st Secondary",
    grade_2: "2nd Secondary",
    grade_3: "3rd Secondary",
    resource_pdf: "PDF Library",
    resource_course: "Courses & Explanations",
    resource_exam: "Monthly Exams",
    resource_quiz: "Short Quizzes",
    study_title: "Study Zone (Pomodoro)",
    study_subtitle: "Set your study time and focus on your goals without distractions",
    timer_start: "Start",
    timer_pause: "Pause",
    timer_reset: "Reset",
    timer_msg_idle: "Ready to focus? Set time and press Start.",
    timer_msg_running: "Studying in progress... Keep your focus!",
    timer_msg_paused: "Timer paused. Take a breath, then resume.",
    timer_msg_done: "Time is up! Great job, take a break.",
    contact_title: "Contact Us",
    contact_subtitle: "Have a question? Don't hesitate to reach out",
    contact_info_title: "Contact Information",
    contact_location: "Location",
    contact_email: "Email Address",
    form_name: "Full Name",
    form_email: "Email Address",
    form_msg: "Your Message",
    form_submit: "Send Message",
    footer_desc: "Your premier platform for high school excellence. We provide all the resources you need to succeed.",
    footer_rights: "All rights reserved."
  }
};

// =========================================================================
// APP STATE
// =========================================================================
let currentLang = localStorage.getItem('appLang') || 'ar';
let currentTheme = localStorage.getItem('appTheme') || 'light';
let authToken = localStorage.getItem('authToken') || null;

// =========================================================================
// API ENDPOINTS
// =========================================================================
// API ENDPOINTS
// =========================================================================
const API_URL = "http://localhost:8000/api"; 

// =========================================================================
// DOM ELEMENTS & INITIALIZATION
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Navigation & UI Elements
  const langToggleBtn = document.getElementById('lang-toggle');
  const langText = document.getElementById('lang-text');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('i');
  const htmlTag = document.documentElement;
  const authBtn = document.getElementById('auth-btn');
  
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  // =========================================================================
  // MATERIALS MODAL LOGIC (Hardcoded in HTML + CSS Filtering)
  // =========================================================================


  // Materials Modal Elements
  const materialsModal = document.getElementById('materials-modal');
  const materialsGrid = document.getElementById('materials-grid');
  const closeMaterialsBtn = document.querySelector('.close-materials');
  const materialsTitle = document.getElementById('materials-title');
  const materialsSubtitle = document.getElementById('materials-subtitle');

  if (closeMaterialsBtn) {
      closeMaterialsBtn.addEventListener('click', () => {
        materialsModal.classList.remove('active');
      });
  }

  // Activation Gate Elements
  const activationGate = document.getElementById('activation-gate');
  const activationForm = document.getElementById('activation-form');

  function updateAuthUI() {
    if (authToken) {
      // Allowed in
      if(activationGate) activationGate.classList.remove('active');
      document.body.style.overflow = "auto";
      
      authBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> <span>' + translations[currentLang].nav_logout + '</span>';
      authBtn.style.display = 'inline-block';
      authBtn.classList.remove('btn-outline');
      authBtn.classList.add('btn-primary');
      
      // Lock inactive grades
      const userGrade = localStorage.getItem('userGrade');
      document.querySelectorAll('.grade-card').forEach(card => {
          if (card.getAttribute('data-grade') !== userGrade) {
              card.classList.add('locked-card');
          } else {
              card.classList.remove('locked-card');
          }
      });
    } else {
      // Locked out
      if(activationGate) activationGate.classList.add('active');
      document.body.style.overflow = "hidden";
      authBtn.style.display = 'none';
      window.scrollTo(0, 0);
      
      // Reset card locks beneath the blur
      document.querySelectorAll('.grade-card').forEach(card => card.classList.remove('locked-card'));
    }
  }

  // Logout Handler
  authBtn.addEventListener('click', () => {
    if (authToken) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userGrade');
      authToken = null;
      updateAuthUI();
      showToast(currentLang === 'ar' ? "تم تسجيل الخروج بنجاح" : "Logged out successfully", "success");
    }
  });

  // =========================================================================
  // CLIENT-SIDE ACTIVATION (No server required)
  // IDs start from 1234560 and increment per student
  // =========================================================================
  if (activationForm) {
    activationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('act-name').value.trim();
      const email    = document.getElementById('act-email').value.trim().toLowerCase();
      const code     = document.getElementById('act-code').value.trim();
      const grade    = document.getElementById('act-grade').value;

      // 1. Triple name check
      if (fullName.split(' ').filter(w => w.length > 0).length < 3) {
        showToast(currentLang === 'ar'
          ? "يرجى كتابة الاسم ثلاثي بشكل صحيح (ثلاث كلمات على الأقل)"
          : "Please enter your full triple name (at least 3 words)", "error");
        return;
      }

      // 2. Grade check
      if (!grade) {
        showToast(currentLang === 'ar' ? "يرجى اختيار المرحلة الدراسية" : "Please select your grade", "error");
        return;
      }

      // 3. ID format check — must be a number >= 1234560
      const codeInt = parseInt(code);
      if (isNaN(codeInt) || codeInt < 1234560) {
        showToast(currentLang === 'ar'
          ? "رقم الأي دي غير صحيح. يجب أن يبدأ من 1234560 وأعلى."
          : "Invalid ID. Must be 1234560 or higher.", "error");
        return;
      }

      // 4. Load the local registry of used codes
      const registry = JSON.parse(localStorage.getItem('eduRegisteredCodes') || '{}');
      const emailRegistry = JSON.parse(localStorage.getItem('eduEmailRegistry') || '{}');

      // 5. Device fingerprint
      let deviceId = localStorage.getItem('userDeviceId');
      if (!deviceId) {
        deviceId = 'dev_' + Math.random().toString(36).substr(2, 10) + Date.now().toString(36);
        localStorage.setItem('userDeviceId', deviceId);
      }

      let finalGrade = parseInt(grade);

      if (registry[code]) {
        // Code already used before
        const existing = registry[code];
        if (existing.email === email) {
          // Same student re-entering — allow & restore their grade
          finalGrade = existing.grade;
        } else {
          showToast(currentLang === 'ar'
            ? "هذا الكود (الأي دي) مفعل مسبقاً من قِبل طالب آخر."
            : "This ID is already registered by another student.", "error");
          return;
        }
      } else {
        // First time — check email not used before on a different ID
        if (emailRegistry[email] && emailRegistry[email] !== code) {
          showToast(currentLang === 'ar'
            ? "هذا البريد الإلكتروني مسجل مسبقاً بكود مختلف."
            : "This email is already registered with a different ID.", "error");
          return;
        }

        // Register the new student
        registry[code] = { email, full_name: fullName, grade: finalGrade, device_id: deviceId };
        emailRegistry[email] = code;
        localStorage.setItem('eduRegisteredCodes', JSON.stringify(registry));
        localStorage.setItem('eduEmailRegistry', JSON.stringify(emailRegistry));
      }

      // 6. Create a simple local token and log the student in
      const tokenPayload = { code: code, grade: finalGrade, email: email, ts: Date.now() };
      authToken = btoa(JSON.stringify(tokenPayload));
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userGrade', finalGrade.toString());

      updateAuthUI();
      showToast(currentLang === 'ar' ? "تم تفعيل حسابك ودخول المنصة بنجاح! 🎉" : "Account activated! Welcome 🎉", "success");
      activationForm.reset();
    });
  }

  // Resource Link Interceptor & Materials Modal Logic
  document.querySelectorAll('.resource-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      if (!authToken) {
        showToast(currentLang === 'ar' ? "يرجى تسجيل الدخول للوصول للمواد" : "Please log in to access materials", "error");
        updateAuthUI();
        return;
      }

      const gradeCard = link.closest('.grade-card');
      const grade = gradeCard ? gradeCard.getAttribute('data-grade') : "1";
      const resourceType = link.getAttribute('data-resource');

      // Determine title based on resourceType
      let titleAr, titleEn;
      if (resourceType === "pdf") {
        titleAr = "مكتبة الـ PDF"; titleEn = "PDF Library";
      } else if (resourceType === "course") {
        titleAr = "الكورسات والشرح"; titleEn = "Courses & Explanations";
      } else if (resourceType === "exam") {
        titleAr = "الامتحانات الشهرية"; titleEn = "Monthly Exams";
      } else if (resourceType === "Quiz") {
        titleAr = "الاختبارات القصيرة"; titleEn = "Short Quizzes";
      }

      // Show Materials Modal directly (Uses hardcoded HTML + CSS filtering)
      if (materialsModal) {
        materialsTitle.textContent    = currentLang === 'ar' ? titleAr : titleEn;
        materialsSubtitle.textContent = currentLang === 'ar' ? "اختر الملف الذي ترغب في تصفحه" : "Choose the file you want to browse";

        // Set filtering classes on the grid
        materialsGrid.className = "materials-grid"; // Reset
        materialsGrid.classList.add(`show-grade-${grade}`);
        materialsGrid.classList.add(`show-type-${resourceType}`);

        materialsModal.classList.add('active');
      }
    });
  });




  // =========================================================================
  // TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, type = "success") {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = document.createElement('i');
    icon.className = type === "success" ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark";
    
    const text = document.createElement('span');
    text.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(text);
    container.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 4000);
  }

  // =========================================================================
  // THEME MANAGEMENT
  // =========================================================================
  themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('appTheme', currentTheme);
    applyTheme(currentTheme);
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlTag.setAttribute('data-theme', 'dark');
      themeIcon.className = "fa-solid fa-sun";
    } else {
      htmlTag.removeAttribute('data-theme');
      themeIcon.className = "fa-solid fa-moon";
    }
  }

  // =========================================================================
  // LANGUAGE MANAGEMENT
  // =========================================================================
  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('appLang', currentLang);
    applyLanguage(currentLang);
    updateAuthUI();
  });

  function applyLanguage(lang) {
    htmlTag.setAttribute('lang', lang);
    htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    langText.textContent = lang === 'ar' ? 'EN' : 'عربي';

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', translations[lang][key]);
        } else {
          el.innerHTML = translations[lang][key];
        }
      }
    });

    updateTimerMessage();
  }

  // =========================================================================
  // POMODORO LOGIC
  // =========================================================================
  const minInput = document.getElementById('minutes');
  const secInput = document.getElementById('seconds');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const resetBtn = document.getElementById('reset-btn');
  const circle = document.querySelector('.progress-ring__circle');
  const timerMsg = document.getElementById('timer-msg');
  let radius = 0;
  let circumference = 0;
  if (circle) {
      radius = circle.r.baseVal.value;
      circumference = radius * 2 * Math.PI;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = 0;
  }

  let timerInterval;
  let totalSeconds = 0;
  let initialTotalSeconds = 0;
  let isRunning = false;
  let isPaused = false;
  function setProgress(percent) {
    if (!circle) return;
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
  }

  function updateTimerMessage() {
    if (!isRunning && !isPaused && initialTotalSeconds === 0) {
      timerMsg.textContent = translations[currentLang].timer_msg_idle;
    } else if (isRunning && !isPaused) {
      timerMsg.textContent = translations[currentLang].timer_msg_running;
    } else if (isPaused) {
      timerMsg.textContent = translations[currentLang].timer_msg_paused;
    }
  }

  function startTimer() {
    if (isRunning) return;

    if (!isPaused) {
      let m = parseInt(minInput.value) || 0;
      let s = parseInt(secInput.value) || 0;
      totalSeconds = (m * 60) + s;
      initialTotalSeconds = totalSeconds;
      
      if (totalSeconds <= 0) return;
    }

    isRunning = true;
    isPaused = false;
    updateTimerMessage();

    minInput.disabled = true;
    secInput.disabled = true;

    timerInterval = setInterval(() => {
      totalSeconds--;
      
      let m = Math.floor(totalSeconds / 60);
      let s = totalSeconds % 60;
      
      minInput.value = m < 10 ? '0' + m : m;
      secInput.value = s < 10 ? '0' + s : s;

      let percent = ((initialTotalSeconds - totalSeconds) / initialTotalSeconds) * 100;
      setProgress(percent);

      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        minInput.disabled = false;
        secInput.disabled = false;
        timerMsg.textContent = translations[currentLang].timer_msg_done;
        setProgress(100);
        playAlarm();
      }
    }, 1000);
  }

  function pauseTimer() {
    if (!isRunning) return;
    clearInterval(timerInterval);
    isRunning = false;
    isPaused = true;
    updateTimerMessage();
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isPaused = false;
    totalSeconds = 0;
    initialTotalSeconds = 0;
    minInput.value = '25';
    secInput.value = '00';
    minInput.disabled = false;
    secInput.disabled = false;
    setProgress(0);
    updateTimerMessage();
  }

  function playAlarm() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 800;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1.5);
      oscillator.stop(audioCtx.currentTime + 1.5);
    } catch(e) {
      console.log("Audio not supported");
    }
  }

  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);

  [minInput, secInput].forEach(input => {
    input.addEventListener('input', (e) => {
      let val = parseInt(e.target.value);
      let max = parseInt(e.target.getAttribute('max'));
      if (val > max) e.target.value = max;
      if (val < 0) e.target.value = '00';
    });
    
    input.addEventListener('blur', (e) => {
      if(!e.target.value || e.target.value === '') e.target.value = '00';
      else if(e.target.value.length === 1) e.target.value = '0' + e.target.value;
    });
  });

  // =========================================================================
  // NAVBAR SCROLL & MOBILE MENU
  // =========================================================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });

    // =========================================================================
    // APP INITIALIZATION
    // =========================================================================
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    updateAuthUI();

});
