import { deleteCookie, getCookies, setCookie } from "@std/http/cookie";

import { decodeBase64Url, encodeBase64Url } from "@std/encoding";

export function setFlash(headers, message) {
  setCookie(headers, {
    name: "flash",
    value: encodeBase64Url(message),
    path: "/",
  });
}

export function getFlash(requestHeaders, responseHeaders) {
  const { flash } = getCookies(requestHeaders);
  if (flash) {
    deleteCookie(responseHeaders, "flash", { path: "/" });
    console.log("remember to delete the flash cookie once its been used");
    return new TextDecoder().decode(decodeBase64Url(flash));
  }
}
