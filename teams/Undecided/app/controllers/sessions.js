import render from "../render.js";
import redirect from "../redirect.js";
import { loginFormView } from "../views/auth.js";
import { loginSchema } from "../schema/login.js";
import { validateSchema } from "../validation.js";
import { createSession, deleteSession } from "../models/sessions.js";
import { getUserByUsername } from "../models/users.js";
import { getCookies } from "@std/http/cookie";
import { getUserFromSession } from "../models/sessions.js";

export function loginFormController({ request }) {
  const cookies = getCookies(request.headers);
  const sessionId = cookies.sessionId;
  const user = getUserFromSession(sessionId);

  return render(loginFormView, { user }, request);
}

export async function addSessionController({ request }) {
  const formData = await request.formData();

  const { isValid, errors, validated } = validateSchema(
    formData,
    loginSchema,
  );

  if (!isValid) {
    return render(loginFormView, { errors }, request, 400);
  }

  const user = getUserByUsername(validated.username);

  if (!user || user.hashedPassword !== validated.password) {
    return render(
      loginFormView,
      { errors: { password: { message: "Invalid credentials", error: true } } },
      request,
      400,
    );
  }

  const sessionId = crypto.randomUUID(); // Generates a unique session ID
  createSession(sessionId, user.user_id);

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `sessionId=${sessionId}; HttpOnly; Path=/`,
  );

  return redirect(headers, "/", "Login successful!");
}

export function logoutController({ request }) {
  const cookies = getCookies(request.headers);
  const sessionId = cookies.sessionId;

  const headers = new Headers();

  if (sessionId) {
    deleteSession(sessionId);
  }

  headers.append(
    "Set-Cookie",
    "sessionId=; Max-Age=0; Path=/; HttpOnly",
  );

  return redirect(headers, "/login", "Logged out successfully!");
}
