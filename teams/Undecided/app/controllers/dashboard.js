import render from "../render.js";
import { getTransactionsByUserId } from "../models/transactions.js";
import { dashboardView } from "../views/dashboard.js";

export function dashboardController({ request, user }) {
  const transactions = getTransactionsByUserId(user.user_id);

  const totalTransactions = transactions.length;
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const balance = totalIncome - totalExpenses;
  const recentTransactions = transactions.slice(-5).reverse();

  return render(
    dashboardView,
    {
      totalTransactions,
      totalIncome,
      totalExpenses,
      balance,
      recentTransactions,
      user,
    },
    request,
  );
}
