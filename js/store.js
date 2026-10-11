// Data layer. Every function here stands in for what would normally be an API call.
// Functions that change data return { ok: true, ... } or { ok: false, error: '...' }
// so the pages can show a proper message instead of failing silently.

const DB_KEY = 'connecfriend.db';
const SESSION_KEY = 'connecfriend.session';
const MAX_POST_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 1000;

let db = loadDb();

function loadDb() {
  try {
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.users)) return parsed;
    }
  } catch (err) {
    console.error('Saved data could not be read, loading demo data instead.', err);
  }
  const seed = createSeedData();
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(seed));
  } catch (err) {
    console.error('localStorage is not available, changes will not persist.', err);
  }
  return seed;
}

function saveDb() {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function resetDemoData() {
  db = createSeedData();
  saveDb();
  localStorage.removeItem(SESSION_KEY);
}

const fail = (error) => ({ ok: false, error });

function nextId(list) {
  return list.length ? Math.max(...list.map((item) => item.id)) + 1 : 1;
}

/* ---------- users & session ---------- */

function getUser(id) {
  return db.users.find((u) => u.id === Number(id)) || null;
}

function findByUsername(username) {
  const name = username.trim().toLowerCase();
  return db.users.find((u) => u.username.toLowerCase() === name) || null;
}

function currentUser() {
  return getUser(localStorage.getItem(SESSION_KEY));
}

function login(username, password) {
  const user = findByUsername(username);
  if (!user) return { ok: false, field: 'username', error: 'No account found with that username.' };
  if (user.password !== password) return { ok: false, field: 'password', error: 'Incorrect password, please try again.' };

  user.lastLogin = Date.now();
  saveDb();
  localStorage.setItem(SESSION_KEY, String(user.id));
  return { ok: true, user };
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
}

function updateProfile(userId, fields) {
  const user = getUser(userId);
  if (!user) return fail('User not found.');

  const name = (fields.name || '').trim();
  const email = (fields.email || '').trim();
  if (name.length < 3) return fail('Name must be at least 3 characters long.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Please enter a valid email address.');
  if (fields.dob && new Date(fields.dob) > new Date()) return fail('Date of birth cannot be in the future.');

  Object.assign(user, {
    name,
    email,
    city: (fields.city || '').trim(),
    work: (fields.work || '').trim(),
    bio: (fields.bio || '').trim().slice(0, 200),
    dob: fields.dob || user.dob
  });
  return saveDb() ? { ok: true } : fail('Could not save your changes.');
}

function setProfilePicture(userId, dataUrl) {
  const user = getUser(userId);
  if (!user) return fail('User not found.');
  if (!/^data:image\//.test(dataUrl)) return fail('That file is not a valid image.');

  const previous = user.avatar;
  user.avatar = dataUrl;
  if (!saveDb()) {
    user.avatar = previous;
    return fail('Image is too large to store. Try a smaller picture.');
  }
  return { ok: true };
}

function searchMembers(query, excludeId) {
  const q = query.trim().toLowerCase();
  return db.users
    .filter((u) => u.id !== excludeId)
    .filter((u) => !q || u.name.toLowerCase().includes(q) || u.username.includes(q) || u.city.toLowerCase().includes(q))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/* ---------- friends, requests & ignore list ---------- */

// Friends are always returned with the most recently logged in person first.
function friendsOf(userId) {
  const user = getUser(userId);
  if (!user) return [];
  return user.friends.map(getUser).filter(Boolean).sort((a, b) => b.lastLogin - a.lastLogin);
}

function areFriends(a, b) {
  const user = getUser(a);
  return !!user && user.friends.includes(Number(b));
}

function hasIgnored(userId, otherId) {
  const user = getUser(userId);
  return !!user && user.ignored.includes(Number(otherId));
}

function relationship(meId, otherId) {
  if (meId === otherId) return 'self';
  if (areFriends(meId, otherId)) return 'friend';
  if (db.requests.some((r) => r.from === meId && r.to === otherId)) return 'sent';
  if (db.requests.some((r) => r.from === otherId && r.to === meId)) return 'received';
  return 'none';
}

function incomingRequests(userId) {
  return db.requests.filter((r) => r.to === userId).sort((a, b) => b.sentAt - a.sentAt);
}

function outgoingRequests(userId) {
  return db.requests.filter((r) => r.from === userId).sort((a, b) => b.sentAt - a.sentAt);
}

function removeRequest(fromId, toId) {
  db.requests = db.requests.filter((r) => !(r.from === fromId && r.to === toId));
}

function sendFriendRequest(fromId, toId) {
  const target = getUser(toId);
  if (!target) return fail('This member does not exist.');

  switch (relationship(fromId, toId)) {
    case 'self': return fail('You cannot send a friend request to yourself.');
    case 'friend': return fail(`You and ${target.name} are already friends.`);
    case 'sent': return fail(`You have already invited ${target.name}. Waiting for a reply.`);
    case 'received': return fail(`${target.name} has already invited you. Accept it from your requests.`);
  }

  if (hasIgnored(toId, fromId)) {
    return fail(`Request not sent. ${target.name} has added you to their ignore list.`);
  }

  db.requests.push({ from: fromId, to: toId, sentAt: Date.now() });
  saveDb();
  return { ok: true, message: `Friend invitation sent to ${target.name}.` };
}

function cancelFriendRequest(fromId, toId) {
  removeRequest(fromId, toId);
  saveDb();
  return { ok: true };
}

function acceptFriendRequest(meId, fromId) {
  if (relationship(meId, fromId) !== 'received') return fail('This request is no longer available.');
  removeRequest(fromId, meId);
  getUser(meId).friends.push(fromId);
  getUser(fromId).friends.push(meId);
  saveDb();
  return { ok: true, message: `You and ${getUser(fromId).name} are now friends.` };
}

function declineFriendRequest(meId, fromId) {
  removeRequest(fromId, meId);
  saveDb();
  return { ok: true };
}

function removeFriend(meId, friendId) {
  const me = getUser(meId);
  const friend = getUser(friendId);
  if (!me || !friend || !areFriends(meId, friendId)) return fail('This person is not in your friend list.');

  me.friends = me.friends.filter((id) => id !== friendId);
  friend.friends = friend.friends.filter((id) => id !== meId);
  delete db.ratings[`${meId}-${friendId}`];
  delete db.ratings[`${friendId}-${meId}`];
  saveDb();
  return { ok: true, message: `${friend.name} was removed from your friends.` };
}

function ignoreUser(meId, otherId) {
  const me = getUser(meId);
  const other = getUser(otherId);
  if (!other || meId === otherId) return fail('Invalid member.');
  if (areFriends(meId, otherId)) return fail('Remove this person from your friends before ignoring them.');

  if (!me.ignored.includes(otherId)) me.ignored.push(otherId);
  removeRequest(otherId, meId);
  saveDb();
  return { ok: true, message: `${other.name} can no longer send you friend requests.` };
}

function unignoreUser(meId, otherId) {
  const me = getUser(meId);
  me.ignored = me.ignored.filter((id) => id !== otherId);
  saveDb();
  return { ok: true };
}

/* ---------- ratings ---------- */

function getRating(raterId, friendId) {
  return db.ratings[`${raterId}-${friendId}`] || 0;
}

function rateFriend(raterId, friendId, value) {
  if (!areFriends(raterId, friendId)) return fail('You can only rate people in your friend list.');
  if (![1, 2, 3].includes(value)) return fail('Rating must be between 1 and 3.');

  const key = `${raterId}-${friendId}`;
  // clicking the same rating again clears it
  if (db.ratings[key] === value) delete db.ratings[key];
  else db.ratings[key] = value;
  saveDb();
  return { ok: true, value: db.ratings[key] || 0 };
}

/* ---------- posts ---------- */

function getPost(id) {
  return db.posts.find((p) => p.id === Number(id)) || null;
}

function canSeePost(viewerId, post) {
  if (post.authorId === viewerId) return true;
  if (!areFriends(viewerId, post.authorId)) return false;
  return post.audience === 'all' || post.audience.includes(viewerId);
}

function feedFor(userId) {
  return db.posts
    .filter((p) => canSeePost(userId, p))
    .sort((a, b) => b.createdAt - a.createdAt);
}

function postsBy(authorId, viewerId) {
  return feedFor(viewerId).filter((p) => p.authorId === authorId);
}

function createPost(authorId, text, audience, sharedFrom = null) {
  const content = text.trim();
  if (!content && !sharedFrom) return fail('Write something before posting.');
  if (content.length > MAX_POST_LENGTH) return fail(`Posts can be at most ${MAX_POST_LENGTH} characters.`);
  if (sharedFrom && !getPost(sharedFrom)) return fail('The post you are sharing was removed.');

  if (audience !== 'all') {
    if (!Array.isArray(audience) || audience.length === 0) return fail('Select at least one friend to share with.');
    if (audience.some((id) => !areFriends(authorId, id))) return fail('You can only share with people in your friend list.');
  }
  if (friendsOf(authorId).length === 0) return fail('Add some friends first so there is someone to share with.');

  const post = {
    id: nextId(db.posts),
    authorId,
    text: content,
    audience,
    createdAt: Date.now(),
    sharedFrom,
    likes: [],
    dislikes: []
  };
  db.posts.push(post);
  if (!saveDb()) {
    db.posts.pop();
    return fail('Could not save your post.');
  }
  return { ok: true, post };
}

function reactToPost(userId, postId, type) {
  const post = getPost(postId);
  if (!post || !canSeePost(userId, post)) return fail('This post is not available anymore.');
  if (type !== 'like' && type !== 'dislike') return fail('Unknown reaction.');

  const [chosen, opposite] = type === 'like' ? [post.likes, post.dislikes] : [post.dislikes, post.likes];
  const index = chosen.indexOf(userId);

  if (index >= 0) {
    chosen.splice(index, 1);
  } else {
    chosen.push(userId);
    const oppIndex = opposite.indexOf(userId);
    if (oppIndex >= 0) opposite.splice(oppIndex, 1);
  }
  saveDb();
  return { ok: true, post };
}

function deletePost(userId, postId) {
  const post = getPost(postId);
  if (!post || post.authorId !== userId) return fail('You can only delete your own posts.');
  db.posts = db.posts.filter((p) => p.id !== post.id);
  saveDb();
  return { ok: true };
}

/* ---------- private messages ---------- */

function conversationsFor(userId) {
  const byPerson = new Map();

  db.messages
    .filter((m) => m.from === userId || m.to === userId)
    .sort((a, b) => a.sentAt - b.sentAt)
    .forEach((m) => {
      const otherId = m.from === userId ? m.to : m.from;
      const convo = byPerson.get(otherId) || { user: getUser(otherId), last: null, unread: 0 };
      convo.last = m;
      if (m.to === userId && !m.read) convo.unread++;
      byPerson.set(otherId, convo);
    });

  return [...byPerson.values()]
    .filter((c) => c.user)
    .sort((a, b) => b.last.sentAt - a.last.sentAt);
}

function threadBetween(a, b) {
  return db.messages
    .filter((m) => (m.from === a && m.to === b) || (m.from === b && m.to === a))
    .sort((x, y) => x.sentAt - y.sentAt);
}

function markThreadRead(meId, otherId) {
  let changed = false;
  db.messages.forEach((m) => {
    if (m.from === otherId && m.to === meId && !m.read) {
      m.read = true;
      changed = true;
    }
  });
  if (changed) saveDb();
}

function unreadCount(userId) {
  return db.messages.filter((m) => m.to === userId && !m.read).length;
}

function sendMessage(fromId, toId, text) {
  const recipient = getUser(toId);
  const content = (text || '').trim();

  if (!recipient) return fail('Please choose who you want to message.');
  if (fromId === toId) return fail('You cannot send a message to yourself.');
  if (!content) return fail('Message cannot be empty.');
  if (content.length > MAX_MESSAGE_LENGTH) return fail(`Messages can be at most ${MAX_MESSAGE_LENGTH} characters.`);

  const message = { id: nextId(db.messages), from: fromId, to: toId, text: content, sentAt: Date.now(), read: false };
  db.messages.push(message);
  if (!saveDb()) {
    db.messages.pop();
    return fail('Message could not be sent. Please try again.');
  }
  return { ok: true, message };
}
