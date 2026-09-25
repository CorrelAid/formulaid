import { existsSync } from 'fs';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

if (!existsSync('./build')) {
	console.error(`❌ build directory not found in ${process.cwd()} — run "bun run build" first`);
}

// Static files only. Every provider is called straight from the browser, so
// no API key or prompt ever reaches this server (#31, #32).
const server = Bun.serve({
	port: PORT,
	hostname: HOST,

	async fetch(req) {
		const url = new URL(req.url);
		let pathname = url.pathname;

		// Default to index.html for directory requests
		if (pathname.endsWith('/')) {
			pathname += 'index.html';
		}

		// Try to serve the file directly
		let filePath = `./build${pathname}`;
		let file = Bun.file(filePath);

		if (await file.exists()) {
			const response = new Response(file);

			// Add content-type based on extension
			if (pathname.endsWith('.js'))
				response.headers.set('Content-Type', 'application/javascript; charset=utf-8');
			if (pathname.endsWith('.css'))
				response.headers.set('Content-Type', 'text/css; charset=utf-8');
			if (pathname.endsWith('.html'))
				response.headers.set('Content-Type', 'text/html; charset=utf-8');
			if (pathname.endsWith('.json'))
				response.headers.set('Content-Type', 'application/json; charset=utf-8');
			if (pathname.endsWith('.svg')) response.headers.set('Content-Type', 'image/svg+xml');
			if (pathname.endsWith('.otf')) response.headers.set('Content-Type', 'font/otf');
			if (pathname.endsWith('.ttf')) response.headers.set('Content-Type', 'font/ttf');
			if (pathname.endsWith('.wasm')) response.headers.set('Content-Type', 'application/wasm');

			return response;
		}

		if (!pathname.endsWith('.html') && !pathname.endsWith('/')) {
			const dirIndexFile = Bun.file(`./build${pathname}/index.html`);
			if (await dirIndexFile.exists()) {
				return new Response(dirIndexFile, {
					headers: { 'Content-Type': 'text/html; charset=utf-8' }
				});
			}
		}

		// Try with .html extension
		if (!pathname.endsWith('.html')) {
			const htmlFile = Bun.file(`${filePath}.html`);
			if (await htmlFile.exists()) {
				return new Response(htmlFile, {
					headers: { 'Content-Type': 'text/html; charset=utf-8' }
				});
			}
		}

		// 404
		return new Response('Not Found', { status: 404 });
	}
});

console.log(`✅ Server running at ${server.url}`);
