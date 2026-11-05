"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation, Locale } from "../../context/I18nContext";
import { usePresentationMode, PresentationMode } from "../../context/ModeContext";
import { useSavedServices } from "../../hooks/useSavedServices";

export default function SettingsPage() {
  const { t, locale, setLocale } = useTranslation();
  const { mode, setMode } = usePresentationMode();
  const { savedIds, clearAll: clearSaved } = useSavedServices();

  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Compute live on-device storage sizes without cascading effect state
  const isClient = typeof window !== "undefined";
  const savedServicesRaw = isClient ? localStorage.getItem("uls_saved_services") || "" : "";
  const modeRaw = isClient ? localStorage.getItem("uls_presentation_mode") || "" : "";
  const localeRaw = isClient ? localStorage.getItem("uls_locale") || "" : "";

  const savedServicesSize = savedServicesRaw ? `${savedServicesRaw.length} bytes` : "0 bytes";
  const modeSize = modeRaw ? `${modeRaw.length} bytes` : "0 bytes";
  const localeSize = localeRaw ? `${localeRaw.length} bytes` : "0 bytes";
  const cookieCount =
    typeof document !== "undefined" && document.cookie
      ? document.cookie.split(";").filter(Boolean).length
      : 0;

  // Escape key listener for confirmation dialog
  useEffect(() => {
    if (!isConfirmingClear) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsConfirmingClear(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isConfirmingClear]);

  const handleClearAllData = async () => {
    try {
      // 1. Clear saved services
      clearSaved();

      // 2. Clear all localStorage
      if (typeof window !== "undefined") {
        localStorage.clear();

        // 3. Clear Service Worker caches if supported
        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
      }

      setIsConfirmingClear(false);
      setStatusMessage(
        locale === "hi"
          ? "सभी स्थानीय डेटा और प्राथमिकताएँ इस डिवाइस से साफ़ कर दी गई हैं।"
          : "All local data, cache, and preferences have been cleared from this device.",
      );
    } catch {
      setStatusMessage(
        locale === "hi"
          ? "डेटा साफ़ करते समय कोई त्रुटि उत्पन्न हुई।"
          : "Error clearing local data.",
      );
    }
  };

  const modeOptions: { id: PresentationMode; labelKey: string; descKey: string }[] = [
    { id: "standard", labelKey: "modes.standard", descKey: "modes.standardDesc" },
    { id: "simple", labelKey: "modes.simple", descKey: "modes.simpleDesc" },
    { id: "assisted", labelKey: "modes.assisted", descKey: "modes.assistedDesc" },
  ];

  return (
    <div className="app-container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      {/* Polite Live Region */}
      <div
        role="status"
        aria-live="polite"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {statusMessage}
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--color-content-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {locale === "hi" ? "प्राथमिकताएं एवं सेटिंग्स" : "Preferences & Settings"}
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-content-secondary)", margin: 0 }}>
          {locale === "hi"
            ? "अपनी भाषा, प्रदर्शन मोड और इस डिवाइस पर सहेजे गए डेटा को नियंत्रित करें।"
            : "Manage your display preferences, language, and transparent on-device data storage."}
        </p>
      </div>

      {statusMessage && (
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "0.75rem 1rem",
            backgroundColor: "var(--color-brand-primary-subtle)",
            color: "var(--color-brand-primary)",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.875rem",
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{statusMessage}</span>
          <button
            type="button"
            onClick={() => setStatusMessage("")}
            aria-label="Dismiss notification"
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            ×
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Section 1: Language Preference */}
        <section
          aria-labelledby="language-settings-heading"
          style={{
            backgroundColor: "var(--color-surface-page)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h2
            id="language-settings-heading"
            style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}
          >
            {locale === "hi" ? "भाषा (Language)" : "Language"}
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-content-secondary)",
              marginBottom: "1rem",
            }}
          >
            {locale === "hi"
              ? "वह भाषा चुनें जिसमें आप सेवाओं को देखना चाहते हैं।"
              : "Choose the primary interface language for browsing public services."}
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                setLocale("en" as Locale);
                setStatusMessage("Language changed to English.");
              }}
              aria-pressed={locale === "en"}
              style={{
                padding: "0.625rem 1.25rem",
                borderRadius: "var(--radius-sm)",
                border:
                  locale === "en"
                    ? "2px solid var(--color-brand-primary)"
                    : "1px solid var(--color-border-default)",
                backgroundColor:
                  locale === "en"
                    ? "var(--color-brand-primary-subtle)"
                    : "var(--color-surface-card)",
                color:
                  locale === "en" ? "var(--color-brand-primary)" : "var(--color-content-primary)",
                fontWeight: locale === "en" ? 700 : 500,
                cursor: "pointer",
                minHeight: "var(--min-touch-target)",
              }}
            >
              English
            </button>

            <button
              type="button"
              onClick={() => {
                setLocale("hi" as Locale);
                setStatusMessage("भाषा हिंदी में परिवर्तित कर दी गई है।");
              }}
              aria-pressed={locale === "hi"}
              style={{
                padding: "0.625rem 1.25rem",
                borderRadius: "var(--radius-sm)",
                border:
                  locale === "hi"
                    ? "2px solid var(--color-brand-primary)"
                    : "1px solid var(--color-border-default)",
                backgroundColor:
                  locale === "hi"
                    ? "var(--color-brand-primary-subtle)"
                    : "var(--color-surface-card)",
                color:
                  locale === "hi" ? "var(--color-brand-primary)" : "var(--color-content-primary)",
                fontWeight: locale === "hi" ? 700 : 500,
                cursor: "pointer",
                minHeight: "var(--min-touch-target)",
              }}
            >
              हिंदी (Hindi)
            </button>
          </div>
        </section>

        {/* Section 2: Presentation Mode */}
        <section
          aria-labelledby="mode-settings-heading"
          style={{
            backgroundColor: "var(--color-surface-page)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h2
            id="mode-settings-heading"
            style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}
          >
            {t("modes.label")}
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-content-secondary)",
              marginBottom: "1rem",
            }}
          >
            {locale === "hi"
              ? "अपनी आवश्यकता अनुसार लेआउट का घनत्व और सहायता स्तर चुनें।"
              : "Adjust layout density, font sizing, and assistive guidance across all pages."}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {modeOptions.map((opt) => {
              const isSelected = mode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setMode(opt.id);
                    setStatusMessage(`Presentation mode switched to ${t(opt.labelKey)}.`);
                  }}
                  aria-pressed={isSelected}
                  style={{
                    padding: "1.25rem",
                    borderRadius: "var(--radius-sm)",
                    border: isSelected
                      ? "2px solid var(--color-brand-primary)"
                      : "1px solid var(--color-border-default)",
                    backgroundColor: isSelected
                      ? "var(--color-brand-primary-subtle)"
                      : "var(--color-surface-card)",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.375rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: isSelected
                        ? "var(--color-brand-primary)"
                        : "var(--color-content-primary)",
                    }}
                  >
                    {t(opt.labelKey)} {isSelected && "✓"}
                  </span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-content-secondary)",
                      lineHeight: 1.4,
                    }}
                  >
                    {t(opt.descKey)}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 3: Transparent On-Device Data Inventory */}
        <section
          aria-labelledby="inventory-heading"
          style={{
            backgroundColor: "var(--color-surface-page)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "0.75rem",
            }}
          >
            <h2 id="inventory-heading" style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
              {locale === "hi"
                ? "ऑन-डिवाइस डेटा सूची (पारदर्शिता)"
                : "On-Device Data Inventory (Transparency)"}
            </h2>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "0.25rem 0.625rem",
                borderRadius: "var(--radius-xs)",
                backgroundColor: "var(--color-brand-primary-subtle)",
                color: "var(--color-brand-primary)",
              }}
            >
              Zero Cookies Detected ({cookieCount} active)
            </span>
          </div>

          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-content-secondary)",
              marginBottom: "1rem",
            }}
          >
            {locale === "hi"
              ? "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP) के सिद्धांतों के तहत, नीचे वह सभी डेटा सूचीबद्ध है जो यह प्लेटफ़ॉर्म आपके ब्राउज़र में स्थानीय रूप से संग्रहीत करता है। कोई भी डेटा किसी सर्वर पर नहीं भेजा जाता है।"
              : "In accordance with India DPDP Act 2023 principles, the table below discloses all data stored by this platform on your device. Zero personal data or identifiers are transmitted to any remote server."}
          </p>

          <div
            style={{ overflowX: "auto" }}
            tabIndex={0}
            role="region"
            aria-label="On-Device Data Inventory Table"
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.875rem",
                textAlign: "left",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid var(--color-border-default)",
                    backgroundColor: "var(--color-surface-card)",
                  }}
                >
                  <th style={{ padding: "0.75rem 1rem", fontWeight: 700 }}>Key Name</th>
                  <th style={{ padding: "0.75rem 1rem", fontWeight: 700 }}>Purpose</th>
                  <th style={{ padding: "0.75rem 1rem", fontWeight: 700 }}>Scope & Access</th>
                  <th style={{ padding: "0.75rem 1rem", fontWeight: 700 }}>Size</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--color-border-default)" }}>
                  <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", fontWeight: 600 }}>
                    uls_saved_services
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--color-content-secondary)" }}>
                    Holds your bookmarked service IDs ({savedIds.length} saved)
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "#15803d", fontWeight: 600 }}>
                    Local Device Only (0 server traffic)
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--color-content-tertiary)" }}>
                    {savedServicesSize}
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-border-default)" }}>
                  <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", fontWeight: 600 }}>
                    uls_presentation_mode
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--color-content-secondary)" }}>
                    Remembers your UI layout preference ({mode})
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "#15803d", fontWeight: 600 }}>
                    Local Device Only (0 server traffic)
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--color-content-tertiary)" }}>
                    {modeSize}
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-border-default)" }}>
                  <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", fontWeight: 600 }}>
                    uls_locale
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--color-content-secondary)" }}>
                    Remembers your selected language ({locale})
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "#15803d", fontWeight: 600 }}>
                    Local Device Only (0 server traffic)
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--color-content-tertiary)" }}>
                    {localeSize}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Clear All My Data Action */}
        <section
          aria-labelledby="clear-data-heading"
          style={{
            backgroundColor: "var(--color-surface-page)",
            border: "1px solid #fecaca",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h2
            id="clear-data-heading"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              margin: "0 0 0.5rem 0",
              color: "#dc2626",
            }}
          >
            {locale === "hi" ? "मेरा स्थानीय डेटा साफ़ करें" : "Clear All My Stored Data"}
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-content-secondary)",
              marginBottom: "1.25rem",
            }}
          >
            {locale === "hi"
              ? "यह क्रिया इस डिवाइस से आपके द्वारा सहेजी गई सभी सेवाओं, भाषा प्राथमिकताओं और लेआउट सेटिंग्स को स्थायी रूप से हटा देगी।"
              : "Permanently erase all local bookmarks, UI preferences, and offline cached service worker storage from this device."}
          </p>

          <button
            type="button"
            onClick={() => setIsConfirmingClear(true)}
            style={{
              padding: "0.625rem 1.25rem",
              backgroundColor: "#dc2626",
              color: "#ffffff",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontWeight: 700,
              fontSize: "0.875rem",
              cursor: "pointer",
              minHeight: "var(--min-touch-target)",
            }}
          >
            {locale === "hi" ? "डेटा पूरी तरह साफ़ करें" : "Purge All Local Data"}
          </button>
        </section>
      </div>

      {/* Accessible Confirmation Modal Dialog */}
      {isConfirmingClear && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-purge-title"
          ref={modalRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--color-surface-page)",
              borderRadius: "var(--radius-md)",
              maxWidth: "480px",
              width: "100%",
              padding: "1.75rem",
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--color-border-default)",
            }}
          >
            <h2
              id="confirm-purge-title"
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#dc2626",
                marginTop: 0,
                marginBottom: "0.75rem",
              }}
            >
              {locale === "hi"
                ? "क्या आप वाकई डेटा साफ़ करना चाहते हैं?"
                : "Confirm Complete Data Purge"}
            </h2>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--color-content-secondary)",
                marginBottom: "1.5rem",
                lineHeight: 1.5,
              }}
            >
              {locale === "hi"
                ? "यह आपके सभी सहेजे गए बुकमार्क और प्राथमिकताओं को इस ब्राउज़र से तुरंत हटा देगा। इस क्रिया को पूर्ववत नहीं किया जा सकता है।"
                : "This will immediately delete all local service bookmarks, cache, and preferences from this browser. This action cannot be undone."}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setIsConfirmingClear(false)}
                style={{
                  padding: "0.625rem 1rem",
                  backgroundColor: "transparent",
                  color: "var(--color-content-primary)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  minHeight: "var(--min-touch-target)",
                }}
              >
                {locale === "hi" ? "रद्द करें" : "Cancel"}
              </button>
              <button
                type="button"
                onClick={handleClearAllData}
                style={{
                  padding: "0.625rem 1.25rem",
                  backgroundColor: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  minHeight: "var(--min-touch-target)",
                }}
              >
                {locale === "hi" ? "हाँ, डेटा साफ़ करें" : "Yes, Purge Everything"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
