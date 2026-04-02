import { serveDir } from "@std/http";

import render from "./render.js";

export default function server(request) {
  const url = new URL(request.url);
  console.log(`\n${request.method} ${url.pathname}${url.search}`);

  if (url.pathname.startsWith("/assets/")) {
    return serveDir(request);
  }

  if (url.pathname === "/") {
    return render(`
      <h2>Home Page </h2>
      <p> Welcome to my project idea!</p >
      `);
  }

  return render(
    `
        <h2> Not Found</h2>
        <p>The page you are looking for does not exist.</p>
    `,
    404, //pass 404 status code to indicate not found
  );
}
