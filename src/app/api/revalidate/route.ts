import { revalidatePath, revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

type WebhookBody = {
  _type?: string
  slug?: { current?: string } | string
}

function readSlug(body: WebhookBody | null): string | undefined {
  if (!body?.slug) return undefined
  if (typeof body.slug === "string") return body.slug
  return body.slug.current
}

/**
 * Sanity webhook target (does NOT redeploy - busts Next/Vercel cache only).
 *
 * Manage ? API ? Webhooks ? Create:
 * URL: https://apx-fs.vercel.app/api/revalidate?secret=YOUR_SECRET
 * Trigger: Create, Update, Delete
 * Filter: _type == "project"
 * Projection: {"slug": coalesce(slug.current, before().slug.current)}
 * Secret: same value as SANITY_REVALIDATE_SECRET in Vercel
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")
  const expected = process.env.SANITY_REVALIDATE_SECRET

  if (expected && secret !== expected) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  let slug: string | undefined
  try {
    const body = (await request.json()) as WebhookBody
    slug = readSlug(body)
  } catch {
    // Body optional - still revalidate project list
  }

  // Brief wait so Content Lake / CDN have propagated deletes before next fetch.
  await new Promise((resolve) => setTimeout(resolve, 1500))

  revalidateTag("sanity-project")
  revalidatePath("/projects")
  revalidatePath("/projects", "layout")
  if (slug) {
    revalidateTag(`project:${slug}`)
    revalidatePath(`/projects/${slug}`)
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    slug: slug || null,
  })
}

export async function GET(request: NextRequest) {
  return POST(request)
}
