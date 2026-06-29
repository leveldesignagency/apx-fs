import { Check, Link2, Mail } from "lucide-react"
import { FaLinkedin } from "react-icons/fa6"
import { SiFacebook, SiPinterest, SiX } from "react-icons/si"
import type { SocialSharePlatform } from "@/lib/socialShare"

type SocialShareIconProps = {
  className?: string
}

/** Share targets use Simple Icons brand glyphs; utility icons use Lucide. */
export function SocialShareIcon({ platform, className }: SocialShareIconProps & { platform: SocialSharePlatform }) {
  switch (platform) {
    case "facebook":
      return <SiFacebook className={className} aria-hidden />
    case "x":
      return <SiX className={className} aria-hidden />
    case "linkedin":
      return <FaLinkedin className={className} aria-hidden />
    case "pinterest":
      return <SiPinterest className={className} aria-hidden />
    case "email":
      return <Mail className={className} strokeWidth={2} aria-hidden />
    default:
      return null
  }
}

export function SocialShareLinkIcon({ className }: SocialShareIconProps) {
  return <Link2 className={className} strokeWidth={2} aria-hidden />
}

export function SocialShareCheckIcon({ className }: SocialShareIconProps) {
  return <Check className={className} strokeWidth={2.5} aria-hidden />
}
