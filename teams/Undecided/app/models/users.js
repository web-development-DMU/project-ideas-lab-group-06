import { db } from "../db.js";

export function createUser({ username, email, password }) {
  //create the user in the database here
  return db.prepare(
    "INSERT INTO users (username, email, hashedPassword) VALUES (?, ?, ?)",
  )
    .run(username, email, password);
}

export function getUserByUsername(username) {
  //get the user from the database here
  return db.prepare(
    "SELECT * FROM users WHERE username = ?",
  )
    .get(username);
}
