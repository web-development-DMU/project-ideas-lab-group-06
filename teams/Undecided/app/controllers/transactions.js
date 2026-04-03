import render from "../render.js";

import { addTransactionView } from "../views/transactions.js";
import { gettransactions } from "../models/transactions.js";
import { transactionsView } from "../views/transactions.js";
import { displayTransactionView } from "../views/transactions.js";
import { transactionFormView } from "../views/transactions.js";
import { deleteTransactionView } from "../views/transactions.js"; // Importing necessary views and models for transactions

export function viewTransactionsController() {
  const transactions = gettransactions();
  console.log(transactions);
  return render(transactionsView, { transactions });
}
// This controller renders the view for displaying all transactions

export function displayTransactionFormController() {
  return render(transactionFormView, {});
}
// GET/ This controller renders the view for the transaction form to add a new transaction

//we will sort this out later.
export async function addTransactionController() {
  const formData = await request.formData();
  const description = formData.get("description");
  const amount = parseFloat(formData.get("amount"));

  if (isNaN(amount) || amount <= 0 || !description) {
    return render(addTransactionView, {
      errors: { message: "Enter a valid amount and description" },
    }, request);
  }

  await createTransaction({ description, amount });

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

export function deleteTransactionController() {
  return render(deleteTransactionView, {});
}
// This controller handles the deletion of a transaction (placeholder implementation)
