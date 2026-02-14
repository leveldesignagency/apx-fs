import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TitleFontProvider } from "@/contexts/TitleFontContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "APX Fire & Security - Professional Fire Safety & Security Systems | UK",
  description: "Professional fire safety and security systems across the UK. Fire alarms, CCTV, access control, and life safety solutions. Trusted for over 20 years.",
  keywords: "fire safety, security systems, fire alarms, CCTV, access control, UK, APX Fire & Security",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/apx-logo.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apx-logo.svg',
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
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <TitleFontProvider>
          <ThemeWrapper>
        <CustomCursor />
        <HeroVideoBackground />
        <Header />
            <main>{children}</main>
        <Footer />
            <CookieConsent />
          </ThemeWrapper>
          </TitleFontProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
