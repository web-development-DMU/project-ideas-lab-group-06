export function server(request) {
    console.log(request.url);
    const headers = new Headers();
    //^^ const status = 200; // OK, is the default status code for a response, so we can omit it
    headers.set("Content-Type", "text/html");
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" href="some-icon.svg">
            <title>A Penny For A Thought</title>
        </head>
        <body>
            <h1> APFAT - by Undecided</h1>
            <p>Hello World</p>
        </body>
        </html>
        `;
    return new Response(html, { headers }); // status was removed next to headers
}
