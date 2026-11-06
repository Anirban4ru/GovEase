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
  angle: number; // In degrees: 0, 60, 120, 180, 240, 300
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
    angle: 300,
    titles: {
      en: "Healthcare & Well-Being",
      hi: "स्वास्थ्य एवं चिकित्सा",
      bn: "স্বাস্থ্য ও চিকিৎসা",
      ta: "சுகாதாரம் மற்றும் நல்வாழ்வு",
    },
    summaries: {
      en: "ABHA health ID, Ayushman Bharat, and hospital discovery",
      hi: "आयुष्मान भारत स्वास्थ्य खाता (ABHA) व सरकारी अस्पताल",
      bn: "আভা (ABHA) স্বাস্থ্য কার্ড ও চিকিৎসা সহায়তা",
      ta: "ஆபா சுகாதார கணக்கு மற்றும் மருத்துவ வழிகாட்டல்",
    },
  },
  {
    id: "education",
    nameKey: "ecosystems.education",
    count: 1,
    chipLabel: "OFFICIAL PORTALS",
    angle: 0,
    titles: {
      en: "Education & Scholarships",
      hi: "शिक्षा एवं छात्रवृत्ति",
      bn: "শিক্ষা ও স্কলারশিপ",
      ta: "கல்வி மற்றும் உதவித்தொகை",
    },
    summaries: {
      en: "National Scholarship Portal (NSP OTR) & academic credentials",
      hi: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) व छात्र प्रोत्साहन",
      bn: "জাতীয় স্কলারশিপ পোর্টাল ও শিক্ষা অনুদান",
      ta: "தேசிய உதவித்தொகை போர்டல் மற்றும் கல்விச் சான்றுகள்",
    },
  },
  {
    id: "finance-and-welfare",
    nameKey: "ecosystems.financeAndWelfare",
    count: 6,
    chipLabel: "NO CREDENTIAL CAPTURE",
    angle: 60,
    titles: {
      en: "Finance & Welfare",
      hi: "वित्त एवं जन-कल्याण",
      bn: "অর্থ ও জনকল্যাণ",
      ta: "நிதி மற்றும் மக்கள் நலம்",
    },
    summaries: {
      en: "PM Jan Dhan, e-Shram worker UAN, PMSBY, PM-Kisan & pensions",
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
    angle: 120,
    titles: {
      en: "Citizen & Identity",
      hi: "नागरिक पहचान व अभिलेख",
      bn: "নাগরিক পরিচয় ও নথিপত্র",
      ta: "குடிமக்கள் அடையாளம் மற்றும் சான்றிதழ்",
    },
    summaries: {
      en: "Birth certificates, DigiLocker electronic storage, UDID & PAN",
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
    angle: 180,
    titles: {
      en: "Mobility & Transport",
      hi: "परिवहन एवं आवागमन",
      bn: "পরিবহন ও যানবাহন",
      ta: "போக்குவரத்து மற்றும் வாகனங்கள்",
    },
    summaries: {
      en: "Driving licence renewal, Parivahan Sarathi & RC transfer",
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
    angle: 240,
    titles: {
      en: "Public Consumer Rights",
      hi: "उपभोक्ता अधिकार व शिकायत",
      bn: "ভোক্তা অধিকার ও অভিযোগ",
      ta: "நுகர்வோர் உரிமைகள் மற்றும் குறைதீர்ப்பு",
    },
    summaries: {
      en: "National Consumer Helpline 1915 & grievance redressal",
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

  // WCAG 2.2.2: Auto-pause drift after 5 seconds of inactivity
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
    if (!is3DAllowed || !containerRef.current) return;

    // Reset idle timer on pointer interaction
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsDriftActive(false);
    }, 5000);

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Limit rotation to max 4 degrees X, 6 degrees Y
    setTilt({
      x: -deltaY * 4,
      y: deltaX * 6,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const toggleDrift = () => {
    setIsDriftActive((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "480px",
        height: "440px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Interactive Life Areas Map"
    >
      {/* Pause/Play Ambient Motion Control (WCAG 2.2.2) */}
      {is3DAllowed && (
        <button
          type="button"
          onClick={toggleDrift}
          aria-label={isDriftActive ? "Pause Motion" : "Play Motion"}
          style={{
            position: "absolute",
            top: "0.25rem",
            right: "0.25rem",
            background: "var(--color-ground-elevated)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-sm)",
            padding: "0.25rem 0.5rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--color-content-secondary)",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            zIndex: 10,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <span aria-hidden="true">{isDriftActive ? "⏸" : "▶"}</span>
          <span>{isDriftActive ? "Pause Motion" : "Play Motion"}</span>
        </button>
      )}

      {/* 3D Spatial Canvas */}
      <div
        className={is3DAllowed ? "spatial-canvas-3d" : ""}
        style={{
          position: "relative",
          width: "360px",
          height: "360px",
          transform: is3DAllowed ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : "none",
          transition: "transform 180ms ease-out",
        }}
      >
        {/* Subtle Background Radial Concentric Guides */}
        <svg
          width="360"
          height="360"
          viewBox="0 0 360 360"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            opacity: 0.25,
          }}
          aria-hidden="true"
        >
          <circle
            cx="180"
            cy="180"
            r="70"
            fill="none"
            stroke="var(--color-border-strong)"
            strokeDasharray="2 3"
          />
          <circle
            cx="180"
            cy="180"
            r="135"
            fill="none"
            stroke="var(--color-border-strong)"
            strokeDasharray="3 4"
          />
          {/* Subtle 6-direction axis lines */}
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x2 = 180 + Math.cos(rad) * 140;
            const y2 = 180 + Math.sin(rad) * 140;
            return (
              <line
                key={deg}
                x1="180"
                y1="180"
                x2={x2}
                y2={y2}
                stroke="var(--color-border-default)"
                strokeWidth="1"
              />
            );
          })}
        </svg>

        {/* Central Citizen Node: "You are here" */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "84px",
            height: "84px",
            borderRadius: "50%",
            backgroundColor: "var(--color-ground-elevated)",
            border: "2px solid var(--color-ochre)",
            boxShadow: "var(--shadow-md)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            zIndex: 4,
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "var(--color-ochre)",
              marginBottom: "0.2rem",
            }}
          />
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 800,
              color: "var(--color-ink)",
              lineHeight: 1.1,
              padding: "0 0.25rem",
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
          <span
            style={{
              fontSize: "0.625rem",
              color: "var(--color-content-tertiary)",
              fontWeight: 600,
              marginTop: "0.1rem",
            }}
          >
            {locale === "hi" ? "6 मुख्य क्षेत्र" : "6 Life Areas"}
          </span>
        </div>

        {/* 6 Orbiting Life Area Nodes */}
        {LIFE_AREA_NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const radius = 135; // Distance from center
          const x = 180 + Math.cos(rad) * radius - 44; // 88px node width / 2
          const y = 180 + Math.sin(rad) * radius - 44;

          const title = node.titles[locale] || node.titles.en;
          const isHovered = hoveredNode === node.id;

          return (
            <Link
              key={node.id}
              href={`/explore?category=${node.id}`}
              onPointerEnter={() => setHoveredNode(node.id)}
              onPointerLeave={() => setHoveredNode(null)}
              onFocus={() => setHoveredNode(node.id)}
              onBlur={() => setHoveredNode(null)}
              className={is3DAllowed ? "spatial-node-3d" : ""}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                width: "88px",
                height: "88px",
                borderRadius: "var(--radius-lg)",
                backgroundColor: isHovered
                  ? "var(--color-ground-muted)"
                  : "var(--color-ground-elevated)",
                border: isHovered
                  ? "2px solid var(--color-ochre)"
                  : "1px solid var(--color-border-strong)",
                boxShadow: isHovered ? "var(--shadow-lg)" : "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "inherit",
                zIndex: isHovered ? 8 : 5,
                padding: "0.35rem",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <EcosystemBadge ecosystem={node.id} size={22} />
              <div
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "var(--color-ink)",
                  lineHeight: 1.2,
                  marginTop: "0.3rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {title}
              </div>
              <span
                style={{
                  fontSize: "0.625rem",
                  color: "var(--color-teal)",
                  fontWeight: 700,
                  marginTop: "0.15rem",
                }}
              >
                {node.count} {locale === "hi" ? "सेवाएँ" : "services"}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Summary Box Revealed on Hover / Focus (Section 2.2 #4) */}
      {hoveredNode && (
        <div
          role="status"
          aria-live="polite"
          className="motion-fade-in"
          style={{
            position: "absolute",
            bottom: "0.5rem",
            left: "1rem",
            right: "1rem",
            backgroundColor: "var(--color-ground-elevated)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            padding: "0.5rem 0.75rem",
            fontSize: "0.8125rem",
            color: "var(--color-content-secondary)",
            boxShadow: "var(--shadow-md)",
            textAlign: "center",
            zIndex: 12,
          }}
        >
          {LIFE_AREA_NODES.find((n) => n.id === hoveredNode)?.summaries[locale] ||
            LIFE_AREA_NODES.find((n) => n.id === hoveredNode)?.summaries.en}
        </div>
      )}
    </div>
  );
}
