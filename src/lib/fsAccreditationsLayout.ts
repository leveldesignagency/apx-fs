import type { FsAccreditationSlug } from "@/data/fsAccreditations"
import { FS_PROJECTS_CONTENT_MAX, FS_PROJECTS_SECTION_PX } from "@/lib/fsProjectsLayout"

export const FS_ACCREDITATIONS_SECTION_PX = FS_PROJECTS_SECTION_PX
export const FS_ACCREDITATIONS_CONTENT_MAX = FS_PROJECTS_CONTENT_MAX
export const FS_ACCREDITATIONS_HERO_IMAGE = "/accredited-apx-fs.jpg"

/** Coloured marks for dark backgrounds — matches homepage accreditations band */
export const FS_ACCREDITATION_COLOURED_ICONS: Record<FsAccreditationSlug, string> = {
  bafe: "/accreditations%20mono/Coloured/BAFE-01.svg",
  nsi: "/accreditations%20mono/Coloured/NSI-01.png",
  constructionline: "/accreditations%20mono/Coloured/ConstructionOnline-01.svg",
  fia: "/accreditations%20mono/Coloured/FIA-01.svg",
}

/** Square-corner pill CTAs — same pattern as projects listing */
export const FS_ACCREDITATIONS_GRID_CTA_CLASS =
  "pill-btn pill-btn--square relative inline-flex cursor-pointer items-center justify-center overflow-hidden bg-black px-4 py-2.5 text-xs uppercase tracking-[0.12em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
