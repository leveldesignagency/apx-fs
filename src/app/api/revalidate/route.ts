import { revalidatePath, revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

/**
 * Sanity webhook target. Configure in Sanity Manage ? API ? Webhooks:
 * URL: https://apx-fs.vercel.app/api/revalidate?secret=YOUR_SECRET
 * Dataset: production, trigger on create/update/delete for type project.
 * Optional: set SANITY_REVALIDATE_SECRET in Vercel env to match.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")
  const expected = process.env.SANITY_REVALIDATE_SECRET

  if (expected && secret !== expected) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  let slug: string | undefined
  try {
    const body = (await request.json()) as {
      slug?: { current?: string } | string
      _type?: string
    }
    if (typeof body.slug === "string") slug = body.slug
    else if (body.slug && typeof body.slug === "object") slug = body.slug.current
  } catch {
    // Body optional - still revalidate project list
  }

  revalidateTag("sanity-project")
  revalidatePath("/projects")
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
