# Sanity CMS (projects)

Projects on `/projects` and `/projects/[slug]` are loaded from Sanity project `v7rfd3px`, dataset `production`. Static data in `src/data/projects.ts` is the fallback if Sanity is unreachable or a field/image is missing.

## Local / Vercel env

```
NEXT_PUBLIC_SANITY_PROJECT_ID=v7rfd3px
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=<random long string>
```

Defaults for project id / dataset are already in code if env is unset.

## Sanity CORS

In [Sanity Manage](https://www.sanity.io/manage/project/v7rfd3px) ? API ? CORS origins, allow:

- `http://localhost:3003`
- `https://apx-fs.vercel.app`
- production domain when connected

## Webhook (instant updates)

Manage ? API ? Webhooks ? Create:

- URL: `https://apx-fs.vercel.app/api/revalidate?secret=YOUR_SECRET`
- Dataset: `production`
- Trigger on: Create / Update / Delete
- Filter: `_type == "project"`
- Projection (optional): `{ "slug": slug }`

Set the same secret in Vercel ? Project ? Settings ? Environment Variables as `SANITY_REVALIDATE_SECRET`.

Without the webhook, pages still refresh from Sanity at least every **60 seconds** (`revalidate = 60`).

## Studio

Studio lives in the sibling monorepo `apx/studio` (not this repo). Publish there, then check https://apx-fs.vercel.app/projects.
