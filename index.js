export default {
  async fetch(request, env, ctx) {
    const { pathname, searchParams } = new URL(request.url)

    if (pathname === "/") {
      return new Response(`
        <html>
          <head><title>Prox</title></head>
          <body style="text-align:center;">
            <form method="GET" action="/search">
              <input name="q" placeholder="Search with Prox" style="width:300px; padding:8px;">
              <button type="submit">Search</button>
            </form>
          </body>
        </html>`, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      })
    }

    if (pathname === "/search") {
      const q = searchParams.get("q")
      const url = `https://www.google.com/search?q=${encodeURIComponent(q)}`
      return Response.redirect(url, 302)
    }

    return new Response("404 Not Found", { status: 404 })
  }
}
