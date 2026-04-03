import { viewTransactionsController } from "./controllers/transactions.js";
import { homeController } from "./controllers/home.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import { displayTransactionFormController } from "./controllers/transactions.js";
import { addTransactionController } from "./controllers/transactions.js";

export default function server(request) {
  const url = new URL(request.url);
  console.log(`\n${request.method} ${url.pathname}${url.search}`);

  //console.log(url.searchParams.get("new-transaction"));

  if (url.pathname.startsWith("/assets/")) {
    return staticController({ request });
  }

  if (url.pathname === "/" && request.method === "GET") {
    return homeController({ request });
  }

  if (url.pathname === "/transactions" && request.method === "GET") {
    return viewTransactionsController({ request });
  }

  if (url.pathname === "/transactions/new" && request.method === "GET") {
    return displayTransactionFormController({ request });
  }

  if (url.pathname === "/transactions" && request.method === "POST") {
    return addTransactionController({ request });
  }

  return notFoundController({ request }); //pass 404 status code to indicate not found
}
