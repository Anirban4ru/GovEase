"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation, Locale } from "../context/I18nContext";
import { usePresentationMode, PresentationMode } from "../context/ModeContext";
import { DesktopNavigation } from "./Navigation";

export function Header() {
  const { t, locale, setLocale } = useTranslation();
  const { mode, setMode } = usePresentationMode();
  const [modeMenuOpen, setModeMenuOpen] = useState(false);

  const modeOptions: { id: PresentationMode; labelKey: string }[] = [
    { id: "standard", labelKey: "modes.standard" },
    { id: "simple", labelKey: "modes.simple" },
    { id: "assisted", labelKey: "modes.assisted" },
  ];

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        {t("common.skipToContent")}
      </a>

      {/* Cartographic Field Map Accent Ribbon */}
      <div className="civic-map-ribbon civic-tricolor-bar" role="presentation" aria-hidden="true" />

      {/* Level 1: Sovereign Utility & Accessibility Strip */}
      <div
        role="region"
        aria-label="Public Benefit Trust Banner"
        style={{
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid var(--color-border-default)",
          padding: "0.35rem 0",
          fontSize: "0.8125rem",
          color: "var(--color-content-secondary)",
        }}
      >
        <div
          className="app-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {/* Left: Official Trust Stamp */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--color-govease-green, #1c7e41)",
              }}
              aria-hidden="true"
            />
            <span style={{ fontWeight: 700, color: "var(--color-govease-navy, #0d3570)" }}>
              {t("common.disclaimerBadge")}
            </span>
            <span
              className="hidden md:inline"
              style={{
                fontSize: "0.75rem",
                color: "#64748b",
                paddingLeft: "0.25rem",
              }}
            >
              • 100% Official .gov.in & .nic.in Portals
            </span>
          </div>

          {/* Right: Controls (Language Switcher & Mode Selector) */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            {/* Presentation Mode Selector */}
            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setModeMenuOpen(!modeMenuOpen)}
                aria-expanded={modeMenuOpen}
                aria-label={`${t("modes.label")}: ${t(`modes.${mode}`)}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.25rem 0.55rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  backgroundColor: "#ffffff",
                  color: "var(--color-govease-navy, #0d3570)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
              >
                <span>{t(`modes.${mode}`)}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {modeMenuOpen && (
                <div
                  role="menu"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 4px)",
                    backgroundColor: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border-default)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-md)",
                    zIndex: 60,
                    minWidth: "180px",
                    padding: "0.25rem 0",
                  }}
                >
                  <div
                    style={{
                      padding: "0.375rem 0.75rem",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "var(--color-content-tertiary)",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("modes.label")}
                  </div>
                  {modeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      role="menuitem"
                      type="button"
                      onClick={() => {
                        setMode(opt.id);
                        setModeMenuOpen(false);
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "0.5rem 0.75rem",
                        fontSize: "0.8125rem",
                        backgroundColor:
                          mode === opt.id
                            ? "var(--color-govease-saffron-subtle, rgba(252, 125, 27, 0.08))"
                            : "transparent",
                        color:
                          mode === opt.id
                            ? "var(--color-govease-navy, #0d3570)"
                            : "var(--color-content-primary)",
                        fontWeight: mode === opt.id ? 700 : 500,
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {t(opt.labelKey)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div
              role="group"
              aria-label={t("languages.label")}
              style={{
                display: "inline-flex",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                backgroundColor: "#ffffff",
              }}
            >
              {(
                [
                  { id: "en", label: "EN", title: "English" },
                  { id: "hi", label: "हिंदी", title: "Hindi" },
                  { id: "bn", label: "বাংলা", title: "Bengali" },
                  { id: "ta", label: "தமிழ்", title: "Tamil" },
                ] as const
              ).map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setLocale(lang.id as Locale)}
                  aria-pressed={locale === lang.id}
                  aria-label={`${lang.label} (${lang.title})`}
                  style={{
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.75rem",
                    fontWeight: locale === lang.id ? 700 : 500,
                    backgroundColor:
                      locale === lang.id ? "var(--color-govease-navy, #0d3570)" : "transparent",
                    color: locale === lang.id ? "#ffffff" : "var(--color-content-primary)",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Level 2: Main Application Header */}
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid var(--color-border-default)",
          padding: "0.85rem 0",
          position: "sticky",
          top: 0,
          zIndex: 40,
          boxShadow: "0 1px 3px rgba(13, 53, 112, 0.04)",
        }}
      >
        <div
          className="app-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          {/* Brand & Logo - Prominent, Bold, Sovereign */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              textDecoration: "none",
              color: "inherit",
              minWidth: 0,
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/govease-seal.png"
              alt="GovEase Official Seal"
              width="54"
              height="57"
              style={{
                height: "54px",
                width: "auto",
                objectFit: "contain",
                flexShrink: 0,
                filter: "drop-shadow(0 2px 4px rgba(13, 53, 112, 0.12))",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <span style={{ color: "var(--color-govease-navy, #0d3570)" }}>Gov</span>
                <span style={{ color: "var(--color-govease-saffron-text, #c2410c)" }}>Ease</span>
              </div>
              <span
                style={{
                  fontSize: "0.8125rem",
                  color: "#334155",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  marginTop: "2px",
                }}
              >
                {t("common.tagline")}
              </span>
            </div>
          </Link>

          {/* Desktop Primary Nav & Action Button */}
          <div
            className="hidden lg:flex"
            style={{
              alignItems: "center",
              gap: "1.75rem",
              flexShrink: 0,
            }}
          >
            <DesktopNavigation />
            <Link
              href="/explore"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-govease-navy, #0d3570)",
                color: "#ffffff",
                borderRadius: "var(--radius-sm)",
                fontWeight: 700,
                fontSize: "0.8125rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                boxShadow: "0 1px 2px rgba(13, 53, 112, 0.15)",
                transition: "background-color 0.15s ease",
              }}
            >
              <span>{t("nav.explore")} Directory</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
