/* Cart page: display the cart, change quantities, remove items */

const list = document.getElementById('cartItems');

function renderCart() {
  const items = cart.items();
  document.getElementById('emptyCart').classList.toggle('d-none', items.length > 0);
  document.getElementById('cartArea').classList.toggle('d-none', items.length === 0);
  if (!items.length) return;

  const count = cart.count();
  document.getElementById('itemCount').textContent = `${count} item${count > 1 ? 's' : ''}`;

  list.innerHTML = items.map(({ id, qty }) => {
    const p = getProduct(id);
    return `
      <li class="list-group-item py-3" data-id="${id}">
        <div class="d-flex gap-3 align-items-center flex-wrap flex-sm-nowrap">
          <img src="${p.img}" alt="${escapeHTML(p.name)}" class="cart-thumb border">
          <div class="flex-grow-1">
            <h3 class="h6 mb-1">${escapeHTML(p.name)}</h3>
            <p class="small text-body-secondary mb-2">${escapeHTML(p.origin)} · ${formatPKR(p.price)} each</p>
            <button class="btn btn-sm btn-link link-danger text-decoration-none p-0" data-remove><i class="bi bi-x-lg"></i> Remove</button>
          </div>
          <div class="input-group input-group-sm qty-group">
            <button class="btn btn-outline-ink" data-step="-1" aria-label="Decrease quantity" ${qty <= 1 ? 'disabled' : ''}>−</button>
            <input type="number" class="form-control" value="${qty}" min="1" max="10" aria-label="Quantity of ${escapeHTML(p.name)}" data-qty>
            <button class="btn btn-outline-ink" data-step="1" aria-label="Increase quantity" ${qty >= 10 ? 'disabled' : ''}>+</button>
          </div>
          <div class="price text-end" style="min-width: 110px;">${formatPKR(p.price * qty)}</div>
        </div>
      </li>`;
  }).join('');

  const { subtotal, shipping, total } = cart.totals();
  document.getElementById('subtotal').textContent = formatPKR(subtotal);
  document.getElementById('shipping').textContent = shipping ? formatPKR(shipping) : 'Free';
  document.getElementById('total').textContent = formatPKR(total);

  const remaining = FREE_SHIPPING_FROM - subtotal;
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);
  document.getElementById('shipNote').innerHTML = `
    <p class="mb-1">${remaining > 0 ? `Add <b>${formatPKR(remaining)}</b> more for free delivery.` : '<i class="bi bi-truck text-glaze"></i> You get <b>free delivery</b>.'}</p>
    <div class="progress" style="height: 6px;" role="progressbar" aria-label="Progress to free delivery" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar" style="width: ${pct}%; background: var(--kg-glaze);"></div>
    </div>`;
}

// +/- buttons and remove
list.addEventListener('click', e => {
  const row = e.target.closest('[data-id]');
  if (!row) return;
  const id = Number(row.dataset.id);
  const step = e.target.closest('[data-step]');
  if (step) {
    const current = cart.items().find(i => i.id === id).qty;
    cart.setQty(id, current + Number(step.dataset.step));
    renderCart();
  }
  if (e.target.closest('[data-remove]')) {
    const name = getProduct(id).name;
    cart.remove(id);
    renderCart();
    showToast(`Removed <b>${escapeHTML(name)}</b> from your cart.`, 'bi-trash3');
  }
});

// typing a quantity directly
list.addEventListener('change', e => {
  if (!e.target.matches('[data-qty]')) return;
  cart.setQty(Number(e.target.closest('[data-id]').dataset.id), e.target.value);
  renderCart();
});

document.getElementById('confirmClear').addEventListener('click', () => {
  cart.clear();
  bootstrap.Modal.getInstance(document.getElementById('clearModal')).hide();
  renderCart();
});

renderCart();
