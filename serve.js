import { existsSync, readdirSync } from 'fs';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

console.log(`Starting server on ${HOST}:${PORT}...`);
console.log(`Working directory: ${process.cwd()}`);

// Check if dist directory exists
const distPath = './dist';
if (existsSync(distPath)) {
  console.log(`✅ dist directory exists`);
  const files = readdirSync(distPath);
  console.log(`dist contents: ${files.join(', ')}`);
} else {
  console.error(`❌ dist directory NOT FOUND at ${distPath}`);
  console.log(`Current directory contents:`, readdirSync('.'));
}

const server = Bun.serve({
  port: PORT,
  hostname: HOST,

  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;

    console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

    // Proxy API requests to OpenRouter
    if (pathname.startsWith("/api/v1/")) {
      const targetUrl = `https://openrouter.ai${pathname}${url.search}`;
      console.log(`  → Proxying to: ${targetUrl}`);
      
      const proxyHeaders = new Headers(req.headers);
      proxyHeaders.set("Host", "openrouter.ai");

      return fetch(targetUrl, {
        method: req.method,
        headers: proxyHeaders,
        body: req.body,
        redirect: "follow",
      });
    }

    // Default to index.html for directory requests
    if (pathname.endsWith("/")) {
      pathname += "index.html";
    }

    // Try to serve the file directly
    let filePath = `./dist${pathname}`;
    let file = Bun.file(filePath);

    if (await file.exists()) {
      console.log(`  → Serving: ${filePath}`);
      return new Response(file);
    }

    if (!pathname.endsWith(".html") && !pathname.endsWith("/")) {
      const dirIndexFile = Bun.file(`./dist${pathname}/index.html`);
      if (await dirIndexFile.exists()) {
        console.log(`  → Serving: ./dist${pathname}/index.html`);
        return new Response(dirIndexFile);
      }
    }

    // Try with .html extension
    if (!pathname.endsWith(".html")) {
      const htmlFile = Bun.file(`${filePath}.html`);
      if (await htmlFile.exists()) {
        console.log(`  → Serving: ${filePath}.html`);
        return new Response(htmlFile);
      }
    }

    // 404
    console.log(`  → 404 Not Found: ${pathname}`);
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`✅ Server running at ${server.url}`);
