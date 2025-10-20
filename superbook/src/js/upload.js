const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const saveBtn = document.getElementById('saveBtn');
let selectedImage = null;
imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
saveBtn.addEventListener('click', () => {
  if (selectedImage) {
    const user = JSON.parse(localStorage.getItem('superbookUser'));
    if (user) {
      user.avatar = selectedImage;
      localStorage.setItem('superbookUser', JSON.stringify(user));
      alert('✅ Profile picture saved successfully!');
      window.location.href = 'profile.html';
    }
  } else {
    alert('Please select an image first.');
  }
});