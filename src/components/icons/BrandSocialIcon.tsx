import { FaLinkedin } from "react-icons/fa6"
import { SiFacebook, SiX } from "react-icons/si"
import type { ApxSocialPlatform } from "@/lib/apxSocialLinks"

type BrandSocialIconProps = {
  platform: ApxSocialPlatform
  className?: string
}

/** Official brand glyphs from Simple Icons (react-icons/si). */
export function BrandSocialIcon({ platform, className }: BrandSocialIconProps) {
  switch (platform) {
    case "facebook":
      return <SiFacebook className={className} aria-hidden />
    case "x":
      return <SiX className={className} aria-hidden />
    case "linkedin":
      return <FaLinkedin className={className} aria-hidden />
    default:
      return null
  }
}
