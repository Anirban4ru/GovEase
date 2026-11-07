"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useTranslation, Locale } from "../context/I18nContext";
import { usePresentationMode } from "../context/ModeContext";
import { SearchBar } from "../components/SearchBar";
import { EcosystemBadge } from "../components/EcosystemBadge";
import { GoalPhrasedGrid } from "../components/GoalPhrasedGrid";
import { QUICK_DEMO_PROFILES } from "../lib/eligibility-matcher";
import type { LifeEcosystem } from "../lib/catalogue";

const PersonalizedEligibilityModal = dynamic(
  () =>
    import("../components/PersonalizedEligibilityModal").then(
      (mod) => mod.PersonalizedEligibilityModal,
    ),
  { ssr: false },
);

const HomeClassicView = dynamic(
  () => import("../components/HomeClassicView").then((mod) => mod.HomeClassicView),
  { ssr: false },
);

import { IndiaMonumentsAnimation } from "../components/IndiaMonumentsAnimation";

interface LifeAreaSummary {
  id: LifeEcosystem;
  chipLabel: string;
  count: number;
  titles: Record<Locale, string>;
  summaries: Record<Locale, string>;
}

const LIFE_AREAS: LifeAreaSummary[] = [
  {
    id: "healthcare",
    chipLabel: "OFFICIAL INFORMATION",
    count: 3,
    titles: {
      en: "Healthcare & Well-Being",
      hi: "स्वास्थ्य एवं चिकित्सा",
      bn: "স্বাস্থ্য ও চিকিৎসা",
      ta: "சுகாதாரம் மற்றும் நல்வாழ்வு",
    },
    summaries: {
      en: "ABHA health ID setup, Ayushman Bharat navigation, and verified hospital directories.",
      hi: "आयुष्मान भारत स्वास्थ्य खाता (ABHA) व सरकारी अस्पताल खोज।",
      bn: "আভা (ABHA) স্বাস্থ্য কার্ড তৈরি ও সরকারি হাসপাতাল সন্ধান।",
      ta: "ஆபா சுகாதார கணக்கு மற்றும் மருத்துவமனை வழிகாட்டல்.",
    },
  },
  {
    id: "education",
    chipLabel: "OFFICIAL PORTALS",
    count: 1,
    titles: {
      en: "Education & Scholarships",
      hi: "शिक्षा एवं छात्रवृत्ति",
      bn: "শিক্ষা ও স্কলারশিপ",
      ta: "கல்வி மற்றும் உதவித்தொகை",
    },
    summaries: {
      en: "National Scholarship Portal (NSP OTR) & verified student credential access.",
      hi: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) व छात्र प्रोत्साहन।",
      bn: "জাতীয় স্কলারশিপ পোর্টাল ও শিক্ষা অনুদান সহায়তা।",
      ta: "தேசிய உதவித்தொகை போர்டல் மற்றும் கல்விச் சான்றுகள்.",
    },
  },
  {
    id: "finance-and-welfare",
    chipLabel: "NO CREDENTIAL CAPTURE",
    count: 6,
    titles: {
      en: "Finance & Welfare",
      hi: "वित्त एवं जन-कल्याण",
      bn: "অর্থ ও জনকল্যাণ",
      ta: "நிதி மற்றும் மக்கள் நலம்",
    },
    summaries: {
      en: "PM Jan Dhan, e-Shram worker UAN, PMSBY accident cover, PM-Kisan & EPFO passbooks.",
      hi: "जन धन खाता, ई-श्रम, सुरक्षा बीमा, किसान सम्मान निधि व ईपीएफओ।",
      bn: "জন ধন অ্যাকাউন্ট, ই-শ্রম, বিমা, কিষাণ সুবিধা ও প্রভিডেন্ট ফান্ড।",
      ta: "ஜன் தன் வங்கி கணக்கு, இ-ஷ்ரம், காப்பீடு மற்றும் நலத்திட்டங்கள்.",
    },
  },
  {
    id: "government-and-citizen",
    chipLabel: "OFFICIAL PORTALS",
    count: 4,
    titles: {
      en: "Citizen & Identity",
      hi: "नागरिक पहचान व अभिलेख",
      bn: "নাগরিক পরিচয় ও নথিপত্র",
      ta: "குடிமக்கள் அடையாளம் மற்றும் சான்றிதழ்",
    },
    summaries: {
      en: "Birth certificates via CRS, DigiLocker storage, UDID smart card & PAN reprint.",
      hi: "जन्म प्रमाण पत्र, डिजिलॉकर डिजिटल दस्तावेज, दिव्यांगजन UDID व पैन।",
      bn: "জন্ম শংসাপত্র, ডিজিলকার, প্রতিবন্ধী কার্ড ও প্যান কার্ড রিপ্রিন্ট।",
      ta: "பிறப்புச் சான்றிதழ், டிஜிலாக்கர், மாற்றுத்திறனாளி அட்டை மற்றும் பான்.",
    },
  },
  {
    id: "mobility-and-transport",
    chipLabel: "VERIFIED ROAD LINKS",
    count: 2,
    titles: {
      en: "Mobility & Transport",
      hi: "परिवहन एवं आवागमन",
      bn: "পরিবহন ও যানবাহন",
      ta: "போக்குவரத்து மற்றும் வாகனங்கள்",
    },
    summaries: {
      en: "Driving licence renewal via Parivahan Sarathi & vehicle RC ownership transfer.",
      hi: "ड्राइविंग लाइसेंस नवीनीकरण व वाहन आरसी स्वामित्व अंतरण।",
      bn: "ড্রাইভিং লাইসেন্স নবায়ন ও যানবাহনের আরসি মালিকানা বদল।",
      ta: "ஓட்டுநர் உரிமம் புதுப்பித்தல் மற்றும் வாகன ஆர்.சி.",
    },
  },
  {
    id: "utilities-and-local",
    chipLabel: "STATE & MUNICIPAL",
    count: 1,
    titles: {
      en: "Public Consumer Rights",
      hi: "उपभोक्ता अधिकार व शिकायत",
      bn: "ভোক্তা অধিকার ও অভিযোগ",
      ta: "நுகர்வோர் உரிமைகள் மற்றும் குறைதீர்ப்பு",
    },
    summaries: {
      en: "National Consumer Helpline 1915 guidance & official grievance redressal.",
      hi: "राष्ट्रीय उपभोक्ता हेल्पलाइन 1915 व आधिकारिक शिकायत निवारण।",
      bn: "জাতীয় ভোক্তা হেল্পলাইন ১৯১৫ ও অভিযোগ প্রতিকার।",
      ta: "தேசிய நுகர்வோர் உதவி எண் 1915 மற்றும் குறைதீர்ப்பு.",
    },
  },
];

function HomeContent() {
  const { t, locale } = useTranslation();
  const { mode } = usePresentationMode();
  const searchParams = useSearchParams();

  // Feature Flag for Side-by-Side Comparison (Section 10.3)
  const isClassicQuery = searchParams.get("view") === "classic";
  const [viewOverride, setViewOverride] = useState<"overhaul" | "classic" | null>(null);
  const activeView = viewOverride ?? (isClassicQuery ? "classic" : "overhaul");

  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);
  const [selectedDemoProfileId, setSelectedDemoProfileId] = useState<string | undefined>(undefined);

  if (activeView === "classic") {
    return (
      <div>
        <div
          style={{
            backgroundColor: "var(--color-ground-muted)",
            borderBottom: "1px solid var(--color-border-default)",
            padding: "0.5rem 1rem",
            textAlign: "center",
            fontSize: "0.8125rem",
          }}
        >
          <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>
            [Comparison Mode: Classic View Active]
          </span>{" "}
          <button
            type="button"
            onClick={() => setViewOverride("overhaul")}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-ink-blue)",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
              marginLeft: "0.5rem",
            }}
          >
            Switch to Overhaul Map View
          </button>
        </div>
        <HomeClassicView />
      </div>
    );
  }

  return (
    <div
      className="app-container"
      style={{
        paddingTop: "2rem",
        paddingBottom: "4rem",
      }}
    >
      {/* Mode Context Notice if Simple or Assisted */}
      {mode === "simple" && (
        <div
          role="region"
          aria-label="Simple Mode Notice"
          style={{
            padding: "1rem",
            marginBottom: "1.5rem",
            backgroundColor: "var(--color-ground-muted)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            fontSize: "1.125rem",
            color: "var(--color-ink)",
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
            color: "var(--color-ink)",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "var(--color-ink)",
              marginBottom: "0.25rem",
            }}
          >
            {t("modes.assisted")}: {t("modes.assistedDesc")}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "0.9375rem",
              color: "var(--color-content-secondary)",
            }}
          >
            {locale === "hi"
              ? "सुझाव: प्रत्येक सेवा में आधिकारिक पोर्टल पर जाने से पहले आवश्यक दस्तावेजों की तैयारी सूची दी गई है।"
              : "Tip: Step-by-step guides detail verified preparation before you visit an external official portal."}
          </p>
        </div>
      )}

      {/* HERO SECTION: Full-Width Widescreen Stretched Cinematic Civic Architecture */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: "3.5rem",
          padding: "3rem 2.25rem 2.5rem 2.25rem",
          border: "1px solid var(--color-border-subtle, #e2e8f0)",
          borderRadius: "var(--radius-xl, 16px)",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 32px rgba(13, 53, 112, 0.08)",
        }}
      >
        {/* Full-Bleed Widescreen Stretched Indian Heritage Animation (60 FPS • 100% Offline) */}
        <IndiaMonumentsAnimation />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "860px" }}>
          <h1
            style={{
              fontSize: "var(--font-size-hero)",
              fontWeight: 800,
              color: "var(--color-ink)",
              lineHeight: 1.15,
              marginBottom: "1rem",
              letterSpacing: "-0.025em",
              maxWidth: "920px",
            }}
          >
            {locale === "hi"
              ? "आवश्यक जनसेवाओं का शांत व स्पष्ट मानचित्र"
              : locale === "bn"
                ? "প্রয়োজনীয় নাগরিক সেবার স্বচ্ছ ও নির্ভরযোগ্য মানচিত্র"
                : locale === "ta"
                  ? "அத்தியாவசிய மக்கள் சேவைகளின் அமைதியான வரைபடம்"
                  : "A calm map of everyday public life services"}
          </h1>

          <p
            style={{
              fontSize: "var(--font-size-body)",
              color: "var(--color-content-secondary)",
              lineHeight: 1.6,
              marginBottom: "1.75rem",
              maxWidth: "780px",
            }}
          >
            {locale === "hi"
              ? "नागरिकों को बिना विज्ञापन या डेटा संग्रह सीधे आधिकारिक सरकारी पोर्टलों से जोड़ने वाली स्वतंत्र, सत्यापित मार्गदर्शिका।"
              : locale === "bn"
                ? "বিজ্ঞাপন বা ডেটা ট্র্যাকিং ছাড়াই নাগরিকদের সরাসরি অফিসিয়াল সরকারি পোর্টালে নির্দেশ করার একটি স্বাধীন প্ল্যাটফর্ম।"
                : locale === "ta"
                  ? "விளம்பரங்களோ கண்காணிப்போ இன்றி குடிமக்களை நேரடியாக அதிகாரப்பூர்வ அரசு போர்ட்டல்களுக்கு வழிநடத்தும் வழிகாட்டி."
                  : "An independent, dated catalogue guiding citizens directly to official government portals. Zero advertising, zero document storage, and uncompromising privacy."}
          </p>

          {/* Dominant Instant Search Bar */}
          <div style={{ marginBottom: "0.85rem", width: "100%", maxWidth: "720px" }}>
            <SearchBar />
          </div>

          {/* Quick Filter Tags */}
          <div
            style={{
              display: "flex",
              gap: "0.45rem",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "1.75rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--color-content-tertiary)",
              }}
            >
              {locale === "hi" ? "त्वरित खोज:" : "Quick access:"}
            </span>
            {[
              { label: "Driving Licence Renewal", href: "/services/driving-licence-renewal/" },
              { label: "Birth Certificate (CRS)", href: "/services/birth-certificate-crs/" },
              { label: "Scholarships (NSP)", href: "/services/nsp-scholarship-discovery/" },
              { label: "ABHA Health ID", href: "/services/create-abha-id/" },
              { label: "PM-Kisan Status", href: "/services/pm-kisan-status/" },
              { label: "Jan Dhan Account", href: "/services/pm-jan-dhan-yojana-account/" },
            ].map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--color-content-secondary)",
                  backgroundColor: "var(--color-ground-muted)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.25rem 0.65rem",
                  textDecoration: "none",
                  transition: "border-color 120ms ease",
                }}
              >
                {chip.label}
              </Link>
            ))}
          </div>
          {/* Authoritative Civic Standards & Verification Strip */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: "1.75rem",
              alignItems: "center",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--color-border-subtle)",
              fontSize: "0.8125rem",
              color: "var(--color-content-secondary)",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-teal)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>
                {locale === "hi" ? "18 सत्यापित जनसेवाएँ" : "18 Verified Services"}
              </span>
              <span style={{ color: "var(--color-content-tertiary)" }}>
                (
                {locale === "hi"
                  ? "आधिकारिक .gov.in व .nic.in डोमेन"
                  : "Official .gov.in & .nic.in domains"}
                )
              </span>
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-teal)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>
                {locale === "hi" ? "शून्य व्यक्तिगत डेटा संग्रह" : "Zero Credential Capture"}
              </span>
              <span style={{ color: "var(--color-content-tertiary)" }}>(DPDP Act 2023)</span>
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-ink-blue)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>
                {locale === "hi" ? "ऑन-डिवाइस इन-मेमोरी सर्च" : "100% Client-Side Search"}
              </span>
              <span style={{ color: "var(--color-content-tertiary)" }}>
                ({locale === "hi" ? "PWA ऑफलाइन समर्थित" : "Offline PWA"})
              </span>
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-ochre)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>
                {locale === "hi" ? "4 क्षेत्रीय भाषाएँ व वाक्-संश्लेषण" : "4 Regional Languages"}
              </span>
              <span style={{ color: "var(--color-content-tertiary)" }}>(EN, HI, BN, TA)</span>
            </div>
          </div>
        </div>
      </section>

      {/* CIVIC DECISION & NAVIGATION ARCHITECTURE (Structured Command Center) */}
      <section
        aria-labelledby="civic-navigation-hub-heading"
        style={{
          marginBottom: "3.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Section Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--color-govease-navy, #0d3570)",
            }}
          >
            {locale === "hi"
              ? "नागरिक निर्णय एवं कल्याणकारी मंच"
              : locale === "bn"
                ? "নাগরিক সিদ্ধান্ত ও জনকল্যাণ প্ল্যাটফর্ম"
                : locale === "ta"
                  ? "குடிமக்கள் முடிவு & மக்கள் நல தளம்"
                  : "Civic Decision & Welfare Systems"}
          </div>
          <h2
            id="civic-navigation-hub-heading"
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--color-ink)",
              margin: 0,
              letterSpacing: "-0.015em",
            }}
          >
            {locale === "hi"
              ? "व्यक्तिगत पात्रता जांच एवं नागरिक नेविगेटर"
              : locale === "bn"
                ? "ব্যক্তিগত যোগ্যতা যাচাই ও নাগরিক সহায়ক"
                : locale === "ta"
                  ? "தனிப்பயனாக்கப்பட்ட தகுதி சரிபார்ப்பு & வழிகாட்டி"
                  : "Personalized Eligibility & Civic Navigation"}
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-content-secondary)",
              margin: 0,
              maxWidth: "760px",
              lineHeight: 1.5,
            }}
          >
            {locale === "hi"
              ? "बिना किसी सर्वर पर व्यक्तिगत डेटा भेजे, सीधे अपने डिवाइस पर सरकारी योजनाओं की पात्रता जांचें और आधिकारिक दस्तावेज़ तैयार करें।"
              : locale === "bn"
                ? "কোনো সার্ভারে তথ্য না পাঠিয়ে, সরাসরি ডিভাইসে সরকারি প্রকল্পের যোগ্যতা যাচাই ও দরখাস্তের নথি প্রস্তুত করুন।"
                : locale === "ta"
                  ? "எந்த சர்வரிலும் தனிப்பட்ட விவரங்களை அனுப்பாமல், அரசு திட்டங்களின் தகுதியை சரிபார்த்து ஆவணங்களை தயார் செய்யுங்கள்."
                  : "Zero-knowledge, client-side tools to calculate statutory welfare entitlements and prepare verified applications completely within your browser."}
          </p>
        </div>

        {/* 1. MASTER FEATURE CARD: Scheme Eligibility Screener */}
        <div
          style={{
            backgroundColor: "var(--color-ground-elevated, #ffffff)",
            borderRadius: "var(--radius-lg, 12px)",
            border: "1px solid var(--color-border-default)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "4px",
              background: "linear-gradient(90deg, #047857 0%, #0d3570 100%)",
            }}
            aria-hidden="true"
          />

          <div style={{ padding: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "1.25rem",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ maxWidth: "680px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.2rem 0.6rem",
                    backgroundColor: "#ecfdf5",
                    border: "1px solid #a7f3d0",
                    borderRadius: "var(--radius-full, 9999px)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#065f46",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span>🎯 Zero-Knowledge Matching Engine • DPDP Act 2023 Compliant</span>
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--color-govease-navy, #0d3570)",
                    margin: "0 0 0.35rem 0",
                  }}
                >
                  {locale === "hi"
                    ? "कल्याणकारी योजना पात्रता परीक्षक"
                    : locale === "bn"
                      ? "সরকারি প্রকল্প যোগ্যতা ও সুবিধা মিলিয়ে নেওয়ার ইঞ্জিন"
                      : locale === "ta"
                        ? "திட்ட தகுதி மற்றும் பலன்கள் சரிபார்ப்பு"
                        : "Scheme Eligibility & Benefits Matching Engine"}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "var(--color-content-secondary)",
                    lineHeight: 1.55,
                  }}
                >
                  {locale === "hi"
                    ? "अपनी आयु, लिंग, शिक्षा, पारिवारिक आय, राशन कार्ड (BPL/APL) और राज्य दर्ज करें और जानें कि आप किन-किन केंद्रीय व राज्य योजनाओं के पात्र हैं।"
                    : locale === "bn"
                      ? "আপনার বয়স, শিক্ষা, পারিবারিক আয়, রেশন কার্ড (BPL/APL) ও রাজ্য অনুসারে আপনার প্রাপ্য কেন্দ্রীয় ও রাজ্য স্কিম জানুন।"
                      : locale === "ta"
                        ? "உங்கள் வயது, கல்வி, குடும்ப வருமானம், ரேஷன் அட்டை மற்றும் மாநிலத்தின் அடிப்படையில் அரசு திட்டங்களை கண்டறியுங்கள்."
                        : "Match your age, education, household income, ration category, and domicile against 16+ sovereign schemes — computed entirely in-memory with zero server upload."}
                </p>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDemoProfileId(undefined);
                    setEligibilityModalOpen(true);
                  }}
                  style={{
                    padding: "0.65rem 1.25rem",
                    backgroundColor: "#047857",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "var(--radius-sm, 6px)",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(4, 120, 87, 0.3)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span>Check My Eligibility 🎯</span>
                  <span aria-hidden="true">→</span>
                </button>
                <Link
                  href="/eligibility"
                  style={{
                    padding: "0.65rem 1.15rem",
                    backgroundColor: "var(--color-ground-muted, #f8f9fa)",
                    color: "var(--color-ink)",
                    border: "1px solid var(--color-border-default)",
                    borderRadius: "var(--radius-sm, 6px)",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  Full-Page Screener 📄
                </Link>
              </div>
            </div>

            {/* 1-Click Interactive Personas Sub-row */}
            <div
              style={{
                padding: "0.75rem 1rem",
                backgroundColor: "#f8fafc",
                borderRadius: "var(--radius-md, 8px)",
                border: "1px solid var(--color-border-subtle, #f1f5f9)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  flexShrink: 0,
                }}
              >
                ⚡ 1-Click Persona Demos:
              </span>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {QUICK_DEMO_PROFILES.map((demo) => (
                  <button
                    key={demo.id}
                    type="button"
                    onClick={() => {
                      setSelectedDemoProfileId(demo.id);
                      setEligibilityModalOpen(true);
                    }}
                    style={{
                      padding: "0.3rem 0.65rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "var(--radius-full, 9999px)",
                      color: "#1e293b",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span>{demo.icon}</span>
                    <span>{demo.label[locale] || demo.label.en}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. TWO BALANCED COMPANION CARDS: Life Stage Navigator & Document Prep Studio */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {/* Companion Card A: Life Stage Navigator */}
          <div
            style={{
              backgroundColor: "var(--color-ground-elevated, #ffffff)",
              borderRadius: "var(--radius-lg, 12px)",
              border: "1px solid var(--color-border-default)",
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "var(--color-govease-navy, #0d3570)",
                  backgroundColor: "#f1f5f9",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  display: "inline-block",
                  marginBottom: "0.5rem",
                }}
              >
                🧭 Guided Roadmaps
              </span>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 800,
                  color: "var(--color-ink)",
                  margin: "0 0 0.35rem 0",
                }}
              >
                Life Stage Navigator
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-content-secondary)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Milestone-based verified roadmaps for Higher Education, Formal Employment,
                Healthcare Access, and Senior Citizen welfare.
              </p>
            </div>

            <Link
              href="/guide"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "var(--color-govease-navy, #0d3570)",
                textDecoration: "none",
              }}
            >
              <span>Open Life Navigator</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Companion Card B: Document & Photo Prep Studio */}
          <div
            style={{
              backgroundColor: "var(--color-ground-elevated, #ffffff)",
              borderRadius: "var(--radius-lg, 12px)",
              border: "1px solid var(--color-border-default)",
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "#047857",
                  backgroundColor: "#ecfdf5",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  display: "inline-block",
                  marginBottom: "0.5rem",
                }}
              >
                📸 In-Browser Studio
              </span>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 800,
                  color: "var(--color-ink)",
                  margin: "0 0 0.35rem 0",
                }}
              >
                Document & Photo Prep Studio
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-content-secondary)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Crop, resize, and compress passport photos and signatures to strict government
                portal specs (&lt;50KB / &lt;100KB) in client RAM.
              </p>
            </div>

            <Link
              href="/prep-studio"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "#047857",
                textDecoration: "none",
              }}
            >
              <span>Open Document Studio</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      {/* "WHAT WOULD YOU LIKE TO DO?" (Section 4.1.2 Goal-Phrased Entries) */}
      <GoalPhrasedGrid />

      {/* SIX ESSENTIAL LIFE AREAS (Connected System Grid - Section 4.1.3) */}
      <section aria-labelledby="life-areas-heading" style={{ marginBottom: "3.5rem" }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <h2
            id="life-areas-heading"
            style={{
              fontSize: "1.375rem",
              fontWeight: 800,
              color: "var(--color-ink)",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {locale === "hi"
              ? "छह आवश्यक जीवन क्षेत्र"
              : locale === "bn"
                ? "ছয়টি অপরিহার্য জীবনের ক্ষেত্র"
                : locale === "ta"
                  ? "ஆறு அத்தியாவசிய வாழ்க்கை பகுதிகள்"
                  : "Six Essential Life Areas"}
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-content-secondary)",
              margin: "0.25rem 0 0 0",
            }}
          >
            {locale === "hi"
              ? "प्रत्येक क्षेत्र में आधिकारिक सरकारी पोर्टलों के लिए सत्यापित सीधे संपर्क।"
              : locale === "bn"
                ? "প্রতিটি ক্ষেত্রে যাচাইকৃত অফিসিয়াল সরকারি পোর্টালের সরাসরি সংযোগ।"
                : locale === "ta"
                  ? "ஒவ்வொரு பகுதியிலும் சரிபார்க்கப்பட்ட அரசு போர்ட்டல்களின் நேரடி இணைப்புகள்."
                  : "Verified navigation linking citizens to official central and state portals."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              mode === "simple" ? "1fr" : "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {LIFE_AREAS.map((area) => {
            const title = area.titles[locale] || area.titles.en;
            const summary = area.summaries[locale] || area.summaries.en;

            return (
              <div
                key={area.id}
                className="civic-card-interactive"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1.25rem",
                  backgroundColor: "var(--color-surface-card)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-sm)",
                  minHeight: "180px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.75rem",
                      gap: "0.5rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <EcosystemBadge ecosystem={area.id} size={20} />
                      {/* Fixed 2-Line Height Reservation (Known Issue 5) */}
                      <h3
                        style={{
                          fontSize: "1.0625rem",
                          fontWeight: 700,
                          margin: 0,
                          color: "var(--color-ink)",
                          lineHeight: 1.35,
                          minHeight: "2.75rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {title}
                      </h3>
                    </div>
                    {/* Standardized Verification Chip (Known Issue 2) */}
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        backgroundColor: "var(--color-ground-muted)",
                        color: "var(--color-teal-text, #0a6e6d)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "var(--radius-xs)",
                        flexShrink: 0,
                        border: "1px solid var(--color-border-subtle)",
                      }}
                    >
                      {area.chipLabel}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-content-secondary)",
                      lineHeight: 1.5,
                      margin: "0 0 1rem 0",
                    }}
                  >
                    {summary}
                  </p>
                </div>

                {/* Bottom-Aligned Action Link (Known Issue 6) */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                    paddingTop: "0.5rem",
                    borderTop: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <Link
                    href={`/explore?category=${area.id}`}
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--color-ink-blue)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span>
                      {locale === "hi"
                        ? "क्षेत्र देखें"
                        : locale === "bn"
                          ? "অঞ্চল দেখুন"
                          : locale === "ta"
                            ? "பகுதியைக் காண்க"
                            : "Explore area"}
                    </span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>

                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--color-content-tertiary)",
                    }}
                  >
                    {area.count} {locale === "hi" ? "सेवाएँ" : "services"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Civic Utility & Verification Tools */}
      <section aria-labelledby="civic-tools-heading" style={{ marginBottom: "3.5rem" }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <h2
            id="civic-tools-heading"
            style={{
              fontSize: "1.375rem",
              fontWeight: 800,
              color: "var(--color-ink)",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {locale === "hi"
              ? "नागरिक सुविधा एवं सत्यापन उपकरण"
              : locale === "bn"
                ? "নাগরিক সুবিধা ও যাচাইকরণ টুলস"
                : locale === "ta"
                  ? "குடிமக்கள் பயன்பாடு மற்றும் சரிபார்ப்பு கருவிகள்"
                  : "Civic Utility & Verification Tools"}
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-content-secondary)",
              margin: "0.25rem 0 0 0",
            }}
          >
            {locale === "hi"
              ? "दस्तावेज़ आकार सुधार, जीवन-घटना बहु-सेवा अनुक्रम, एवं फर्जी चालान/घोटाला जांच उपकरण - पूर्णतः निःशुल्क व ऑन-डिवाइस।"
              : "Zero-cost, privacy-preserving utilities for document compression, multi-service milestones, and fraud prevention."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: mode === "simple" ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {/* Tool 1: Doc Prep Studio */}
          <div
            className="civic-card-interactive"
            style={{
              padding: "1.25rem",
              backgroundColor: "var(--color-surface-card)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "rgba(10, 110, 109, 0.12)",
                    color: "var(--color-teal-text, #0a6e6d)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--color-ink)",
                  }}
                >
                  {locale === "hi" ? "दस्तावेज़ एवं फ़ोटो स्टूडियो" : "Doc Prep Studio"}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-content-secondary)",
                  lineHeight: 1.5,
                  margin: "0 0 1rem 0",
                }}
              >
                {locale === "hi"
                  ? "पासपोर्ट फोटो, हस्ताक्षर व प्रमाणपत्रों को सरकारी पोर्टल नियमों (20KB - 50KB) के अनुसार बिना सर्वर अपलोड के काटें व आकार दें।"
                  : "Crop and compress passport photos and signatures to strict government portal specs (20KB - 50KB). 100% in-browser Canvas, zero network transmission."}
              </p>
            </div>
            <Link
              href="/prep-studio"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--color-ink-blue)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <span>{locale === "hi" ? "स्टूडियो खोलें" : "Open Studio"}</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Tool 2: Composite Life Journeys */}
          <div
            className="civic-card-interactive"
            style={{
              padding: "1.25rem",
              backgroundColor: "var(--color-surface-card)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "rgba(30, 64, 175, 0.12)",
                    color: "var(--color-ink-blue, #1e40af)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--color-ink)",
                  }}
                >
                  {locale === "hi" ? "जीवन-घटना समग्र यात्राएँ" : "Life Event Journeys"}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-content-secondary)",
                  lineHeight: 1.5,
                  margin: "0 0 1rem 0",
                }}
              >
                {locale === "hi"
                  ? "नवजात शिशु, उच्च शिक्षा, असंगठित श्रमिक, व वरिष्ठ नागरिकों के लिए अनुक्रमिक सेवा मार्गदर्शिका।"
                  : "Multi-service dependency workflows with verified prerequisites: Newborn Child, College Graduate, Informal Worker, and Senior Citizen."}
              </p>
            </div>
            <Link
              href="/journeys"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--color-ink-blue)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <span>{locale === "hi" ? "यात्राएँ देखें" : "View Journeys"}</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Tool 3: Anti-Scam & Helplines */}
          <div
            className="civic-card-interactive"
            style={{
              padding: "1.25rem",
              backgroundColor: "var(--color-surface-card)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "rgba(180, 83, 9, 0.12)",
                    color: "var(--color-ochre, #b45309)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--color-ink)",
                  }}
                >
                  {locale === "hi" ? "हेल्पलाइन एवं एंटी-स्कैम" : "Anti-Scam & Helplines"}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-content-secondary)",
                  lineHeight: 1.5,
                  margin: "0 0 1rem 0",
                }}
              >
                {locale === "hi"
                  ? "TRAI अधिकृत SMS हेडर सत्यापन, 1930 साइबर हेल्पलाइन, आधिकारिक सरकारी फीस व CSC दर चार्टर।"
                  : "TRAI SMS sender verification, 10-digit phishing detection, 1-tap emergency helplines (1930, 1915), and official fee calculators."}
              </p>
            </div>
            <Link
              href="/help"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--color-ink-blue)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <span>{locale === "hi" ? "सहायता व सत्यापन केंद्र" : "Verify & Helplines"}</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Independence Guarantee Box (Section 4.1.4) */}
      <section
        style={{
          backgroundColor: "var(--color-surface-card)",
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-teal)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <h2
            style={{
              fontSize: "1.0625rem",
              fontWeight: 700,
              color: "var(--color-ink)",
              margin: 0,
            }}
          >
            {locale === "hi"
              ? "स्वतंत्रता, डेटा सुरक्षा व निष्पक्षता की गारंटी"
              : locale === "bn"
                ? "স্বাধীনতা, ডেটা নিরাপত্তা ও নিরপেক্ষতার প্রতিশ্রুতি"
                : locale === "ta"
                  ? "சுயாதீனம், தரவு பாதுகாப்பு மற்றும் நடுநிலை உறுதிமொழி"
                  : "Independence & Strict Data Minimisation Commitments"}
          </h2>
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-content-secondary)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {locale === "hi"
            ? "यह मंच नागरिकों के लाभ के लिए एक स्वतंत्र गैर-व्यावसायिक तकनीकी मार्गदर्शिका है। हम कभी भी कोई आधार नंबर, बायोमेट्रिक, बैंकिंग पासवर्ड या ओटीपी एकत्र नहीं करते हैं। सभी आउटबाउंड लिंक केवल हमारी सार्वजनिक श्वेत-सूची में पंजीकृत सत्यापित सरकारी डोमेन पर ही खुलते हैं।"
            : "This platform is an independent public-benefit technology guide. We never capture Aadhaar numbers, biometrics, bank passwords, or OTPs. All outbound links open verified official government domains registered on our public domain allow-list."}
        </p>
      </section>

      {/* Dev / Founder Comparison Footer Toggle (Section 10.3) */}
      <div
        style={{
          marginTop: "2.5rem",
          paddingTop: "1rem",
          borderTop: "1px dashed var(--color-border-default)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.75rem",
          color: "var(--color-content-tertiary)",
        }}
      >
        <span>Overhaul Version: Release 1.3 Map Engine</span>
        <button
          type="button"
          onClick={() => setViewOverride("classic")}
          style={{
            background: "none",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius-xs)",
            padding: "0.25rem 0.5rem",
            color: "var(--color-content-secondary)",
            fontSize: "0.75rem",
            cursor: "pointer",
          }}
        >
          Compare: View Classic Home Layout
        </button>
      </div>

      <PersonalizedEligibilityModal
        isOpen={eligibilityModalOpen}
        onClose={() => setEligibilityModalOpen(false)}
        initialDemoId={selectedDemoProfileId}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="app-container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
          Loading field map...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
