"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation, Locale } from "../../context/I18nContext";
import { usePresentationMode, PresentationMode } from "../../context/ModeContext";
import { useSavedServices } from "../../hooks/useSavedServices";

const SETTINGS_STRINGS: Record<
  Locale,
  {
    heading: string;
    subtitle: string;
    langSection: string;
    langDesc: string;
    modeSection: string;
    modeDesc: string;
    inventoryHeading: string;
    inventoryDesc: string;
    clearSection: string;
    clearDesc: string;
    purgeBtn: string;
    clearedSuccess: string;
    clearedError: string;
    cancel: string;
    confirmPurge: string;
    modalTitle: string;
    modalWarning: string;
  }
> = {
  en: {
    heading: "Preferences & Settings",
    subtitle: "Manage your display preferences, language, and transparent on-device data storage.",
    langSection: "Language",
    langDesc: "Choose the primary interface language for browsing public services.",
    modeSection: "Display Mode (WCAG 2.2 Cognitive Accessibility)",
    modeDesc: "Adjust layout density, font sizing, and assistive guidance across all pages.",
    inventoryHeading: "On-Device Data Inventory (Transparency)",
    inventoryDesc:
      "In accordance with India DPDP Act 2023 principles, the table below discloses all data stored by this platform on your device. Zero personal data or identifiers are transmitted to any remote server.",
    clearSection: "Data Minimisation & Right to Erasure",
    clearDesc:
      "Permanently erase all local bookmarks, UI preferences, and offline cached service worker storage from this device.",
    purgeBtn: "Purge All Local Data",
    clearedSuccess: "All local data, cache, and preferences have been cleared from this device.",
    clearedError: "Error clearing local data.",
    cancel: "Cancel",
    confirmPurge: "Yes, Purge Everything",
    modalTitle: "Confirm Complete Data Purge",
    modalWarning:
      "This will immediately delete all local service bookmarks, cache, and preferences from this browser. This action cannot be undone.",
  },
  hi: {
    heading: "प्राथमिकताएं एवं सेटिंग्स",
    subtitle: "अपनी भाषा, प्रदर्शन मोड और इस डिवाइस पर सहेजे गए डेटा को नियंत्रित करें।",
    langSection: "भाषा (Language)",
    langDesc: "वह भाषा चुनें जिसमें आप सेवाओं को देखना चाहते हैं।",
    modeSection: "प्रदर्शन मोड (सुलभता विकल्प)",
    modeDesc: "अपनी आवश्यकता अनुसार लेआउट का घनत्व और सहायता स्तर चुनें।",
    inventoryHeading: "ऑन-डिवाइस डेटा सूची (पारदर्शिता)",
    inventoryDesc:
      "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP) के सिद्धांतों के तहत, नीचे वह सभी डेटा सूचीबद्ध है जो यह प्लेटफ़ॉर्म आपके ब्राउज़र में स्थानीय रूप से संग्रहीत करता है। कोई भी डेटा किसी सर्वर पर नहीं भेजा जाता है।",
    clearSection: "डेटा न्यूनीकरण एवं हटाने का अधिकार",
    clearDesc:
      "यह क्रिया इस डिवाइस से आपके द्वारा सहेजी गई सभी सेवाओं, भाषा प्राथमिकताओं और लेआउट सेटिंग्स को स्थायी रूप से हटा देगी।",
    purgeBtn: "डेटा पूरी तरह साफ़ करें",
    clearedSuccess: "सभी स्थानीय डेटा और प्राथमिकताएँ इस डिवाइस से साफ़ कर दी गई हैं।",
    clearedError: "डेटा साफ़ करते समय कोई त्रुटि उत्पन्न हुई।",
    cancel: "रद्द करें",
    confirmPurge: "हाँ, डेटा साफ़ करें",
    modalTitle: "क्या आप वाकई डेटा साफ़ करना चाहते हैं?",
    modalWarning:
      "यह आपके सभी सहेजे गए बुकमार्क और प्राथमिकताओं को इस ब्राउज़र से तुरंत हटा देगा। इस क्रिया को पूर्ववत नहीं किया जा सकता है।",
  },
  bn: {
    heading: "পছন্দসমূহ ও সেটিংস",
    subtitle: "আপনার প্রদর্শন পছন্দ, ভাষা এবং ডিভাইসে সংরক্ষিত স্থানীয় ডেটা পরিচালনা করুন।",
    langSection: "ভাষা (Language)",
    langDesc: "জনসেবা অন্বেষণ করতে আপনার পছন্দের প্রাথমিক ভাষা নির্বাচন করুন।",
    modeSection: "প্রদর্শন মোড (অ্যাক্সেসিবিলিটি বিকল্প)",
    modeDesc: "আপনার সুবিধামতো ইন্টারফেসের জটিলতা, ফন্ট এবং বিন্যাস সমন্বয় করুন।",
    inventoryHeading: "অন-ডিভাইস ডেটা তালিকা (স্বচ্ছতা)",
    inventoryDesc:
      "ডিজিটাল ব্যক্তিগত ডেটা সুরক্ষা আইন ২০২৩ (DPDP) নীতি অনুসারে, নিচে এই প্ল্যাটফর্ম দ্বারা আপনার ডিভাইসে স্থানীয়ভাবে সংরক্ষিত সমস্ত ডেটার বিবরণ দেওয়া হলো। কোনো তথ্য সার্ভারে পাঠানো হয় না।",
    clearSection: "ডেটা হ্রাসকরণ ও মুছে ফেলার অধিকার",
    clearDesc:
      "এই ব্রাউজার থেকে তাৎক্ষণিকভাবে সমস্ত সংরক্ষিত ডেটা, বুকমার্ক এবং পছন্দসমূহ সম্পূর্ণ মুছে ফেলুন।",
    purgeBtn: "সমস্ত স্থানীয় ডেটা মুছে ফেলুন",
    clearedSuccess: "এই ডিভাইস থেকে সমস্ত স্থানীয় ডেটা ও পছন্দসমূহ মুছে ফেলা হয়েছে।",
    clearedError: "ডেটা মোছার সময় ত্রুটি ঘটেছে।",
    cancel: "বাতিল করুন",
    confirmPurge: "হ্যাঁ, সমস্ত তথ্য মুছুন",
    modalTitle: "ডেটা মোছার নিশ্চিতকরণ",
    modalWarning:
      "এটি অবিলম্বে এই ব্রাউজার থেকে সমস্ত সংরক্ষিত বুকমার্ক, ক্যাশ এবং পছন্দ মুছে ফেলবে। এটি পুনর্বহাল করা যাবে না।",
  },
  ta: {
    heading: "விருப்பங்கள் மற்றும் அமைப்புகள்",
    subtitle:
      "உங்கள் காட்சி விருப்பங்கள், மொழி மற்றும் சாதனத்தில் சேமிக்கப்பட்ட உள்ளூர் தரவை நிர்வகிக்கவும்.",
    langSection: "மொழி (Language)",
    langDesc: "பொதுச் சேவைகளை உலாவுவதற்கான முதன்மை இடைமுக மொழியைத் தேர்வுசெய்யவும்.",
    modeSection: "காட்சி முறை (அணுகல்தன்மை விருப்பங்கள்)",
    modeDesc:
      "உங்கள் விருப்பத்திற்கு ஏற்ப இடைமுக அமைப்பு, எழுத்துருக்கள் மற்றும் அடர்த்தியை மாற்றியமைக்கவும்.",
    inventoryHeading: "சாதனத் தரவு விவரம் (வெளிப்படைத்தன்மை)",
    inventoryDesc:
      "டிஜிட்டல் தனிநபர் தரவு பாதுகாப்புச் சட்டம் 2023 (DPDP) விதிகளின்படி, இந்த தளம் உங்கள் சாதனத்தில் சேமிக்கும் அனைத்து தரவுகளும் கீழே பட்டியலிடப்பட்டுள்ளன. எந்தவொரு தனிப்பட்ட தரவும் தொலைதூர சேவையகத்திற்கு அனுப்பப்படுவதில்லை.",
    clearSection: "தரவு குறைப்பு மற்றும் நீக்குவதற்கான உரிமை",
    clearDesc:
      "இந்த உலாவியிலிருந்து சேமிக்கப்பட்ட அனைத்து தரவு, புக்மார்க்குகள் மற்றும் விருப்பங்களை உடனடியாக நீக்கவும்.",
    purgeBtn: "அனைத்து உள்ளூர் தரவையும் அழிக்கவும்",
    clearedSuccess:
      "அனைத்து உள்ளூர் தரவும் விருப்பத்தேர்வுகளும் இந்த சாதனத்திலிருந்து நீக்கப்பட்டுவிட்டன.",
    clearedError: "உள்ளூர் தரவை அழிப்பதில் பிழை ஏற்பட்டது.",
    cancel: "ரத்து செய்",
    confirmPurge: "ஆம், அனைத்தையும் அழி",
    modalTitle: "தரவு நீக்கத்தை உறுதிப்படுத்தவும்",
    modalWarning:
      "இது உங்கள் அனைத்து சேமிக்கப்பட்ட புக்மார்க்குகள், கேச் மற்றும் விருப்பங்களை உடனடியாக நீக்கிவிடும். இந்த செயலை மாற்றியமைக்க முடியாது.",
  },
};

const LANGUAGE_BUTTONS: { id: Locale; label: string; sublabel: string; message: string }[] = [
  { id: "en", label: "English", sublabel: "English", message: "Language changed to English." },
  { id: "hi", label: "हिंदी", sublabel: "Hindi", message: "भाषा हिंदी में परिवर्तित कर दी गई है।" },
  { id: "bn", label: "বাংলা", sublabel: "Bengali", message: "ভাষা বাংলায় পরিবর্তন করা হয়েছে।" },
  { id: "ta", label: "தமிழ்", sublabel: "Tamil", message: "மொழி தமிழாக மாற்றப்பட்டது." },
];

export default function SettingsPage() {
  const { t, locale, setLocale } = useTranslation();
  const { mode, setMode } = usePresentationMode();
  const { savedIds, clearAll: clearSaved } = useSavedServices();

  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const strings = SETTINGS_STRINGS[locale] || SETTINGS_STRINGS.en;

  // Compute live on-device storage sizes without cascading effect state
  const isClient = typeof window !== "undefined";
  const savedServicesRaw = isClient ? localStorage.getItem("uls_saved_services") || "" : "";
  const modeRaw = isClient ? localStorage.getItem("uls_presentation_mode") || "" : "";
  const localeRaw = isClient ? localStorage.getItem("uls_locale_preference") || "" : "";

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
      setStatusMessage(strings.clearedSuccess);
    } catch {
      setStatusMessage(strings.clearedError);
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
          {strings.heading}
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-content-secondary)", margin: 0 }}>
          {strings.subtitle}
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
            {strings.langSection}
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-content-secondary)",
              marginBottom: "1rem",
            }}
          >
            {strings.langDesc}
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {LANGUAGE_BUTTONS.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => {
                  setLocale(lang.id);
                  setStatusMessage(lang.message);
                }}
                aria-pressed={locale === lang.id}
                style={{
                  padding: "0.625rem 1.25rem",
                  borderRadius: "var(--radius-sm)",
                  border:
                    locale === lang.id
                      ? "2px solid var(--color-brand-primary)"
                      : "1px solid var(--color-border-default)",
                  backgroundColor:
                    locale === lang.id
                      ? "var(--color-brand-primary-subtle)"
                      : "var(--color-surface-card)",
                  color:
                    locale === lang.id
                      ? "var(--color-brand-primary)"
                      : "var(--color-content-primary)",
                  fontWeight: locale === lang.id ? 700 : 500,
                  cursor: "pointer",
                  minHeight: "var(--min-touch-target)",
                }}
              >
                {lang.label} ({lang.sublabel})
              </button>
            ))}
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
            {strings.modeDesc}
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
              {strings.inventoryHeading}
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
            {strings.inventoryDesc}
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
                    uls_locale_preference
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
            {strings.clearSection}
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-content-secondary)",
              marginBottom: "1.25rem",
            }}
          >
            {strings.clearDesc}
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
            {strings.purgeBtn}
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
              {strings.modalTitle}
            </h2>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--color-content-secondary)",
                marginBottom: "1.5rem",
                lineHeight: 1.5,
              }}
            >
              {strings.modalWarning}
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
                {strings.cancel}
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
                {strings.confirmPurge}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
