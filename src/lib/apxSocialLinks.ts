export type ApxSocialPlatform = "facebook" | "x" | "linkedin"

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
    platform: "x",
    href: "https://x.com/smithstechsys",
    label: "X",
  },
  {
    platform: "linkedin",
    href: "https://www.linkedin.com/company/smithstechnicalsystems/",
    label: "LinkedIn",
  },
]
