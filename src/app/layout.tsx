import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "../context/I18nContext";
import { ModeProvider } from "../context/ModeContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { OfflineBanner } from "../components/OfflineBanner";
import { PwaRegister } from "../components/PwaRegister";
import { MobileBottomNavigation } from "../components/Navigation";

export const metadata: Metadata = {
  title: "GovEase | Independent Public Services Guide",
  description:
    "GovEase is an independent, citizen-centric discovery and navigation guide to essential public services in India. Zero advertising, verified official links, and zero server-side tracking.",
  applicationName: "GovEase",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  authors: [{ name: "Independent Public Technology Initiative" }],
  keywords: [
    "public services",
    "India citizen services",
    "government portals guide",
    "Sarathi",
    "Parivahan",
    "DigiLocker",
    "independent guide",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c2340",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <I18nProvider>
          <ModeProvider>
            <OfflineBanner />
            <PwaRegister />
            <Header />
            <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: "none" }}>
              {children}
            </main>
            <Footer />
            <MobileBottomNavigation />
          </ModeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
