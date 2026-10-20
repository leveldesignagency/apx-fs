import type { Metadata } from "next"
import { Bebas_Neue, Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { TitleFontProvider } from "@/contexts/TitleFontContext"
import ThemeWrapper from "@/components/ThemeWrapper"
import HeaderClient from "@/components/HeaderClient"
import { PremiumScroll } from "@/components/PremiumScroll"
import { RootJsonLd } from "@/components/RootJsonLd"
import { DeferredSiteChrome } from "@/components/DeferredSiteChrome"
import {
  FS_DEFAULT_OG_PATH,
  FS_SITE_NAME,
  fsAbsoluteUrl,
  fsDefaultDescription,
  fsKeywordsMetaString,
  getFsSiteUrl,
} from "@/lib/seo"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
})

// fallback display font next to Erbaum
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
})

const fsSiteUrl = getFsSiteUrl()
const defaultOg = fsAbsoluteUrl(FS_DEFAULT_OG_PATH)

export const metadata: Metadata = {
  metadataBase: new URL(fsSiteUrl),
  title: {
    default: `${FS_SITE_NAME} | Fire Alarms, CCTV & Access Control | London & South East`,
    template: `%s | ${FS_SITE_NAME}`,
  },
  description: fsDefaultDescription(),
  keywords: fsKeywordsMetaString(),
  applicationName: FS_SITE_NAME,
  authors: [{ name: FS_SITE_NAME, url: fsSiteUrl }],
  creator: FS_SITE_NAME,
  publisher: FS_SITE_NAME,
  category: "Fire and Security",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-48.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: fsSiteUrl,
    siteName: FS_SITE_NAME,
    title: `${FS_SITE_NAME} | Fire & Security | London, Kent, Essex & Home Counties`,
    description: fsDefaultDescription(),
    images: [
      {
        url: defaultOg,
        width: 1200,
        height: 630,
        alt: `${FS_SITE_NAME} — Fire alarms, CCTV and access control`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${FS_SITE_NAME} | London & South East`,
    description: fsDefaultDescription(),
    images: [defaultOg],
  },
  alternates: {
    canonical: fsSiteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${plusJakartaSans.variable} ${bebasNeue.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* beforeInteractive: pin `/` to hero before hydration / scroll restoration */}
        <Script
          id="fs-home-hero-scroll"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if("scrollRestoration"in history)history.scrollRestoration="manual";var p=location.pathname.replace(/\\/$/,"")||"/";var h=location.hash;if(p==="/"&&(!h||h==="#hero"||h==="#services")){if(h==="#services"||h==="#hero")history.replaceState(null,"",location.pathname+location.search);window.scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0;}}catch(e){}})();`,
          }}
        />
        <RootJsonLd />
        <PremiumScroll>
          <ThemeProvider>
            <TitleFontProvider>
              <ThemeWrapper>
                {/* site-shell: absolute header overlays hero; bar scrolls with page (not position:fixed) */}
                <div className="site-shell relative">
                  <HeaderClient />
                  <div className="relative z-10">
                    <main>{children}</main>
                    <Footer />
                  </div>
                  <DeferredSiteChrome />
                </div>
              </ThemeWrapper>
            </TitleFontProvider>
          </ThemeProvider>
        </PremiumScroll>
        <SpeedInsights />
      </body>
    </html>
  )
}
