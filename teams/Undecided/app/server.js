import render from "./render.js";
import { viewTransactionsController } from "./controllers/transactions.js";
import { homeController } from "./controllers/home.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";

export default function server(request) {
  const url = new URL(request.url);
  console.log(`\n${request.method} ${url.pathname}${url.search}`);

  if (url.pathname.startsWith("/assets/")) {
    return staticController({ request });
  }

  if (url.pathname === "/") {
    return homeController({ request });
  }

  if (url.pathname === "/transactions") {
    return viewTransactionsController({ request });
  }

  return notFoundController({ request }); //pass 404 status code to indicate not found
}
