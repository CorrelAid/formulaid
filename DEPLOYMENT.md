# Deployment (Coolify / Static)

To avoid CORS issues with OpenRouter in a static deployment, you must configure a reverse proxy on your web server.

## Coolify / Nginx Configuration

Add this block to your Nginx configuration (usually under "Base Config" -> "Nginx Config" in Coolify) to support OpenRouter proxy and WebAssembly (DuckDB-Wasm) with SharedArrayBuffer:

```nginx
# OpenRouter API Proxy
location /api/v1/ {
    proxy_pass https://openrouter.ai/api/v1/;
    proxy_set_header Host openrouter.ai;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # Enable CORS for the proxy
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
}

# General headers for Cross-Origin Isolation (Required for DuckDB-Wasm)
add_header Cross-Origin-Embedder-Policy "require-corp" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;

# Ensure correct MIME type for .wasm files
location ~* \.wasm$ {
    types {
        application/wasm wasm;
    }
    add_header Content-Type application/wasm;
    add_header Cross-Origin-Embedder-Policy "require-corp" always;
    add_header Cross-Origin-Opener-Policy "same-origin" always;
}
```

## Local Development

The project is already configured to use a Vite proxy for local development. Simply run:

```bash
npm run dev
```

For the local Bun server (`bun serve.js`), the headers are already handled in the script.
