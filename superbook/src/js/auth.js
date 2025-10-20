const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

if (signupBtn) {
  signupBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value || "Demo User";
    const email = document.getElementById('email').value || "demo@superbook.com";
    const password = document.getElementById('password').value || "1234";
    const user = { name, email, password, avatar: '../assets/img/default-avatar.png' };
    localStorage.setItem('superbookUser', JSON.stringify(user));
    alert('Account created! Please login.');
    window.location.href = 'login.html';
  });
}

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const storedUser = JSON.parse(localStorage.getItem('superbookUser'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert('Welcome back!');
      window.location.href = 'feed.html';
    } else {
      alert('Invalid credentials!');
    }
  });
}