const feed = document.getElementById('feed');
if (feed) {
  const fakePosts = [
    { user: '@Atomizer', content: 'Brainrot detected near sector 7. Initiating vaporization.', img: '../assets/img/sample-post.jpg' },
    { user: '@BookEnjoyer', content: 'Finished 3 chapters today. No brainrot here.', img: '../assets/img/sample-post.jpg' },
    { user: '@Gamer', content: 'Touch grass protocol initialized.', img: '../assets/img/sample-post.jpg' }
  ];
  fakePosts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `<img src="${post.img}" alt="post image"><h3>${post.user}</h3><p>${post.content}</p>`;
    feed.appendChild(div);
  });
}