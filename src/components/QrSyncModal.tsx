"use client";

import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";

interface QrSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  locale: string;
}

export function QrSyncModal({ isOpen, onClose, savedIds, locale }: QrSyncModalProps) {
  const [svgMarkup, setSvgMarkup] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const syncUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/saved?sync=${savedIds.join(",")}`
      : "";

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;

    const url = `${window.location.origin}/saved?sync=${savedIds.join(",")}`;

    QRCode.toString(url, {
      type: "svg",
      margin: 1,
      width: 220,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    })
      .then((svg) => setSvgMarkup(svg))
      .catch((err) => console.error("QR Code Generation Error:", err));
  }, [isOpen, savedIds]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(syncUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-sync-title"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "1rem",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "var(--color-surface-card)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border-default)",
          padding: "1.75rem",
          maxWidth: "440px",
          width: "100%",
          boxShadow: "var(--shadow-lg)",
          color: "var(--color-content-primary)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1rem",
          }}
        >
          <h2 id="qr-sync-title" style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
            {locale === "hi"
              ? "मोबाइल में स्थानांतरित करें (QR कोड)"
              : locale === "bn"
                ? "মোবাইলে সিঙ্ক করুন (QR কোড)"
                : locale === "ta"
                  ? "மொபைலுக்கு ஒத்திசைக்கவும் (QR குறியீடு)"
                  : "Sync to Mobile (Instant QR)"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              lineHeight: 1,
              color: "var(--color-content-secondary)",
              cursor: "pointer",
              padding: "0.25rem",
            }}
          >
            ×
          </button>
        </div>

        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-content-secondary)",
            lineHeight: 1.5,
            marginBottom: "1.25rem",
          }}
        >
          {locale === "hi"
            ? "सरकारी कार्यालय या जन सेवा केंद्र जाने से पहले अपने फोन के कैमरे से इस कोड को स्कैन करें। आपके सहेजे गए दस्तावेज़ और चेकलिस्ट तुरंत आपके फोन में खुल जाएंगे।"
            : "Scan this QR code with your smartphone camera to instantly access your saved services and preparation checklist on your phone without creating an account."}
        </p>

        {/* QR Code Container */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border-subtle)",
            marginBottom: "1.25rem",
          }}
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />

        <div
          style={{
            fontSize: "0.8125rem",
            color: "var(--color-content-tertiary)",
            textAlign: "center",
            marginBottom: "1.25rem",
          }}
        >
          {locale === "hi"
            ? `शून्य डेटा शेयरिंग • ${savedIds.length} सेवा संदर्भ एन्कोडेड हैं`
            : `100% Zero-Knowledge • ${savedIds.length} service references encoded in URL`}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={handleCopy}
            style={{
              flex: 1,
              padding: "0.625rem 1rem",
              backgroundColor: "var(--color-brand-primary)",
              color: "#ffffff",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            {copied
              ? locale === "hi"
                ? "✓ लिंक कॉपी हो गया!"
                : "✓ Link Copied!"
              : locale === "hi"
                ? "सिंक लिंक कॉपी करें"
                : "Copy Sync Link"}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "0.625rem 1rem",
              backgroundColor: "var(--color-surface-page)",
              color: "var(--color-content-primary)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-sm)",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            {locale === "hi" ? "बंद करें" : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}
