import render from "../render.js";
//import { successfulTransactionView } from "../views/transactions.js";
import { gettransactions } from "../models/transactions.js";
import { allTransactionsView } from "../views/transactions.js";
import { displayTransactionView } from "../views/transactions.js";
import { transactionFormView } from "../views/transactions.js";
import { deleteTransactionView } from "../views/transactions.js";
import { createTransaction } from "../models/transactions.js";
//import { setFlash } from "../flash.js";
import redirect from "../redirect.js";

export function viewTransactionsController({ request }) {
  const transactions = gettransactions();
  //console.log(transactions); -> for debugging purposes to check if transactions are being retrieved correctly, dont need it, remove later
  return render(allTransactionsView, { transactions }, request);
}
// This controller renders the view for displaying all transactions

export function displayTransactionFormController({ request }) {
  return render(transactionFormView, {}, request);
}
// GET/ This controller renders the view for the transaction form to add a new transaction
//it is compeletely separate from the addTransactionController, which handles the POST request when the form is submitted.
//This separation allows for better organization and clarity in handling different HTTP methods and their corresponding views and logic.

//we will sort this out later.
export async function addTransactionController({ request }) {
  const formData = await request.formData();
  //const user_Id = 1; // Replace with actual user session handling
  const journal_entry = formData.get("journal_entry")?.trim();
  const amount = parseFloat(formData.get("amount") || "");
  const category = formData.get("category");
  const type = formData.get("type");
  const description = formData.get("description")?.trim();
  const transaction_date = formData.get("transaction_date");
  const mood = formData.get("mood");

  if (
    !journal_entry || journal_entry.length > 255 || isNaN(amount) ||
    amount <= 0 || !category || !type ||
    !description || description.length > 100 ||
    !transaction_date
  ) {
    //removed section here btw
    const error = "Invalid input. Please check your entries and try again.";
    return render(transactionFormView, { error }, request, 400);
  }

  const newTransaction = {
    user_id: 1, // Replace with actual user session handling
    journal_entry,
    amount,
    category,
    description,
    type,
    transaction_date,
    mood,
  };
  await createTransaction(newTransaction); // then redirect after submission instead of rendering, cant have dubpilcate transactions/POST resubmits
  const headers = new Headers();
  return redirect(headers, "/transactions", "Transaction added successfully!");
}
// POST/ This controller handles the submission of the transaction form, validates the input, creates a new transaction, and redirects to the transactions view with a success message.

// POST/ This controller handles the submission of the transaction into the database and renders a confirmation view (placeholder implementation)

//these two are not complete yet, just placeholders for now, we will work on them later.
export function displayTransactionController({ request }) {
  return render(displayTransactionView, {}, request);
}
// This controller renders the view for displaying details of a specific transaction

export function deleteTransactionController({ request }) {
  return render(deleteTransactionView, {}, request);
}
// This controller handles the deletion of a transaction (placeholder implementation)
