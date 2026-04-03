import { db } from "../db.js";

export function gettransactions() {
  return db.prepare("SELECT * FROM transactions").all();
}

export function createTransaction(
  {
    user_id,
    journal_entry,
    amount,
    category,
    type,
    description,
    transaction_date,
    mood,
  },
) {
  return db.prepare(
    `INSERT INTO transactions (user_id, journal_entry, amount, category, type, description, transaction_date, mood) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    user_id,
    journal_entry,
    amount,
    category,
    type,
    description,
    transaction_date,
    mood,
  );
}
