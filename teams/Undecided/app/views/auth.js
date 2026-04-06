import { fragments } from "../errors.js";

export function loginFormView({ errors = { username: {}, password: {} } }) {
  const { username, password, confirm } = fragments(errors);

  return `
<section aria-labelledby="login-heading" class="center">
    <h2 id="login-heading">Sign in to your account</h2>
    <p>Don't have an account? <a href="/register">Sign up here</a></p>
    <form method= "POST" class="auth"> 

      <label for ="username">Username: </label>
      <input id ="username" name="username" ${username.value} required minlength="8">
      ${username.message}

      <label for ="password">Password: </label>
      <input id ="password" name="password" type="password" ${password.value} required minlength="12">
      ${password.message}

      <button> Sign in</button>
    </form>
</section>
 `;
}

export function registrationFormView(
  { errors = { username: {}, password: {}, name: {}, confirm: {} } },
) {
  const { name, username, password } = fragments(errors);

  return `
<section aria-labelledby="register-heading" class="center">
    <h2 id="register-heading">Create an account</h2>
    <p>Already have an account? <a href="/login">Sign in here</a></p>
    <form method= "POST" class="auth"> 

      <label for="name">Name: </label>
      <input id="name" name="name" ${name.value} required minlength="2">
      ${name.message}

      <label for="username">Username: </label>
      <input id="username" name="username" ${username.value} required minlength="8">
      ${username.message}

      <label for="password">Password: </label>
      <input id="password" name="password" type="password" ${password.value} required minlength="12">
      ${password.message}

      <label for="confirm">Confirm password: </label>
      <input id="confirm" name="confirm" type="password" ${
    confirm.value ?? ""
  } required minlength="12">
      ${confirm.message ?? ""}

      <button type="submit"> Sign up</button>

    </form>
    <script type ="module" src="/assets/js/confirmPassword.js"></script>
</section>
`;
}
