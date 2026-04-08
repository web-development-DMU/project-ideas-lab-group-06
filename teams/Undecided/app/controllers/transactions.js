import render from "../render.js";
import {
  allTransactionsView,
  displayTransactionView,
  transactionFormView,
} from "../views/transactions.js";
import { notFoundView } from "../views/notFound.js";
import {
  createTransaction,
  deleteTransactionById,
  getTransactionById,
  getTransactionsByUserId,
} from "../models/transactions.js";
import { transactionSchema } from "../schema/transaction.js";
import { validateSchema } from "../validation.js";
import redirect from "../redirect.js";

export function viewTransactionsController({ request, user }) {
  const transactions = getTransactionsByUserId(user.user_id);
  return render(allTransactionsView, { transactions, user }, request);
}

export function displayTransactionFormController({ request, user }) {
  return render(transactionFormView, { user }, request);
}

export function displayTransactionController({ request, user }) {
  const url = new URL(request.url);
  const transactionId = Number(url.searchParams.get("id"));
  const transaction = getTransactionById(transactionId);

  if (!transaction || transaction.user_id !== user.user_id) {
    return render(notFoundView, { user }, request, 404);
  }

  return render(displayTransactionView, { transaction, user }, request);
}

export async function addTransactionController({ request, user }) {
  const formData = await request.formData();
  const { isValid, errors, validated } = validateSchema(
    formData,
    transactionSchema,
  );

  const amount = parseFloat(validated.amount ?? "");

  if (!isValid || isNaN(amount) || amount <= 0) {
    return render(transactionFormView, { errors, user }, request, 400);
  }

  const newTransaction = {
    user_id: user.user_id,
    journal_entry: validated.journal_entry.trim(),
    amount,
    category: validated.category,
    description: validated.description.trim(),
    type: validated.type,
    transaction_date: validated.transaction_date,
    mood: validated.mood,
  };

  await createTransaction(newTransaction);

  const headers = new Headers();
  return redirect(headers, "/transactions", "Transaction added successfully!");
}

export async function deleteTransactionController({ request, user }) {
  const formData = await request.formData();
  const transactionId = Number(formData.get("id"));
  const headers = new Headers();

  if (!transactionId) {
    return redirect(headers, "/transactions", "Invalid transaction ID.");
  }

  const transaction = getTransactionById(transactionId);

  if (!transaction || transaction.user_id !== user.user_id) {
    return redirect(
      headers,
      "/transactions",
      "Transaction not found or access denied.",
    );
  }

  const success = deleteTransactionById(transactionId);

  if (!success) {
    return redirect(
      headers,
      "/transactions",
      "Transaction not found for deletion.",
    );
  }

  return redirect(
    headers,
    "/transactions",
    "Transaction deleted successfully!",
  );
}
