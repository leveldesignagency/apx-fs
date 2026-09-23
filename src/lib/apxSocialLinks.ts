export type ApxSocialPlatform = "instagram" | "linkedin" | "facebook" | "x" | "google"

export type ApxSocialLink = {
  platform: ApxSocialPlatform
  href: string
  label: string
}

/** APX Fire & Security social / local profiles */
export const APX_SOCIAL_LINKS: ApxSocialLink[] = [
  {
    platform: "instagram",
    href: "https://www.instagram.com/apxfiresecurity/",
    label: "APX Fire & Security on Instagram",
  },
  {
    platform: "linkedin",
    href: "https://www.linkedin.com/company/smithstechnicalsystems/",
    label: "APX Fire & Security on LinkedIn",
  },
  {
    platform: "facebook",
    href: "https://www.facebook.com/smithstechnical",
    label: "APX Fire & Security on Facebook",
  },
  {
    platform: "x",
    href: "https://x.com/smithstechsys",
    label: "APX Fire & Security on X",
  },
  {
    platform: "google",
    href: "https://www.google.com/search?q=apx+fire+and+security",
    label: "APX Fire & Security on Google",
  },
]
