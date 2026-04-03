export default function render(viewFn, data, status = 200) {
  const content = viewFn(data);
  const headers = new Headers();

  headers.set("Content-Type", "text/html");
  const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" href="/assets/icon.svg">
            <link rel="stylesheet" href="/assets/styles.css">
            <title>A Penny For A Thought</title>
        </head>
        <body>
        <header>
            <h1>A Penny For A Thought</h1>
            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/teams">Teams</a>
                <a href="/transactions">Transactions</a>
            </nav>
        </header>
        <main>
            ${content}
        </main>
        <footer>
            <p>&copy; 2024 A Penny For A Thought. All rights reserved.</p>
        </footer>
        </body>
        </html>
        `;
  return new Response(html, { headers, status });
}
