function applyDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark');
    }
    updateDarkModeButton(isDark);
}


function updateDarkModeButton(isDark) {
    const button = document.getElementById('dark-mode-toggle');
    if (button) {
        button.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
}


function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    updateDarkModeButton(isDark);
}


function validatePhoneNumber(phone) {
    
    const cleaned = phone.replace(/\D/g, '');
     return cleaned.length === 10;
}


function handleRegister(e) {
    e.preventDefault();

    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const contactNumber = document.getElementById('contact-number').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const messageDiv = document.getElementById('auth-message');

   
    messageDiv.style.display = 'none';
    messageDiv.className = '';

    
    if (!fullName || !email || !contactNumber || !username || !password || !confirmPassword) {
        messageDiv.textContent = 'All fields are required.';
        messageDiv.style.display = 'block';
        return;
    }

    
    if (!validatePhoneNumber(contactNumber)) {
        messageDiv.textContent = 'Phone number must be exactly 10 digits.';
        messageDiv.style.display = 'block';
        return;
    }

   
    if (password !== confirmPassword) {
        messageDiv.textContent = 'Passwords do not match.';
        messageDiv.style.display = 'block';
        return;
    }

    
    if (password.length < 6) {
        messageDiv.textContent = 'Password must be at least 6 characters long.';
        messageDiv.style.display = 'block';
        return;
    }

    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        messageDiv.textContent = 'Username already exists.';
        messageDiv.style.display = 'block';
        return;
    }

   
    const newUser = {
        fullName,
        email,
        username,
        phone: contactNumber,
        password
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    
    messageDiv.textContent = 'Registration successful! Redirecting to login...';
    messageDiv.className = 'success';
    messageDiv.style.display = 'block';

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}


function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('auth-message');

    
    messageDiv.style.display = 'none';
    messageDiv.className = '';

    
    if (!username || !password) {
        messageDiv.textContent = 'Please enter username and password.';
        messageDiv.style.display = 'block';
        return;
    }

   
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        
        localStorage.setItem('loggedInUser', username);
        messageDiv.textContent = 'Login successful! Redirecting...';
        messageDiv.className = 'success';
        messageDiv.style.display = 'block';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        messageDiv.textContent = 'Invalid username or password.';
        messageDiv.style.display = 'block';
    }
}



function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const profileContainer = document.getElementById('profile-container');
    const loginLink = document.getElementById('login-link');

    
    if (!profileContainer || !loginLink) return;

    if (loggedInUser) {
       
        loginLink.style.display = 'none';
        profileContainer.style.display = 'block';

        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === loggedInUser);

        if (user) {
           
            const profileIcon = document.getElementById('profile-icon');
            profileIcon.textContent = user.username.charAt(0).toUpperCase();

          
            document.getElementById('dropdown-username').textContent = user.username;
            document.getElementById('dropdown-phone').textContent = user.phone || 'Not provided';

            
            profileIcon.addEventListener('click', toggleProfileDropdown);
        }
    } else {
        
        profileContainer.style.display = 'none';
        loginLink.style.display = 'block';
    }
}


function toggleProfileDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}


function closeDropdownOnClickOutside(e) {
    const profileContainer = document.getElementById('profile-container');
    if (profileContainer && !profileContainer.contains(e.target)) {
        const dropdown = document.getElementById('profile-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }
}


function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}


document.addEventListener('DOMContentLoaded', () => {
    
    applyDarkMode();
    const darkToggle = document.getElementById('dark-mode-toggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', toggleDarkMode);
    }

    
    checkLoginStatus();

    
    const logoutBtn = document.getElementById('profile-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    
    const profileBooking = document.getElementById('profile-booking');
    if (profileBooking) {
        profileBooking.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'history.html';
        });
    }

    
    document.addEventListener('click', closeDropdownOnClickOutside);

    
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        
        const messageDiv = document.getElementById('auth-message');
        if (messageDiv) {
            messageDiv.style.display = 'none';
        }
        
        registerForm.addEventListener('submit', handleRegister);
    }

    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        
        const messageDiv = document.getElementById('auth-message');
        if (messageDiv) {
            messageDiv.style.display = 'none';
        }
        
        loginForm.addEventListener('submit', handleLogin);
        
        
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            window.location.href = 'index.html';
        }
    }

    
    const contactNumber = document.getElementById('contact-number');
    if (contactNumber) {
        contactNumber.addEventListener('keypress', (e) => {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });
    }
});