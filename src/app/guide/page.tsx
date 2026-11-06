"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation, Locale } from "../../context/I18nContext";
import { usePresentationMode } from "../../context/ModeContext";
import { useSavedServices } from "../../hooks/useSavedServices";
import { EcosystemBadge } from "../../components/EcosystemBadge";
import {
  LIFE_STAGE_OPTIONS,
  HOUSEHOLD_NEED_OPTIONS,
  evaluateLifeStageMatches,
  generateCscPrepPack,
  LifeStageId,
  HouseholdNeedId,
} from "../../lib/life-stage-engine";

export default function LifeStageGuidePage() {
  const { t, locale } = useTranslation();
  const { mode } = usePresentationMode();
  const { isSaved, toggleSave } = useSavedServices();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedLifeStage, setSelectedLifeStage] = useState<LifeStageId | null>(null);
  const [selectedNeed, setSelectedNeed] = useState<HouseholdNeedId | null>(null);
  const [showCscPack, setShowCscPack] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleSelectLifeStage = (id: LifeStageId) => {
    setSelectedLifeStage(id);
    setStep(2);
    setAnnouncement(
      locale === "hi"
        ? "चरण 2: अपनी प्राथमिक घरेलू आवश्यकता या सेवा प्राथमिकता चुनें"
        : locale === "bn"
          ? "ধাপ ২: আপনার পরিবারের অগ্রাধিকার বা প্রয়োজনীয় পরিষেবা নির্বাচন করুন"
          : locale === "ta"
            ? "படி 2: உங்கள் முதன்மை குடும்பத் தேவை அல்லது சேவையைத் தேர்ந்தெடுக்கவும்"
            : "Step 2: Choose your household priority or service need",
    );
  };

  const handleSelectNeed = (id: HouseholdNeedId) => {
    setSelectedNeed(id);
    setStep(3);
    setAnnouncement(
      locale === "hi"
        ? "चरण 3: आपके लिए अनुशंसित सरकारी सेवाएँ और योजनाएं"
        : locale === "bn"
          ? "ধাপ ৩: আপনার জন্য প্রস্তাবিত সরকারি পরিষেবা ও প্রকল্প"
          : locale === "ta"
            ? "படி 3: உங்களுக்காக பரிந்துரைக்கப்பட்ட அரசு சேவைகள் மற்றும் திட்டங்கள்"
            : "Step 3: Recommended public services and schemes for your situation",
    );
  };

  const handleReset = () => {
    setStep(1);
    setSelectedLifeStage(null);
    setSelectedNeed(null);
    setShowCscPack(false);
    setAnnouncement(
      locale === "hi"
        ? "मार्गदर्शिका रीसेट की गई। चरण 1: अपनी जीवन स्थिति चुनें"
        : locale === "bn"
          ? "নির্দেশিকা রিসেট করা হয়েছে। ধাপ ১: আপনার জীবনের পরিস্থিতি নির্বাচন করুন"
          : locale === "ta"
            ? "வழிகாட்டி மீட்டமைக்கப்பட்டது. படி 1: உங்கள் வாழ்க்கை நிலையைத் தேர்ந்தெடுக்கவும்"
            : "Guide reset. Step 1: Select your life situation",
    );
  };

  const recommendations =
    selectedLifeStage && selectedNeed
      ? evaluateLifeStageMatches(selectedLifeStage, selectedNeed)
      : [];

  const matchedServiceIds = recommendations.map((r) => r.serviceId);
  const cscPrepPack = generateCscPrepPack(matchedServiceIds);

  return (
    <div className="app-container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      {/* Screen Reader Announcement Region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          border: 0,
        }}
      >
        {announcement}
      </div>

      {/* Header and Civic Badge */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.25rem 0.75rem",
            backgroundColor: "var(--color-india-saffron-subtle)",
            border: "1px solid rgba(224, 109, 16, 0.3)",
            borderRadius: "var(--radius-full)",
            marginBottom: "0.75rem",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--color-india-saffron-text, #7a3200)",
          }}
        >
          <span>
            {locale === "hi"
              ? "🇮🇳 नागरिक स्थिति एवं योजना मार्गदर्शिका"
              : locale === "bn"
                ? "🇮🇳 নাগরিক পরিস্থিতি ও প্রকল্প পথনির্দেশিকা"
                : locale === "ta"
                  ? "🇮🇳 குடிமக்கள் நிலை & திட்ட வழிகாட்டி"
                  : "🇮🇳 Citizen Life-Stage & Scheme Navigator"}
          </span>
        </div>

        <h1
          style={{
            fontSize: mode === "simple" ? "2.25rem" : "1.875rem",
            fontWeight: 800,
            color: "var(--color-content-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {locale === "hi"
            ? "आपकी स्थिति के अनुसार सही सरकारी सेवाएँ खोजें"
            : locale === "bn"
              ? "আপনার পরিস্থিতি অনুযায়ী সঠিক সরকারি পরিষেবা খুঁজুন"
              : locale === "ta"
                ? "உங்கள் நிலைக்கு ஏற்ப சரியான அரசு சேவைகளைக் கண்டறியவும்"
                : "Discover Essential Public Services for Your Situation"}
        </h1>

        <p
          style={{
            fontSize: mode === "simple" ? "1.125rem" : "1rem",
            color: "var(--color-content-secondary)",
            maxWidth: "720px",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {locale === "hi"
            ? "बिना किसी डेटा संग्रह के 100% निजी और सुरक्षित। अपनी स्थिति चुनें और देखें कि कौन सी सरकारी योजनाएं और प्रमाणपत्र आपके लिए सहायक हो सकते हैं।"
            : locale === "bn"
              ? "কোনো ডেটা সংগ্রহ ছাড়াই ১০০% ব্যক্তিগত ও সুরক্ষিত। আপনার পরিস্থিতি নির্বাচন করুন এবং দেখুন কোন সরকারি প্রকল্প ও শংসাপত্রগুলি আপনার জন্য প্রযোজ্য।"
              : locale === "ta"
                ? "எந்தவொரு தரவு சேகரிப்பும் இல்லாமல் 100% தனிப்பட்டது. உங்கள் நிலையைத் தேர்ந்தெடுத்து, எந்த அரசு திட்டங்கள் உங்களுக்கு உதவக்கூடும் என்பதைப் பார்க்கவும்."
                : "100% private, on-device screening with zero tracking. Select your life situation to discover applicable social security, civil documents, and welfare navigation."}
        </p>
      </div>

      {/* Persistent Informational Disclaimer (Hard Rule 8 & 9) */}
      <div
        role="region"
        aria-label="Informational Disclaimer"
        style={{
          padding: "0.875rem 1.25rem",
          marginBottom: "2rem",
          backgroundColor: "var(--color-status-info-bg)",
          border: "1px solid var(--color-status-info-border)",
          borderRadius: "var(--radius-md)",
          fontSize: "0.875rem",
          lineHeight: 1.5,
          color: "var(--color-content-secondary)",
        }}
      >
        <strong style={{ color: "var(--color-brand-primary)" }}>
          {locale === "hi"
            ? "⚠️ केवल सूचनात्मक मार्गदर्शन:"
            : locale === "bn"
              ? "⚠️ কেবল তথ্যমূলক সহায়িকা:"
              : locale === "ta"
                ? "⚠️ தகவல் வழிகாட்டி மட்டுமே:"
                : "⚠️ Informational Discovery Guide Only:"}
        </strong>{" "}
        {locale === "hi"
          ? "यह मंच पात्रता का औपचारिक निर्णय नहीं करता है। अंतिम पात्रता और लाभों की स्वीकृति केवल संबंधित मंत्रालय के आधिकारिक सरकारी पोर्टल पर ही सत्यापित होती है।"
          : locale === "bn"
            ? "এই প্ল্যাটফর্মটি কোনো আনুষ্ঠানিক আইনি সিদ্ধান্ত প্রদান করে না। চূড়ান্ত যোগ্যতা শুধুমাত্র সংশ্লিষ্ট সরকারি পোর্টালে যাচাই করা হয়।"
            : locale === "ta"
              ? "இந்த தளம் முறையான முடிவுகளை வழங்காது. இறுதி தகுதி அதிகாரப்பூர்வ அரசு போர்ட்டலில் மட்டுமே சரிபார்க்கப்படும்."
              : "This platform does not determine legal eligibility or grant government benefits. Final eligibility and document verification are conducted solely by the competent authority on the official government portal."}
      </div>

      {/* Stepper Progress Indicator */}
      <nav aria-label="Navigator Progress" style={{ marginBottom: "2rem" }}>
        <ol
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            listStyle: "none",
            padding: 0,
            margin: 0,
            flexWrap: "wrap",
          }}
        >
          {[
            {
              num: 1,
              title:
                locale === "hi"
                  ? "जीवन स्थिति"
                  : locale === "bn"
                    ? "জীবনের পরিস্থিতি"
                    : locale === "ta"
                      ? "வாழ்க்கை நிலை"
                      : "Life Situation",
            },
            {
              num: 2,
              title:
                locale === "hi"
                  ? "प्राथमिक आवश्यकता"
                  : locale === "bn"
                    ? "প্রাথমিক প্রয়োজন"
                    : locale === "ta"
                      ? "முதன்மைத் தேவை"
                      : "Household Need",
            },
            {
              num: 3,
              title:
                locale === "hi"
                  ? "अनुशंसित योजनाएं"
                  : locale === "bn"
                    ? "প্রস্তাবিত প্রকল্প"
                    : locale === "ta"
                      ? "பரிந்துரைகள்"
                      : "Recommended Services",
            },
          ].map((s) => {
            const isCurrent = step === s.num;
            const isPassed = step > s.num;

            return (
              <li
                key={s.num}
                aria-current={isCurrent ? "step" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent
                    ? "var(--color-brand-primary)"
                    : isPassed
                      ? "var(--color-status-success)"
                      : "var(--color-content-tertiary)",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: isCurrent
                      ? "var(--color-brand-primary)"
                      : isPassed
                        ? "var(--color-status-success-bg)"
                        : "var(--color-neutral-100)",
                    color: isCurrent
                      ? "var(--color-neutral-0)"
                      : isPassed
                        ? "var(--color-status-success)"
                        : "var(--color-content-tertiary)",
                    border: isPassed ? "1px solid var(--color-status-success-border)" : "none",
                    fontWeight: 700,
                    fontSize: "0.8125rem",
                  }}
                >
                  {isPassed ? "✓" : s.num}
                </span>
                <span>{s.title}</span>
                {s.num < 3 && (
                  <span aria-hidden="true" style={{ color: "var(--color-border-strong)" }}>
                    →
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* STEP 1: Select Life Situation */}
      {step === 1 && (
        <section aria-labelledby="step1-heading">
          <h2
            id="step1-heading"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--color-content-primary)",
              marginBottom: "1rem",
            }}
          >
            {locale === "hi"
              ? "चरण 1: अपनी प्राथमिक जीवन स्थिति चुनें"
              : locale === "bn"
                ? "ধাপ ১: আপনার প্রাথমিক জীবনের পরিস্থিতি নির্বাচন করুন"
                : locale === "ta"
                  ? "படி 1: உங்கள் முதன்மை வாழ்க்கை நிலையைத் தேர்ந்தெடுக்கவும்"
                  : "Step 1: Select Your Primary Life Situation"}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {LIFE_STAGE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectLifeStage(opt.id)}
                className="civic-card-interactive"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  padding: "1.25rem",
                  backgroundColor: "var(--color-surface-card)",
                  border:
                    selectedLifeStage === opt.id
                      ? "2px solid var(--color-brand-primary)"
                      : "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1.0625rem",
                    color: "var(--color-content-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {opt.label[locale] || opt.label.en}
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-content-secondary)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {opt.description[locale] || opt.description.en}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* STEP 2: Select Household Need */}
      {step === 2 && (
        <section aria-labelledby="step2-heading">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h2
              id="step2-heading"
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--color-content-primary)",
                margin: 0,
              }}
            >
              {locale === "hi"
                ? "चरण 2: अपनी प्राथमिक आवश्यकता या सेवा प्राथमिकता चुनें"
                : locale === "bn"
                  ? "ধাপ ২: আপনার পরিবারের অগ্রাধিকার বা প্রয়োজনীয় পরিষেবা নির্বাচন করুন"
                  : locale === "ta"
                    ? "படி 2: உங்கள் முதன்மைத் தேவையைத் தேர்ந்தெடுக்கவும்"
                    : "Step 2: Select Your Household Priority or Need"}
            </h2>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-brand-primary)",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                padding: "0.5rem",
              }}
            >
              ← {locale === "hi" ? "वापस बदलें" : locale === "bn" ? "ফিরে যান" : "Back to Step 1"}
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {HOUSEHOLD_NEED_OPTIONS.map((need) => (
              <button
                key={need.id}
                type="button"
                onClick={() => handleSelectNeed(need.id)}
                className="civic-card-interactive"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  padding: "1.25rem",
                  backgroundColor: "var(--color-surface-card)",
                  border:
                    selectedNeed === need.id
                      ? "2px solid var(--color-brand-primary)"
                      : "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1.0625rem",
                    color: "var(--color-content-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {need.label[locale] || need.label.en}
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-content-secondary)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {need.description[locale] || need.description.en}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* STEP 3: Recommendations & Action Center */}
      {step === 3 && (
        <section aria-labelledby="step3-heading">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <h2
                id="step3-heading"
                style={{
                  fontSize: "1.375rem",
                  fontWeight: 800,
                  color: "var(--color-content-primary)",
                  margin: 0,
                }}
              >
                {locale === "hi"
                  ? `आपकी स्थिति के लिए ${recommendations.length} अनुशंसित सरकारी सेवाएँ`
                  : locale === "bn"
                    ? `আপনার জন্য ${recommendations.length}টি প্রস্তাবিত সরকারি পরিষেবা`
                    : locale === "ta"
                      ? `உங்களுக்காக ${recommendations.length} பரிந்துரைக்கப்பட்ட சேவைகள்`
                      : `${recommendations.length} Recommended Public Services for You`}
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-content-secondary)",
                  margin: "0.25rem 0 0 0",
                }}
              >
                {locale === "hi"
                  ? "ये सेवाएँ सार्वजनिक पात्रता मानदंडों और आधिकारिक पोर्टलों पर आधारित हैं।"
                  : locale === "bn"
                    ? "এই পরিষেবাগুলি জনসাধারণের যোগ্যতার মানদণ্ডের উপর ভিত্তি করে প্রস্তাবিত।"
                    : "Matched against verified government guidelines and allow-listed portals."}
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => setShowCscPack(!showCscPack)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: showCscPack
                    ? "var(--color-brand-primary)"
                    : "var(--color-surface-card)",
                  color: showCscPack ? "var(--color-neutral-0)" : "var(--color-content-primary)",
                  border: "1px solid var(--color-border-strong)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                <span>🖨️</span>
                <span>
                  {showCscPack
                    ? locale === "hi"
                      ? "सेवा कार्ड देखें"
                      : "View Services"
                    : locale === "hi"
                      ? "सीएससी प्रिंट तैयारी पत्र"
                      : "Print CSC Prep Sheet"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: "0.5rem 1rem",
                  background: "none",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--color-content-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  minHeight: "44px",
                }}
              >
                {locale === "hi"
                  ? "पुनः आरंभ करें"
                  : locale === "bn"
                    ? "নতুন করে শুরু"
                    : "Start Over"}
              </button>
            </div>
          </div>

          {/* Printable CSC Preparation Pack */}
          {showCscPack ? (
            <div
              style={{
                backgroundColor: "var(--color-surface-page)",
                border: "2px solid var(--color-border-default)",
                borderRadius: "var(--radius-md)",
                padding: "1.75rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  borderBottom: "1px solid var(--color-border-default)",
                  paddingBottom: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "var(--color-content-primary)",
                      margin: 0,
                    }}
                  >
                    📄{" "}
                    {locale === "hi"
                      ? "सीएससी / जन सेवा केंद्र भौतिक यात्रा तैयारी सूची"
                      : locale === "bn"
                        ? "CSC / জনসেবা কেন্দ্র প্রস্তুতির তালিকা"
                        : "CSC / Citizen Service Centre Physical Visit Preparation Sheet"}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-content-secondary)",
                      margin: "0.25rem 0 0 0",
                    }}
                  >
                    {locale === "hi"
                      ? "साइबर कैफे या सीएससी जाने से पहले इन मूल दस्तावेजों और फोटोकॉपी को साथ रखें।"
                      : "Carry these verified originals and self-attested photocopies before visiting a centre."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    backgroundColor: "var(--color-brand-primary)",
                    color: "var(--color-neutral-0)",
                    border: "none",
                    padding: "0.625rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    minHeight: "44px",
                  }}
                >
                  🖨️ {locale === "hi" ? "यह शीट प्रिंट करें" : "Print This Sheet"}
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {cscPrepPack.map((p, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      padding: "0.75rem 1rem",
                      backgroundColor: "var(--color-surface-card)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border-subtle)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "var(--radius-xs)",
                        backgroundColor:
                          p.category === "originals"
                            ? "var(--color-status-error-bg)"
                            : p.category === "fees"
                              ? "var(--color-status-success-bg)"
                              : "var(--color-brand-primary-subtle)",
                        color:
                          p.category === "originals"
                            ? "var(--color-status-error)"
                            : p.category === "fees"
                              ? "var(--color-status-success)"
                              : "var(--color-brand-primary)",
                        alignSelf: "flex-start",
                      }}
                    >
                      {p.category}
                    </span>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "0.9375rem",
                          color: "var(--color-content-primary)",
                        }}
                      >
                        {p.item[locale] || p.item.en}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8125rem",
                          color: "var(--color-content-secondary)",
                          marginTop: "0.2rem",
                        }}
                      >
                        {p.notes[locale] || p.notes.en}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Matched Service Cards */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              {recommendations.map((rec) => {
                const title = rec.serviceTitle[locale] || rec.serviceTitle.en;
                const saved = isSaved(rec.serviceId);

                return (
                  <article
                    key={rec.serviceId}
                    className="civic-card-interactive"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "1.5rem",
                      backgroundColor: "var(--color-surface-card)",
                      border: "1px solid var(--color-border-default)",
                      borderRadius: "var(--radius-md)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: "var(--color-brand-primary)",
                            backgroundColor: "var(--color-brand-primary-subtle)",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "var(--radius-xs)",
                          }}
                        >
                          <EcosystemBadge ecosystem={rec.ecosystem} size={14} />
                          <span>{rec.officialSource}</span>
                        </span>

                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: "var(--color-status-success)",
                            backgroundColor: "var(--color-status-success-bg)",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "var(--radius-xs)",
                            border: "1px solid var(--color-status-success-border)",
                          }}
                        >
                          {rec.relevanceBadge[locale] || rec.relevanceBadge.en}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: 700,
                          color: "var(--color-content-primary)",
                          marginBottom: "0.5rem",
                          lineHeight: 1.4,
                        }}
                      >
                        <Link
                          href={`/services/${rec.serviceId}`}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {title}
                        </Link>
                      </h3>

                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-content-secondary)",
                          lineHeight: 1.5,
                          marginBottom: "1rem",
                        }}
                      >
                        {rec.rationale[locale] || rec.rationale.en}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "0.75rem",
                        borderTop: "1px solid var(--color-border-subtle)",
                        marginTop: "0.5rem",
                      }}
                    >
                      <Link
                        href={`/services/${rec.serviceId}`}
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          color: "var(--color-brand-primary)",
                          textDecoration: "none",
                        }}
                      >
                        {locale === "hi"
                          ? "पूरी प्रक्रिया देखें →"
                          : locale === "bn"
                            ? "সম্পূর্ণ নির্দেশিকা →"
                            : "View Guide & Steps →"}
                      </Link>

                      <button
                        type="button"
                        onClick={() => toggleSave(rec.serviceId)}
                        aria-label={
                          saved ? `Remove ${title} from saved` : `Save ${title} for later reference`
                        }
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "0.8125rem",
                          color: saved
                            ? "var(--color-brand-primary)"
                            : "var(--color-content-tertiary)",
                          cursor: "pointer",
                          padding: "0.25rem 0.5rem",
                          fontWeight: 600,
                        }}
                      >
                        {saved ? "★ Saved" : "☆ Save"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
