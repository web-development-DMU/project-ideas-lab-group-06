import { db } from "../db.js";

export function createSession(sessionId, userId) {
  db.prepare(
    "INSERT INTO sessions (id, user_id) VALUES (?, ?)",
  )
    .run(sessionId, userId);
}

export function getUserFromSession(sessionId) {
  return db.prepare(
    "SELECT users.* FROM sessions JOIN users ON sessions.user_id = users.user_id WHERE sessions.id = ? ",
  )
    .get(sessionId);
}

export function deleteSession(sessionId) {
  return db.prepare(
    "DELETE FROM sessions WHERE id = ?",
  )
    .run(sessionId);
}
