import { serveDir } from "@std/http/file-server";

export function staticController({ request }) {
  return serveDir(request);
}
