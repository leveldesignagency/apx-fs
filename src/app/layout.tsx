import type { Metadata } from "next";
import { Bebas_Neue, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TitleFontProvider } from "@/contexts/TitleFontContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import CustomCursor from "@/components/CustomCursor";
import HeaderClient from "@/components/HeaderClient";

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

export const metadata: Metadata = {
  title: "APX Fire & Security - Professional Fire Safety & Security Systems | UK",
  description: "Professional fire safety and security systems across the UK. Fire alarms, CCTV, access control, and life safety solutions. Trusted for over 20 years.",
  keywords: "fire safety, security systems, fire alarms, CCTV, access control, UK, APX Fire & Security",
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "APX Fire & Security - Fire Safety & Security Solutions",
    description: "Professional fire safety and security systems across the UK.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${bebasNeue.variable}`}>
      <body className="font-sans antialiased">
        <HeroVideoBackground />
        <div className="relative z-10">
          <ThemeProvider>
            <TitleFontProvider>
              <ThemeWrapper>
                <CustomCursor />
                  <HeaderClient />
                <main>{children}</main>
                <Footer />
                <CookieConsent />
              </ThemeWrapper>
            </TitleFontProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
