import { dashboardController } from "./controllers/dashboard.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import {
  addTransactionController,
  deleteTransactionController,
  displayTransactionController,
  displayTransactionFormController,
  viewTransactionsController,
} from "./controllers/transactions.js";
import {
  addSessionController,
  loginFormController,
  logoutController,
} from "./controllers/sessions.js";
import {
  addUserController,
  registrationFormController,
} from "./controllers/users.js";
import { aboutController } from "./controllers/about.js";
import { requireAuth } from "./middleware/auth.js";

export default function server(request) {
  const url = new URL(request.url);
  console.log(`\n${request.method} ${url.pathname}${url.search}`);

  // static assets
  if (url.pathname.startsWith("/assets/")) {
    return staticController({ request });
  }

  // public routes
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
    return registrationFormController({ request });
  }

  if (url.pathname === "/register" && request.method === "POST") {
    return addUserController({ request });
  }

  if (url.pathname === "/about" && request.method === "GET") {
    return aboutController({ request });
  }

  // protected routes
  if (url.pathname === "/" && request.method === "GET") {
    const result = requireAuth(request);
    if (result.redirect) return result.redirect;

    return dashboardController({ request, user: result.user });
  }

  if (url.pathname === "/transactions" && request.method === "GET") {
    const result = requireAuth(request);
    if (result.redirect) return result.redirect;

    return viewTransactionsController({ request, user: result.user });
  }

  if (url.pathname === "/transactions/new" && request.method === "GET") {
    const result = requireAuth(request);
    if (result.redirect) return result.redirect;

    return displayTransactionFormController({ request, user: result.user });
  }

  if (url.pathname === "/transactions" && request.method === "POST") {
    const result = requireAuth(request);
    if (result.redirect) return result.redirect;

    return addTransactionController({ request, user: result.user });
  }

  if (url.pathname === "/transaction" && request.method === "GET") {
    const result = requireAuth(request);
    if (result.redirect) return result.redirect;

    return displayTransactionController({ request, user: result.user });
  }
  if (url.pathname === "/transactions/edit" && request.method === "POST") {
    const result = requireAuth(request);
    if (result.redirect) return result.redirect;

    return updateTransactionController({ request, user: result.user });
  }

  if (url.pathname === "/transactions/delete" && request.method === "POST") {
    const result = requireAuth(request);
    if (result.redirect) return result.redirect;

    return deleteTransactionController({ request, user: result.user });
  }

  return notFoundController({ request });
}
