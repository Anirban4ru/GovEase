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
          // SW registered
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

      // Check if user previously dismissed
      const dismissed = localStorage.getItem("uls_pwa_dismissed");
      if (dismissed !== "true") {
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
      aria-label="Install App Banner"
      className="no-print"
      style={{
        backgroundColor: "var(--color-surface-card)",
        borderBottom: "1px solid var(--color-border-default)",
        padding: "0.75rem 1rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        className="app-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-brand-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          <span
            style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-content-primary)" }}
          >
            {locale === "hi"
              ? "ऑफ़लाइन पहुँच के लिए इस ऐप को अपने डिवाइस पर इंस्टॉल करें"
              : "Install Unified Life Services for instant offline access on your device"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={handleInstallClick}
            style={{
              padding: "0.375rem 0.875rem",
              backgroundColor: "var(--color-brand-primary)",
              color: "var(--color-content-inverse)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontWeight: 600,
              fontSize: "0.8125rem",
              cursor: "pointer",
              minHeight: "var(--min-touch-target)",
            }}
          >
            {locale === "hi" ? "इंस्टॉल करें" : "Install"}
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss install prompt"
            style={{
              padding: "0.375rem 0.75rem",
              backgroundColor: "transparent",
              color: "var(--color-content-secondary)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-sm)",
              fontWeight: 500,
              fontSize: "0.8125rem",
              cursor: "pointer",
              minHeight: "var(--min-touch-target)",
            }}
          >
            {locale === "hi" ? "खारिज करें" : "Dismiss"}
          </button>
        </div>
      </div>
    </aside>
  );
}
