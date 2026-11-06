"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../../context/I18nContext";

export default function OfflinePage() {
  const { locale } = useTranslation();

  return (
    <div className="app-container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          backgroundColor: "var(--color-surface-card)",
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-md)",
          padding: "3rem 2rem",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "var(--color-neutral-200)",
            color: "var(--color-content-secondary)",
            marginBottom: "1.5rem",
          }}
          aria-hidden="true"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
            <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "var(--color-content-primary)",
            marginBottom: "0.75rem",
          }}
        >
          {locale === "hi" ? "आप ऑफ़लाइन हैं" : "You Are Currently Offline"}
        </h1>

        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--color-content-secondary)",
            marginBottom: "1.5rem",
            lineHeight: 1.5,
          }}
        >
          {locale === "hi"
            ? "इंटरनेट कनेक्शन उपलब्ध नहीं है। यह प्लेटफ़ॉर्म आपके डिवाइस पर पहले से सहेजे गए गाइड और प्राथमिकताओं को सुरक्षित रूप से प्रदर्शित कर सकता है।"
            : "No internet connection detected. The GovEase shell is running offline using locally cached resources."}
        </p>

        {/* Mandatory Date Stamp (§252: Never show a cached item as current without its date) */}
        <div
          style={{
            backgroundColor: "var(--color-surface-page)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-sm)",
            padding: "0.875rem 1rem",
            marginBottom: "2rem",
            fontSize: "0.875rem",
            color: "var(--color-content-secondary)",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "var(--color-content-primary)",
              marginBottom: "0.25rem",
            }}
          >
            {locale === "hi" ? "स्थानीय स्नैपशॉट विवरण" : "Local Snapshot Notice"}
          </div>
          <div>
            {locale === "hi"
              ? "ऑफ़लाइन कैटलॉग स्नैपशॉट सत्यापन तिथि: 2026-11-05 (संस्करण v0.1)"
              : "Offline catalogue snapshot verified on: 2026-11-05 (Release v0.1)"}
          </div>
          <div
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-content-tertiary)",
              marginTop: "0.25rem",
            }}
          >
            {locale === "hi"
              ? "जब आप पुनः ऑनलाइन होंगे तो नवीनतम नियम और लिंक स्वतः सिंक हो जाएंगे।"
              : "Live updates and outbound official portal handoffs will resume once connection is restored."}
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/saved"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.75rem 1.5rem",
              backgroundColor: "var(--color-brand-primary)",
              color: "var(--color-content-inverse)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              minHeight: "var(--min-touch-target)",
            }}
          >
            {locale === "hi" ? "सहेजी गई सेवाएं देखें" : "View Saved Services"}
          </Link>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.75rem 1.5rem",
              backgroundColor: "transparent",
              color: "var(--color-content-primary)",
              border: "1px solid var(--color-border-default)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              minHeight: "var(--min-touch-target)",
            }}
          >
            {locale === "hi" ? "मुखपृष्ठ पर लौटें" : "Go to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
