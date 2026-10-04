/* Checkout page: requires login, validates the form, places the order */

const user = auth.current();
if (!user) location.replace('login.html?next=checkout.html');

const form = document.getElementById('checkoutForm');
const cardFields = document.getElementById('cardFields');
const cardCollapse = new bootstrap.Collapse(cardFields, { toggle: false });
const cardInputs = cardFields.querySelectorAll('input');

function renderSummary() {
  const items = cart.items();
  document.getElementById('emptyCheckout').classList.toggle('d-none', items.length > 0);
  document.getElementById('checkoutArea').classList.toggle('d-none', items.length === 0);
  if (!items.length) return;

  document.getElementById('summaryItems').innerHTML = items.map(({ id, qty }) => {
    const p = getProduct(id);
    return `
      <li class="list-group-item px-0 d-flex align-items-center gap-3">
        <span class="position-relative">
          <img src="${p.img}" alt="" class="rounded border" width="56" height="56">
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-dark">${qty}</span>
        </span>
        <span class="flex-grow-1 small fw-semibold">${escapeHTML(p.name)}</span>
        <span class="small">${formatPKR(p.price * qty)}</span>
      </li>`;
  }).join('');

  const { subtotal, shipping, total } = cart.totals();
  document.getElementById('coSubtotal').textContent = formatPKR(subtotal);
  document.getElementById('coShipping').textContent = shipping ? formatPKR(shipping) : 'Free';
  document.getElementById('coTotal').textContent = formatPKR(total);
}

// prefill contact details from the account
if (user) {
  document.getElementById('fullName').value = user.name;
  document.getElementById('coEmail').value = user.email;
}

// show card fields only when paying by card, and only require them then
document.querySelectorAll('input[name="pay"]').forEach(r => r.addEventListener('change', () => {
  const byCard = document.getElementById('payCard').checked;
  byCard ? cardCollapse.show() : cardCollapse.hide();
  cardInputs.forEach(i => i.required = byCard);
}));

// format card number as 4242 4242 4242 4242 and expiry as MM/YY while typing
document.getElementById('cardNumber').addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
});
document.getElementById('cardExp').addEventListener('input', e => {
  const d = e.target.value.replace(/\D/g, '').slice(0, 4);
  e.target.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
});

form.addEventListener('submit', e => {
  e.preventDefault();
  form.classList.add('was-validated');
  if (!form.checkValidity()) {
    form.querySelector(':invalid')?.focus();
    return;
  }

  const btn = document.getElementById('placeBtn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Placing order…';

  setTimeout(() => {
    const totals = cart.totals();
    const order = {
      id: 'KG-' + Date.now().toString().slice(-6),
      email: user.email,
      name: document.getElementById('fullName').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      address: `${document.getElementById('address').value.trim()}, ${document.getElementById('city').value} ${document.getElementById('postal').value}`,
      payment: document.querySelector('input[name="pay"]:checked').value,
      items: cart.items(),
      ...totals,
      date: new Date().toISOString()
    };
    store.set('kg_orders', [order, ...store.get('kg_orders', [])]);

    // confirmation screen
    document.getElementById('orderId').textContent = order.id;
    document.getElementById('doneName').textContent = order.name.split(' ')[0];
    document.getElementById('donePhone').textContent = order.phone;
    document.getElementById('donePay').textContent = '· ' + order.payment;
    document.getElementById('doneTotal').textContent = formatPKR(order.total);
    document.getElementById('doneItems').innerHTML = order.items.map(({ id, qty }) => {
      const p = getProduct(id);
      return `<li class="list-group-item d-flex justify-content-between small"><span>${qty} × ${escapeHTML(p.name)}</span><span>${formatPKR(p.price * qty)}</span></li>`;
    }).join('');

    cart.clear();
    document.getElementById('checkoutArea').classList.add('d-none');
    document.getElementById('orderDone').classList.remove('d-none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 900);
});

if (user) renderSummary();
