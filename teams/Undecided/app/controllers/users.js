import render from "../render.js";
import { registrationFormView } from "../views/auth.js";

import redirect from "../redirect.js";
import { validateSchema } from "../validation.js";

import { userSchema } from "../schema/user.js";
import { createUser } from "../models/users.js";
import { login } from "../models/sessions.js";

export function registrationFormController({ request }) {
  return render(registrationFormView, {}, request);
}

export async function addUserController({ request }) {
  const formData = await request.formData();

  const { isValid, errors, validated } = validateSchema(formData, userSchema);
  if (!isValid) {
    return render(registrationFormView, { errors }, request, 400);
  }
  await createUser(validated);
  const headers = new Headers();
  login(headers, validated.username);
  return redirect(headers, "/", `user '${validated.username}' created`);
}
