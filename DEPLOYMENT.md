# Deployment

formulaid is a static SvelteKit build (`adapter-static`). All generation logic
runs in the browser, and every API is called from there directly: the user's
API key, research questions and generated questions never reach the formulaid
host.

In production, Coolify builds it with nixpacks (`nixpacks.toml`) and runs
`bun serve.js`, which only serves `build/`.

## Where requests go

| Service         | Called from       | Why it works                                   |
| --------------- | ----------------- | ---------------------------------------------- |
| OpenRouter      | browser, directly | sends `Access-Control-Allow-Origin: *`         |
| Custom endpoint | browser, directly | the endpoint has to allow this origin via CORS |
| qwacback API    | browser, directly | sends `Access-Control-Allow-Origin: *`         |

A provider can only be offered if it allows browser calls via CORS. EUrouter
allows no origin but its own, so it was removed rather than relayed through a
server ([#32](https://github.com/CorrelAid/formulaid/issues/32) says how to add
it back).

## Other hosts

Any static host works: serve `build/` and nothing else.

## Local development

`bun run dev` and `bun run preview` need no setup.
