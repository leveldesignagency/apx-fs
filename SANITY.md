# Sanity CMS (projects)

Projects on `/projects` and `/projects/[slug]` load from Sanity project `v7rfd3px`, dataset `production`. Static data in `src/data/projects.ts` is the fallback if Sanity is unreachable or a field/image is missing.

**Editing in Studio does not redeploy Vercel.** It only changes content in Sanity. The site updates when Next.js revalidates its cache (webhook = instant, or ~60s ISR).

## Local / Vercel env

```
NEXT_PUBLIC_SANITY_PROJECT_ID=v7rfd3px
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=<random long string>
```

Defaults for project id / dataset are already in code if env is unset.

## Webhook (required for instant publish/delete)

Without this, deletes/edits can sit on the live site until the next ISR pass (about a minute, sometimes longer with edge cache).

1. Vercel ? Project ? Settings ? Environment Variables ? add `SANITY_REVALIDATE_SECRET` (any long random string) for Production.
2. [Sanity Manage](https://www.sanity.io/manage/project/v7rfd3px) ? API ? Webhooks ? Create:
   - **Name:** Vercel projects revalidate
   - **URL:** `https://apx-fs.vercel.app/api/revalidate?secret=YOUR_SECRET` (same secret)
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, **Delete**
   - **Filter:** `_type == "project"`
   - **Projection:** `{"slug": coalesce(slug.current, before().slug.current)}`
   - **HTTP method:** POST
   - Enable the webhook

Manual purge (no secret set yet, or secret in query):

`https://apx-fs.vercel.app/api/revalidate`

## Sanity CORS

Manage ? API ? CORS origins (needed for browser/Studio tooling, not for server fetch):

- `http://localhost:3003`
- `https://apx-fs.vercel.app`
- production domain when connected

## Studio

Studio lives in the sibling monorepo `apx/studio` (not this repo). Publish/delete there, then check https://apx-fs.vercel.app/projects.
