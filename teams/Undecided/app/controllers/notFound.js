import render from "../render.js"; // Importing the render function to render views
import { notFoundView } from "../views/notFound.js"; // Importing the view for not found page

export function notFoundController() {
  return render(notFoundView, {}, 404); //pass 404 status code to indicate not found, {}doesnt require any data
}
