
// Data for fake users and their posts (as requested)
const fakeUsers = [
  { name: "Jin Kazama", avatar: "../assets/img/jin.png", post: "I feel like I can Ukete Miro you right now!" },
  { name: "Dragunov", avatar: "../assets/img/dragunov.png", post: "Hmm" },
  { name: "Armor King", avatar: "../assets/img/armorking.png", post: "ROAR!" },
  { name: "Post Malone", avatar: "../assets/img/postmalone.png", post: "I want you out of my head" },
  { name: "Josa", avatar: "../assets/img/josa.png", post: "Labyu hihi" },
  { name: "Thermoflask", avatar: "../assets/img/thermoflask.png", post: "Refill your water right now!" }
];

// Render feed with avatar + name like facebook post
function renderFeed() {
  const feed = document.getElementById('feed');
  if (!feed) return;
  feed.innerHTML = '';
  fakeUsers.forEach(user => {
    const post = document.createElement('div');
    post.className = 'post post-v3';
    post.innerHTML = `
      <div class="post-header">
        <img class="post-avatar" src="${user.avatar}" alt="${user.name}">
        <div class="post-meta">
          <div class="post-name">${user.name}</div>
          <div class="post-time">1 hr</div>
        </div>
      </div>
      <div class="post-body">
        <p>${user.post}</p>
      </div>
    `;
    feed.appendChild(post);
  });
}

// Sidebar popups logic
function $(id){return document.getElementById(id);}
function showPopup(id){ $(id).classList.remove('hidden'); }
function hidePopup(id){ $(id).classList.add('hidden'); }

document.addEventListener('DOMContentLoaded', ()=>{
  renderFeed();

  const friendsBtn = $('friendsBtn');
  const messagesBtn = $('messagesBtn');
  const friendsPopup = $('friendsPopup');
  const messagesPopup = $('messagesPopup');
  const friendsList = $('friendsList');
  const chatsList = $('chatsList');
  const chatWindow = $('chatWindow');
  const chatWith = $('chatWith');
  const chatMessages = $('chatMessages');
  const replyInput = $('replyInput');
  const sendReply = $('sendReply');

  // populate friends list (same names as posters)
  fakeUsers.forEach(u => {
    const li = document.createElement('li');
    li.textContent = u.name;
    li.className = 'friend-item';
    friendsList.appendChild(li);
  });

  // populate chats list with initial messages; clicking a chat opens chat window
  fakeUsers.forEach(u => {
    const li = document.createElement('li');
    li.className = 'chat-item';
    li.innerHTML = `<strong>${u.name}</strong><div class="chat-snippet">${u.post}</div>`;
    li.addEventListener('click', ()=> openChat(u));
    chatsList.appendChild(li);

    // initialize chat history in localStorage if not exists
    const key = 'chat_' + u.name;
    if (!localStorage.getItem(key)) {
      const initial = [{from: u.name, text: u.post, time: Date.now()}];
      localStorage.setItem(key, JSON.stringify(initial));
    }
  });

  function openChat(user) {
    chatWindow.classList.remove('hidden');
    chatWith.textContent = user.name;
    chatMessages.innerHTML = '';
    const key = 'chat_' + user.name;
    const history = JSON.parse(localStorage.getItem(key) || '[]');
    history.forEach(m => {
      const div = document.createElement('div');
      div.className = m.from === user.name ? 'message other' : 'message me';
      div.textContent = m.text;
      chatMessages.appendChild(div);
    });
    // show messagesPopup if hidden
    showPopup('messagesPopup');
  }

  // send reply
  sendReply.addEventListener('click', ()=>{
    const to = chatWith.textContent;
    if (!to) return alert('Select a chat first');
    const text = replyInput.value.trim();
    if (!text) return;
    const key = 'chat_' + to;
    const history = JSON.parse(localStorage.getItem(key) || '[]');
    history.push({from: 'Me', text, time: Date.now()});
    localStorage.setItem(key, JSON.stringify(history));
    // append to chat window
    const div = document.createElement('div');
    div.className = 'message me';
    div.textContent = text;
    chatMessages.appendChild(div);
    replyInput.value = '';
  });

  // open popups
  friendsBtn.addEventListener('click', ()=> showPopup('friendsPopup'));
  messagesBtn.addEventListener('click', ()=> showPopup('messagesPopup'));

  // close buttons
  document.querySelectorAll('.closePopup').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const target = btn.getAttribute('data-target');
      if (target) hidePopup(target);
    });
  });
});