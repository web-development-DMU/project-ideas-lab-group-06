import { db } from "../db.js";

export function gettransactions() {
  return db.prepare("SELECT * FROM transactions").all();
}
