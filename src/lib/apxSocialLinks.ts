export type ApxSocialPlatform = "facebook" | "instagram" | "linkedin"

export type ApxSocialLink = {
  platform: ApxSocialPlatform
  href: string
  label: string
}

/** APX Fire & Security social profiles */
export const APX_SOCIAL_LINKS: ApxSocialLink[] = [
  {
    platform: "facebook",
    href: "https://www.facebook.com/smithstechnical",
    label: "Facebook",
  },
  {
    platform: "instagram",
    href: "https://www.instagram.com/smithstechnical/",
    label: "Instagram",
  },
  {
    platform: "linkedin",
    href: "https://www.linkedin.com/company/smithstechnicalsystems/",
    label: "LinkedIn",
  },
]
