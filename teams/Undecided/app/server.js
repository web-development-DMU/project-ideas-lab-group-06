import { viewTransactionsController } from "./controllers/transactions.js";
import { homeController } from "./controllers/home.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import { displayTransactionFormController } from "./controllers/transactions.js";
import { addTransactionController } from "./controllers/transactions.js";
import {
  addSessionController,
  loginFormController,
} from "./controllers/sessions.js";
import { loginFormController } from "./controllers/sessions.js";
import { registerFormController } from "./controllers/users.js";
import { logoutController } from "./controllers/sessions.js";
import { addUserController } from "./controllers/users.js";

export default function server(request) {
  const url = new URL(request.url);
  console.log(`\n${request.method} ${url.pathname}${url.search}`);

  //console.log(url.searchParams.get("new-transaction"));

  // Static assets route, landin page route, and 404 route
  if (url.pathname.startsWith("/assets/")) {
    return staticController({ request });
  }

  if (url.pathname === "/" && request.method === "GET") {
    return homeController({ request });
  }

  // Transaction routes:

  if (url.pathname === "/transactions" && request.method === "GET") {
    return viewTransactionsController({ request });
  }

  if (url.pathname === "/transactions/new" && request.method === "GET") {
    return displayTransactionFormController({ request });
  }

  if (url.pathname === "/transactions" && request.method === "POST") {
    return addTransactionController({ request });
  }

  // Authentication routes:

  if (url.pathname === "/login" && request.method === "GET") {
    return loginFormController({ request });
  }
  if (url.pathname === "/login" && request.method === "POST") {
    return addSessionController({ request });
  }
  if (url.pathname === "/logout" && request.method === "POST") {
    return logoutController({ request });
  }
  if (url.pathname === "/register" && request.method === "GET") {
    return registerFormController({ request });
  }
  if (url.pathname === "/register" && request.method === "POST") {
    return addUserController({ request });
  }

  return notFoundController({ request }); //pass 404 status code to indicate not found
}
