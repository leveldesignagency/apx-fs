import type { ApxSocialPlatform } from "@/lib/apxSocialLinks"

type BrandSocialIconProps = {
  platform: ApxSocialPlatform
  className?: string
}

export function BrandSocialIcon({ platform, className }: BrandSocialIconProps) {
  switch (platform) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M13.5 22v-8h2.7l.5-3.1H13.5V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10.9H8v3.1h2.1V22h3.4z" />
        </svg>
      )
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" />
        </svg>
      )
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M4.5 3A2.5 2.5 0 1 1 4.5 8 2.5 2.5 0 0 1 4.5 3zM3 9h3v12H3V9zm7 0h2.9v1.6h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5v6.1H14v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H7V9z" />
        </svg>
      )
    default:
      return null
  }
}
