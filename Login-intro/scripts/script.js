document.getElementById('register-me').addEventListener('click', function () {
    var title = document.querySelector('.logo');
    var loginBtn = document.getElementById('loginBtn');
    var rememberMeLabel = document.querySelector('.remember-me');
    var passwordBtn = document.getElementById('question');
    var bottonQuest = document.getElementById('register-me');

    if (title.innerText === 'WELCOME') {
        title.innerText = 'REGISTER';
        loginBtn.innerText = 'REGISTER';
        rememberMeLabel.style.opacity = '0';
        passwordBtn.style.opacity = '0';
        bottonQuest.innerText = "Go back to login";
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('email').placeholder = 'New Username';
        document.getElementById('password').placeholder = 'New Password';
    } else {
        title.innerText = 'WELCOME';
        loginBtn.innerText = 'LOGIN';
        rememberMeLabel.style.opacity = '1';
        passwordBtn.style.opacity = '1';
        bottonQuest.innerText = "Register now";
        document.getElementById('email').placeholder = 'Username';
        document.getElementById('password').placeholder = 'Password';
    }
});

document.getElementById('loginBtn').addEventListener('click', function () {
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var message = document.getElementById('message');

    if (document.querySelector('.logo').innerText === 'REGISTER') {
        // 注册逻辑
        if (!email || !password) {
            message.innerText = 'Please fill in both username and password.';
            message.style.color = 'red';
            message.style.display = 'block';
            return;
        }

        // 保存用户名和密码
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        message.innerText = 'Registration successful! Please login.';
        message.style.color = 'green';
        message.style.display = 'block';

        // 切换回登录界面
        document.querySelector('.logo').innerText = 'WELCOME';
        document.getElementById('loginBtn').innerText = 'LOGIN';
        document.getElementById('register-me').innerText = 'Register now';
        document.getElementById('email').placeholder = 'Username';
        document.getElementById('password').placeholder = 'Password';
    } else {
        // 登录逻辑
        var storedEmail = localStorage.getItem('email');
        var storedPassword = localStorage.getItem('password');

        if (email === storedEmail && password === storedPassword) {
            message.innerText = 'Login successful!';
            message.style.color = 'green';
            message.style.display = 'block';

            // 登录成功后跳转到自我介绍页面
            setTimeout(() => {
                window.location.href = '../09/index.html';
            }, 1000); // 1秒后跳转
        } else {
            message.innerText = 'Incorrect username or password.';
            message.style.color = 'red';
            message.style.display = 'block';
        }
    }
});
