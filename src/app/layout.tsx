import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "../context/I18nContext";
import { ModeProvider } from "../context/ModeContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { OfflineBanner } from "../components/OfflineBanner";
import { MobileBottomNavigation } from "../components/Navigation";

export const metadata: Metadata = {
  title: "Unified Life Services Platform | Independent Public Services Guide",
  description:
    "An independent, citizen-centric discovery and navigation guide to essential public services in India. Zero advertising, verified official links, and zero server-side tracking.",
  applicationName: "Unified Life Services Platform",
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
  themeColor: "#1d4e8f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <I18nProvider>
          <ModeProvider>
            <OfflineBanner />
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
