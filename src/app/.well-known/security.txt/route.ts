import { FS_EMAIL, getFsSiteUrl } from "@/lib/seo"

export function GET() {
  const base = getFsSiteUrl()
  const body = [
    `Contact: mailto:${FS_EMAIL}`,
    `Expires: 2027-11-02T00:00:00.000Z`,
    `Preferred-Languages: en`,
    `Canonical: ${base}/.well-known/security.txt`,
    `Policy: ${base}/privacy`,
  ].join("\n")

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
