import render from "../render.js";
import { dashbaordView } from "../views/dashbaord.js";

export function homeController() {
  return render(dashbaordView);
}
