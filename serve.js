import { existsSync, readdirSync } from 'fs';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

console.log(`Starting server on ${HOST}:${PORT}...`);
console.log(`Working directory: ${process.cwd()}`);

// Check if dist directory exists
const distPath = './build';
if (existsSync(distPath)) {
  console.log(`✅ build directory exists`);
  const files = readdirSync(distPath);
  console.log(`build contents: ${files.join(', ')}`);
} else {
  console.error(`❌ build directory NOT FOUND at ${distPath}`);
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
      
      if (proxyHeaders.has("Origin")) {
        proxyHeaders.set("Origin", "https://openrouter.ai");
      }

      // Remove accept-encoding to avoid receiving compressed data that we might fail to decode
      // Bun fetch will handle decompression anyway, but sometimes the headers get mixed up.
      proxyHeaders.delete("accept-encoding");

      try {
        const response = await fetch(targetUrl, {
          method: req.method,
          headers: proxyHeaders,
          body: req.body,
          redirect: "follow",
        });

        // Create a new Response object to strip problematic headers
        const responseHeaders = new Headers();
        for (const [key, value] of response.headers.entries()) {
          // Skip headers that Bun/Fetch might have already handled or that cause issues
          if (
            key.toLowerCase() === "content-encoding" ||
            key.toLowerCase() === "transfer-encoding" ||
            key.toLowerCase() === "content-length"
          ) {
            continue;
          }
          
          // Ensure JSON has charset=utf-8
          if (key.toLowerCase() === "content-type" && value.includes("application/json") && !value.includes("charset")) {
            responseHeaders.set(key, "application/json; charset=utf-8");
            continue;
          }

          responseHeaders.set(key, value);
        }
        
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
        });
      } catch (proxyErr) {
        console.error(`Proxy error: ${proxyErr}`);
        return new Response(`Proxy error: ${proxyErr.message}`, { status: 502 });
      }
    }

    // Default to index.html for directory requests
    if (pathname.endsWith("/")) {
      pathname += "index.html";
    }

    // Try to serve the file directly
    let filePath = `./build${pathname}`;
    let file = Bun.file(filePath);

    if (await file.exists()) {
      console.log(`  → Serving: ${filePath}`);
      const response = new Response(file);
      
      // Add cross-origin isolation headers for SharedArrayBuffer support (DuckDB-Wasm)
      response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
      response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');

      // Add content-type based on extension
      if (pathname.endsWith('.js')) response.headers.set('Content-Type', 'application/javascript; charset=utf-8');
      if (pathname.endsWith('.css')) response.headers.set('Content-Type', 'text/css; charset=utf-8');
      if (pathname.endsWith('.html')) response.headers.set('Content-Type', 'text/html; charset=utf-8');
      if (pathname.endsWith('.json')) response.headers.set('Content-Type', 'application/json; charset=utf-8');
      if (pathname.endsWith('.svg')) response.headers.set('Content-Type', 'image/svg+xml');
      if (pathname.endsWith('.otf')) response.headers.set('Content-Type', 'font/otf');
      if (pathname.endsWith('.ttf')) response.headers.set('Content-Type', 'font/ttf');
      if (pathname.endsWith('.wasm')) response.headers.set('Content-Type', 'application/wasm');
      
      return response;
    }

    if (!pathname.endsWith(".html") && !pathname.endsWith("/")) {
      const dirIndexFile = Bun.file(`./build${pathname}/index.html`);
      if (await dirIndexFile.exists()) {
        console.log(`  → Serving: ./build${pathname}/index.html`);
        return new Response(dirIndexFile, {
          headers: { 
            "Content-Type": "text/html; charset=utf-8",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin"
          }
        });
      }
    }

    // Try with .html extension
    if (!pathname.endsWith(".html")) {
      const htmlFile = Bun.file(`${filePath}.html`);
      if (await htmlFile.exists()) {
        console.log(`  → Serving: ${filePath}.html`);
        return new Response(htmlFile, {
          headers: { 
            "Content-Type": "text/html; charset=utf-8",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin"
          }
        });
      }
    }

    // 404
    console.log(`  → 404 Not Found: ${pathname}`);
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`✅ Server running at ${server.url}`);
