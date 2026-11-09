# Sanity CMS (projects)

Projects on `/projects` and `/projects/[slug]` load from Sanity project `v7rfd3px`, dataset `production`. Static data in `src/data/projects.ts` is the fallback if Sanity is unreachable or a field/image is missing.

**Editing in Studio does not redeploy Vercel.** A Sanity webhook calls `/api/revalidate` so create / update / **delete** bust the Next.js cache and go live within a few seconds.

## Live wiring (already set)

- Vercel project `apx-fs`: `SANITY_REVALIDATE_SECRET` (Production + Preview)
- Sanity webhook **Vercel projects revalidate** (`VCZAaiqv87T0Zl9q`):
  - URL: `https://apx-fs.vercel.app/api/revalidate?secret=…`
  - Dataset: `production`
  - Triggers: Create, Update, Delete
  - Filter: `_type == "project"`
  - Projection: `{"slug": coalesce(slug.current, before().slug.current)}`

Verified: create and delete of a probe project both returned webhook `200` and updated https://apx-fs.vercel.app/projects without a redeploy.

## Local env

```
NEXT_PUBLIC_SANITY_PROJECT_ID=v7rfd3px
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=<same as Vercel / webhook query>
```

Defaults for project id / dataset are already in code if env is unset.

## Sanity CORS

Manage ? API ? CORS origins (browser/Studio tooling; server fetch does not need this):

- `http://localhost:3003`
- `https://apx-fs.vercel.app`
- production domain when connected

## Studio

Studio lives in the sibling monorepo `apx/studio` (not this repo). Publish or delete there; the live Vercel site should refresh within a few seconds.
