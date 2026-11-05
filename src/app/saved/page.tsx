"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../../context/I18nContext";

export default function SavedPage() {
  const { locale } = useTranslation();

  return (
    <div className="app-container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--color-content-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {locale === "hi" ? "सहेजे गए सेवा संदर्भ" : "Saved Service References"}
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-content-secondary)", margin: 0 }}>
          {locale === "hi"
            ? "आपके द्वारा सहेजी गई सेवाएँ केवल इस डिवाइस पर सुरक्षित रूप से संग्रहीत हैं।"
            : "Services you bookmark are saved exclusively on your local device without any server tracking."}
        </p>
      </div>

      <div
        style={{
          border: "1px dashed var(--color-border-default)",
          borderRadius: "var(--radius-md)",
          padding: "3rem 1.5rem",
          textAlign: "center",
          backgroundColor: "var(--color-surface-card)",
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-content-tertiary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ margin: "0 auto 1rem auto" }}
          aria-hidden="true"
        >
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--color-content-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {locale === "hi" ? "अभी कोई सहेजी गई सेवा नहीं है" : "No saved services yet"}
        </h2>
        <p
          style={{
            fontSize: "0.9375rem",
            color: "var(--color-content-secondary)",
            maxWidth: "480px",
            margin: "0 auto 1.5rem auto",
          }}
        >
          {locale === "hi"
            ? "सेवा सूची ब्राउज़ करते समय आप किसी भी सेवा को त्वरित पहुँच के लिए यहाँ सहेज सकते हैं।"
            : "When browsing services, bookmark items for quick offline access on this device."}
        </p>
        <Link
          href="/explore"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.625rem 1.25rem",
            backgroundColor: "var(--color-brand-primary)",
            color: "var(--color-content-inverse)",
            fontWeight: 700,
            fontSize: "0.875rem",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
            minHeight: "var(--min-touch-target)",
          }}
        >
          {locale === "hi" ? "सेवाएं खोजें" : "Explore Services"}
        </Link>
      </div>
    </div>
  );
}
