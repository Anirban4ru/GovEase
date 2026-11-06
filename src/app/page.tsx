"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useTranslation, Locale } from "../context/I18nContext";
import { usePresentationMode } from "../context/ModeContext";
import { SearchBar } from "../components/SearchBar";
import { EcosystemBadge } from "../components/EcosystemBadge";
import { GoalPhrasedGrid } from "../components/GoalPhrasedGrid";
import { LifeAreaRadialSystem } from "../components/LifeAreaRadialSystem";
import type { LifeEcosystem } from "../lib/catalogue";

const HomeClassicView = dynamic(
  () => import("../components/HomeClassicView").then((mod) => mod.HomeClassicView),
  { ssr: false },
);

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
  const [viewOverride, setViewOverride] = useState<"overhaul" | "classic">(
    isClassicQuery ? "classic" : "overhaul",
  );

  useEffect(() => {
    if (isClassicQuery) {
      setViewOverride("classic");
    }
  }, [isClassicQuery]);

  if (viewOverride === "classic") {
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

      {/* HERO SECTION: Calm Field Map with Spatial Radial Depth */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            mode === "simple" ? "1fr" : "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "2.5rem",
          alignItems: "center",
          marginBottom: "3.5rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        {/* Left Column: Dominant Headline, Promise & Instant Search */}
        <div style={{ maxWidth: "580px" }}>
          {/* Calm Field Guide Badge (Replaces former IN badge) */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.85rem",
              backgroundColor: "var(--color-ground-muted)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-full)",
              marginBottom: "1rem",
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "var(--color-ink)",
            }}
          >
            {/* Field Compass Minimal Icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-ochre)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon
                points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
                fill="var(--color-ochre)"
              />
            </svg>
            <span>
              {locale === "hi"
                ? "नागरिक लोक सेवा मार्गदर्शिका"
                : locale === "bn"
                  ? "নাগরিক জনসেবা সহায়িকা"
                  : locale === "ta"
                    ? "மக்கள் சேவை வழிகாட்டி"
                    : "Independent Field Guide to Public Life Services"}
            </span>
          </div>

          <h1
            style={{
              fontSize: "var(--font-size-hero)",
              fontWeight: 800,
              color: "var(--color-ink)",
              lineHeight: 1.2,
              marginBottom: "1rem",
              letterSpacing: "-0.025em",
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
              maxWidth: "520px",
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
          <div style={{ marginBottom: "1.25rem" }}>
            <SearchBar />
          </div>

          {/* Quick Action Navigation Buttons */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href="/guide"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                backgroundColor: "var(--color-ink)",
                color: "var(--color-neutral-0)",
                borderRadius: "var(--radius-sm)",
                fontWeight: 700,
                fontSize: "0.9375rem",
                textDecoration: "none",
                minHeight: "var(--min-touch-target)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span>🧭</span>
              <span>
                {locale === "hi"
                  ? "योजना मार्गदर्शिका खोलें"
                  : locale === "bn"
                    ? "লাইফ নেভিগেটর শুরু করুন"
                    : locale === "ta"
                      ? "வாழ்க்கை வழிகாட்டி"
                      : "Open Life Navigator"}
              </span>
            </Link>

            <Link
              href="/explore"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                backgroundColor: "var(--color-ground-elevated)",
                color: "var(--color-ink)",
                border: "1px solid var(--color-border-strong)",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                fontSize: "0.9375rem",
                textDecoration: "none",
                minHeight: "var(--min-touch-target)",
              }}
            >
              <span>
                {locale === "hi"
                  ? "सभी 18 सेवाएँ ब्राउज़ करें"
                  : locale === "bn"
                    ? "সব ১৮টি সেবা দেখুন"
                    : locale === "ta"
                      ? "18 சேவைகளையும் உலாவுங்கள்"
                      : "Browse 18 Services"}
              </span>
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Radial 6-Node Spatial System */}
        <div>
          <LifeAreaRadialSystem />
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
          <span style={{ fontSize: "1.125rem" }}>🛡️</span>
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
