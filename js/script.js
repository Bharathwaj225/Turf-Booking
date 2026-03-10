
const turfs = [
    { name: "Velocity Turf", sport: "Cricket", location: "Torapadi,Vellore", price: 700, image: "https://content.jdmagicbox.com/v2/comp/vellore/b3/9999px416.x416.250107194300.v1b3/catalogue/turf-velocity-kamaraj-nagar-vellore-sports-clubs-nm81rclp3q-250.jpg", description: "Excellent cricket ground with modern facilities and lighting for evening matches." },
    { name: "Sai Smashers", sport: "Badminton", location: "Tollgate,Vellore", price: 600, image: "https://content3.jdmagicbox.com/comp/vellore/d5/9999px416.x416.220310225759.z6d5/catalogue/sai-smashers-badminton-academy-vg-rao-nagar-vellore-badminton-courts-mb70po3obk.jpg", description: "Indoor badminton courts with professional flooring and equipment rental available." },
    { name: "Turf 360", sport: "Cricket", location: "Bagayam,Vellore", price: 800, image: "https://tse4.mm.bing.net/th/id/OIP.7_rf-4zqJ1mJm0eSoJKQuAHaFH?pid=Api&h=220&P=0", description: "Spacious cricket turf with changing rooms and parking facilities." },
    { name: "Turf Nation", sport: "Football", location: "Katpadi,Vellore", price: 750, image: "https://tse3.mm.bing.net/th/id/OIP.hS_PJFqXK1lKX6Kpwm9B1QAAAA?pid=Api&h=220&P=0", description: "Well-maintained football field perfect for training and matches." },
    { name: "TN23 Turf", sport: "Cricket", location: "Velapadi,vellore", price: 700, image: "https://5.imimg.com/data5/WL/OD/LK/SELLER-24553700/maverick-turf-football-grass-monofilament-pe-moon-500x500.jpg", description: "Popular cricket venue with a rich history and great community atmosphere." },
    { name: "LevelUp Turf", sport: "Cricket", location: "Salavanpet,vellore", price: 650, image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepndUO5JMprxF155pZk9skBGaZsj-_f1oaEx7AXBQ45niWNyKUIB3PyObChKQCFmQQ-MXB_kZ6g0uqZU3_nlNjrI9sFl7_z6DxItICI8LrY2AN-1uD1aQUwM51ayWz-8Mfyqh8EYfefF3c=s1360-w1360-h1020-rw", description: "Popular cricket venue with a rich history and great community atmosphere." },
    { name: "Slip N Kick", sport: "Football", location: "VIT-Katpadi,vellore", price: 750, image: "https://lh3.googleusercontent.com/p/AF1QipP34PT84QUAMQgIhfyoL5jJhlBSxzE79EEcobfL=s1360-w1360-h1020-rw", description: "Popular cricket venue with a rich history and great community atmosphere." },
    { name: "Turf Oval", sport: "Cricket", location: "Sripuram,vellore", price: 600, image: "https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1765798325080.webp&w=828&q=75", description: "Popular cricket venue with a rich history and great community atmosphere." }
];


const timeSlots = [
    "6:00 AM - 7:00 AM",
    "7:00 AM - 8:00 AM",
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM",
    "9:00 PM - 10:00 PM",
    "10:00 PM - 11:00 PM",
    "11:00 PM - 12:00 AM",

];


function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    updateDarkModeButton(isDark);
}


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


function toggleMenu() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('active');
}


function renderTurfs(filteredTurfs = turfs) {
    const container = document.getElementById('turfs-section');
    container.innerHTML = '';
    filteredTurfs.forEach(turf => {
        const card = document.createElement('div');
        card.className = 'turf-card';
        card.innerHTML = `
            <img src="${turf.image}" alt="${turf.name}" class="turf-image">
            <div class="turf-info">
                <h3>${turf.name}</h3>
                <p><strong>Sport:</strong> ${turf.sport}</p>
                <p><strong>Location:</strong> ${turf.location}</p>
                <p><strong>Price:</strong> ₹${turf.price}/hour</p>
                <button class="book-btn" onclick="bookTurf('${turf.name}')">Book Now</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function bookTurf(turfName) {
    window.location.href = `booking.html?turf=${encodeURIComponent(turfName)}`;
}

function searchTurfs() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = turfs.filter(turf => turf.name.toLowerCase().includes(query));
    renderTurfs(filtered);
}


function loadBookingPage() {
    const turfSelect = document.getElementById('turf-select');
    turfs.forEach(turf => {
        const option = document.createElement('option');
        option.value = turf.name;
        option.textContent = turf.name;
        turfSelect.appendChild(option);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const selectedTurf = urlParams.get('turf');
    if (selectedTurf) {
        turfSelect.value = selectedTurf;
    }

    const datePicker = document.getElementById('date-picker');
    const today = new Date().toISOString().split('T')[0];
    datePicker.min = today;
    datePicker.value = today;

    turfSelect.addEventListener('change', () => {
        const selectedTurfName = turfSelect.value;
        if (selectedTurfName) {
            renderSlots(selectedTurfName, datePicker.value);
        } else {
            document.getElementById('slots-container').innerHTML = '';
            document.getElementById('confirm-booking').style.display = 'none';
        }
    });

    datePicker.addEventListener('change', () => {
        const selectedTurfName = turfSelect.value;
        if (selectedTurfName) {
            renderSlots(selectedTurfName, datePicker.value);
        }
    });

    if (selectedTurf) {
        renderSlots(selectedTurf, today);
    }
}

function renderSlots(turfName, date) {
    const container = document.getElementById('slots-container');
    container.innerHTML = '';
    const bookedSlots = getBookedSlots(turfName, date);

    timeSlots.forEach(slot => {
        const btn = document.createElement('button');
        btn.className = 'slot-btn';
        btn.textContent = slot;
        if (bookedSlots.includes(slot)) {
            btn.classList.add('booked');
            btn.textContent += ' (Booked)';
            btn.disabled = true;
        } else {
            btn.classList.add('available');
            btn.onclick = () => selectSlot(slot);
        }
        container.appendChild(btn);
    });
}

let selectedSlot = null;

function selectSlot(slot) {
    selectedSlot = slot;
    document.querySelectorAll('.slot-btn').forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
    document.getElementById('confirm-booking').style.display = 'block';
}

function confirmBooking() {
    const turfName = document.getElementById('turf-select').value;
    const date = document.getElementById('date-picker').value;
    if (!selectedSlot || !date || !turfName) return;

    // Save booking
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({ turf: turfName, date, slot: selectedSlot });
    localStorage.setItem('bookings', JSON.stringify(bookings));

    
    let booked = JSON.parse(localStorage.getItem('bookedSlots') || '{}');
    if (!booked[turfName]) booked[turfName] = {};
    if (!booked[turfName][date]) booked[turfName][date] = [];
    booked[turfName][date].push(selectedSlot);
    localStorage.setItem('bookedSlots', JSON.stringify(booked));

    document.getElementById('booking-message').textContent = 'Booking confirmed!';
    document.getElementById('confirm-booking').style.display = 'none';
    selectedSlot = null;
    renderSlots(turfName, date);
}

function getBookedSlots(turfName, date) {
    const booked = JSON.parse(localStorage.getItem('bookedSlots') || '{}');
    return booked[turfName]?.[date] || [];
}


function loadLoginPage() {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (!loginTab || !registerTab || !loginForm || !registerForm) return;

    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('currentUser', username);
            const messageDiv = document.getElementById('auth-message');
            messageDiv.textContent = 'Login successful!';
            messageDiv.className = 'success';
            messageDiv.style.display = 'block';
            setTimeout(() => window.location.href = 'index.html', 1000);
        } else {
            const messageDiv = document.getElementById('auth-message');
            messageDiv.textContent = 'Invalid credentials!';
            messageDiv.className = '';
            messageDiv.style.display = 'block';
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const email = document.getElementById('reg-email').value;
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.username === username)) {
            const messageDiv = document.getElementById('auth-message');
            messageDiv.textContent = 'Username already exists!';
            messageDiv.className = '';
            messageDiv.style.display = 'block';
            return;
        }
        users.push({ username, password, email });
        localStorage.setItem('users', JSON.stringify(users));
        const messageDiv = document.getElementById('auth-message');
        messageDiv.textContent = 'Registration successful! Please login.';
        messageDiv.className = 'success';
        messageDiv.style.display = 'block';
        registerTab.click();
    });
}

function loadHistoryPage() {
    renderHistory();
}

function renderHistory() {
    const container = document.getElementById('bookings-list');
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    container.innerHTML = '';
    if (bookings.length === 0) {
        container.innerHTML = '<p>No bookings yet.</p>';
        return;
    }
    bookings.forEach(booking => {
        const item = document.createElement('div');
        item.className = 'booking-item';
        item.innerHTML = `
            <p><strong>Turf:</strong> ${booking.turf}</p>
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Time:</strong> ${booking.slot}</p>
        `;
        container.appendChild(item);
    });
}

function clearHistory() {
    localStorage.removeItem('bookings');
    localStorage.removeItem('bookedSlots');
    renderHistory();
}


document.addEventListener('DOMContentLoaded', () => {
    
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    if (document.getElementById('turfs-section')) {
       
        renderTurfs();
        document.getElementById('search-input').addEventListener('input', searchTurfs);
    } else if (document.getElementById('booking-section')) {
        
        loadBookingPage();
        document.getElementById('confirm-booking').addEventListener('click', confirmBooking);
    } else if (document.getElementById('history-section')) {
        
        loadHistoryPage();
        document.getElementById('clear-history').addEventListener('click', clearHistory);
    } else if (document.getElementById('login-section')) {
        
        loadLoginPage();
    }
});