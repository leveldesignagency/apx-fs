import { APX_SOCIAL_LINKS } from "@/lib/apxSocialLinks"
import { BrandSocialIcon } from "@/components/icons/BrandSocialIcon"

type ApxSocialLinksProps = {
  className?: string
  iconClassName?: string
  linkClassName?: string
}

export function ApxSocialLinks({ className, iconClassName = "h-4 w-4", linkClassName }: ApxSocialLinksProps) {
  return (
    <div className={className}>
      {APX_SOCIAL_LINKS.map(({ platform, href, label }) => (
        <a
          key={platform}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label={label}
        >
          <BrandSocialIcon platform={platform} className={iconClassName} />
        </a>
      ))}
    </div>
  )
}
