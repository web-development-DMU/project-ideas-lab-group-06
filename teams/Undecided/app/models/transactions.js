import { db } from "../db.js";

export function getTransactionsByUserId(userId) {
  return db.prepare(
    "SELECT * FROM transactions WHERE user_id = ?",
  ).all(userId);
  //for lists
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

export function getTransactionById(transactionId) {
  return db.prepare(
    "SELECT * FROM transactions WHERE transaction_id = ?",
  ).get(transactionId);
} //for details-> singe view transaction

export function deleteTransactionById(transactionId) {
  const result = db.prepare(
    "DELETE FROM transactions WHERE transaction_id = ?",
  ).run(transactionId);

  return result > 0; // returns true if a row was deleted
}
