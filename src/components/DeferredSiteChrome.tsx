"use client"

import dynamic from "next/dynamic"

const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false })
const HomeSearchIntentBanner = dynamic(
  () => import("@/components/home/HomeSearchIntentBanner").then((m) => m.HomeSearchIntentBanner),
  { ssr: false }
)
const SearchAnchorFlash = dynamic(
  () => import("@/components/home/SearchAnchorFlash").then((m) => m.SearchAnchorFlash),
  { ssr: false }
)
const FsHomeHeroScrollGuard = dynamic(
  () => import("@/components/FsHomeHeroScrollGuard").then((m) => m.FsHomeHeroScrollGuard),
  { ssr: false }
)
const MobileHomeContactFab = dynamic(
  () => import("@/components/MobileHomeContactFab").then((m) => m.MobileHomeContactFab),
  { ssr: false }
)

/** Non-critical chrome deferred from the root layout server bundle. */
export function DeferredSiteChrome() {
  return (
    <>
      <FsHomeHeroScrollGuard />
      <HomeSearchIntentBanner />
      <SearchAnchorFlash />
      <CustomCursor />
      <CookieConsent />
      <MobileHomeContactFab
        phoneDisplay="020 8303 2280"
        phoneHref="tel:02083032280"
        email="enquiries@apx-fs.co.uk"
      />
    </>
  )
}
