/* Signup and login pages */

// Where to go after logging in, e.g. login.html?next=checkout.html
const next = new URLSearchParams(location.search).get('next');
const safeNext = next && /^[\w-]+\.html(#[\w-]+)?$/.test(next) ? next : 'index.html';

// carry ?next across the "Log in" / "Sign up" switch links
['toLogin', 'toSignup'].forEach(id => {
  const link = document.getElementById(id);
  if (link && next) link.href += '?next=' + encodeURIComponent(next);
});

function showError(msg) {
  const box = document.getElementById('formError');
  box.textContent = msg;
  box.classList.remove('d-none');
}

/* ---------- SIGNUP ---------- */
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  const pw = document.getElementById('password');
  const confirm = document.getElementById('confirm');
  const bar = document.getElementById('strengthBar');
  const text = document.getElementById('strengthText');

  pw.addEventListener('input', () => {
    const v = pw.value;
    let score = 0;
    if (v.length >= 6) score++;
    if (v.length >= 10) score++;
    if (/\d/.test(v)) score++;
    if (/[A-Z]/.test(v) && /[^\w]/.test(v)) score++;
    const levels = [
      ['0%', 'bg-danger', 'Use 6 or more characters with a number.'],
      ['25%', 'bg-danger', 'Weak: add more characters.'],
      ['50%', 'bg-warning', 'Okay: add a number or symbol.'],
      ['75%', 'bg-info', 'Good password.'],
      ['100%', 'bg-success', 'Strong password.']
    ];
    const [w, cls, msg] = levels[score];
    bar.style.width = w;
    bar.className = 'progress-bar ' + cls;
    text.textContent = msg;
  });

  const checkMatch = () => confirm.setCustomValidity(confirm.value && confirm.value !== pw.value ? 'mismatch' : '');
  pw.addEventListener('input', checkMatch);
  confirm.addEventListener('input', checkMatch);

  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    checkMatch();
    signupForm.classList.add('was-validated');
    if (!signupForm.checkValidity()) return;

    const result = auth.signup(
      document.getElementById('name').value.trim(),
      document.getElementById('email').value.trim().toLowerCase(),
      pw.value
    );
    if (!result.ok) return showError(result.error);
    location.href = safeNext;
  });
}

/* ---------- LOGIN ---------- */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  if (next === 'checkout.html') document.getElementById('nextNote').classList.remove('d-none');

  document.getElementById('showPw').addEventListener('change', e => {
    document.getElementById('password').type = e.target.checked ? 'text' : 'password';
  });

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    loginForm.classList.add('was-validated');
    if (!loginForm.checkValidity()) return;

    const result = auth.login(
      document.getElementById('email').value.trim().toLowerCase(),
      document.getElementById('password').value
    );
    if (!result.ok) return showError(result.error);
    location.href = safeNext;
  });
}

// Already logged in? Skip the form.
if (auth.current() && (signupForm || loginForm)) location.replace(safeNext);
