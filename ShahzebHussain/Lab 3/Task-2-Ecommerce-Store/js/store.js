/* =========================================================
   Kaarigar Store: shared data + helpers (used by every page)
   Data is kept in the browser with localStorage:
     kg_users    -> registered accounts
     kg_session  -> logged-in user's email
     kg_cart     -> [{ id, qty }]
     kg_reviews  -> reviews written on this browser
     kg_orders   -> placed orders
   ========================================================= */

const PRODUCTS = [
  { id: 1, name: 'Multani Blue Pottery Vase', category: 'Pottery', origin: 'Multan', price: 3800, img: 'images/vase.svg',
    desc: 'Hand-thrown and painted with cobalt and turquoise glaze in the kashi-kari style of Multan. About 30 cm tall.' },
  { id: 2, name: 'Hala Ajrak Shawl', category: 'Textiles', origin: 'Hala, Sindh', price: 4500, img: 'images/ajrak.svg',
    desc: 'Block-printed cotton ajrak dyed with indigo and madder in up to 16 stages. 2.5 m long.' },
  { id: 3, name: 'Peshawari Chappal', category: 'Footwear', origin: 'Peshawar', price: 6200, img: 'images/chappal.svg',
    desc: 'Full-grain leather with a tyre-rubber sole and hand-stitched straps. Available in sizes 7–11.' },
  { id: 4, name: 'Truck-Art Kettle', category: 'Home Decor', origin: 'Karachi', price: 2900, img: 'images/kettle.svg',
    desc: 'A steel kettle hand-painted by truck artists in bright floral and geometric motifs. Decorative use.' },
  { id: 5, name: 'Onyx Marble Bowl', category: 'Home Decor', origin: 'Chagai, Balochistan', price: 3400, img: 'images/onyx.svg',
    desc: 'Carved from a single block of green onyx and hand-polished. Each bowl has its own banding. 20 cm wide.' },
  { id: 6, name: 'Swati Embroidered Cushion', category: 'Textiles', origin: 'Swat', price: 1800, img: 'images/cushion.svg',
    desc: 'Cushion cover with dense Swati phulkari-style embroidery on black cotton. 16 × 16 in, zip closure.' },
  { id: 7, name: 'Camel-Skin Lamp', category: 'Home Decor', origin: 'Multan', price: 5600, img: 'images/lamp.svg',
    desc: 'Translucent camel-skin shade painted with naqashi work. Gives off a warm amber glow. Includes E27 holder.' },
  { id: 8, name: 'Chitrali Pakol Cap', category: 'Textiles', origin: 'Chitral', price: 1500, img: 'images/pakol.svg',
    desc: 'Rolled-brim woollen cap hand-made from Chitrali patti wool. Sizes S, M, L.' }
];

/* Seed reviews so the store isn't empty on first visit */
const SEED_REVIEWS = [
  { productId: 1, name: 'Ayesha R.', rating: 5, text: 'The blue is even richer in person. Arrived wrapped in so much padding it took me ten minutes to unpack.', date: '2026-09-12' },
  { productId: 3, name: 'Hamza T.', rating: 4, text: 'Proper Peshawari quality. Took a week to soften up, now I wear them every day.', date: '2026-09-02' },
  { productId: 2, name: 'Sana M.', rating: 5, text: 'Bought it as a gift for my mother. The colours did not run after washing.', date: '2026-08-28' },
  { productId: 7, name: 'Bilal K.', rating: 5, text: 'Looks beautiful in the corner of our drawing room at night.', date: '2026-08-20' },
  { productId: 4, name: 'Zoya F.', rating: 4, text: 'Brightest thing in my kitchen. Smaller than I expected, so check the size.', date: '2026-08-15' },
  { productId: 5, name: 'Usman A.', rating: 5, text: 'Heavy, cool to the touch and the green banding is lovely.', date: '2026-08-09' }
];

const FREE_SHIPPING_FROM = 5000;
const SHIPPING_FEE = 250;

/* ---------- storage helpers ---------- */
const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};

const formatPKR = n => 'Rs ' + n.toLocaleString('en-PK');
const getProduct = id => PRODUCTS.find(p => p.id === Number(id));
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- auth ---------- */
const auth = {
  users() { return store.get('kg_users', []); },
  current() {
    const email = store.get('kg_session', null);
    return this.users().find(u => u.email === email) || null;
  },
  signup(name, email, password) {
    const users = this.users();
    if (users.some(u => u.email === email)) return { ok: false, error: 'An account with this email already exists. Log in instead.' };
    users.push({ name, email, password });
    store.set('kg_users', users);
    store.set('kg_session', email);
    return { ok: true };
  },
  login(email, password) {
    const user = this.users().find(u => u.email === email);
    if (!user || user.password !== password) return { ok: false, error: 'Email or password is incorrect.' };
    store.set('kg_session', email);
    return { ok: true };
  },
  logout() { localStorage.removeItem('kg_session'); }
};

/* ---------- cart ---------- */
const cart = {
  items() { return store.get('kg_cart', []); },
  save(items) { store.set('kg_cart', items); updateCartBadge(); },
  add(id, qty = 1) {
    const items = this.items();
    const line = items.find(i => i.id === id);
    if (line) line.qty = Math.min(line.qty + qty, 10);
    else items.push({ id, qty });
    this.save(items);
  },
  setQty(id, qty) {
    qty = Math.max(1, Math.min(10, Number(qty) || 1));
    const items = this.items().map(i => i.id === id ? { ...i, qty } : i);
    this.save(items);
  },
  remove(id) { this.save(this.items().filter(i => i.id !== id)); },
  clear() { this.save([]); },
  count() { return this.items().reduce((n, i) => n + i.qty, 0); },
  totals() {
    const subtotal = this.items().reduce((sum, i) => sum + getProduct(i.id).price * i.qty, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
    return { subtotal, shipping, total: subtotal + shipping };
  }
};

/* ---------- reviews ---------- */
const reviews = {
  all() { return [...store.get('kg_reviews', []), ...SEED_REVIEWS]; },
  forProduct(id) { return this.all().filter(r => r.productId === id); },
  add(review) { store.set('kg_reviews', [review, ...store.get('kg_reviews', [])]); },
  average(id) {
    const list = this.forProduct(id);
    if (!list.length) return { avg: 0, count: 0 };
    return { avg: list.reduce((s, r) => s + r.rating, 0) / list.length, count: list.length };
  }
};

function starsHTML(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) html += '<i class="bi bi-star-fill"></i>';
    else if (rating >= i - 0.5) html += '<i class="bi bi-star-half"></i>';
    else html += '<i class="bi bi-star"></i>';
  }
  return `<span class="stars" aria-label="${rating.toFixed(1)} out of 5">${html}</span>`;
}

/* ---------- navbar ---------- */
function updateCartBadge() {
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    const n = cart.count();
    el.textContent = n;
    el.classList.toggle('d-none', n === 0);
  });
}

function renderUserMenu() {
  const slot = document.getElementById('userMenu');
  if (!slot) return;
  const user = auth.current();
  if (user) {
    slot.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-ink rounded-pill dropdown-toggle" data-bs-toggle="dropdown">
          <i class="bi bi-person-circle me-1"></i>${escapeHTML(user.name.split(' ')[0])}
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
          <li><span class="dropdown-item-text small text-body-secondary">${escapeHTML(user.email)}</span></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="cart.html"><i class="bi bi-bag me-2"></i>My cart</a></li>
          <li><button class="dropdown-item" id="logoutBtn"><i class="bi bi-box-arrow-right me-2"></i>Log out</button></li>
        </ul>
      </div>`;
    document.getElementById('logoutBtn').addEventListener('click', () => {
      auth.logout();
      showToast('You have been logged out.');
      renderUserMenu();
      document.dispatchEvent(new Event('kg:auth'));
    });
  } else {
    slot.innerHTML = `
      <a href="login.html" class="btn btn-link link-ink text-decoration-none">Log in</a>
      <a href="signup.html" class="btn btn-ink rounded-pill px-3">Sign up</a>`;
  }
}

/* ---------- toast ---------- */
function showToast(message, icon = 'bi-check-circle-fill') {
  let wrap = document.getElementById('toastWrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toastWrap';
    wrap.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(wrap);
  }
  const el = document.createElement('div');
  el.className = 'toast align-items-center text-bg-dark border-0';
  el.setAttribute('role', 'status');
  el.innerHTML = `<div class="d-flex"><div class="toast-body"><i class="bi ${icon} me-2 text-warning"></i>${message}</div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>`;
  wrap.appendChild(el);
  const t = new bootstrap.Toast(el, { delay: 2500 });
  el.addEventListener('hidden.bs.toast', () => el.remove());
  t.show();
}

/* ---------- shared: add-to-cart buttons anywhere on a page ---------- */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-add-to-cart]');
  if (!btn) return;
  const id = Number(btn.dataset.addToCart);
  const qtyInput = btn.dataset.qtyFrom ? document.querySelector(btn.dataset.qtyFrom) : null;
  const qty = qtyInput ? Math.max(1, Number(qtyInput.value) || 1) : 1;
  cart.add(id, qty);
  showToast(`<b>${escapeHTML(getProduct(id).name)}</b> added to cart. <a href="cart.html" class="link-warning">View cart</a>`, 'bi-bag-check-fill');
});

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderUserMenu();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
