import {
  FS_EMAIL,
  FS_PHONE_DISPLAY,
  FS_PHONE_E164,
  getFsSiteUrl,
} from "@/lib/seo"
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

/** Hosted logo URL if we ever need it again. */
export function fsEmailLogoUrl(): string {
  return `${getFsSiteUrl()}/email-signatures/logo/apx-fs-footer-email.png`
}

export type FsEmailRow = { label: string; value: string }

/** Border + divider thickness (same weight throughout; keep light vs logo). */
const LINE = "1px solid #ffffff"

/** Site titles use Teko; body/labels use Oxanium. Many clients fall back to Arial. */
const FONT_TITLE = "Teko, Arial, Helvetica, sans-serif"
const FONT_BODY = "Oxanium, Arial, Helvetica, sans-serif"

const LINK_STYLE = "color:#ffffff;text-decoration:underline;"

function linkifyUrls(text: string): string {
  return escHtml(text).replace(
    /(https?:\/\/[^\s<]+)/g,
    `<a href="$1" style="${LINK_STYLE}">$1</a>`
  )
}

function formatRowValue(label: string, value: string): string {
  const key = label.toLowerCase()
  const trimmed = value.trim()
  if (!trimmed) return escHtml(value)

  if (
    (key.includes("email") || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
  ) {
    return `<a href="mailto:${escHtml(trimmed)}" style="${LINK_STYLE}">${escHtml(trimmed)}</a>`
  }

  if (key.includes("phone") || key.includes("tel")) {
    const digits = trimmed.replace(/[^\d+]/g, "")
    if (digits.length >= 8) {
      const href = digits.startsWith("+") ? digits : digits.replace(/^0/, "+44")
      return `<a href="tel:${escHtml(href)}" style="${LINK_STYLE}">${escHtml(trimmed)}</a>`
    }
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return `<a href="${escHtml(trimmed)}" style="${LINK_STYLE}">${escHtml(trimmed)}</a>`
  }

  return escHtml(value)
}

// CID attachment — Gmail drops bare data: URIs
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

/** logoMode: "cid" for real sends, "data" for local HTML preview */
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

  const siteUrl = getFsSiteUrl()
  const siteHost = siteUrl.replace(/^https?:\/\//i, "")

  const rowsHtml = opts.rows
    .map(
      (r) => `
      <tr>
        <td style="padding:12px 0 4px;font-family:${FONT_BODY};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#b0b0b0;">
          ${escHtml(r.label)}
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 14px;font-family:${FONT_BODY};font-size:15px;line-height:1.45;color:#ffffff;border-bottom:${LINE};">
          ${formatRowValue(r.label, r.value)}
        </td>
      </tr>`
    )
    .join("")

  const messageText = opts.messageBody?.replace(/^\uFEFF/, "").trimEnd() ?? ""
  const messageBlock =
    messageText.length > 0
      ? `
      <tr>
        <td style="padding:18px 0 4px;font-family:${FONT_BODY};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#b0b0b0;">
          ${escHtml(opts.messageLabel || "Message")}
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 8px;font-family:${FONT_BODY};font-size:15px;line-height:1.55;color:#ffffff;white-space:pre-line;border-bottom:${LINE};">${escHtml(messageText.trimStart())}</td>
      </tr>`
      : ""

  const intro = opts.intro
    ? `<p style="margin:0 0 22px;font-family:${FONT_BODY};font-size:15px;line-height:1.55;color:#d0d0d0;">${escHtml(opts.intro)}</p>`
    : ""

  const footer = opts.footerNote
    ? `<p style="margin:28px 0 0;font-family:${FONT_BODY};font-size:12px;line-height:1.5;color:#a0a0a0;">${linkifyUrls(opts.footerNote)}</p>`
    : ""

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;500;600;700&family=Teko:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <!--[if mso]><style type="text/css">body, table, td, h1, p { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#000000;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#000000;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#000000;border:${LINE};">
          <tr>
            <td style="padding:28px 28px 4px;text-align:center;">
              <img src="${logo}" alt="APX Fire &amp; Security" width="200" style="display:inline-block;max-width:200px;height:auto;border:0;outline:none;"/>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 28px;">
              <h1 style="margin:0 0 16px;font-family:${FONT_TITLE};font-size:32px;line-height:1.15;font-weight:600;letter-spacing:0.02em;color:#ffffff;">
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
            <td style="padding:16px 28px 24px;border-top:${LINE};font-family:${FONT_BODY};font-size:11px;line-height:1.5;color:#a0a0a0;text-align:center;">
              APX Fire &amp; Security Ltd<br/>
              <a href="${escHtml(siteUrl)}" style="color:#ffffff;text-decoration:underline;">${escHtml(siteHost)}</a>
              &nbsp;&middot;&nbsp;
              <a href="mailto:${escHtml(FS_EMAIL)}" style="color:#ffffff;text-decoration:underline;">${escHtml(FS_EMAIL)}</a>
              &nbsp;&middot;&nbsp;
              <a href="tel:${escHtml(FS_PHONE_E164)}" style="color:#ffffff;text-decoration:underline;">${escHtml(FS_PHONE_DISPLAY)}</a>
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
