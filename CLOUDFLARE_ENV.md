# Cloudflare environment variables

Worker name: `apx-fs-website` (see `wrangler.jsonc`).

**Preview URL (live):** https://apx-fs-website.apx-fs.workers.dev  
**Production origin (target):** https://www.apx-fs.co.uk (no trailing slash).

Set secrets via `wrangler secret put <NAME>` or Workers ? Settings ? Variables and Secrets.

Use **Secrets** for anything private. `NEXT_PUBLIC_*` values are exposed to the browser.

Local Workers preview loads `.env*` according to `.dev.vars` (`NEXTJS_ENV=development`).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run preview` | OpenNext build + local Workers runtime |
| `npm run deploy` | OpenNext build + deploy to Cloudflare Workers |
| `npm run cf-typegen` | Generate `cloudflare-env.d.ts` binding types |

## Domain setup (required for www)

This Cloudflare account currently has **no zones**. `www.apx-fs.co.uk` cannot be attached until the domain is on Cloudflare:

1. Cloudflare dashboard ? **Add a site** ? `apx-fs.co.uk` (Free plan is fine).
2. Change the domain’s nameservers at the registrar to the ones Cloudflare shows.
3. Wait until the zone is **Active**.
4. Add this back to `wrangler.jsonc` and redeploy:

```json
"routes": [
  {
    "pattern": "www.apx-fs.co.uk",
    "custom_domain": true
  }
]
```

5. Optional: Redirect apex `apx-fs.co.uk` ? `www.apx-fs.co.uk` with a Redirect Rule.

## Secrets still needed

Vercel will not export secret values. Set these on the Worker (copy from Vercel ? Project ? Settings ? Environment Variables):

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put TURNSTILE_SECRET_KEY
```

Already set:

- `SANITY_REVALIDATE_SECRET`

Non-secret vars already in `wrangler.jsonc` (`NEXT_PUBLIC_*`, `RESEND_FROM_EMAIL`, `NOTIFY_EMAIL`).

---

## Required for a working production site

| Variable | Secret? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL. Set to `https://www.apx-fs.co.uk` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No | Sanity project id (default in code: `v7rfd3px`) |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Sanity dataset (default: `production`) |
| `SANITY_REVALIDATE_SECRET` | **Yes** | Shared secret for `POST /api/revalidate` (Sanity webhook) |
| `RESEND_API_KEY` | **Yes** | Resend API key for contact + careers emails |
| `RESEND_FROM_EMAIL` | No* | From address Resend is allowed to send as |
| `NOTIFY_EMAIL` | No* | Inbox that receives contact + careers notifications |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | Cloudflare Turnstile site key (forms) |
| `TURNSTILE_SECRET_KEY` | **Yes** | Cloudflare Turnstile secret |

\*Not “secret” in the security sense, but treat as sensitive operational config.

Legacy aliases still work if you already use them:

- `CAREERS_FROM_EMAIL` ? same as `RESEND_FROM_EMAIL`
- `CAREERS_NOTIFY_EMAIL` ? same as `NOTIFY_EMAIL`

---

## Optional

| Variable | Secret? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_APX_MEP_URL` | No | Sister-site URL (default / fallback: `https://www.apx-mep.co.uk`) |
| `NEXT_PUBLIC_GOOGLE_REVIEWS_EMBED_URL` | No | Google Business reviews embed for the homepage slot |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console HTML-tag token only |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | No | Bing Webmaster `msvalidate.01` token only |

---

## After domain is live

1. Sanity webhook URL should call:
   `https://www.apx-fs.co.uk/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`
2. Turnstile widget hostname allowlist must include `www.apx-fs.co.uk` and `apx-fs-website.apx-fs.workers.dev` while testing.
3. Resend domain / from-address must match `RESEND_FROM_EMAIL`.

---

## Not used on Cloudflare

These were Vercel-only and are not required:

- `VERCEL_*`
- Vercel Analytics / Speed Insights (removed from the app)
