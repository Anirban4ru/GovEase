"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "../context/I18nContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaRegister() {
  const { locale } = useTranslation();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          if (process.env.NODE_ENV !== "production") {
            console.log("[PWA] Service Worker registered:", reg.scope);
          }
        })
        .catch((err) => {
          console.warn("[PWA] Service Worker registration failed:", err);
        });
    }

    // 2. Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setInstallPrompt(promptEvent);

      // Check if user previously dismissed permanently
      try {
        const dismissed = localStorage.getItem("uls_pwa_dismissed");
        if (dismissed !== "true") {
          setIsVisible(true);
        }
      } catch {
        // Fallback if localStorage restricted
        setIsVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setIsVisible(false);
      setInstallPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem("uls_pwa_dismissed", "true");
    } catch {
      // Storage unavailable
    }
  };

  if (!isVisible || !installPrompt) {
    return null;
  }

  return (
    <aside
      aria-label="Install App Notice"
      className="no-print motion-reveal"
      style={{
        position: "fixed",
        bottom: "4.5rem", // Clears mobile bottom navigation bar
        right: "1rem",
        left: "1rem",
        maxWidth: "400px",
        margin: "0 auto",
        zIndex: 90,
        backgroundColor: "var(--color-surface-card)",
        border: "1px solid var(--color-border-strong)",
        borderRadius: "var(--radius-lg)",
        padding: "0.875rem 1rem",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--color-brand-primary-subtle)",
            color: "var(--color-brand-primary)",
            flexShrink: 0,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "0.9375rem",
              color: "var(--color-content-primary)",
            }}
          >
            {locale === "hi"
              ? "ऑफ़लाइन उपयोग के लिए ऐप इंस्टॉल करें"
              : locale === "bn"
                ? "অফলাইন ব্যবহারের জন্য ইনস্টল করুন"
                : locale === "ta"
                  ? "ஆஃப்லைன் பயன்பாட்டிற்கு நிறுவவும்"
                  : "Install for Offline Access"}
          </div>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-content-secondary)",
              margin: "0.2rem 0 0.5rem 0",
              lineHeight: 1.4,
            }}
          >
            {locale === "hi"
              ? "बिना इंटरनेट सीधे अपने फोन से सरकारी सेवा गाइड देखें।"
              : locale === "bn"
                ? "ইন্টারনেট ছাড়া সরাসরি আপনার ডিভাইসে অ্যাক্সেস করুন।"
                : locale === "ta"
                  ? "இணைய இணைப்பு இல்லாமல் நேரடியாக அணுகவும்."
                  : "Access essential civic guidance directly on your device without network."}
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={handleInstallClick}
              style={{
                backgroundColor: "var(--color-brand-primary)",
                color: "var(--color-neutral-0)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                padding: "0.35rem 0.75rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {locale === "hi" ? "इंस्टॉल करें" : "Install"}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              style={{
                backgroundColor: "transparent",
                color: "var(--color-content-secondary)",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-sm)",
                padding: "0.35rem 0.75rem",
                fontSize: "0.8125rem",
                cursor: "pointer",
              }}
            >
              {locale === "hi" ? "खारिज करें" : "Dismiss"}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
