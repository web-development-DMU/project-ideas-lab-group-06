import { maxLength, minLength, required } from "../validation.js";

//for registration form validation
export const userSchema = {
  name: {
    displayName: "Name",
    validators: [required, minLength(2), maxLength(50)],
  },
  email: {
    displayName: "Email",
    validators: [required, minLength(5), maxLength(100)],
  },
  username: {
    displayName: "Username",
    validators: [required, minLength(3), maxLength(20)],
  },
  password: {
    displayName: "Password",
    validators: [required, minLength(12)],
  },
};
