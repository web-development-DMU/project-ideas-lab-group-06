import { getCookies } from "@std/http/cookie";
import { getUserFromSession } from "../models/sessions.js";
import redirect from "../redirect.js";

export function requireAuth(request) {
  const cookies = getCookies(request.headers);
  const sessionId = cookies.sessionId;
  const user = getUserFromSession(sessionId);

  if (!user) {
    const headers = new Headers();
    return {
      redirect: redirect(headers, "/login", "Please log in first."),
    };
  }

  return { user };
}
