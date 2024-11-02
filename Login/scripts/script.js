document.getElementById('register-me').addEventListener('click', toggleFormMode);

document.getElementById('loginBtn').addEventListener('click', handleLoginOrRegister);

document.getElementById('email').addEventListener('input', validateEmail);

function toggleFormMode() {
    const title = document.querySelector('.logo');
    const loginBtn = document.getElementById('loginBtn');
    const rememberMeLabel = document.querySelector('.remember-me');
    const passwordBtn = document.getElementById('question');
    const registerToggleBtn = document.getElementById('register-me');
    
    const isLoginMode = title.innerText === 'WELCOME';

    title.innerText = isLoginMode ? 'REGISTER' : 'WELCOME';
    loginBtn.innerText = isLoginMode ? 'REGISTER' : 'LOGIN';
    rememberMeLabel.style.opacity = isLoginMode ? '0' : '1';
    passwordBtn.style.opacity = isLoginMode ? '0' : '1';
    registerToggleBtn.innerText = isLoginMode ? 'Go back to login' : 'Register now';
    resetFormFields(isLoginMode);
}

function resetFormFields(isLoginMode) {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('email').placeholder = isLoginMode ? 'New Username' : 'Username';
    document.getElementById('password').placeholder = isLoginMode ? 'New Password' : 'Password';
}

function handleLoginOrRegister() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');
    const isRegisterMode = document.querySelector('.logo').innerText === 'REGISTER';

    if (!email || !password) {
        displayMessage('Please fill in both username and password.', 'red');
        return;
    }

    if (isRegisterMode) {
        registerUser(email, password, message);
    } else {
        loginUser(email, password, message);
    }
}

function registerUser(email, password, message) {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    displayMessage('Registration successful! Please login.', 'green');
    
    toggleFormMode(); 
}

function loginUser(email, password, message) {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
        displayMessage('Login successful!', 'green');
        playSuccessAnimation();
    } else {
        displayMessage('Incorrect username or password.', 'red');
    }
}

function displayMessage(text, color) {
    const message = document.getElementById('message');
    message.innerText = text;
    message.style.color = color;
    message.style.display = 'block';
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailInput.value)) {
        emailInput.classList.add('error');
        emailError.style.display = 'block';
    } else {
        emailInput.classList.remove('error');
        emailError.style.display = 'none';
    }
}

function playSuccessAnimation() {
    const container = document.querySelector('.container');
    container.style.transition = 'all 0.5s ease';
    container.style.opacity = '0';

    setTimeout(() => {
        container.innerHTML = '<div class="success-animation">🎉 Welcome back! 🎉</div>';
        container.style.opacity = '1';
        container.querySelector('.success-animation').classList.add('animate-success');
    }, 500);
}
