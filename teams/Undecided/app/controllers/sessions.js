//import { setFlash } from "../flash.js";
import render from "../render.js";
import { loginFormView } from "../views/auth.js"; //im suspicious about this
import redirect from "../redirect.js";
import { userSchema } from "../schema/user.js";
import { validateSchema } from "../validation.js";

export function loginFormController({ request }) {
    return render(loginFormView, {}, request);
}

export async function addSessionController({ request }) {
    const formData = await request.formData();

    const validation = validateSchema(formData, userSchema);
    if (!validation.isValid) {
        return render(loginFormView, validation, request, 400);
    }

    const username = formData.get("username");
    const _password = formData.get("password");

    //validate the incoming data here
    const validCredentials = true;

    const headers = new Headers();
    if (validCredentials) {
        //Create the session here
        console.log("Session created for: ", username);
        return redirect(headers, "/", `logged in as'${username}'`);
    }
}
