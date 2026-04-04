import render from "../render.js";
//import { successfulTransactionView } from "../views/transactions.js";
import { gettransactions } from "../models/transactions.js";
import { allTransactionsView } from "../views/transactions.js";
import { displayTransactionView } from "../views/transactions.js";
import { transactionFormView } from "../views/transactions.js";
import { deleteTransactionView } from "../views/transactions.js"; // Importing necessary views and models for transactions
import { createTransaction } from "../models/transactions.js";

export function viewTransactionsController() {
  const transactions = gettransactions();
  console.log(transactions);
  return render(allTransactionsView, { transactions });
}
// This controller renders the view for displaying all transactions

export function displayTransactionFormController() {
  return render(transactionFormView, {});
}
// GET/ This controller renders the view for the transaction form to add a new transaction

//we will sort this out later.
export async function addTransactionController({ request }) {
  //const url = new URL(request.url);
  //const newTransaction = url.searchParams.get("new-transaction");
  const formData = await request.formData();

  const journal_entry = formData.get("journal_entry")?.trim();
  //const user_id = 1; // Placeholder for user ID, replace with actual user session handlin

  const amount = parseFloat(formData.get("amount"));
  const category = formData.get("category");
  const type = formData.get("type");
  const description = formData.get("description")?.trim();
  const transaction_date = formData.get("transaction_date");
  const mood = formData.get("mood");

  if (
    !journal_entry || journal_entry.length > 255 || isNaN(amount) ||
    amount <= 0 || !category || !type ||
    !description || description.length > 100 ||
    !transaction_date || !mood
  ) {
    const error = "Please enter all required fields correctly";
    return render(transactionFormView, { error }, 400);
  }

  await createTransaction({
    user_id: 1, // Replace with actual user session handling
    journal_entry,
    amount,
    category,
    description,
    type,
    transaction_date,
    mood,
  });

  // then redirect after submission instead of rendering, cant have dubpilcate transactions/POST resubmits
  return new Response(null, {
    status: 303,
    headers: { location: "/transactions" },
  });
}
// POST/ This controller handles the submission of the transaction into the database and renders a confirmation view (placeholder implementation)

export function displayTransactionController() {
  return render(displayTransactionView, {});
}
// This controller renders the view for displaying details of a specific transaction

/*export function successfulTransactionController() {
  return render(successfulTransactionView, {});
}
// This controller renders the view for confirming a successful transaction addition (placeholder implementation)
*/
export function deleteTransactionController() {
  return render(deleteTransactionView, {});
}
// This controller handles the deletion of a transaction (placeholder implementation)
