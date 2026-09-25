# Deployment

formulaid is a static SvelteKit build (`adapter-static`). All generation logic
runs in the browser; the user's API key never leaves it except to go to the
LLM provider the user picked.

In production, Coolify builds it with nixpacks (`nixpacks.toml`) and runs
`bun serve.js`, which serves `build/` and proxies one route.

## Where requests go

| Provider        | Called from       | Why                                                                                                               |
| --------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| OpenRouter      | browser, directly | sends `Access-Control-Allow-Origin: *`                                                                            |
| Custom endpoint | browser, directly | the endpoint has to allow this origin via CORS                                                                    |
| qwacback API    | browser, directly | sends `Access-Control-Allow-Origin: *`                                                                            |
| EUrouter        | `serve.js` proxy  | allows no origin but `https://www.eurouter.ai` via CORS ([#32](https://github.com/CorrelAid/formulaid/issues/32)) |

The EUrouter proxy (`/api/eurouter/v1/*` → `https://api.eurouter.ai/api/v1/*`)
is a fixed allowlist, not an open relay. It stores nothing, but EUrouter
requests (including the key in the `Authorization` header) do pass through
the formulaid host. It drops cookies and the referrer on the way out and
`Set-Cookie` on the way back, and logs only the error message when EUrouter
can't be reached, never paths, headers or bodies. The UI says so when EUrouter
is selected. If the platform in front of `serve.js` keeps access logs, turn
them off for `/api/eurouter/`.

## Other hosts

Any static host works if EUrouter support is not needed. Otherwise, forward
`/api/eurouter/v1/` to `https://api.eurouter.ai/api/v1/`, e.g. with nginx:

```nginx
location /api/eurouter/v1/ {
    proxy_pass https://api.eurouter.ai/api/v1/;
    proxy_set_header Host api.eurouter.ai;
    proxy_ssl_server_name on;
}
```

## Local development

`bun run dev` and `bun run preview` proxy the EUrouter route through Vite
(`vite.config.ts`); nothing else needs setting up.
