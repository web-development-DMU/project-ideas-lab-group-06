import render from "../render.js"; // Importing the render function to render views
import { notFoundView } from "../views/notFound.js"; // Importing the view for not found page
import { getCookies } from "@std/http/cookie"; // Importing function to get cookies from request headers
import { getUserFromSession } from "../models/sessions.js"; // Importing function to get user information from session

export function notFoundController({ request }) {
  const cookies = getCookies(request.headers);
  const sessionId = cookies.sessionId;
  const user = getUserFromSession(sessionId);

  return render(notFoundView, { user }, request, 404); //pass 404 status code to indicate not found, {}doesnt require any data
}
