/* Home page: product listing, filtering, quick view modal and reviews */

const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');

/* ---------- product listing ---------- */
function productCard(p) {
  const { avg, count } = reviews.average(p.id);
  return `
    <div class="col">
      <article class="card h-100 product-card">
        <img src="${p.img}" class="card-img-top" alt="${escapeHTML(p.name)}" data-view="${p.id}">
        <div class="card-body d-flex flex-column">
          <p class="origin mb-1"><i class="bi bi-geo-alt"></i> ${escapeHTML(p.origin)}</p>
          <h3 class="card-title mb-1"><a href="#" class="link-ink text-decoration-none" data-view="${p.id}">${escapeHTML(p.name)}</a></h3>
          <div class="small mb-3">${count ? `${starsHTML(avg)} <span class="text-body-secondary">(${count})</span>` : '<span class="text-body-secondary">No reviews yet</span>'}</div>
          <div class="d-flex align-items-center justify-content-between mt-auto">
            <span class="price">${formatPKR(p.price)}</span>
            <button class="btn btn-sm btn-ink rounded-pill px-3" data-add-to-cart="${p.id}"><i class="bi bi-bag-plus"></i> Add</button>
          </div>
        </div>
      </article>
    </div>`;
}

function renderProducts() {
  const term = searchInput.value.trim().toLowerCase();
  const cat = document.querySelector('input[name="cat"]:checked').value;
  let list = PRODUCTS.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (p.name.toLowerCase().includes(term) || p.origin.toLowerCase().includes(term)));

  const sort = sortSelect.value;
  if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  if (sort === 'rating') list.sort((a, b) => reviews.average(b.id).avg - reviews.average(a.id).avg);

  grid.innerHTML = list.map(productCard).join('');
  document.getElementById('noResults').classList.toggle('d-none', list.length > 0);
  document.getElementById('resultCount').textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;
}

searchInput.addEventListener('input', renderProducts);
sortSelect.addEventListener('change', renderProducts);
document.getElementById('filters').addEventListener('change', renderProducts);
document.getElementById('clearFilters').addEventListener('click', () => {
  searchInput.value = '';
  document.getElementById('cat-all').checked = true;
  renderProducts();
});

/* ---------- quick view modal ---------- */
const modalEl = document.getElementById('productModal');
const modal = new bootstrap.Modal(modalEl);

function openProduct(id) {
  const p = getProduct(id);
  const { avg, count } = reviews.average(p.id);
  document.getElementById('pmImg').src = p.img;
  document.getElementById('pmImg').alt = p.name;
  document.getElementById('pmOrigin').innerHTML = `<i class="bi bi-geo-alt"></i> ${escapeHTML(p.origin)} · ${p.category}`;
  document.getElementById('pmTitle').textContent = p.name;
  document.getElementById('pmRating').innerHTML = count ? `${starsHTML(avg)} <span class="small text-body-secondary">${avg.toFixed(1)} · ${count} review${count > 1 ? 's' : ''}</span>` : '';
  document.getElementById('pmPrice').textContent = formatPKR(p.price);
  document.getElementById('pmDesc').textContent = p.desc;
  document.getElementById('pmQty').value = 1;
  document.getElementById('pmAdd').dataset.addToCart = p.id;
  const list = reviews.forProduct(p.id);
  document.getElementById('pmReviews').innerHTML = list.length
    ? list.slice(0, 3).map(r => `<div class="p-2 rounded bg-porcelain">${starsHTML(r.rating)} <b class="ms-1">${escapeHTML(r.name)}</b><div>${escapeHTML(r.text)}</div></div>`).join('')
    : '<p class="text-body-secondary mb-0">No reviews yet. Bought this? Be the first to review it.</p>';
  modal.show();
}

document.addEventListener('click', e => {
  const trigger = e.target.closest('[data-view]');
  if (trigger) { e.preventDefault(); openProduct(trigger.dataset.view); }
});

modalEl.querySelectorAll('[data-step]').forEach(btn => btn.addEventListener('click', () => {
  const input = document.getElementById('pmQty');
  input.value = Math.max(1, Math.min(10, Number(input.value) + Number(btn.dataset.step)));
}));
document.getElementById('pmAdd').addEventListener('click', () => modal.hide());

/* ---------- reviews ---------- */
let reviewsShown = 4;

function renderReviews() {
  const all = reviews.all();
  const avg = all.reduce((s, r) => s + r.rating, 0) / all.length;
  document.getElementById('reviewSummary').innerHTML = `${starsHTML(avg)} <b class="ms-1">${avg.toFixed(1)}</b> out of 5 from ${all.length} reviews`;

  document.getElementById('reviewList').innerHTML = all.slice(0, reviewsShown).map(r => {
    const p = getProduct(r.productId);
    const date = new Date(r.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return `
      <div class="col">
        <figure class="card review-card h-100 p-4 mb-0">
          <div class="mb-2">${starsHTML(r.rating)}</div>
          <blockquote class="mb-3">${escapeHTML(r.text)}</blockquote>
          <figcaption class="d-flex align-items-center gap-2 mt-auto">
            <span class="avatar-initial">${escapeHTML(r.name.charAt(0))}</span>
            <span class="lh-sm"><b>${escapeHTML(r.name)}</b><br><small class="text-body-secondary">${escapeHTML(p.name)} · ${date}</small></span>
          </figcaption>
        </figure>
      </div>`;
  }).join('');
  document.getElementById('moreReviews').classList.toggle('d-none', reviewsShown >= all.length);
}

document.getElementById('moreReviews').addEventListener('click', () => { reviewsShown += 4; renderReviews(); });

// review form
const reviewForm = document.getElementById('reviewForm');
document.getElementById('reviewProduct').innerHTML =
  '<option value="">Choose a product</option>' + PRODUCTS.map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('');

function syncReviewLock() {
  const loggedIn = !!auth.current();
  document.getElementById('reviewLoginNote').classList.toggle('d-none', loggedIn);
  reviewForm.querySelectorAll('select, textarea, input, button').forEach(el => el.disabled = !loggedIn);
}

reviewForm.addEventListener('submit', e => {
  e.preventDefault();
  const user = auth.current();
  if (!user) return;
  const rating = reviewForm.querySelector('input[name="rating"]:checked');
  document.getElementById('ratingError').classList.toggle('d-block', !rating);
  reviewForm.classList.add('was-validated');
  if (!reviewForm.checkValidity() || !rating) return;

  reviews.add({
    productId: Number(document.getElementById('reviewProduct').value),
    name: user.name,
    rating: Number(rating.value),
    text: document.getElementById('reviewText').value.trim(),
    date: new Date().toISOString().slice(0, 10)
  });
  reviewForm.reset();
  reviewForm.classList.remove('was-validated');
  reviewsShown = Math.max(reviewsShown, 4);
  renderReviews();
  renderProducts();
  showToast('Thanks! Your review is posted.', 'bi-star-fill');
});

renderProducts();
renderReviews();
syncReviewLock();
document.addEventListener('kg:auth', syncReviewLock);
