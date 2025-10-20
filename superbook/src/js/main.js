const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('superbookUser');
    window.location.href = 'login.html';
  });
}

// load profile info where present
(function(){
  const user = JSON.parse(localStorage.getItem('superbookUser'));
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profileAvatar = document.getElementById('profileAvatar');
  if (user) {
    if (profileName) profileName.textContent = user.name;
    if (profileEmail) profileEmail.textContent = user.email;
    if (profileAvatar) profileAvatar.src = user.avatar || '../assets/img/default-avatar.png';
  }
})();