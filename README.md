# Epic OS

A first-run shell for [os.epictechai.app](https://os.epictechai.app): add a model, create a workspace, talk to Grok.

This is a local demo of the UX the live Cloudflare OS is missing. It does not replace the production Worker. Work stays in this browser.

## What it fixes

- Welcome dialog that names the three setup steps
- Persistent getting-started checklist
- **Create workspace** opens a blueprint picker and lands in the editor
- Home chat explains **No agent** and links to Providers
- Empty states answer what / why / next
- Integrations instead of unexplained Gatekeepers
- Knowledge instead of Context & Skills
- Local visitor, not a leftover `testuser123`

## Run locally

```bash
pnpm install
pnpm build
pnpm start
```

Open [http://127.0.0.1:43173](http://127.0.0.1:43173).

`pnpm dev` is fine for local editing. Use `pnpm build && pnpm start` for a first-run check — the welcome dialog and action buttons need the client bundle to load.

## Deploy to Cloudflare

Live Worker (new, does not replace production `epic-cfos-workshop`):

[https://epic-os.spyke6009.workers.dev](https://epic-os.spyke6009.workers.dev)

Account `524a87e324a5a3515fb6746e9567aff0`. Use `pnpm run deploy` — plain `pnpm deploy` is pnpm’s package publisher, not this script.

```bash
CLOUDFLARE_ACCOUNT_ID=524a87e324a5a3515fb6746e9567aff0 pnpm run deploy
```

Point a route at this Worker if you want it on `os.epictechai.app`. Do not overwrite `epic-cfos-workshop` until you mean to.

Intended GitHub home is `Sm0k367/epic-os`. This tree is also on [epictechai/epic-os](https://github.com/epictechai/epic-os) until that transfer happens.

## Stack

Next.js, TypeScript, Tailwind, shadcn/ui. No database. Reset from Account.

Grok replies are local stand-ins. Add **Workers AI (local demo)** to finish first-run without an API key.
