import render from "../render.js";
import { aboutView } from "../views/about.js";
import { getCookies } from "@std/http/cookie"; //added
import { getUserFromSession } from "../models/sessions.js"; //added

export function aboutController({ request }) {
  const cookies = getCookies(request.headers);
  const sessionId = cookies.sessionId;
  const user = getUserFromSession(sessionId);

  return render(aboutView, { user }, request);
}
