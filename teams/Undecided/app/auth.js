const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const form = document.querySelector("form");

function showError(message) {
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
  if (!confirmInput) return;
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

if (passwordInput && confirmInput && form) {
  confirmInput.addEventListener("input", checkPasswords);
  passwordInput.addEventListener("input", checkPasswords);

  form.addEventListener("submit", (e) => {
    if (passwordInput.value !== confirmInput.value) {
      e.preventDefault();
      showError("Passwords do not match");
    }
  });
}
