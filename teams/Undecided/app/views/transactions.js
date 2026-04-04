import { escape } from "jsr:@std/html/entities";

export function allTransactionsView({ transactions }) { // View for displaying all transactions in a table format
  const rowsTransactions = transactions
    .map(
      (tx) =>
        `<tr> 
      <td>${escape(tx.journal_entry)}</td>
      <td>£${tx.amount.toFixed(2) ?? "0.00"}</td>
      <td>${escape(tx.category)}</td>
      <td>${escape(tx.type)}</td>
      <td>${escape(tx.description)}</td>
      <td>${escape(tx.mood)}</td>
    </tr>`,
    )
    .join("\n");

  return `
        <section aria-label="transactions-section">
        <h2>Your Transactions</h2>
        <table>
            <thead>
                <tr>
                    <th>Journal Entry</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Mood</th>
                </tr>
            </thead>
            <tbody>
                ${rowsTransactions}
            </tbody>
        </table>
        
        <nav>
          <a href="/transactions/new">Add New Transaction</a>
        </nav>
        </section>
    `;
}

export function transactionFormView({ error }) {
  //Separate page, only shows the form for creating a new transaction/add new trasaction page
  const errorMessage = error ? `<p class="error">${escape(error)}</p>` : "";

  return `
    <section>
      <h2>Add Transaction</h2>
      <form method="POST" action="/transactions">
       <p>Add a transaction here.</p>
       ${errorMessage}

        <br>

        <label for="journal_entry">Journal Entry:</label>
        <input type="text" id="journal_entry" name="journal_entry" placeholder="Journal Entry" required>

        <label for="amount">Amount:(£)</label>
        <input type="number" id="amount" name="amount" step="0.01" placeholder="0.00" required>

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

        <legend>Is this income or expense?</legend>
        <input type="radio" id="type-income" name="type" value="income" required> Income 
        <input type="radio" id="type-expense" name="type" value="expense" required> Expense

        <label for="description">Transaction Description:</label>
        <textarea id="description" name="description" placeholder="An apple a day keeps the doctor away" required></textarea> 

        <label for="mood">Mood:</label>
        <select id="mood" name="mood">
        <option value="">Select Mood</option>
        <option value="Happy">Happy</option>
        <option value="Neutral">Neutral</option>
        <option value="Sad">Sad</option>
        </select>

        <button type="submit">Add Transaction</button>
      </form>
    </section>
    `;
}

//Probably dont need this, but theres something relying on this for now
/*export function successfulTransactionView() {
  return `
        <h2>Hurrah! Transaction Added</h2>
        <p>Your transaction has been added successfully.</p>
        <form method="POST" action="/transactions">
    `;
}*/

export function displayTransactionView() {
  return `
        <h2>Transaction Details</h2>
        <p>Details of the selected transaction will be displayed here.</p>
        
    `;
  //will include this: <form method="GET" action="/:transactionsId">
}

export function deleteTransactionView() {
  return `
        <h2>Delete Transaction</h2>
        <p>The selected transaction has been deleted.</p>

    `;
  //will include this: <form method="POST" action="/:transactionsId/delete">
}
