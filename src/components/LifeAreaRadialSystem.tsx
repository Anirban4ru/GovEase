"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslation } from "../context/I18nContext";
import { usePresentationMode } from "../context/ModeContext";
import { EcosystemBadge } from "./EcosystemBadge";
import type { LifeEcosystem } from "../lib/catalogue";

interface LifeAreaNode {
  id: LifeEcosystem;
  nameKey: string;
  count: number;
  chipLabel: string;
  titles: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
  summaries: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
}

const LIFE_AREA_NODES: LifeAreaNode[] = [
  {
    id: "healthcare",
    nameKey: "ecosystems.healthcare",
    count: 3,
    chipLabel: "OFFICIAL INFORMATION",
    titles: {
      en: "Healthcare & Well-Being",
      hi: "स्वास्थ्य एवं चिकित्सा",
      bn: "স্বাস্থ্য ও চিকিৎসা",
      ta: "சுகாதாரம் மற்றும் நல்வாழ்வு",
    },
    summaries: {
      en: "ABHA Health ID, Ayushman Bharat PM-JAY & verified hospital networks",
      hi: "आयुष्मान भारत स्वास्थ्य खाता (ABHA) व सरकारी अस्पताल",
      bn: "আভা (ABHA) স্বাস্থ্য কার্ড ও সরকারি চিকিৎসা সহায়তা",
      ta: "ஆபா சுகாதார கணக்கு மற்றும் மருத்துவ வழிகாட்டல்",
    },
  },
  {
    id: "education",
    nameKey: "ecosystems.education",
    count: 1,
    chipLabel: "OFFICIAL PORTALS",
    titles: {
      en: "Education & Scholarships",
      hi: "शिक्षा एवं छात्रवृत्ति",
      bn: "শিক্ষা ও স্কলারশিপ",
      ta: "கல்வி மற்றும் உதவித்தொகை",
    },
    summaries: {
      en: "National Scholarship Portal (NSP OTR) & verified student incentives",
      hi: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) व छात्र प्रोत्साहन",
      bn: "জাতীয় স্কলারশিপ পোর্টাল ও উচ্চশিক্ষা অনুদান",
      ta: "தேசிய உதவித்தொகை போர்டல் மற்றும் கல்விச் சான்றுகள்",
    },
  },
  {
    id: "finance-and-welfare",
    nameKey: "ecosystems.financeAndWelfare",
    count: 6,
    chipLabel: "NO CREDENTIAL CAPTURE",
    titles: {
      en: "Finance & Welfare",
      hi: "वित्त एवं जन-कल्याण",
      bn: "অর্থ ও জনকল্যাণ",
      ta: "நிதி மற்றும் மக்கள் நலம்",
    },
    summaries: {
      en: "PM Jan Dhan, e-Shram worker UAN, PMSBY, PM-Kisan & social security",
      hi: "जन धन खाता, ई-श्रम, सुरक्षा बीमा व किसान सम्मान निधि",
      bn: "জন ধন অ্যাকাউন্ট, ই-শ্রম, বিমা ও কিষাণ সুবিধা",
      ta: "ஜன் தன் வங்கி கணக்கு, இ-ஷ்ரம், காப்பீடு மற்றும் நலத்திட்டங்கள்",
    },
  },
  {
    id: "government-and-citizen",
    nameKey: "ecosystems.governmentAndCitizen",
    count: 4,
    chipLabel: "OFFICIAL PORTALS",
    titles: {
      en: "Citizen & Identity",
      hi: "नागरिक पहचान व अभिलेख",
      bn: "নাগরিক পরিচয় ও নথিপত্র",
      ta: "குடிமக்கள் அடையாளம் மற்றும் சான்றிதழ்",
    },
    summaries: {
      en: "Birth certificates via CRS, DigiLocker, UDID smart cards & PAN reprint",
      hi: "जन्म प्रमाण पत्र, डिजिलॉकर, दिव्यांगजन UDID व पैन कार्ड",
      bn: "জন্ম শংসাপত্র, ডিজিলকার, প্রতিবন্ধী কার্ড ও প্যান",
      ta: "பிறப்புச் சான்றிதழ், டிஜிலாக்கர், மாற்றுத்திறனாளி அட்டை",
    },
  },
  {
    id: "mobility-and-transport",
    nameKey: "ecosystems.mobilityAndTransport",
    count: 2,
    chipLabel: "VERIFIED ROAD LINKS",
    titles: {
      en: "Mobility & Transport",
      hi: "परिवहन एवं आवागमन",
      bn: "পরিবহন ও যানবাহন",
      ta: "போக்குவரத்து மற்றும் வாகனங்கள்",
    },
    summaries: {
      en: "Driving licence renewal, Parivahan Sarathi & vehicle RC ownership",
      hi: "ड्राइविंग लाइसेंस नवीनीकरण व वाहन आरसी स्वामित्व अंतरण",
      bn: "ড্রাইভিং লাইসেন্স নবায়ন ও গাড়ির আরসি বদল",
      ta: "ஓட்டுநர் உரிமம் புதுப்பித்தல் மற்றும் வாகன ஆர்.சி",
    },
  },
  {
    id: "utilities-and-local",
    nameKey: "ecosystems.utilitiesAndLocal",
    count: 1,
    chipLabel: "STATE & MUNICIPAL",
    titles: {
      en: "Public Consumer Rights",
      hi: "उपभोक्ता अधिकार व शिकायत",
      bn: "ভোক্তা অধিকার ও অভিযোগ",
      ta: "நுகர்வோர் உரிமைகள் மற்றும் குறைதீர்ப்பு",
    },
    summaries: {
      en: "National Consumer Helpline 1915 & grievance redressal directory",
      hi: "राष्ट्रीय उपभोक्ता हेल्पलाइन 1915 व शिकायत निवारण",
      bn: "জাতীয় ভোক্তা হেল্পলাইন ১৯১৫ ও ন্যায়সংগত প্রতিকার",
      ta: "தேசிய நுகர்வோர் உதவி எண் 1915 மற்றும் தீர்வு",
    },
  },
];

export function LifeAreaRadialSystem() {
  const { locale } = useTranslation();
  const { mode } = usePresentationMode();

  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDriftActive, setIsDriftActive] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const is3DAllowed = mode === "standard";

  // WCAG 2.2.2: Auto-pause motion after 5 seconds of idle inactivity
  useEffect(() => {
    if (!is3DAllowed) return;

    idleTimerRef.current = setTimeout(() => {
      setIsDriftActive(false);
    }, 5000);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [is3DAllowed]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!is3DAllowed || !containerRef.current || !isDriftActive) return;

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsDriftActive(false);
    }, 5000);

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Subtle 3D perspective tilt
    setTilt({
      x: -deltaY * 3,
      y: deltaX * 4,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const toggleDrift = () => {
    setIsDriftActive((prev) => !prev);
    if (!isDriftActive) {
      setTilt({ x: 0, y: 0 });
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "520px",
        margin: "0 auto",
        backgroundColor: "var(--color-surface-card)",
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        padding: "1.25rem",
        transform:
          is3DAllowed && isDriftActive
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : "none",
        transition: "transform 180ms ease-out, box-shadow 200ms ease",
      }}
      aria-label="Interactive Life Areas Map"
    >
      {/* Header bar: Citizen indicator & Pause/Play Motion (WCAG 2.2.2 compliant) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--color-border-subtle)",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "var(--color-teal)",
              boxShadow: "0 0 0 3px var(--color-teal-subtle)",
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "var(--color-ink)",
              letterSpacing: "-0.01em",
            }}
          >
            {locale === "hi"
              ? "आप यहाँ हैं"
              : locale === "bn"
                ? "আপনি এখানে"
                : locale === "ta"
                  ? "நீங்கள் இங்கே"
                  : "You are here"}
          </span>
          <span style={{ color: "var(--color-content-tertiary)", fontSize: "0.75rem" }}>•</span>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-content-secondary)",
            }}
          >
            {locale === "hi" ? "6 मुख्य क्षेत्र" : "6 Life Areas"}
          </span>
          <span style={{ color: "var(--color-content-tertiary)", fontSize: "0.75rem" }}>•</span>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "var(--color-teal-text)",
              backgroundColor: "var(--color-teal-subtle)",
              padding: "0.15rem 0.45rem",
              borderRadius: "var(--radius-xs)",
            }}
          >
            {locale === "hi" ? "18 सत्यापित सेवाएँ" : "18 Verified Services"}
          </span>
        </div>

        {is3DAllowed && (
          <button
            type="button"
            onClick={toggleDrift}
            aria-label={isDriftActive ? "Pause Motion" : "Play Motion"}
            style={{
              background: "var(--color-ground-muted)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-sm)",
              padding: "0.25rem 0.6rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-content-secondary)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span aria-hidden="true">{isDriftActive ? "⏸" : "▶"}</span>
            <span>{isDriftActive ? "Pause Motion" : "Play Motion"}</span>
          </button>
        )}
      </div>

      {/* 6 Category Tiles in a clean 2-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "0.75rem",
        }}
      >
        {LIFE_AREA_NODES.map((node) => {
          const isHovered = hoveredNode === node.id;
          const title = node.titles[locale] || node.titles.en;

          return (
            <Link
              key={node.id}
              href={`/explore?category=${node.id}`}
              onPointerEnter={() => setHoveredNode(node.id)}
              onPointerLeave={() => setHoveredNode(null)}
              onFocus={() => setHoveredNode(node.id)}
              onBlur={() => setHoveredNode(null)}
              className="civic-card-interactive"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "0.75rem",
                backgroundColor: isHovered ? "var(--color-ground)" : "var(--color-surface-card)",
                border: isHovered
                  ? "1px solid var(--color-ink-blue)"
                  : "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                color: "inherit",
                boxShadow: isHovered ? "var(--shadow-md)" : "none",
                transform: isHovered ? "translateY(-2px)" : "none",
                transition: "all 150ms ease-in-out",
                minHeight: "100px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.4rem",
                    gap: "0.25rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <EcosystemBadge ecosystem={node.id} size={20} />
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 700,
                        color: "var(--color-ink)",
                        lineHeight: 1.2,
                      }}
                    >
                      {title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "var(--color-teal-text)",
                      backgroundColor: "var(--color-teal-subtle)",
                      padding: "0.1rem 0.35rem",
                      borderRadius: "var(--radius-xs)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {node.count} {locale === "hi" ? "सेवाएँ" : "services"}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.75rem",
                    color: "var(--color-content-secondary)",
                    lineHeight: 1.35,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {node.summaries[locale] || node.summaries.en}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer bar: Official Direct Verification Assurance */}
      <div
        style={{
          marginTop: "1rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--color-border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.6875rem",
          color: "var(--color-content-tertiary)",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <span style={{ color: "var(--color-teal-text)", fontWeight: 700 }}>✓</span>
          <span>
            {locale === "hi"
              ? "100% आधिकारिक .gov.in और .nic.in पोर्टल"
              : "100% Official .gov.in & .nic.in Portals"}
          </span>
        </div>
        <span style={{ fontWeight: 600 }}>
          {locale === "hi" ? "शून्य व्यक्तिगत डेटा संग्रह" : "Zero Personal Data Retention"}
        </span>
      </div>

      {/* Dynamic Summary Status on Hover / Focus for Screen Readers and Live Guidance */}
      {hoveredNode && (
        <div role="status" aria-live="polite" className="sr-only">
          {LIFE_AREA_NODES.find((n) => n.id === hoveredNode)?.summaries[locale] ||
            LIFE_AREA_NODES.find((n) => n.id === hoveredNode)?.summaries.en}
        </div>
      )}
    </div>
  );
}
