import { fragments } from "../errors.js";

export function loginFormView({ errors = { username: {}, password: {} } }) {
  const {
    username = { value: "", message: "" },
    password = { value: "", message: "" },
  } = fragments(errors);

  return `
<section aria-labelledby="login-heading" class="center">
<div class="auth-container">
  <div class="auth-text">
    <h2 id="login-heading">Sign in to your account</h2>
    <p>Don't have an account? <a href="/register">Sign up here</a></p>
  </div>

  <div class="auth-form">
  <div class="auth">
    <form method= "POST">

      <label for="username">Username: </label>
      <input id="username" name="username" value="${username.value}" required minlength="8">
      ${username.message}

      <label for="password">Password: </label>
      <input id="password" name="password" type="password" value="${password.value}" required minlength="12">
      ${password.message}

      <label class="toggle-row">
      <input type="checkbox" id="toggleLoginPassword">
      Show password
      </label>

      <button type="submit">Sign in</button>
    </form>
    </div>
    </div>
    </div>
    <script type ="module" src="/assets/js/confirmPassword.js"></script>
</section>
 `;
}

export function registrationFormView(
  { errors = { username: {}, password: {}, name: {}, email: {}, confirm: {} } },
) {
  const {
    name = { value: "", message: "" },
    username = { value: "", message: "" },
    password = { value: "", message: "" },
    email = { value: "", message: "" },
    confirm = { value: "", message: "" },
  } = fragments(errors);
  return `
<section aria-labelledby="register-heading" class="center">
<div class="auth-container">
  <div class="auth-text">
    <h2 id="register-heading">Create an account</h2>
    <p>Already have an account? <a href="/login">Sign in here</a></p>
  </div>
  <div class="auth-form">
    <div class="auth">
    <form method= "POST">

      <label for="name">Name: </label>
      <input id="name" name="name"  value="${name.value}" required minlength="2">
      ${name.message}

      <label for="email">Email: </label>
      <input id="email" name="email" type="email" value="${email.value}" required>
      ${email.message}

      <label for="username">Username: </label>
      <input id="username" name="username" value="${username.value}" required minlength="8">
      ${username.message}

      <label for="password">Password: </label>
      <input id="password" name="password" type="password" value="${password.value}" required minlength="12">
      ${password.message}

      <label class="toggle-row">
      <input type="checkbox" id="toggleRegistrationPassword">
      Show password
      </label>

      <label for="confirm">Confirm password: </label>
      <input id="confirm" name="confirm" type="password" value="${confirm.value}" required minlength="12">
      ${confirm.message}


      <button type="submit">Sign up</button>
    </form>
    </div>
    </div>
    </div>
    <script type ="module" src="/assets/js/confirmPassword.js"></script>
</section>
`;
}
