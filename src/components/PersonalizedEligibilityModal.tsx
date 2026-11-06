"use client";

import React, { useState, useEffect, useId } from "react";
import Link from "next/link";
import { useTranslation } from "../context/I18nContext";
import {
  CitizenProfile,
  DEFAULT_CITIZEN_PROFILE,
  QUICK_DEMO_PROFILES,
  ALL_INDIAN_STATES,
  evaluateCitizenEligibility,
  MatchedSchemeResult,
  SocialCategoryType,
  RationCardType,
  AreaType,
  GenderType,
  DisabilityType,
  EducationLevelType,
  OccupationType,
  IncomeRangeType,
  LandholdingType,
} from "../lib/eligibility-matcher";

export interface PersonalizedEligibilityModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialDemoId?: string;
  embedded?: boolean;
}

function getInitialProfileState(initialDemoId?: string): {
  profile: CitizenProfile;
  step: number;
  results: MatchedSchemeResult[];
} {
  if (initialDemoId) {
    const found = QUICK_DEMO_PROFILES.find((d) => d.id === initialDemoId);
    if (found) {
      return {
        profile: found.profile,
        step: 5,
        results: evaluateCitizenEligibility(found.profile),
      };
    }
  }
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("govease_citizen_profile");
      if (saved) {
        const parsed = JSON.parse(saved) as CitizenProfile;
        return { profile: parsed, step: 1, results: [] };
      }
    } catch {
      // ignore parse error
    }
  }
  return { profile: DEFAULT_CITIZEN_PROFILE, step: 1, results: [] };
}

export function PersonalizedEligibilityModal({
  isOpen = true,
  onClose,
  initialDemoId,
  embedded = false,
}: PersonalizedEligibilityModalProps) {
  const { locale } = useTranslation();
  const titleId = useId();

  const [initial] = useState(() => getInitialProfileState(initialDemoId));
  const [step, setStep] = useState<number>(initial.step);
  const [profile, setProfile] = useState<CitizenProfile>(initial.profile);
  const [results, setResults] = useState<MatchedSchemeResult[]>(initial.results);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Handle demo profile injection if passed subsequently
  useEffect(() => {
    if (!initialDemoId) return;
    const found = QUICK_DEMO_PROFILES.find((d) => d.id === initialDemoId);
    if (found) {
      const timer = setTimeout(() => {
        setProfile(found.profile);
        const matches = evaluateCitizenEligibility(found.profile);
        setResults(matches);
        setStep(5);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [initialDemoId]);

  // Handle Escape key (modal mode only)
  useEffect(() => {
    if (embedded || !isOpen || !onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, embedded]);

  if (!embedded && !isOpen) return null;

  const handleApplyDemoProfile = (demoProfile: CitizenProfile) => {
    setProfile(demoProfile);
    const matches = evaluateCitizenEligibility(demoProfile);
    setResults(matches);
    setStep(5); // jump straight to results
  };

  const handleRunEvaluation = () => {
    const matches = evaluateCitizenEligibility(profile);
    setResults(matches);
    setStep(5);

    // Save profile securely to device localStorage (DPDP compliant)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("govease_citizen_profile", JSON.stringify(profile));
      } catch {
        // ignore
      }
    }
  };

  const handleCopySummary = () => {
    const text = [
      `GovEase Qualified Schemes Report (${profile.state}, ${profile.district})`,
      `Profile: Age ${profile.age}, ${profile.occupation}, Category: ${profile.socialCategory.toUpperCase()}, Ration: ${profile.rationCard.toUpperCase()}`,
      `Total Matched Schemes: ${results.length}`,
      ...results.map(
        (r, i) =>
          `${i + 1}. ${r.title[locale] || r.title.en} - ${r.highlightBenefit[locale] || r.highlightBenefit.en}`,
      ),
      `Verified on GovEase (Zero-Knowledge Public Guide)`,
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const filteredResults =
    activeCategoryFilter === "all"
      ? results
      : results.filter((r) =>
          r.category.toLowerCase().includes(activeCategoryFilter.toLowerCase()),
        );

  const categories = Array.from(new Set(results.map((r) => r.category)));

  const content = (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "var(--radius-lg, 12px)",
        boxShadow: embedded
          ? "0 4px 20px rgba(13, 53, 112, 0.08)"
          : "0 20px 40px rgba(13, 53, 112, 0.18)",
        width: "100%",
        maxWidth: embedded ? "860px" : "760px",
        maxHeight: embedded ? "none" : "90vh",
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--color-border-default)",
        overflow: "hidden",
        margin: embedded ? "0 auto" : undefined,
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--color-border-default)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              backgroundColor: "#ecfdf5",
              border: "1px solid #a7f3d0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#065f46",
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <h2
              id={titleId}
              style={{
                fontSize: "1.2rem",
                fontWeight: 800,
                color: "var(--color-govease-navy, #0d3570)",
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              {locale === "hi"
                ? "व्यक्तिगत पात्रता जांच (Personalized Eligibility)"
                : "Personalized Eligibility Check"}
            </h2>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--color-content-secondary)",
                margin: "0.25rem 0 0 0",
              }}
            >
              {locale === "hi"
                ? "बिना किसी अनुमान के अपने अधिकार व सरकारी योजनाओं की सटीक खोज"
                : "Finding schemes you qualify for without guessing"}
            </p>
          </div>
        </div>

        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              borderRadius: "50%",
              color: "var(--color-content-tertiary)",
              fontSize: "1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setProfile(DEFAULT_CITIZEN_PROFILE);
              setStep(1);
              setResults([]);
            }}
            style={{
              padding: "0.3rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              backgroundColor: "#f1f5f9",
              color: "#475569",
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset Form
          </button>
        )}
      </div>

      {/* Quick Demo Profiles Bar */}
      <div
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#fffbeb",
          borderBottom: "1px solid #fef3c7",
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#b45309",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            flexShrink: 0,
          }}
        >
          ▶ Quick Demo Profiles:
        </span>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "nowrap" }}>
          {QUICK_DEMO_PROFILES.map((demo) => (
            <button
              key={demo.id}
              type="button"
              onClick={() => handleApplyDemoProfile(demo.profile)}
              style={{
                padding: "0.3rem 0.65rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: "#ffffff",
                color: "#92400e",
                border: "1px solid #fcd34d",
                borderRadius: "var(--radius-sm, 6px)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                transition: "all 0.15s ease",
                flexShrink: 0,
              }}
            >
              <span>{demo.icon}</span>
              <span>{demo.label[locale] || demo.label.en}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5-Step Stepper Bar */}
      <div
        style={{
          padding: "0.85rem 1.5rem",
          borderBottom: "1px solid var(--color-border-subtle, #f0f0f0)",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {[
            { num: 1, label: locale === "hi" ? "प्रोफ़ाइल" : "Profile" },
            { num: 2, label: locale === "hi" ? "शिक्षा" : "Education" },
            { num: 3, label: locale === "hi" ? "परिवार व आय" : "Household" },
            { num: 4, label: locale === "hi" ? "स्थान" : "Location" },
            { num: 5, label: locale === "hi" ? "परिणाम" : "Results" },
          ].map((s) => {
            const isActive = step === s.num;
            const isPassed = step > s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num === 5) handleRunEvaluation();
                  else setStep(s.num);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0 0.5rem",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: isActive
                      ? "var(--color-govease-navy, #0d3570)"
                      : isPassed
                        ? "#047857"
                        : "#f3f4f6",
                    color: isActive || isPassed ? "#ffffff" : "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    transition: "all 0.15s ease",
                  }}
                >
                  {isPassed ? "✓" : s.num}
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "var(--color-govease-navy, #0d3570)" : "#6b7280",
                  }}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal Scrollable Body */}
      <div
        style={{
          padding: "1.5rem",
          overflowY: "auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Privacy & Purpose Guarantee Banner */}
        <div
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "var(--radius-sm, 6px)",
            fontSize: "0.8125rem",
            color: "#166534",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.625rem",
          }}
        >
          <span style={{ fontSize: "1rem", lineHeight: 1 }}>🛡️</span>
          <div>
            <strong style={{ fontWeight: 700 }}>Zero-Knowledge Privacy Guarantee:</strong>{" "}
            {locale === "hi"
              ? "यह पात्रता जांच 100% आपके डिवाइस पर चलती है। आपकी जाति, आय या कोई भी निजी विवरण किसी सर्वर पर नहीं भेजा जाता है।"
              : "Many welfare initiatives have designated affirmative criteria. This screener runs 100% inside your browser. Zero bytes are uploaded to any server (DPDP Act 2023)."}
          </div>
        </div>

        {/* STEP 1: Personal Profile */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {/* Age */}
              <div>
                <label
                  htmlFor="field-age"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    marginBottom: "0.375rem",
                  }}
                >
                  Age (in years) <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  id="field-age"
                  type="number"
                  min="1"
                  max="115"
                  value={profile.age}
                  onChange={(e) =>
                    setProfile({ ...profile, age: parseInt(e.target.value, 10) || 18 })
                  }
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.75rem",
                    border: "1px solid var(--color-border-default)",
                    borderRadius: "var(--radius-sm, 6px)",
                    fontSize: "0.9375rem",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-content-tertiary)",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  Must be realistic age (e.g. 18–70 for welfare/pensions)
                </span>
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="field-gender"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    marginBottom: "0.375rem",
                  }}
                >
                  Gender Identity (Optional)
                </label>
                <select
                  id="field-gender"
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value as GenderType })}
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.75rem",
                    border: "1px solid var(--color-border-default)",
                    borderRadius: "var(--radius-sm, 6px)",
                    fontSize: "0.9375rem",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <option value="all">Any / Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Transgender</option>
                </select>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-content-tertiary)",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  Unlocks designated women or minority initiatives
                </span>
              </div>
            </div>

            {/* Social Category */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                Social Category (Affirmative Action)
              </label>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.5rem" }}
              >
                {(["general", "obc", "sc", "st", "ews"] as SocialCategoryType[]).map((cat) => {
                  const isSelected = profile.socialCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setProfile({ ...profile, socialCategory: cat })}
                      style={{
                        padding: "0.6rem 0.5rem",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        borderRadius: "var(--radius-sm, 6px)",
                        border: isSelected
                          ? "2px solid var(--color-govease-navy, #0d3570)"
                          : "1px solid var(--color-border-default)",
                        backgroundColor: isSelected
                          ? "var(--color-govease-navy, #0d3570)"
                          : "#ffffff",
                        color: isSelected ? "#ffffff" : "var(--color-content-primary)",
                        cursor: "pointer",
                        textTransform: "uppercase",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-content-tertiary)",
                  marginTop: "6px",
                  display: "block",
                }}
              >
                Used strictly to match statutory reservation and designated post-matric scholarship
                grants.
              </span>
            </div>

            {/* Disability Status */}
            <div>
              <label
                htmlFor="field-disability"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  marginBottom: "0.375rem",
                }}
              >
                Disability Status (Divyangjan)
              </label>
              <select
                id="field-disability"
                value={profile.disabilityStatus}
                onChange={(e) =>
                  setProfile({ ...profile, disabilityStatus: e.target.value as DisabilityType })
                }
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm, 6px)",
                  fontSize: "0.9375rem",
                  backgroundColor: "#ffffff",
                }}
              >
                <option value="none">No benchmark disability</option>
                <option value="locomotor">Locomotor / Physical disability (≥ 40%)</option>
                <option value="visual">Visual impairment (Blindness / Low vision)</option>
                <option value="hearing">Hearing / Speech impairment</option>
                <option value="intellectual">Intellectual disability / Autism</option>
                <option value="multiple">Multiple disabilities</option>
              </select>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-content-tertiary)",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                Matches Swavlamban UDID card, travel concessions, and assistive equipment aids.
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: Education & Occupation */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Highest Education */}
            <div>
              <label
                htmlFor="field-edu"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  marginBottom: "0.375rem",
                }}
              >
                Highest Education Level
              </label>
              <select
                id="field-edu"
                value={profile.educationLevel}
                onChange={(e) =>
                  setProfile({ ...profile, educationLevel: e.target.value as EducationLevelType })
                }
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm, 6px)",
                  fontSize: "0.9375rem",
                  backgroundColor: "#ffffff",
                }}
              >
                <option value="below_10th">Below 10th Standard</option>
                <option value="10th_pass">10th Standard Pass (Matriculation)</option>
                <option value="12th_pass">12th Standard Pass (Higher Secondary)</option>
                <option value="diploma_iti">ITI / Polytechnic Diploma</option>
                <option value="undergraduate">
                  Undergraduate Degree (B.Tech, B.Sc, B.Com, BA, etc.)
                </option>
                <option value="postgraduate">
                  Postgraduate Degree or Higher (M.Tech, MA, PhD)
                </option>
              </select>
            </div>

            {/* Primary Occupation */}
            <div>
              <label
                htmlFor="field-occ"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  marginBottom: "0.375rem",
                }}
              >
                Primary Occupation / Livelihood
              </label>
              <select
                id="field-occ"
                value={profile.occupation}
                onChange={(e) =>
                  setProfile({ ...profile, occupation: e.target.value as OccupationType })
                }
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm, 6px)",
                  fontSize: "0.9375rem",
                  backgroundColor: "#ffffff",
                }}
              >
                <option value="student">Student (School / College / University)</option>
                <option value="farmer">Farmer / Landowner Cultivator</option>
                <option value="agricultural_labourer">Agricultural Labourer / Farm Worker</option>
                <option value="unorganised_worker">
                  Informal / Gig / Daily-Wage Worker (Delivery, Construction, Domestic)
                </option>
                <option value="salaried">Salaried Employee (Private / Government with EPF)</option>
                <option value="self_employed">Self-Employed / Small Business / Artisan</option>
                <option value="unemployed">Unemployed / Job Seeker / Homemaker</option>
                <option value="retired">Retired / Senior Citizen</option>
              </select>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-content-tertiary)",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                Used to target PM-Kisan, e-Shram UAN, National Scholarships, or EPF benefits.
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: Household & Income Status */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Family Annual Income */}
            <div>
              <label
                htmlFor="field-income"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  marginBottom: "0.375rem",
                }}
              >
                Total Family Annual Income
              </label>
              <select
                id="field-income"
                value={profile.familyIncome}
                onChange={(e) =>
                  setProfile({ ...profile, familyIncome: e.target.value as IncomeRangeType })
                }
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm, 6px)",
                  fontSize: "0.9375rem",
                  backgroundColor: "#ffffff",
                }}
              >
                <option value="below_1lakh">
                  Below ₹1,00,000 / year (Antyodaya / EWS Priority)
                </option>
                <option value="1lakh_to_2_5lakh">
                  ₹1,00,000 – ₹2,50,000 / year (Post-Matric Scholarship Threshold)
                </option>
                <option value="2_5lakh_to_5lakh">
                  ₹2,50,000 – ₹5,00,000 / year (LIG Housing & General Grants)
                </option>
                <option value="5lakh_to_8lakh">
                  ₹5,00,000 – ₹8,00,000 / year (Central Sector & EWS Ceiling)
                </option>
                <option value="above_8lakh">
                  Above ₹8,00,000 / year (General Universal Public Services)
                </option>
              </select>
            </div>

            {/* Ration Card Status */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                Ration Card Category / Food Security Status
              </label>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.5rem" }}
              >
                {(
                  [
                    { id: "bpl", label: "BPL" },
                    { id: "aay", label: "AAY" },
                    { id: "phh", label: "PHH" },
                    { id: "apl", label: "APL" },
                    { id: "none", label: "None" },
                  ] as { id: RationCardType; label: string }[]
                ).map((item) => {
                  const isSelected = profile.rationCard === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProfile({ ...profile, rationCard: item.id })}
                      style={{
                        padding: "0.6rem 0.25rem",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        borderRadius: "var(--radius-sm, 6px)",
                        border: isSelected
                          ? "2px solid var(--color-govease-navy, #0d3570)"
                          : "1px solid var(--color-border-default)",
                        backgroundColor: isSelected
                          ? "var(--color-govease-navy, #0d3570)"
                          : "#ffffff",
                        color: isSelected ? "#ffffff" : "var(--color-content-primary)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Agricultural Landholding */}
            <div>
              <label
                htmlFor="field-land"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  marginBottom: "0.375rem",
                }}
              >
                Cultivable Landholding
              </label>
              <select
                id="field-land"
                value={profile.landholding}
                onChange={(e) =>
                  setProfile({ ...profile, landholding: e.target.value as LandholdingType })
                }
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm, 6px)",
                  fontSize: "0.9375rem",
                  backgroundColor: "#ffffff",
                }}
              >
                <option value="not_applicable">Not Applicable / Urban Resident</option>
                <option value="landless">Landless Labourer</option>
                <option value="marginal">Marginal Farmer (Less than 1 Hectare / 2.5 Acres)</option>
                <option value="small">Small Farmer (1 to 2 Hectares / 2.5 to 5 Acres)</option>
                <option value="medium_large">Medium / Large Farmer (More than 2 Hectares)</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 4: Location & Demographics */}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {/* State */}
              <div>
                <label
                  htmlFor="field-state"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    marginBottom: "0.375rem",
                  }}
                >
                  State / Union Territory <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <select
                  id="field-state"
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.75rem",
                    border: "1px solid var(--color-border-default)",
                    borderRadius: "var(--radius-sm, 6px)",
                    fontSize: "0.9375rem",
                    backgroundColor: "#ffffff",
                  }}
                >
                  {ALL_INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label
                  htmlFor="field-district"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    marginBottom: "0.375rem",
                  }}
                >
                  District
                </label>
                <input
                  id="field-district"
                  type="text"
                  value={profile.district}
                  onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                  placeholder="e.g. Kolkata, Pune, Varanasi..."
                  style={{
                    width: "100%",
                    padding: "0.625rem 0.75rem",
                    border: "1px solid var(--color-border-default)",
                    borderRadius: "var(--radius-sm, 6px)",
                    fontSize: "0.9375rem",
                  }}
                />
              </div>
            </div>

            {/* Area Type */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                Area Type
              </label>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}
              >
                {(
                  [
                    { id: "rural", label: "Rural (Gramin)" },
                    { id: "semi_urban", label: "Semi-Urban" },
                    { id: "urban", label: "Urban (City)" },
                  ] as { id: AreaType; label: string }[]
                ).map((item) => {
                  const isSelected = profile.areaType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProfile({ ...profile, areaType: item.id })}
                      style={{
                        padding: "0.65rem",
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        borderRadius: "var(--radius-sm, 6px)",
                        border: isSelected
                          ? "2px solid var(--color-govease-navy, #0d3570)"
                          : "1px solid var(--color-border-default)",
                        backgroundColor: isSelected
                          ? "var(--color-govease-navy, #0d3570)"
                          : "#ffffff",
                        color: isSelected ? "#ffffff" : "var(--color-content-primary)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Matching Scheme Results */}
        {step === 5 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Results Summary Box */}
            <div
              style={{
                padding: "1rem 1.25rem",
                backgroundColor: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "var(--radius-md, 8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: "var(--color-govease-navy, #0d3570)",
                    margin: 0,
                  }}
                >
                  🎯 Found {results.length} Eligible Government Schemes
                </h3>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "#1e40af",
                    margin: "0.25rem 0 0 0",
                  }}
                >
                  Matched specifically for: Age {profile.age} • {profile.occupation} •{" "}
                  {profile.state}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  style={{
                    padding: "0.45rem 0.85rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    backgroundColor: "#ffffff",
                    color: "var(--color-govease-navy, #0d3570)",
                    border: "1px solid #93c5fd",
                    borderRadius: "var(--radius-sm, 6px)",
                    cursor: "pointer",
                  }}
                >
                  {copiedSummary ? "✓ Copied Summary!" : "📋 Copy Report"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") window.print();
                  }}
                  style={{
                    padding: "0.45rem 0.85rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    backgroundColor: "var(--color-govease-navy, #0d3570)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "var(--radius-sm, 6px)",
                    cursor: "pointer",
                  }}
                >
                  🖨 Print List
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            {categories.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: "0.375rem",
                  overflowX: "auto",
                  paddingBottom: "4px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter("all")}
                  style={{
                    padding: "0.35rem 0.75rem",
                    fontSize: "0.75rem",
                    fontWeight: activeCategoryFilter === "all" ? 700 : 500,
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor:
                      activeCategoryFilter === "all"
                        ? "var(--color-govease-navy, #0d3570)"
                        : "#f3f4f6",
                    color:
                      activeCategoryFilter === "all" ? "#ffffff" : "var(--color-content-primary)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  All ({results.length})
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCategoryFilter(c)}
                    style={{
                      padding: "0.35rem 0.75rem",
                      fontSize: "0.75rem",
                      fontWeight: activeCategoryFilter === c ? 700 : 500,
                      borderRadius: "20px",
                      border: "none",
                      backgroundColor:
                        activeCategoryFilter === c
                          ? "var(--color-govease-navy, #0d3570)"
                          : "#f3f4f6",
                      color:
                        activeCategoryFilter === c ? "#ffffff" : "var(--color-content-primary)",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {/* Cards Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {filteredResults.map((scheme) => (
                <div
                  key={scheme.serviceId}
                  style={{
                    padding: "1rem 1.25rem",
                    backgroundColor: "#ffffff",
                    border: "1px solid var(--color-border-default)",
                    borderRadius: "var(--radius-md, 8px)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          flexWrap: "wrap",
                          marginBottom: "0.25rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.6875rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            backgroundColor: "#f1f5f9",
                            color: "#475569",
                          }}
                        >
                          {scheme.category}
                        </span>
                        <span
                          style={{
                            fontSize: "0.6875rem",
                            fontWeight: 700,
                            color: "#065f46",
                            backgroundColor: "#ecfdf5",
                            padding: "2px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          ✓ {scheme.matchScore}% Match
                        </span>
                      </div>
                      <h4
                        style={{
                          fontSize: "1.0625rem",
                          fontWeight: 800,
                          color: "var(--color-govease-navy, #0d3570)",
                          margin: 0,
                        }}
                      >
                        {scheme.title[locale] || scheme.title.en}
                      </h4>
                    </div>

                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-content-tertiary)",
                        flexShrink: 0,
                      }}
                    >
                      {scheme.officialDomain}
                    </span>
                  </div>

                  {/* Highlight Benefit */}
                  <div
                    style={{
                      padding: "0.5rem 0.75rem",
                      backgroundColor: "#f8fafc",
                      borderLeft: "3px solid #3b82f6",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: "#1e3a8a",
                    }}
                  >
                    🎁 {scheme.highlightBenefit[locale] || scheme.highlightBenefit.en}
                  </div>

                  {/* Why You Qualify Checklist */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "var(--color-content-tertiary)",
                      }}
                    >
                      Why You Qualify:
                    </span>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "1.25rem",
                        fontSize: "0.8125rem",
                        color: "var(--color-content-secondary)",
                      }}
                    >
                      {(scheme.qualificationReasons[locale] || scheme.qualificationReasons.en).map(
                        (reason: string, idx: number) => (
                          <li key={idx} style={{ marginBottom: "2px" }}>
                            {reason}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  {/* Action Links */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "0.5rem",
                      borderTop: "1px dashed var(--color-border-subtle, #f0f0f0)",
                      marginTop: "0.25rem",
                    }}
                  >
                    <Link
                      href={scheme.applicationActionUrl}
                      onClick={onClose}
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: "var(--color-govease-navy, #0d3570)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      View 5-Step Guide & Documents →
                    </Link>

                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--color-content-secondary)",
                        textDecoration: "underline",
                      }}
                    >
                      Official Portal ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Footer Controls */}
      <div
        style={{
          padding: "1rem 1.5rem",
          borderTop: "1px solid var(--color-border-default)",
          backgroundColor: "#f8f9fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          {step > 1 && step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                backgroundColor: "transparent",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-sm, 6px)",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          ) : step === 5 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                backgroundColor: "transparent",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-sm, 6px)",
                cursor: "pointer",
              }}
            >
              ✎ Edit Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                backgroundColor: "transparent",
                border: "none",
                color: "var(--color-content-tertiary)",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {step < 4 ? (
            <>
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                style={{
                  padding: "0.5rem 0.875rem",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  backgroundColor: "transparent",
                  border: "none",
                  color: "var(--color-content-secondary)",
                  cursor: "pointer",
                }}
              >
                Skip Optional
              </button>
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                style={{
                  padding: "0.5rem 1.25rem",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  backgroundColor: "var(--color-govease-navy, #0d3570)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "var(--radius-sm, 6px)",
                  cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(13, 53, 112, 0.2)",
                }}
              >
                Next Step →
              </button>
            </>
          ) : step === 4 ? (
            <button
              type="button"
              onClick={handleRunEvaluation}
              style={{
                padding: "0.5rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                backgroundColor: "#047857",
                color: "#ffffff",
                border: "none",
                borderRadius: "var(--radius-sm, 6px)",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(4, 120, 87, 0.25)",
              }}
            >
              Find My Eligible Schemes 🎯
            </button>
          ) : onClose ? (
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.5rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                backgroundColor: "var(--color-govease-navy, #0d3570)",
                color: "#ffffff",
                border: "none",
                borderRadius: "var(--radius-sm, 6px)",
                cursor: "pointer",
              }}
            >
              Close & Explore Services
            </button>
          ) : (
            <Link
              href="/explore"
              style={{
                padding: "0.5rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                backgroundColor: "var(--color-govease-navy, #0d3570)",
                color: "#ffffff",
                border: "none",
                borderRadius: "var(--radius-sm, 6px)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              Browse All Services →
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(13, 53, 112, 0.45)",
        backdropFilter: "blur(6px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        overflowY: "auto",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      {content}
    </div>
  );
}
