
// Fake users & updated Jin post plus like and atomize features and randomized messages
const fakeUsers = [
  { name: "Jin Kazama", avatar: "../assets/img/jin.png", post: "LINGANG GULI GULI WATAH LINGANG GUU LINGANG GUU" },
  { name: "Dragunov", avatar: "../assets/img/dragunov.png", post: "Hmm" },
  { name: "Armor King", avatar: "../assets/img/armorking.png", post: "ROAR!" },
  { name: "Post Malone", avatar: "../assets/img/postmalone.png", post: "I want you out of my head" },
  { name: "Josa", avatar: "../assets/img/josa.png", post: "Labyu hihi" },
  { name: "Thermoflask", avatar: "../assets/img/thermoflask.png", post: "Refill your water right now!" }
];

// Randomized greetings/messages pool
const greetings = [
  "Yo! What's up?",
  "Good morning! ☀️",
  "Hey, wanna hang later?",
  "Mission accomplished.",
  "Sup, champ?",
  "Bro, we vibin' tonight?",
  "Labyu hihi!",
  "Stay hydrated 💧",
  "Yo, wanna spar later?",
  "How's it going?"
];

function renderFeed() {
  const feed = document.getElementById('feed');
  if (!feed) return;
  feed.innerHTML = '';
  fakeUsers.forEach((user, index) => {
    const post = document.createElement('div');
    post.className = 'post post-v3';
    post.dataset.user = user.name;
    post.innerHTML = `
      <div class="post-header">
        <img class="post-avatar" src="${user.avatar}" alt="${user.name}">
        <div class="post-meta">
          <div class="post-name">${user.name}</div>
          <div class="post-time">1 hr</div>
        </div>
        <div class="post-actions">
          <button class="like-btn" aria-label="like">♡</button>
          <div class="options">
            <button class="options-btn" aria-label="options">⋮</button>
            <div class="options-menu hidden">
              <button class="atomize-btn">ATOMIZE!</button>
            </div>
          </div>
        </div>
      </div>
      <div class="post-body"><p>${user.post}</p></div>
    `;
    feed.appendChild(post);
  });
  attachPostListeners();
}

function attachPostListeners() {
  document.querySelectorAll('.like-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btn.classList.toggle('liked');
      btn.textContent = btn.classList.contains('liked') ? '❤️' : '♡';
    });
  });
  document.querySelectorAll('.options-btn').forEach(ob=>{
    const menu = ob.parentElement.querySelector('.options-menu');
    ob.addEventListener('click', (e)=>{
      e.stopPropagation();
      // toggle menu
      menu.classList.toggle('hidden');
    });
  });
  // Close menus when clicking outside
  document.addEventListener('click', ()=>{
    document.querySelectorAll('.options-menu').forEach(m=>m.classList.add('hidden'));
  });
  document.querySelectorAll('.atomize-btn').forEach(ab=>{
    ab.addEventListener('click', (e)=>{
      e.stopPropagation();
      const postEl = e.target.closest('.post');
      if (!postEl) return;
      // add atomize animation class (fade+shrink) then remove
      postEl.classList.add('atomize');
      setTimeout(()=>{
        postEl.remove();
      }, 1500); // match animation duration (1.5s)
    });
  });
}

// Sidebar, friends, messages & chats
function $(id){return document.getElementById(id);}
function showPopup(id){ $(id).classList.remove('hidden'); }
function hidePopup(id){ $(id).classList.add('hidden'); }

document.addEventListener('DOMContentLoaded', ()=>{
  renderFeed();
  const friendsBtn = $('friendsBtn');
  const messagesBtn = $('messagesBtn');
  const friendsList = $('friendsList');
  const chatsList = $('chatsList');
  const chatWindow = $('chatWindow');
  const chatWith = $('chatWith');
  const chatMessages = $('chatMessages');
  const replyInput = $('replyInput');
  const sendReply = $('sendReply');

  // populate friends list
  fakeUsers.forEach(u=>{
    const li = document.createElement('li');
    li.textContent = u.name;
    li.className = 'friend-item';
    friendsList.appendChild(li);
  });

  // populate chats list and init chat histories with randomized messages
  fakeUsers.forEach(u=>{
    const li = document.createElement('li');
    li.className = 'chat-item';
    // random greeting
    const greet = greetings[Math.floor(Math.random()*greetings.length)];
    li.innerHTML = `<strong>${u.name}</strong><div class="chat-snippet">${greet}</div>`;
    li.addEventListener('click', ()=> openChat(u.name));
    chatsList.appendChild(li);

    const key = 'chat_' + u.name;
    if (!localStorage.getItem(key)) {
      const initial = [{from: u.name, text: greet, time: Date.now()}];
      localStorage.setItem(key, JSON.stringify(initial));
    }
  });

  function openChat(name) {
    chatWindow.classList.remove('hidden');
    chatWith.textContent = name;
    chatMessages.innerHTML = '';
    const key = 'chat_' + name;
    const history = JSON.parse(localStorage.getItem(key) || '[]');
    history.forEach(m=>{
      const div = document.createElement('div');
      div.className = m.from === name ? 'message other' : 'message me';
      div.textContent = m.text;
      chatMessages.appendChild(div);
    });
    showPopup('messagesPopup');
  }

  sendReply.addEventListener('click', ()=>{
    const to = chatWith.textContent;
    if (!to) return alert('Select a chat first');
    const text = replyInput.value.trim();
    if (!text) return;
    const key = 'chat_' + to;
    const history = JSON.parse(localStorage.getItem(key) || '[]');
    history.push({from: 'Me', text, time: Date.now()});
    localStorage.setItem(key, JSON.stringify(history));
    const div = document.createElement('div');
    div.className = 'message me';
    div.textContent = text;
    chatMessages.appendChild(div);
    replyInput.value = '';
  });

  friendsBtn.addEventListener('click', ()=> showPopup('friendsPopup'));
  messagesBtn.addEventListener('click', ()=> showPopup('messagesPopup'));
  document.querySelectorAll('.closePopup').forEach(btn=> btn.addEventListener('click', ()=> hidePopup(btn.getAttribute('data-target'))));
});