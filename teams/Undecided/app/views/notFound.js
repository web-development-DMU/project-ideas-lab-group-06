export function notFoundView() {
  return `
    <section aria-label="not-found-section">
        <h2>404, Not Found :(</h2>
            <p>The page you are looking for does not exist.</p>

            <div class="not-found-actions">
                <a href="/">Go to Dashboard</a>
                <a href-"/transactions">View Transactions</a>
                </div>
    </section>
    
    `;
}
