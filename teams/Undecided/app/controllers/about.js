import render from "../render.js";
import { aboutView } from "../views/dashbaord.js";

export function aboutController() {
  return render(aboutView);
}
