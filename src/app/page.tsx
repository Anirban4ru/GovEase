"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../context/I18nContext";
import { usePresentationMode } from "../context/ModeContext";
import { SearchBar } from "../components/SearchBar";

export default function HomePage() {
  const { t, locale } = useTranslation();
  const { mode } = usePresentationMode();

  const ecosystems = [
    {
      id: "government-and-citizen",
      titleEn: "Government & Citizen Services",
      titleHi: "सरकारी और नागरिक सेवाएँ",
      descEn: "Birth certificates, identity documents, PAN, and welfare scheme navigation.",
      descHi: "जन्म प्रमाण पत्र, पहचान पत्र, पैन और कल्याणकारी योजनाएं।",
      badge: "Official Portals",
    },
    {
      id: "healthcare",
      titleEn: "Healthcare",
      titleHi: "स्वास्थ्य सेवा",
      descEn: "ABHA guidance, hospital discovery, and public health schemes.",
      descHi: "आभा (ABHA) मार्गदर्शन, अस्पताल और सार्वजनिक स्वास्थ्य योजनाएँ।",
      badge: "Official Information",
    },
    {
      id: "education",
      titleEn: "Education & Scholarships",
      titleHi: "शिक्षा और छात्रवृत्ति",
      descEn: "Academic Bank of Credits (ABC), scholarships, and student credentials.",
      descHi: "एकेडमिक बैंक ऑफ क्रेडिट्स (ABC), छात्रवृत्ति और डिग्री सत्यापन।",
      badge: "Official Portals",
    },
    {
      id: "finance-and-welfare",
      titleEn: "Finance & Welfare",
      titleHi: "वित्त और कल्याण",
      descEn: "Direct Benefit Transfer (DBT) resources and public banking guides.",
      descHi: "प्रत्यक्ष लाभ अंतरण (DBT) और सार्वजनिक बैंकिंग मार्गदर्शिका।",
      badge: "No Financial Storage",
    },
    {
      id: "mobility-and-transport",
      titleEn: "Mobility & Transport",
      titleHi: "परिवहन और वाहन",
      descEn: "Driving licence renewal, Sarathi, and vehicle registration portals.",
      descHi: "ड्राइविंग लाइसेंस नवीनीकरण, सारथी और वाहन पंजीकरण।",
      badge: "Verified MoRTH Links",
    },
    {
      id: "utilities-and-local",
      titleEn: "Utilities & Municipal",
      titleHi: "उपयोगिता और नगर निगम",
      descEn: "Electricity, piped water, property tax, and civic grievance destinations.",
      descHi: "बिजली, पानी, संपत्ति कर और नागरिक शिकायत निवारण।",
      badge: "State & Municipal Portals",
    },
  ];

  return (
    <div className="app-container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      {/* Presentation Mode Context Banner if in Simple or Assisted mode */}
      {mode === "simple" && (
        <div
          role="region"
          aria-label="Simple Mode Notice"
          style={{
            padding: "1rem",
            marginBottom: "1.5rem",
            backgroundColor: "var(--color-brand-primary-subtle)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            fontSize: "1.0625rem",
          }}
        >
          <strong>{t("modes.simple")}:</strong> {t("modes.simpleDesc")}
        </div>
      )}

      {mode === "assisted" && (
        <div
          role="region"
          aria-label="Assisted Guidance"
          style={{
            padding: "1.25rem",
            marginBottom: "2rem",
            backgroundColor: "var(--color-status-info-bg)",
            border: "1px solid var(--color-status-info-border)",
            borderRadius: "var(--radius-md)",
            fontSize: "1.0625rem",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "var(--color-brand-primary)",
              marginBottom: "0.25rem",
            }}
          >
            {t("modes.assisted")}: {t("modes.assistedDesc")}
          </div>
          <p style={{ margin: 0, fontSize: "0.9375rem", color: "var(--color-content-secondary)" }}>
            Tip: In Assisted Mode, each step of every service guide is explicitly detailed before
            you visit an external official portal.
          </p>
        </div>
      )}

      {/* Hero Section */}
      <section style={{ marginBottom: "3rem", textAlign: mode === "simple" ? "left" : "center" }}>
        <h1
          style={{
            fontSize: mode === "simple" ? "2.25rem" : "2rem",
            fontWeight: 800,
            color: "var(--color-content-primary)",
            lineHeight: 1.25,
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
          }}
        >
          {locale === "hi"
            ? "आवश्यक सार्वजनिक सेवाओं को आसानी से खोजें और समझें"
            : "Discover, Understand, and Reach Essential Public Services"}
        </h1>
        <p
          style={{
            fontSize: mode === "simple" ? "1.25rem" : "1.125rem",
            color: "var(--color-content-secondary)",
            maxWidth: "720px",
            margin: mode === "simple" ? "0 0 1.5rem 0" : "0 auto 1.5rem auto",
            lineHeight: 1.6,
          }}
        >
          {locale === "hi"
            ? "एक स्वतंत्र, सत्यापित मार्गदर्शिका जो आपको सीधे आधिकारिक सरकारी और जनोपयोगी पोर्टलों से जोड़ती है। कोई विज्ञापन नहीं, कोई डेटा संग्रह नहीं।"
            : "An independent, dated catalogue linking citizens directly to official government portals. Zero advertising, zero document storage, and uncompromising privacy."}
        </p>

        {/* Prominent Instant Search Bar */}
        <div
          style={{
            maxWidth: "680px",
            margin: mode === "simple" ? "0 0 1.5rem 0" : "0 auto 1.5rem auto",
            textAlign: "left",
          }}
        >
          <SearchBar />
        </div>

        {/* Quick Goal Prompts */}
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: mode === "simple" ? "flex-start" : "center",
          }}
        >
          <Link
            href="/explore"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "var(--color-brand-primary)",
              color: "var(--color-content-inverse)",
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              boxShadow: "var(--shadow-sm)",
              minHeight: "var(--min-touch-target)",
            }}
          >
            <span>{locale === "hi" ? "सेवाएँ ब्राउज़ करें" : "Browse Service Catalogue"}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            href="/help"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.25rem",
              backgroundColor: "var(--color-surface-card)",
              color: "var(--color-content-primary)",
              fontWeight: 600,
              fontSize: "1rem",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              border: "1px solid var(--color-border-default)",
              minHeight: "var(--min-touch-target)",
            }}
          >
            <span>{locale === "hi" ? "यह कैसे काम करता है" : "How This Guide Works"}</span>
          </Link>
        </div>
      </section>

      {/* Six Ecosystems Grid */}
      <section aria-labelledby="ecosystems-heading" style={{ marginBottom: "3.5rem" }}>
        <h2
          id="ecosystems-heading"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--color-content-primary)",
            marginBottom: "1.5rem",
          }}
        >
          {locale === "hi" ? "छह आवश्यक जीवन क्षेत्र" : "Six Essential Life Areas"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              mode === "simple" ? "1fr" : "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {ecosystems.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "var(--color-surface-page)",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                boxShadow: "var(--shadow-sm)",
                transition: "border-color var(--transition-fast)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.75rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--color-content-primary)",
                  }}
                >
                  {locale === "hi" ? item.titleHi : item.titleEn}
                </h3>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    backgroundColor: "var(--color-neutral-100)",
                    color: "var(--color-content-secondary)",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "var(--radius-xs)",
                  }}
                >
                  {item.badge}
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--color-content-secondary)",
                  lineHeight: 1.5,
                  margin: "0 0 1rem 0",
                  flex: 1,
                }}
              >
                {locale === "hi" ? item.descHi : item.descEn}
              </p>
              <Link
                href="/explore"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-brand-primary)",
                  textDecoration: "underline",
                  alignSelf: "flex-start",
                }}
              >
                {locale === "hi" ? "सेवाएं देखें →" : "Explore area →"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Independence Guarantee Box */}
      <section
        style={{
          backgroundColor: "var(--color-surface-card)",
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--color-content-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {locale === "hi"
            ? "स्वतंत्रता और डेटा सुरक्षा नीति"
            : "Independence & Privacy Commitments"}
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-content-secondary)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {locale === "hi"
            ? "यह मंच नागरिकों की सहायता के लिए एक निष्पक्ष, स्वतंत्र तकनीकी पहल है। हम आधार नंबर, बायोमेट्रिक्स, बैंक पासवर्ड या ओटीपी कभी भी एकत्र या संग्रहीत नहीं करते हैं। प्रत्येक आउटबाउंड लिंक केवल सरकारी अधिकृत डोमेन (जैसे *.gov.in, *.nic.in) पर ही ले जाता है।"
            : "This platform is an independent public-benefit technology initiative. We do not capture Aadhaar numbers, biometrics, bank passwords, or OTPs. All outbound links open verified official domains registered on our public domain allow-list."}
        </p>
      </section>
    </div>
  );
}
