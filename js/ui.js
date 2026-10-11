// Small helpers shared by all pages: navbar, avatars, toasts, time formatting, post cards.

const RATINGS = {
  1: { label: 'Stupid', icon: 'bi-emoji-dizzy', color: 'danger' },
  2: { label: 'Cool', icon: 'bi-emoji-sunglasses', color: 'primary' },
  3: { label: 'Trustworthy', icon: 'bi-shield-fill-check', color: 'success' }
};

function escapeHTML(value) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value ?? '').replace(/[&<>"']/g, (ch) => map[ch]);
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function requireLogin() {
  const me = currentUser();
  if (!me) {
    window.location.replace('index.html');
    return null;
  }
  return me;
}

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';

  const units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
  for (const [unit, size] of units) {
    const amount = Math.floor(seconds / size);
    if (amount >= 1) return `${amount} ${unit}${amount > 1 ? 's' : ''} ago`;
  }
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  return isNaN(date) ? '—' : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatClock(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function isOnline(user) {
  return Date.now() - user.lastLogin < 15 * 60 * 1000;
}

function avatar(user, size = 40, extraClass = '') {
  const style = `width:${size}px;height:${size}px;`;
  if (user.avatar) {
    return `<img src="${user.avatar}" alt="${escapeHTML(user.name)}" class="avatar ${extraClass}" style="${style}">`;
  }
  const initials = user.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
  return `<span class="avatar ${extraClass}" style="${style}background:${user.color};font-size:${Math.round(size * 0.38)}px">${initials}</span>`;
}

function avatarWithStatus(user, size = 40) {
  const dot = isOnline(user) ? '<span class="status-dot" title="Recently active"></span>' : '';
  return `<span class="position-relative d-inline-block">${avatar(user, size)}${dot}</span>`;
}

function showToast(message, type = 'success') {
  let holder = document.getElementById('toastHolder');
  if (!holder) {
    holder = document.createElement('div');
    holder.id = 'toastHolder';
    holder.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(holder);
  }

  const icons = { success: 'bi-check-circle', danger: 'bi-exclamation-triangle', warning: 'bi-exclamation-circle', info: 'bi-info-circle' };
  const el = document.createElement('div');
  el.className = `toast align-items-center text-bg-${type} border-0`;
  el.setAttribute('role', 'alert');
  el.innerHTML = `
    <div class="d-flex">
      <div class="toast-body"><i class="bi ${icons[type] || icons.info} me-2"></i>${escapeHTML(message)}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>`;
  holder.appendChild(el);
  el.addEventListener('hidden.bs.toast', () => el.remove());
  new bootstrap.Toast(el, { delay: 3500 }).show();
}

// shows the result of a store action as a toast and tells the caller if it worked
function notify(result, successText) {
  if (!result.ok) {
    showToast(result.error, 'danger');
    return false;
  }
  if (successText || result.message) showToast(successText || result.message, 'success');
  return true;
}

function renderNavbar(active) {
  const me = currentUser();
  const pending = incomingRequests(me.id).length;
  const unread = unreadCount(me.id);

  const links = [
    { key: 'home', href: 'home.html', icon: 'bi-house-door', text: 'Home' },
    { key: 'friends', href: 'friends.html', icon: 'bi-people', text: 'Friends', badge: pending },
    { key: 'messages', href: 'messages.html', icon: 'bi-chat-square-text', text: 'Messages', badge: unread },
    { key: 'profile', href: 'profile.html', icon: 'bi-person-circle', text: 'Profile' }
  ];

  const items = links.map((link) => `
    <li class="nav-item">
      <a class="nav-link px-lg-3 ${active === link.key ? 'active fw-semibold' : ''}" href="${link.href}">
        <i class="bi ${link.icon} me-1"></i>${link.text}
        ${link.badge ? `<span class="badge rounded-pill bg-warning text-dark ms-1">${link.badge}</span>` : ''}
      </a>
    </li>`).join('');

  document.getElementById('navbar').innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-brand sticky-top shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="home.html">
          <span class="brand-mark"><i class="bi bi-link-45deg"></i></span> ConnecFriend
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav mx-auto">${items}</ul>
          <div class="d-flex align-items-center gap-2 mt-2 mt-lg-0">
            <a href="profile.html" class="d-flex align-items-center gap-2 text-white text-decoration-none">
              ${avatar(me, 32, 'border border-2 border-light')}
              <span class="small d-lg-none d-xl-inline">${escapeHTML(me.name.split(' ')[0])}</span>
            </a>
            <button id="logoutBtn" class="btn btn-sm btn-outline-light ms-2"><i class="bi bi-box-arrow-right me-1"></i>Logout</button>
          </div>
        </div>
      </div>
    </nav>`;

  document.getElementById('logoutBtn').addEventListener('click', () => {
    logout();
    window.location.href = 'index.html';
  });
}

function ratingControl(friendId, current) {
  const buttons = Object.entries(RATINGS).map(([value, r]) => `
    <button type="button" class="btn btn-sm ${Number(value) === current ? `btn-${r.color}` : `btn-outline-${r.color}`}"
            data-rate="${value}" data-friend="${friendId}" title="${r.label}" aria-label="Rate as ${r.label}">
      <i class="bi ${r.icon}"></i>
    </button>`).join('');
  return `<div class="btn-group" role="group" aria-label="Rate friend">${buttons}</div>`;
}

function ratingBadge(value) {
  if (!value) return '';
  const r = RATINGS[value];
  return `<span class="badge rounded-pill text-bg-${r.color} bg-opacity-75"><i class="bi ${r.icon} me-1"></i>${r.label}</span>`;
}

// One click handler for every rating control on the page.
function bindRatingClicks(container, me, onChange) {
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-rate]');
    if (!btn) return;
    const friend = getUser(btn.dataset.friend);
    const result = rateFriend(me.id, friend.id, Number(btn.dataset.rate));
    if (!notify(result)) return;
    const label = result.value ? RATINGS[result.value].label : null;
    showToast(label ? `You rated ${friend.name} as ${label}.` : `Rating for ${friend.name} cleared.`, 'info');
    onChange();
  });
}

function audienceLabel(post) {
  if (post.audience === 'all') return '<i class="bi bi-globe2" title="Shared with all friends"></i>';
  const count = post.audience.length;
  return `<i class="bi bi-people-fill" title="Shared with ${count} selected friend${count > 1 ? 's' : ''}"></i>`;
}

function reactionNames(ids) {
  return ids.map((id) => getUser(id)?.name).filter(Boolean).join(', ');
}

function postCard(post, me, { allowShare = true } = {}) {
  const author = getUser(post.authorId);
  if (!author) return '';

  const liked = post.likes.includes(me.id);
  const disliked = post.dislikes.includes(me.id);
  const isMine = author.id === me.id;
  const original = post.sharedFrom ? getPost(post.sharedFrom) : null;
  const originalAuthor = original ? getUser(original.authorId) : null;

  const sharedBlock = post.sharedFrom ? (original && originalAuthor
    ? `<div class="shared-box rounded-3 p-3 mb-3">
         <div class="d-flex align-items-center gap-2 mb-2">
           ${avatar(originalAuthor, 28)}
           <span class="fw-semibold small">${escapeHTML(originalAuthor.name)}</span>
           <span class="text-muted small">· ${timeAgo(original.createdAt)}</span>
         </div>
         <p class="mb-0 post-text">${escapeHTML(original.text)}</p>
       </div>`
    : '<div class="alert alert-secondary small py-2">The original post is no longer available.</div>') : '';

  return `
    <article class="card post-card border-0 shadow-sm mb-3" data-post="${post.id}">
      <div class="card-body">
        <div class="d-flex align-items-start gap-3 mb-3">
          <a href="profile.html?id=${author.id}">${avatarWithStatus(author, 46)}</a>
          <div class="flex-grow-1 min-w-0">
            <a href="profile.html?id=${author.id}" class="fw-bold text-body text-decoration-none">${escapeHTML(author.name)}</a>
            ${post.sharedFrom ? '<span class="text-muted small"> shared a post</span>' : ''}
            <div class="small text-muted">
              <span title="Time since last login"><i class="bi bi-door-open me-1"></i>Last login ${timeAgo(author.lastLogin)}</span>
              <span class="mx-1">·</span>
              <span title="${new Date(post.createdAt).toLocaleString()}">Posted ${timeAgo(post.createdAt)}</span>
              <span class="mx-1">·</span>${audienceLabel(post)}
            </div>
          </div>
          ${isMine ? `
            <div class="dropdown">
              <button class="btn btn-sm btn-light rounded-circle" data-bs-toggle="dropdown" aria-label="Post options"><i class="bi bi-three-dots"></i></button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><button class="dropdown-item text-danger" data-action="delete"><i class="bi bi-trash me-2"></i>Delete post</button></li>
              </ul>
            </div>` : ratingBadge(getRating(me.id, author.id))}
        </div>

        ${post.text ? `<p class="post-text mb-3">${escapeHTML(post.text)}</p>` : ''}
        ${sharedBlock}

        <div class="d-flex flex-wrap align-items-center gap-2 border-top pt-3">
          <button class="btn btn-sm ${liked ? 'btn-success' : 'btn-outline-success'} rounded-pill px-3" data-action="like"
                  title="${escapeHTML(reactionNames(post.likes)) || 'No likes yet'}">
            <i class="bi ${liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'} me-1"></i>Like
            <span class="badge ${liked ? 'bg-light text-success' : 'text-bg-success'} ms-1">${post.likes.length}</span>
          </button>
          <button class="btn btn-sm ${disliked ? 'btn-danger' : 'btn-outline-danger'} rounded-pill px-3" data-action="dislike"
                  title="${escapeHTML(reactionNames(post.dislikes)) || 'No dislikes yet'}">
            <i class="bi ${disliked ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-down'} me-1"></i>Dislike
            <span class="badge ${disliked ? 'bg-light text-danger' : 'text-bg-danger'} ms-1">${post.dislikes.length}</span>
          </button>
          ${allowShare && post.text ? `
            <button class="btn btn-sm btn-outline-secondary rounded-pill px-3 ms-auto" data-action="share">
              <i class="bi bi-share me-1"></i>Share
            </button>` : ''}
        </div>
      </div>
    </article>`;
}

// Like / dislike / delete clicks for a list of post cards. "share" is passed to onShare.
function bindPostActions(container, me, { onChange, onShare } = {}) {
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    const card = e.target.closest('[data-post]');
    if (!btn || !card) return;

    const postId = Number(card.dataset.post);
    const action = btn.dataset.action;

    if (action === 'like' || action === 'dislike') {
      if (notify(reactToPost(me.id, postId, action))) onChange();
    } else if (action === 'delete') {
      if (notify(deletePost(me.id, postId), 'Post deleted.')) onChange();
    } else if (action === 'share' && onShare) {
      onShare(postId);
    }
  });
}

function emptyState(icon, title, text) {
  return `
    <div class="text-center text-muted py-5">
      <i class="bi ${icon} display-5 d-block mb-3 text-brand opacity-50"></i>
      <h6 class="fw-semibold text-body">${title}</h6>
      <p class="small mb-0">${text}</p>
    </div>`;
}
