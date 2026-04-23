import type { Metadata } from "next";
import { Bebas_Neue, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { MobileHomeContactFab } from "@/components/MobileHomeContactFab";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TitleFontProvider } from "@/contexts/TitleFontContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import CustomCursor from "@/components/CustomCursor";
import HeaderClient from "@/components/HeaderClient";
import { PremiumScroll } from "@/components/PremiumScroll";
import { RootJsonLd } from "@/components/RootJsonLd";
import { FS_SITE_NAME, fsDefaultDescription, fsKeywordsMetaString, getFsSiteUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

/** Display caps fallback alongside Erbaum (menu / brand UI) */
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const fsSiteUrl = getFsSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(fsSiteUrl),
  title: {
    default: `${FS_SITE_NAME} | Fire Alarms, CCTV & Access Control | London & South East`,
    template: `%s | ${FS_SITE_NAME}`,
  },
  description: fsDefaultDescription(),
  keywords: fsKeywordsMetaString(),
  applicationName: FS_SITE_NAME,
  authors: [{ name: FS_SITE_NAME }],
  creator: FS_SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: fsSiteUrl,
    siteName: FS_SITE_NAME,
    title: `${FS_SITE_NAME} | Fire & Security | London, Kent, Essex & Home Counties`,
    description: fsDefaultDescription(),
  },
  twitter: {
    card: "summary_large_image",
    title: `${FS_SITE_NAME} | London & South East`,
    description: fsDefaultDescription(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${plusJakartaSans.variable} ${bebasNeue.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <RootJsonLd />
        <PremiumScroll>
          <ThemeProvider>
            <TitleFontProvider>
              <ThemeWrapper>
                {/* site-shell: absolute header overlays hero; bar scrolls with page (not position:fixed) */}
                <div className="site-shell relative">
                  <HeaderClient />
                  <div className="relative z-10">
                    <CustomCursor />
                    <main>{children}</main>
                    <Footer />
                    <CookieConsent />
                    <MobileHomeContactFab
                      logoSrc="/__APX Web Logo FS.svg"
                      logoAlt="APX Fire & Security"
                      phoneDisplay="020 8303 2280"
                      phoneHref="tel:02083032280"
                      email="enquiries@apx-fs.co.uk"
                    />
                  </div>
                </div>
              </ThemeWrapper>
            </TitleFontProvider>
          </ThemeProvider>
        </PremiumScroll>
      </body>
    </html>
  );
}
