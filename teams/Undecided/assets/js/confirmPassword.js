const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const form = document.querySelector("form");

const loginToggle = document.getElementById("toggleLoginPassword");
const registrationToggle = document.getElementById(
  "toggleRegistrationPassword",
);
const toggle = loginToggle || registrationToggle;

// show/hide password
if (toggle && passwordInput) {
  toggle.addEventListener("change", () => {
    const type = toggle.checked ? "text" : "password";

    passwordInput.type = type;

    if (confirmInput) {
      confirmInput.type = type;
    }
  });
}

// register-page password match validation
function showError(message) {
  if (!confirmInput) return;

  let error = document.getElementById("confirm-error");

  if (!error) {
    error = document.createElement("p");
    error.id = "confirm-error";
    error.className = "error";
    confirmInput.insertAdjacentElement("afterend", error);
  }

  error.textContent = message;
}

function clearError() {
  const error = document.getElementById("confirm-error");
  if (error) error.remove();
}

function checkPasswords() {
  if (!passwordInput || !confirmInput) return;

  if (confirmInput.value === "") {
    clearError();
    return;
  }

  if (passwordInput.value !== confirmInput.value) {
    showError("Passwords do not match");
  } else {
    clearError();
  }
}

if (passwordInput && confirmInput) {
  confirmInput.addEventListener("input", checkPasswords);
  passwordInput.addEventListener("input", checkPasswords);
}

if (form && passwordInput && confirmInput) {
  form.addEventListener("submit", (e) => {
    if (passwordInput.value !== confirmInput.value) {
      e.preventDefault();
      showError("Passwords do not match");
    }
  });
}
