// تنظیمات ورود مدیر (آرمین دهقان)
const ADMIN_CONFIG = {
    email: "armindehgan688@gmail.com",
    pass: "ardg881212"
};

let userRoleIsAdmin = false;

// جملات انگیزشی برای دانشجوها
const motivationQuotes = [
    "موفقیت یعنی تکرار تمرین‌های کوچک روزانه.",
    "آرمین عزیز، امروز یک قدم به هدفت نزدیک‌تر شو!",
    "تلاش امروز، آرامش فرداست.",
    "برنامه‌ریزی دقیق، نیمی از مسیر پیروزی است."
];

// اجرای کدها پس از لود شدن صفحه
window.onload = () => {
    setDailyQuote();
    loadAllTodos();
};

function setDailyQuote() {
    const qBox = document.getElementById('daily-quote');
    if(qBox) {
        qBox.innerText = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
    }
}

// مدیریت تم روشن و تاریک
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-icon');
    icon.innerText = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// منطق ورود به اپلیکیشن
function login() {
    const emailInput = document.getElementById('login-email').value;
    const passInput = document.getElementById('login-pass').value;

    if (emailInput === ADMIN_CONFIG.email && passInput === ADMIN_CONFIG.pass) {
        userRoleIsAdmin = true;
        alert("خوش آمدید جناب دهقان. دسترسی مدیریت فعال شد.");
    } else {
        userRoleIsAdmin = false;
        alert("ورود به عنوان کاربر عادی انجام شد.");
    }
    navigateToApp();
}

function guestLogin() {
    userRoleIsAdmin = false;
    navigateToApp();
}

function navigateToApp() {
    document.getElementById('login-page').classList.remove('active');
    document.getElementById('main-page').classList.add('active');
    document.getElementById('logout-btn').style.display = 'block';
    
    // نمایش پنل مدیریت فقط برای آرمین
    if(userRoleIsAdmin) {
        document.getElementById('admin-panel').style.display = 'block';
    }
    renderAppContent();
}

// ذخیره و مدیریت محتوا (LocalStorage)
function saveContent() {
    const title = document.getElementById('post-title').value;
    const desc = document.getElementById('post-desc').value;
    const cat = document.getElementById('post-cat').value;
    const link = document.getElementById('post-link').value;

    if(!title || !desc) return alert("لطفاً عنوان و توضیحات را وارد کنید.");

    const db = JSON.parse(localStorage.getItem('armin_master_db') || '[]');
    db.push({ id: Date.now(), title, desc, cat, link });
    localStorage.setItem('armin_master_db', JSON.stringify(db));

    alert("مطلب با موفقیت در اپلیکیشن منتشر شد.");
    clearAdminForm();
    renderAppContent();
}

function clearAdminForm() {
    document.getElementById('post-title').value = '';
    document.getElementById('post-desc').value = '';
    document.getElementById('post-link').value = '';
}

function deleteItem(id) {
    if(!confirm("آرمین عزیز، از حذف این مورد اطمینان داری؟")) return;
    let db = JSON.parse(localStorage.getItem('armin_master_db') || '[]');
    db = db.filter(item => item.id !== id);
    localStorage.setItem('armin_master_db', JSON.stringify(db));
    renderAppContent();
}

// رندر کردن لیست دروس
function renderAppContent(searchTerm = "") {
    const container = document.getElementById('content-list');
    const db = JSON.parse(localStorage.getItem('armin_master_db') || '[]');
    
    const filtered = db.filter(item => item.title.includes(searchTerm));

    container.innerHTML = filtered.map(item => `
        <div class="card">
            ${userRoleIsAdmin ? `<button class="delete-btn" onclick="deleteItem(${item.id})">حذف</button>` : ''}
            <small style="color: #666; font-weight:bold;">#${item.cat}</small>
            <h3 class="titr" style="margin: 10px 0;">${item.title}</h3>
            <p style="font-size: 0.85rem; line-height: 1.6;">${item.desc}</p>
            <a href="${item.link}" target="_blank" style="color:var(--accent-color); font-weight:bold; text-decoration:none; font-size: 0.9rem;">📥 مشاهده محتوا</a>
        </div>
    `).join('');
}

// جستجوی هوشمند
function search() {
    const query = document.getElementById('search-input').value;
    renderAppContent(query);
}

// مدیریت لیست کارهای شخصی (To-Do List)
function addTodo() {
    const input = document.getElementById('todo-input');
    if(!input.value) return;
    const tasks = JSON.parse(localStorage.getItem('armin_todo_list') || '[]');
    tasks.push(input.value);
    localStorage.setItem('armin_todo_list', JSON.stringify(tasks));
    input.value = '';
    loadAllTodos();
}

function loadAllTodos() {
    const list = document.getElementById('todo-list');
    const tasks = JSON.parse(localStorage.getItem('armin_todo_list') || '[]');
    list.innerHTML = tasks.map((task, idx) => `
        <div class="todo-item">
            <span>${task}</span>
            <span onclick="removeTodo(${idx})" style="cursor:pointer; color:green;">✓</span>
        </div>
    `).join('');
}

function removeTodo(idx) {
    let tasks = JSON.parse(localStorage.getItem('armin_todo_list') || '[]');
    tasks.splice(idx, 1);
    localStorage.setItem('armin_todo_list', JSON.stringify(tasks));
    loadAllTodos();
}

function logout() {
    location.reload();
}
// جملات انگیزشی رندوم
const quotes = [
    "آرمین جان، امروز یک گام به هدف نزدیک‌تر شو!",
    "تلاش امروز، درخشش فرداست.",
    "هیچ وقت برای یادگیری دیر نیست.",
    "برنامه‌نویسی هنر حل کردن مشکلات است."
];

document.getElementById('motivation-text').innerText = quotes[Math.floor(Math.random() * quotes.length)];

// تم تاریک و روشن
const darkBtn = document.getElementById('dark-toggle');
darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    darkBtn.querySelector('span').innerText = document.body.classList.contains('dark') ? 'روز' : 'شب';
});

// جلوگیری از خروج ناخواسته در موبایل
window.onbeforeunload = function() {
    return "آیا می‌خواهید از اپلیکیشن خارج شوید؟";
};

