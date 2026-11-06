"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../context/I18nContext";
import { EcosystemBadge } from "./EcosystemBadge";
import type { LifeEcosystem } from "../lib/catalogue";

interface GoalItem {
  serviceId: string;
  ecosystem: LifeEcosystem;
  titles: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
  hints: {
    en: string;
    hi: string;
    bn: string;
    ta: string;
  };
}

const POPULAR_GOALS: GoalItem[] = [
  {
    serviceId: "birth-certificate-crs",
    ecosystem: "government-and-citizen",
    titles: {
      en: "Get a Birth Certificate",
      hi: "जन्म प्रमाण पत्र प्राप्त करें",
      bn: "জন্ম শংসাপত্র নিন",
      ta: "பிறப்புச் சான்றிதழ் பெறுக",
    },
    hints: {
      en: "Civil Registration System (CRS)",
      hi: "नागरिक पंजीकरण प्रणाली (CRS)",
      bn: "সিভিল রেজিস্ট্রেশন সিস্টেম",
      ta: "குடிமக்கள் பதிவு அமைப்பு",
    },
  },
  {
    serviceId: "nsp-scholarship-discovery",
    ecosystem: "education",
    titles: {
      en: "Find a Scholarship",
      hi: "छात्रवृत्ति खोजें व आवेदन करें",
      bn: "স্কলারশিপ খুঁজুন",
      ta: "கல்வி உதவித்தொகை கண்டறியவும்",
    },
    hints: {
      en: "National Scholarship Portal (NSP OTR)",
      hi: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)",
      bn: "জাতীয় স্কলারশিপ পোর্টাল",
      ta: "தேசிய உதவித்தொகை போர்டல்",
    },
  },
  {
    serviceId: "create-abha-id",
    ecosystem: "healthcare",
    titles: {
      en: "Create ABHA Health Account",
      hi: "आयुष्मान भारत स्वास्थ्य खाता (ABHA) बनाएं",
      bn: "আভা (ABHA) স্বাস্থ্য কার্ড তৈরি করুন",
      ta: "ஆபா (ABHA) சுகாதார அட்டை உருவாக்குக",
    },
    hints: {
      en: "14-digit digital medical ID (NHA)",
      hi: "14 अंकों का डिजिटल हेल्थ खाता (NHA)",
      bn: "১৪ সংখ্যার ডিজিটাল স্বাস্থ্য আইডি",
      ta: "14 இலக்க டிஜிட்டல் சுகாதார கணக்கு",
    },
  },
  {
    serviceId: "pm-jan-dhan-yojana-account",
    ecosystem: "finance-and-welfare",
    titles: {
      en: "Open Zero-Balance Bank Account",
      hi: "जीरो-बैलेंस बैंक खाता खोलें (जन-धन)",
      bn: "জিরো-ব্যালেন্স ব্যাংক অ্যাকাউন্ট খুলুন",
      ta: "ஜீரோ பேலன்ஸ் வங்கி கணக்கு தொடங்குக",
    },
    hints: {
      en: "PM Jan Dhan Yojana (PMJDY)",
      hi: "प्रधानमंत्री जन धन योजना",
      bn: "প্রধানমন্ত্রী জন ধন যোজনা",
      ta: "பிரதான் மந்திரி ஜன் தன் யோஜனா",
    },
  },
  {
    serviceId: "eshram-card-registration",
    ecosystem: "finance-and-welfare",
    titles: {
      en: "Register as Unorganised Worker",
      hi: "असंगठित श्रमिक ई-श्रम कार्ड बनाएं",
      bn: "ই-শ্রম (e-Shram) কার্ড রেজিস্টার করুন",
      ta: "இ-ஷ்ரம் தொழிலாளர் பதிவு செய்க",
    },
    hints: {
      en: "Universal Account Number (UAN)",
      hi: "12 अंकों का UAN कार्ड",
      bn: "১২ সংখ্যার সর্বজনীন অ্যাকাউন্ট নম্বর",
      ta: "12 இலக்க UAN எண்",
    },
  },
  {
    serviceId: "driving-licence-renewal",
    ecosystem: "mobility-and-transport",
    titles: {
      en: "Renew Driving Licence",
      hi: "ड्राइविंग लाइसेंस नवीनीकरण करें",
      bn: "ড্রাইভিং লাইসেন্স নবায়ন করুন",
      ta: "ஓட்டுநர் உரிமம் புதுப்பிக்கவும்",
    },
    hints: {
      en: "Parivahan Sarathi Portal",
      hi: "परिवहन सारथी पोर्टल",
      bn: "পরিবহন সারথি পোর্টাল",
      ta: "பரிவாஹன் சாரதி போர்டல்",
    },
  },
  {
    serviceId: "pm-kisan-status",
    ecosystem: "finance-and-welfare",
    titles: {
      en: "Check PM-Kisan Status & eKYC",
      hi: "पीएम-किसान किस्त स्थिति व ई-केवाईसी",
      bn: "পিএম-কিসান কিস্তির স্থিতি পরীক্ষা",
      ta: "பிஎம்-கிசான் தவணை நிலையைச் சரிபார்க்கவும்",
    },
    hints: {
      en: "₹6,000/year farmer welfare support",
      hi: "सालाना ₹6,000 किसान सम्मान निधि",
      bn: "বার্ষিক ₹৬,০০০ কৃষক সহায়তা",
      ta: "ஆண்டுக்கு ₹6,000 விவசாய உதவி",
    },
  },
  {
    serviceId: "pan-card-reprint",
    ecosystem: "finance-and-welfare",
    titles: {
      en: "Reprint Official PAN Card",
      hi: "आधिकारिक पैन कार्ड पुनः प्रिंट करें",
      bn: "প্যান (PAN) কার্ড রিপ্রিন্ট করুন",
      ta: "பான் (PAN) அட்டை மறுபதிப்பு செய்க",
    },
    hints: {
      en: "Protean / NSDL Physical Card Delivery",
      hi: "घर पर भौतिक पैन कार्ड डाक द्वारा प्राप्त करें",
      bn: "পোস্টের মাধ্যমে নতুন প্যান কার্ড পান",
      ta: "அஞ்சல் மூலம் பான் அட்டை பெற்றிடுங்கள்",
    },
  },
];

export function GoalPhrasedGrid() {
  const { locale } = useTranslation();

  return (
    <section
      id="popular-goals"
      aria-labelledby="quick-goals-heading"
      style={{
        marginTop: "2.5rem",
        marginBottom: "3rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div>
          <h2
            id="quick-goals-heading"
            style={{
              fontSize: "1.375rem",
              fontWeight: 800,
              color: "var(--color-ink)",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {locale === "hi"
              ? "आप क्या करना चाहते हैं?"
              : locale === "bn"
                ? "আপনি কি করতে চান?"
                : locale === "ta"
                  ? "நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?"
                  : "What would you like to do?"}
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-content-secondary)",
              margin: "0.25rem 0 0 0",
            }}
          >
            {locale === "hi"
              ? "विभागीय नामों के बजाय अपने सीधे नागरिक लक्ष्य से शुरुआत करें।"
              : locale === "bn"
                ? "বিভাগীয় নামের পরিবর্তে আপনার সরাসরি লক্ষ্য নির্বাচন করুন।"
                : locale === "ta"
                  ? "துறைப் பெயர்களுக்குப் பதிலாக உங்கள் நேரடி இலக்கைத் தேர்ந்தெடுக்கவும்."
                  : "Common civic tasks phrased by your goal, with step-by-step guidance."}
          </p>
        </div>

        <Link
          href="/explore"
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
              ? "सभी 18 सेवाएँ देखें"
              : locale === "bn"
                ? "সব ১৮টি পরিষেবা দেখুন"
                : locale === "ta"
                  ? "அனைத்து 18 சேவைகளையும் காண்க"
                  : "View all 18 services"}
          </span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1rem",
        }}
      >
        {POPULAR_GOALS.map((goal) => {
          const title = goal.titles[locale] || goal.titles.en;
          const hint = goal.hints[locale] || goal.hints.en;

          return (
            <Link
              key={goal.serviceId}
              href={`/services/${goal.serviceId}`}
              className="civic-card-interactive"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1.125rem",
                backgroundColor: "var(--color-surface-card)",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                color: "inherit",
                minHeight: "108px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <EcosystemBadge ecosystem={goal.ecosystem} size={16} />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--color-content-tertiary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {goal.ecosystem.replace(/-/g, " ")}
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    color: "var(--color-ink)",
                    lineHeight: 1.35,
                  }}
                >
                  {title}
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-content-secondary)",
                  marginTop: "0.5rem",
                }}
              >
                {hint}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
