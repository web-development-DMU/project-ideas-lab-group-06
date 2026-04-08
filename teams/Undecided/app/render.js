import { escape } from "@std/html/entities";
import { getFlash } from "./flash.js";

export default function render(viewFn, data = {}, request, status = 200) {
  const content = viewFn(data);
  const headers = new Headers();

  const flash = getFlash(request.headers, headers);
  const flashMessage = flash
    ? `
    <aside id="flash">
      <p>${escape(flash)}</p>
    </aside>
    `
    : "";

  const user = data.user;

  const nav = user
    ? `
      <a href="/">Dashboard</a>
      <a href="/transactions">Transactions</a>
      <a href="/about">About</a>
      <form method="POST" action="/logout" class="logout-form">
        <button type="submit">Log out</button>
      </form>
    `
    : `
      <a href="/login">Sign in</a>
      <a href="/register">Sign up</a>
      <a href="/about">About</a>
    `;

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
            ${nav}
          </nav>
        </header>

        <main>
          ${flashMessage}
          ${content}
        </main>

        <footer>
          <p>&copy; 2024 A Penny For A Thought. All rights reserved.</p>
        </footer>
      </body>
      <script>
  const flash = document.getElementById("flash");

  if (flash) {
    setTimeout(() => {
      flash.style.opacity = "0";
      flash.style.transform = "translateY(-10px)";
    }, 2500); // wait 2.5 seconds

    setTimeout(() => {
      flash.remove();
    }, 3000); // remove after fade
  }
</script>
    </html>
  `;

  return new Response(html, { headers, status });
}
