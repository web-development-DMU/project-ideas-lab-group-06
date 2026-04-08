import { required } from "../validation.js";
// for login form validation
export const loginSchema = {
  username: {
    displayName: "Username",
    validators: [required],
  },
  password: {
    displayName: "Password",
    validators: [required],
  },
};
