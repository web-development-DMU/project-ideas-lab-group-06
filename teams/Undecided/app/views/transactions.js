import { escape } from "@std/html/entities";

export function allTransactionsView({ transactions }) {
  const rowsTransactions = transactions
    .map(
      (tx) =>
        `<tr> 
          <td>${escape(tx.journal_entry)}</td>
          <td>£${Number(tx.amount).toFixed(2)}</td>
          <td>${escape(tx.category)}</td>
          <td>${escape(tx.type)}</td>
          <td>${escape(tx.description)}</td>
          <td>${escape(tx.mood ?? "")}</td>
          <td>
            <a href="/transaction?id=${tx.transaction_id}">View</a>
          </td>
          <td>
            <form method="POST" action="/transactions/delete">
              <input type="hidden" name="id" value="${tx.transaction_id}">
              <button type="submit">Delete</button>
            </form>
          </td>
        </tr>`,
    )
    .join("\n");

  return `
<section aria-label="transactions-section">
  <div class="transaction-actions">
    <div class="transaction-header-text">
      <h2>Your Transactions</h2>
      <p>Here you can view all your transactions in one place.</p>
    </div>

    <a href="/transactions/new" class="action-button">Add Transaction</a>
  </div>

  <table>
    <thead>
      <tr>
        <th>Journal Entry</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Type</th>
        <th>Description</th>
        <th>Mood</th>
        <th>View</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      ${rowsTransactions}
    </tbody>
  </table>
</section>
`;
}

export function transactionFormView({ error }) {
  const errorMessage = error ? `<p class="error">${escape(error)}</p>` : "";

  return `
<section>
  <h2>Add Transaction</h2>
  ${errorMessage}

  <form method="POST" action="/transactions">
    <p>Add a transaction here.</p>

    <label for="journal_entry">Journal Entry:</label>
    <input
      type="text"
      id="journal_entry"
      name="journal_entry"
      maxlength="255"
      placeholder="Journal Entry"
      required
    >

    <label for="amount">Amount:(£)</label>
    <input
      type="number"
      id="amount"
      name="amount"
      step="0.01"
      placeholder="0.00"
      required
    >

    <label for="category">Category:</label>
    <select id="category" name="category" required>
      <option value="">Select Category</option>
      <option value="Food">Food</option>
      <option value="Transportation">Transportation</option>
      <option value="Housing">Housing</option>
      <option value="Phone Bills">Phone Bills</option>
      <option value="Health and Wellness">Health and Wellness</option>
      <option value="Education">Education</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Debt Payments">Debt Payments</option>
      <option value="Pets">Pets</option>
    </select>

    <label for="transaction_date">Date:</label>
    <input type="date" id="transaction_date" name="transaction_date" required>

    <fieldset>
      <legend>Is this income or expense?</legend>

      <label for="type-income">
        <input type="radio" id="type-income" name="type" value="income" required>
        Income
      </label>

      <label for="type-expense">
        <input type="radio" id="type-expense" name="type" value="expense" required>
        Expense
      </label>
    </fieldset>

    <label for="description">Transaction Description:</label>
    <textarea
      id="description"
      name="description"
      maxlength="100"
      placeholder="An apple a day keeps the doctor away"
      required
    ></textarea>

    <label for="mood">Mood:</label>
    <select id="mood" name="mood">
      <option value="">Select Mood</option>
      <option value="Happy">Happy</option>
      <option value="Content">Content</option>
      <option value="Stressed">Stressed</option>
      <option value="Neutral">Neutral</option>
      <option value="Sad">Sad</option>
      <option value="Anxious">Anxious</option>
      <option value="Excited">Excited</option>
      <option value="Frustrated">Frustrated</option>
    </select>

    <button type="submit">Add Transaction</button>
  </form>
</section>
`;
}

export function displayTransactionView({ transaction }) {
  return `
<section class="transaction-detail-page">
  <div class="transaction-detail-card">
    <h2>Transaction Details</h2>
    <p>Details of the selected transaction are displayed here.</p>

    <dl class="transaction-detail-list">
      <div class="detail-row">
        <dt>Journal Entry</dt>
        <dd>${escape(transaction.journal_entry)}</dd>
      </div>

      <div class="detail-row">
        <dt>Amount</dt>
        <dd>£${Number(transaction.amount).toFixed(2)}</dd>
      </div>

      <div class="detail-row">
        <dt>Category</dt>
        <dd>${escape(transaction.category)}</dd>
      </div>

      <div class="detail-row">
        <dt>Type</dt>
        <dd>${escape(transaction.type)}</dd>
      </div>

      <div class="detail-row">
        <dt>Description</dt>
        <dd>${escape(transaction.description)}</dd>
      </div>

      <div class="detail-row">
        <dt>Mood</dt>
        <dd>${escape(transaction.mood ?? "No mood added")}</dd>
      </div>

      <div class="detail-row">
        <dt>Date</dt>
        <dd>${escape(transaction.transaction_date)}</dd>
      </div>
    </dl>

    <div class="transaction-detail-actions">
      <a href="/transactions" class="action-button">Back to Transactions</a>
    </div>
  </div>
</section>
`;
}
