"use client";

import React from "react";
import { useTranslation } from "../../context/I18nContext";

export default function ExplorePage() {
  const { t, locale } = useTranslation();

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
          {locale === "hi" ? "सार्वजनिक सेवा सूची" : "Explore Public Services"}
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-content-secondary)", margin: 0 }}>
          {locale === "hi"
            ? "सत्यापित सरकारी सेवाओं को श्रेणी या जीवन क्षेत्र के अनुसार खोजें।"
            : "Browse verified government services organised by life area and citizen goal."}
        </p>
      </div>

      {/* Featured Verified Entry for M1 Shell Demonstration */}
      <div
        style={{
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          backgroundColor: "var(--color-surface-page)",
          boxShadow: "var(--shadow-sm)",
          maxWidth: "760px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              backgroundColor: "var(--color-brand-primary-subtle)",
              color: "var(--color-brand-primary)",
              padding: "0.25rem 0.5rem",
              borderRadius: "var(--radius-xs)",
            }}
          >
            Mobility & Transport
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--color-content-tertiary)",
              fontWeight: 600,
            }}
          >
            {t("common.verifiedOn")} 2026-11-05
          </span>
        </div>

        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            margin: "0.5rem 0",
            color: "var(--color-content-primary)",
          }}
        >
          {locale === "hi" ? "ड्राइविंग लाइसेंस नवीनीकरण" : "Driving Licence Renewal"}
        </h2>
        <p
          style={{
            fontSize: "0.9375rem",
            color: "var(--color-content-secondary)",
            lineHeight: 1.6,
            margin: "0 0 1rem 0",
          }}
        >
          {locale === "hi"
            ? "सड़क परिवहन और राजमार्ग मंत्रालय (MoRTH) के आधिकारिक सारथी पोर्टल के माध्यम से ड्राइविंग लाइसेंस नवीनीकरण की प्रक्रिया और आवश्यक दस्तावेज।"
            : "Step-by-step guidance for renewing your Indian driving licence via the official Ministry of Road Transport and Highways (MoRTH) Sarathi portal."}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
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
            <span>{locale === "hi" ? "आधिकारिक पोर्टल पर जाएँ" : "Go to Official Portal"}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-content-tertiary)" }}>
            {t("common.officialSource")} <code>sarathi.parivahan.gov.in</code>
          </span>
        </div>
      </div>
    </div>
  );
}
