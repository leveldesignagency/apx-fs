import type { SocialSharePlatform } from "@/lib/socialShare"
import { BrandSocialIcon } from "@/components/icons/BrandSocialIcon"

type SocialShareIconProps = {
  className?: string
}

export function SocialShareIcon({ platform, className }: SocialShareIconProps & { platform: SocialSharePlatform }) {
  switch (platform) {
    case "facebook":
      return <BrandSocialIcon platform="facebook" className={className} />
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M16.6 3H19l-6.1 7 7.2 11H14l-4.4-5.8L4.8 21H2.4l6.6-7.5L2 3h5.5l4 5.3L16.6 3zm-1.2 16.2h1.5L7.7 4.8H6.1l9.3 14.4z" />
        </svg>
      )
    case "linkedin":
      return <BrandSocialIcon platform="linkedin" className={className} />
    case "pinterest":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M12 2a10 10 0 0 0-3.5 19.4c-.1-.8-.1-2 0-2.9l1.4-5.9s-.4-.8-.4-2c0-1.9 1.1-3.3 2.5-3.3 1.2 0 1.8.9 1.8 2 0 1.2-.8 3-1.2 4.6-.3 1.3.7 2.4 1.9 2.4 2.3 0 3.8-2.9 3.8-6.4 0-2.6-1.8-4.6-5.1-4.6-3.8 0-6.2 2.8-6.2 6 0 1.1.4 2.3 1 2.9.1.1.1.2.1.3l-.4 1.5c0 .2-.1.2-.3.1-1.1-.5-1.8-2.2-1.8-3.6 0-2.9 2.4-6.4 7.3-6.4 3.9 0 6.5 2.8 6.5 5.8 0 4-2.2 7-5.5 7-1.1 0-2.1-.6-2.5-1.3l-.7 2.6c-.2.9-.8 2-1.2 2.7A10 10 0 1 0 12 2z" />
        </svg>
      )
    case "email":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M4 4h16a2 2 0 0 1 2 2v.3L12 13 2 6.3V6a2 2 0 0 1 2-2zm-2 6.8V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10.8l-9.4 6.8a2 2 0 0 1-2.2 0L2 10.8z" />
        </svg>
      )
    default:
      return null
  }
}

export function SocialShareLinkIcon({ className }: SocialShareIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M10.59 13.41a1 1 0 0 1 0-1.41l2.17-2.17H7a4 4 0 1 0 0 8h2a1 1 0 1 1 0 2H7a6 6 0 1 1 0-12h5.76L10.59 8.59A1 1 0 1 1 12 7.17l4.24 4.24a1 1 0 0 1 0 1.41L12 16.83a1 1 0 0 1-1.41-1.42zM17 7a1 1 0 0 1 1-1h2a4 4 0 1 1 0 8h-2a1 1 0 1 1 0-2h2a2 2 0 1 0 0-4h-2a1 1 0 0 1-1-1z" />
    </svg>
  )
}

export function SocialShareCheckIcon({ className }: SocialShareIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M9.55 16.45 4.1 11l1.41-1.41 4.04 4.04 9.04-9.04L20 6.55z" />
    </svg>
  )
}
