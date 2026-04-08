import { escape } from "@std/html/entities";

export function dashboardView({
  totalTransactions,
  totalIncome,
  totalExpenses,
  balance,
  recentTransactions,
}) {
  return `
  <section aria-labelledby="dash-section">

  <h2 id="dash-section">Your Dashboard</h2>
    <h3> Welcome! This is your financial journaling web app </h3>
    <p> Track your spending and income in one place, reflect on your financial habits. And stay mindful of your financial decisions. </p> 
    </section>

  <section class="dashboard-summary">
    <article class="summary-card">
    <h3>Total Transactions</h3>
    <p>${totalTransactions}</p>
  </article>

  <article class="summary-card">
    <h3>Total Income</h3>
    <p>£${totalIncome.toFixed(2)}</p>
  </article>

  <article class="summary-card">
    <h3>Total Expenses</h3>
    <p>£${totalExpenses.toFixed(2)}</p>
  </article>

  <article class="summary-card">
    <h3>Balance</h3>
    <p>£${balance.toFixed(2)}</p>
  </article>
</section>

<section class="dashboard-recent">
  <h3>Recent Transactions</h3>
  <ul>
    ${
    recentTransactions.map((tx) => `
      <li>
        <strong>${escape(tx.journal_entry)}</strong> — £${
      Number(tx.amount).toFixed(2)
    }
      </li>
    `).join("")
  }
  </ul>
  <a href="/transactions">View all transactions</a>
</section>

<section class="dashboard-reflection">
  <h3>Reflection</h3>
  <p>Your spending tells a story. Take a moment to notice patterns, moods, and habits.</p>
</section>
      `;
}
