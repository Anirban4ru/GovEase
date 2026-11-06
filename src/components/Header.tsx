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

      {/* Independent Guide Disclaimer Banner */}
      <div
        style={{
          backgroundColor: "var(--color-neutral-100)",
          borderBottom: "1px solid var(--color-border-default)",
          padding: "0.375rem 1rem",
          fontSize: "0.8125rem",
          color: "var(--color-content-secondary)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--color-status-warning)",
              }}
              aria-hidden="true"
            />
            <span style={{ fontWeight: 600 }}>{t("common.disclaimerBadge")}</span>
          </div>
          <span
            style={{ fontSize: "0.75rem", color: "var(--color-content-tertiary)" }}
            className="hidden sm:inline"
          >
            Zero Advertising • Zero Data Sharing • Open Citizen Access
          </span>
        </div>
      </div>

      {/* Main App Bar */}
      <header
        style={{
          backgroundColor: "var(--color-surface-page)",
          borderBottom: "1px solid var(--color-border-default)",
          padding: "0.75rem 0",
          position: "sticky",
          top: 0,
          zIndex: 40,
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
          {/* Brand & Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
              color: "inherit",
              minWidth: 0,
              flexShrink: 1,
            }}
          >
            <span
              style={{
                fontSize: "1.0625rem",
                fontWeight: 700,
                color: "var(--color-brand-primary)",
                letterSpacing: "-0.01em",
                wordBreak: "break-word",
              }}
            >
              {t("common.appName")}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-content-secondary)",
                fontWeight: 500,
              }}
            >
              {t("common.tagline")}
            </span>
          </Link>

          {/* Desktop Primary Nav */}
          <div className="hidden md:block">
            <DesktopNavigation />
          </div>

          {/* Controls: Mode & Language */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            {/* Mode Selector */}
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
                  padding: "0.375rem 0.625rem",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  backgroundColor: "var(--color-neutral-100)",
                  color: "var(--color-content-primary)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  minHeight: "var(--min-touch-target)",
                }}
              >
                <span>{t(`modes.${mode}`)}</span>
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
                          mode === opt.id ? "var(--color-brand-primary-subtle)" : "transparent",
                        color:
                          mode === opt.id
                            ? "var(--color-brand-primary)"
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
                minHeight: "var(--min-touch-target)",
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
                    padding: "0.375rem 0.5rem",
                    fontSize: "0.8125rem",
                    fontWeight: locale === lang.id ? 700 : 500,
                    backgroundColor:
                      locale === lang.id
                        ? "var(--color-brand-primary)"
                        : "var(--color-surface-page)",
                    color:
                      locale === lang.id
                        ? "var(--color-content-inverse)"
                        : "var(--color-content-primary)",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
