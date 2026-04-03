export function transactionsView({ transactions }) {
  const listTransactions = transactions.map((tx) =>
    `<li>${tx.description}: £${tx.amount}</li>` //add escape() later to prevent XSS, but for now we are just using fixed data so it is safe
  ).join("\n");

  return `
        <h2>Transactions</h2>
        <p>View your financial transactions here.</p>
        <br>
        <ul>
            ${listTransactions}
        </ul>   
    `;
}

export function transactionFormView() {
  return `
    <section>
      <h2>Add Transaction</h2>
      <form method="POST" action="/transactions/new">
        <label for="description">Description</label>
        <input id="description" name="description" required>

        <label for="amount">Amount</label>
        <input id="amount" name="amount" type="number" step="0.01" required>

        <button type="submit">Add Transaction</button>
      </form>
    </section>
    `;
}

export function addTransactionView() {
  return `
        <h2>Transaction Added</h2>
        <p>Your transaction has been added successfully.</p>
    `;
}

export function displayTransactionView() {
  return `
        <h2>Transaction Details</h2>
        <p>Details of the selected transaction will be displayed here.</p>
    `;
}

export function deleteTransactionView() {
  return `
        <h2>Delete Transaction</h2>
        <p>The selected transaction has been deleted.</p>
    `;
}
