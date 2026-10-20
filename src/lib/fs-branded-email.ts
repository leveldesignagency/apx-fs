import { getFsSiteUrl } from "@/lib/seo"
import {
  FS_EMAIL_LOGO_CONTENT_ID,
  FS_EMAIL_LOGO_DATA_URI,
  FS_EMAIL_LOGO_PNG_BASE64,
} from "@/lib/fs-email-logo-base64"

export function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

// hosted logo URL if we ever need it again
export function fsEmailLogoUrl(): string {
  return `${getFsSiteUrl()}/email-signatures/logo/apx-fs-footer-email.png`
}

export type FsEmailRow = { label: string; value: string }

// CID attachment - Gmail drops bare data: URIs
export function fsEmailLogoInlineAttachment(): {
  filename: string
  content: string
  contentId: string
} {
  return {
    filename: "apx-fs-footer-logo.png",
    content: FS_EMAIL_LOGO_PNG_BASE64,
    contentId: FS_EMAIL_LOGO_CONTENT_ID,
  }
}

// logoMode: "cid" for real sends, "data" for local HTML preview
export function buildFsBrandedEmailHtml(opts: {
  title: string
  intro?: string
  rows: FsEmailRow[]
  messageLabel?: string
  messageBody?: string
  footerNote?: string
  logoMode?: "cid" | "data"
}): string {
  const logo =
    opts.logoMode === "data"
      ? FS_EMAIL_LOGO_DATA_URI
      : `cid:${FS_EMAIL_LOGO_CONTENT_ID}`

  const rowsHtml = opts.rows
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#888888;">
          ${escHtml(r.label)}
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.45;color:#ffffff;border-bottom:1px solid #222222;">
          ${escHtml(r.value)}
        </td>
      </tr>`
    )
    .join("")

  const messageBlock =
    opts.messageBody != null && opts.messageBody.length > 0
      ? `
      <tr>
        <td style="padding:18px 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#888888;">
          ${escHtml(opts.messageLabel || "Message")}
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#ffffff;white-space:pre-wrap;">
          ${escHtml(opts.messageBody)}
        </td>
      </tr>`
      : ""

  const intro = opts.intro
    ? `<p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#c8c8c8;">${escHtml(opts.intro)}</p>`
    : ""

  const footer = opts.footerNote
    ? `<p style="margin:28px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#666666;">${escHtml(opts.footerNote)}</p>`
    : ""

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background-color:#000000;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#000000;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#0a0a0a;border:1px solid #1a1a1a;">
          <tr>
            <td style="padding:28px 28px 8px;text-align:center;border-bottom:1px solid #1a1a1a;">
              <img src="${logo}" alt="APX Fire &amp; Security" width="200" style="display:inline-block;max-width:200px;height:auto;border:0;outline:none;"/>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:1.3;font-weight:700;color:#ffffff;">
                ${escHtml(opts.title)}
              </h1>
              ${intro}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${rowsHtml}
                ${messageBlock}
              </table>
              ${footer}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 24px;border-top:1px solid #1a1a1a;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;color:#555555;text-align:center;">
              APX Fire &amp; Security Ltd &middot; enquiries@apx-fs.co.uk &middot; 020 8303 2280
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function contactMethodLabel(method: string): string {
  switch (method) {
    case "phone":
      return "Phone"
    case "email":
      return "Email"
    case "text":
      return "Text message (SMS)"
    default:
      return method || "Not selected"
  }
}
