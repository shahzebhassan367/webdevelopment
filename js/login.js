document.addEventListener('DOMContentLoaded', () => {
  // already signed in, skip the login screen
  if (currentUser()) {
    window.location.replace('home.html');
    return;
  }

  const form = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const alertBox = document.getElementById('loginAlert');
  const loginBtn = document.getElementById('loginBtn');
  const spinner = document.getElementById('loginSpinner');

  function setFieldError(input, message) {
    input.classList.toggle('is-invalid', !!message);
    document.getElementById(`${input.id}Error`).textContent = message || '';
  }

  function showAlert(message) {
    document.getElementById('loginAlertText').textContent = message;
    alertBox.classList.remove('d-none');
  }

  function validate() {
    let valid = true;
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username) {
      setFieldError(usernameInput, 'Please enter your username.');
      valid = false;
    } else if (username.length < 3) {
      setFieldError(usernameInput, 'Username must be at least 3 characters.');
      valid = false;
    } else {
      setFieldError(usernameInput, '');
    }

    if (!password) {
      setFieldError(passwordInput, 'Please enter your password.');
      valid = false;
    } else if (password.length < 4) {
      setFieldError(passwordInput, 'Password must be at least 4 characters.');
      valid = false;
    } else {
      setFieldError(passwordInput, '');
    }
    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alertBox.classList.add('d-none');
    if (!validate()) return;

    loginBtn.disabled = true;
    spinner.classList.remove('d-none');

    // pretend we're waiting on the server
    setTimeout(() => {
      const result = login(usernameInput.value, passwordInput.value);
      loginBtn.disabled = false;
      spinner.classList.add('d-none');

      if (!result.ok) {
        setFieldError(result.field === 'username' ? usernameInput : passwordInput, result.error);
        showAlert('Sign in failed. Check your details and try again.');
        return;
      }
      window.location.href = 'home.html';
    }, 600);
  });

  [usernameInput, passwordInput].forEach((input) => {
    input.addEventListener('input', () => setFieldError(input, ''));
  });

  document.getElementById('togglePassword').addEventListener('click', (e) => {
    const showing = passwordInput.type === 'text';
    passwordInput.type = showing ? 'password' : 'text';
    e.currentTarget.innerHTML = `<i class="bi ${showing ? 'bi-eye' : 'bi-eye-slash'}"></i>`;
  });

  document.getElementById('demoAccounts').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-user]');
    if (!btn) return;
    usernameInput.value = btn.dataset.user;
    passwordInput.value = btn.dataset.pass;
    setFieldError(usernameInput, '');
    setFieldError(passwordInput, '');
  });

  document.getElementById('resetData').addEventListener('click', (e) => {
    e.preventDefault();
    resetDemoData();
    showToast('Demo data has been reset.', 'info');
  });
});
