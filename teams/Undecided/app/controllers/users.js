import render from "../render.js";
import { registrationFormView } from "../views/auth.js";
import redirect from "../redirect.js";
import { validateSchema } from "../validation.js";
import { userSchema } from "../schema/user.js";
import { createSession, getUserFromSession } from "../models/sessions.js";
import { createUser, getUserByUsername } from "../models/users.js";
import { getCookies } from "@std/http/cookie";

export function registrationFormController({ request }) {
  const cookies = getCookies(request.headers);
  const sessionId = cookies.sessionId;
  const user = getUserFromSession(sessionId);

  return render(registrationFormView, { user }, request);
}

export async function addUserController({ request }) {
  const cookies = getCookies(request.headers);
  const sessionId = cookies.sessionId;
  const currentUser = getUserFromSession(sessionId);

  const formData = await request.formData();
  const { isValid, errors, validated } = validateSchema(formData, userSchema);

  if (!isValid) {
    return render(
      registrationFormView,
      { errors, user: currentUser },
      request,
      400,
    );
  }

  try {
    await createUser(validated);
  } catch (error) {
    const message = String(error.message || error);

    if (message.includes("users.username")) {
      return render(
        registrationFormView,
        {
          user: currentUser,
          errors: {
            name: {
              value: validated.name,
              message: "",
              error: false,
            },
            email: {
              value: validated.email,
              message: "",
              error: false,
            },
            username: {
              value: validated.username,
              message: "Username already exists.",
              error: true,
            },
            password: {
              value: "",
              message: "",
              error: false,
            },
          },
        },
        request,
        400,
      );
    }

    if (message.includes("users.email")) {
      return render(
        registrationFormView,
        {
          user: currentUser,
          errors: {
            name: {
              value: validated.name,
              message: "",
              error: false,
            },
            email: {
              value: validated.email,
              message: "Email already exists.",
              error: true,
            },
            username: {
              value: validated.username,
              message: "",
              error: false,
            },
            password: {
              value: "",
              message: "",
              error: false,
            },
          },
        },
        request,
        400,
      );
    }

    throw error;
  }

  const user = getUserByUsername(validated.username);

  if (!user) {
    const headers = new Headers();
    return redirect(
      headers,
      "/register",
      "User creation failed. Please try again.",
    );
  }

  const newSessionId = crypto.randomUUID();
  createSession(newSessionId, user.user_id);

  const headers = new Headers();
  headers.append("Set-Cookie", `sessionId=${newSessionId}; HttpOnly; Path=/`);

  return redirect(headers, "/", `user '${validated.username}' created`);
}
