"use client";

import React from "react";
import Link from "next/link";
import { useTranslation, Locale } from "../context/I18nContext";
import { usePresentationMode } from "../context/ModeContext";
import { SearchBar } from "./SearchBar";
import { EcosystemBadge } from "./EcosystemBadge";
import type { LifeEcosystem } from "../lib/catalogue";

interface EcosystemItem {
  id: LifeEcosystem;
  titles: Record<Locale, string>;
  descs: Record<Locale, string>;
  badge: string;
}

const ECOSYSTEMS: EcosystemItem[] = [
  {
    id: "government-and-citizen",
    titles: {
      en: "Government & Citizen Services",
      hi: "सरकारी और नागरिक सेवाएँ",
      bn: "সরকারি ও নাগরিক পরিষেবা",
      ta: "அரசு மற்றும் குடிமக்கள் சேவைகள்",
    },
    descs: {
      en: "Birth certificates, identity documents, PAN, and welfare scheme navigation.",
      hi: "जन्म प्रमाण पत्र, पहचान पत्र, पैन और कल्याणकारी योजनाएं।",
      bn: "জন্ম সনদ, পরিচয়পত্র, প্যান কার্ড এবং জনকল্যাণমূলক প্রকল্প সহায়িকা।",
      ta: "பிறப்புச் சான்றிதழ்கள், அடையாள ஆவணங்கள், பான் மற்றும் நலத்திட்ட வழிகாட்டி.",
    },
    badge: "Official Portals",
  },
  {
    id: "healthcare",
    titles: {
      en: "Healthcare",
      hi: "स्वास्थ्य सेवा",
      bn: "স্বাস্থ্যসেবা",
      ta: "சுகாதாரம்",
    },
    descs: {
      en: "ABHA guidance, hospital discovery, and public health schemes.",
      hi: "आभा (ABHA) मार्गदर्शन, अस्पताल और सार्वजनिक स्वास्थ्य योजनाएँ।",
      bn: "আভা (ABHA) নির্দেশনা, হাসপাতাল সন্ধান এবং জনস্বাস্থ্য প্রকল্প।",
      ta: "ஆபா (ABHA) வழிகாட்டுதல், மருத்துவமனை கண்டறிதல் மற்றும் பொது சுகாதார திட்டங்கள்.",
    },
    badge: "Official Information",
  },
  {
    id: "education",
    titles: {
      en: "Education & Scholarships",
      hi: "शिक्षा और छात्रवृत्ति",
      bn: "শিক্ষা ও বৃত্তি",
      ta: "கல்வி மற்றும் உதவித்தொகை",
    },
    descs: {
      en: "Academic Bank of Credits (ABC), scholarships, and student credentials.",
      hi: "एकेडमिक बैंक ऑफ क्रेडिट्स (ABC), छात्रवृत्ति और डिग्री सत्यापन।",
      bn: "একাডেমিক ব্যাংক অফ ক্রেডিট (ABC), বৃত্তি এবং ছাত্র শংসাপত্র যাচাই।",
      ta: "அகாடமிக் பேங்க் ஆஃப் கிரெடிட்ஸ் (ABC), உதவித்தொகைகள் மற்றும் கல்விச் சான்றுகள்.",
    },
    badge: "Official Portals",
  },
  {
    id: "finance-and-welfare",
    titles: {
      en: "Finance & Welfare",
      hi: "वित्त और कल्याण",
      bn: "অর্থ ও জনকল্যাণ",
      ta: "நிதி மற்றும் நலத்திட்டங்கள்",
    },
    descs: {
      en: "Direct Benefit Transfer (DBT) resources and public banking guides.",
      hi: "प्रत्यक्ष लाभ अंतरण (DBT) और सार्वजनिक बैंकिंग मार्गदर्शिका।",
      bn: "প্রত্যক্ষ সুবিধা হস্তান্তর (DBT) সম্পদ এবং সরকারি ব্যাংকিং নির্দেশিকা।",
      ta: "நேரடி பலன் பரிமாற்றம் (DBT) மற்றும் பொது வங்கி வழிகாட்டிகள்.",
    },
    badge: "No Financial Storage",
  },
  {
    id: "mobility-and-transport",
    titles: {
      en: "Mobility & Transport",
      hi: "परिवहन और वाहन",
      bn: "পরিবহন ও যানবাহন",
      ta: "போக்குவரத்து மற்றும் வாகனம்",
    },
    descs: {
      en: "Driving licence renewal, Sarathi, and vehicle registration portals.",
      hi: "ड्राइविंग लाइसेंस नवीनीकरण, सारथी और वाहन पंजीकरण।",
      bn: "ড্রাইভিং লাইসেন্স নবায়ন, সারথি এবং যানবাহন নিবন্ধন পোর্টাল।",
      ta: "ஓட்டுநர் உரிம புதுப்பித்தல், சாரதி மற்றும் வாகனப் பதிவு இணையதளங்கள்.",
    },
    badge: "Verified Road Links",
  },
  {
    id: "utilities-and-local",
    titles: {
      en: "Utilities & Municipal",
      hi: "उपयोगिता और नगर निगम",
      bn: "পৌর ও প্রয়োজনীয় সেবা",
      ta: "பயன்பாடுகள் மற்றும் நகராட்சி",
    },
    descs: {
      en: "Electricity, piped water, property tax, and civic grievance destinations.",
      hi: "बिजली, पानी, संपत्ति कर और नागरिक शिकायत निवारण।",
      bn: "বিদ্যুৎ, পানীয় জল, পৌর কর এবং नागरिक অভিযোগ নিষ্পত্তি।",
      ta: "மின்சாரம், குடிநீர், சொத்து வரி மற்றும் குடிமக்கள் குறைகேட்பு.",
    },
    badge: "State & Municipal Portals",
  },
];

const PAGE_TEXTS: Record<
  Locale,
  {
    heroTitle: string;
    heroDesc: string;
    browseBtn: string;
    howWorksBtn: string;
    areasHeading: string;
    exploreArea: string;
    trustHeading: string;
    trustDesc: string;
    assistedTip: string;
  }
> = {
  en: {
    heroTitle: "Discover, Understand, and Reach Essential Public Services",
    heroDesc:
      "An independent, dated catalogue linking citizens directly to official government portals. Zero advertising, zero document storage, and uncompromising privacy.",
    browseBtn: "Browse Service Catalogue",
    howWorksBtn: "How This Guide Works",
    areasHeading: "Six Essential Life Areas",
    exploreArea: "Explore area →",
    trustHeading: "Independence & Privacy Commitments",
    trustDesc:
      "This platform is an independent public-benefit technology initiative. We do not capture Aadhaar numbers, biometrics, bank passwords, or OTPs. All outbound links open verified official domains registered on our public domain allow-list.",
    assistedTip:
      "Tip: In Assisted Mode, each step of every service guide is explicitly detailed before you visit an external official portal.",
  },
  hi: {
    heroTitle: "आवश्यक सार्वजनिक सेवाओं को आसानी से खोजें और समझें",
    heroDesc:
      "एक स्वतंत्र, सत्यापित मार्गदर्शिका जो आपको सीधे आधिकारिक सरकारी और जनोपयोगी पोर्टलों से जोड़ती है। कोई विज्ञापन नहीं, कोई डेटा संग्रह नहीं।",
    browseBtn: "सेवाएँ ब्राउज़ करें",
    howWorksBtn: "यह कैसे काम करता है",
    areasHeading: "छह आवश्यक जीवन क्षेत्र",
    exploreArea: "सेवाएं देखें →",
    trustHeading: "स्वतंत्रता और डेटा सुरक्षा नीति",
    trustDesc:
      "यह मंच नागरिकों की सहायता के लिए एक निष्पक्ष, स्वतंत्र तकनीकी पहल है। हम आधार नंबर, बायोमेट्रिक्स, बैंक पासवर्ड या ओटीपी कभी भी एकत्र या संग्रहीत नहीं करते हैं। प्रत्येक आउटबाउंड लिंक केवल सरकारी अधिकृत डोमेन (जैसे *.gov.in, *.nic.in) पर ही ले जाता है।",
    assistedTip:
      "सुझाव: सहायता प्राप्त मोड में, आधिकारिक पोर्टल पर जाने से पहले प्रत्येक चरण को सरल भाषा में समझाया जाता है।",
  },
  bn: {
    heroTitle: "প্রয়োজনীয় জনসেবাগুলি সহজে খুঁজুন এবং বুঝুন",
    heroDesc:
      "একটি স্বাধীন, যাচাইকৃত সহায়িকা যা নাগরিকদের সরাসরি অফিসিয়াল সরকারি পোর্টালে সংযুক্ত করে। কোনো বিজ্ঞাপন নেই, কোনো ডেটা সংগ্রহ নেই।",
    browseBtn: "পরিষেবা তালিকা দেখুন",
    howWorksBtn: "এই সহায়িকা কীভাবে কাজ করে",
    areasHeading: "ছয়টি অপরিহার্য ক্ষেত্র",
    exploreArea: "অন্বেষণ করুন →",
    trustHeading: "স্বাধীনতা ও ডেটা সুরক্ষা নীতি",
    trustDesc:
      "এই প্ল্যাটফর্মটি নাগরিকদের সহায়তার জন্য একটি নিরপেক্ষ, স্বাধীন প্রযুক্তিগত উদ্যোগ। আমরা কখনোই আধার নম্বর, বায়োমেট্রিক, ব্যাংক পাসওয়ার্ড বা ওটিপি সংগ্রহ বা সংরক্ষণ করি না। সমস্ত বহির্গামী লিঙ্ক আমাদের অনুমোদিত তালিকায় থাকা অফিসিয়াল সরকারি ডোমেনে নিয়ে যায়।",
    assistedTip:
      "পরামর্শ: সহায়তাপ্রাপ্ত মোডে, অফিসিয়াল পোর্টালে প্রবেশের আগে প্রতিটি ধাপ সহজ ও বিস্তারিতভাবে ব্যাখ্যা করা হয়।",
  },
  ta: {
    heroTitle: "அத்தியாவசிய பொதுச் சேவைகளை எளிதாகக் கண்டறிந்து புரிந்து கொள்ளுங்கள்",
    heroDesc:
      "குடிமக்களை நேரடியாக அதிகாரப்பூர்வ அரசு போர்ட்டல்களுடன் இணைக்கும் ஒரு சுயாதீன, சரிபார்க்கப்பட்ட வழிகாட்டி. விளம்பரங்களோ, தனிநபர் தரவு சேமிப்போ இல்லை.",
    browseBtn: "சேவைகளை உலாவுங்கள்",
    howWorksBtn: "இந்த வழிகாட்டி எவ்வாறு செயல்படுகிறது",
    areasHeading: "ஆறு அத்தியாவசிய வாழ்க்கை பகுதிகள்",
    exploreArea: "ஆராய்க →",
    trustHeading: "சுயாதீனம் மற்றும் தனியுரிமை உறுதிமொழிகள்",
    trustDesc:
      "இந்த தளம் ஒரு சுயாதீன மக்கள் நல தொழில்நுட்ப முயற்சி. ஆதார் எண்கள், பயோமெட்ரிக்ஸ், வங்கி கடவுச்சொற்கள் அல்லது OTP போன்றவற்றை நாங்கள் ஒருபோதும் சேகரிப்பதோ சேமிப்பதோ இல்லை. அனைத்து வெளி இணைப்புகளும் எங்கள் அனுமதிப்பட்டியலில் உள்ள அரசு அதிகாரப்பூர்வ தளங்களையே திறக்கும்.",
    assistedTip:
      "குறிப்பு: உதவி பயன்முறையில், நீங்கள் அதிகாரப்பூர்வ தளத்திற்குச் செல்வதற்கு முன் ஒவ்வொரு படியும் விரிவாக விளக்கப்படுகிறது.",
  },
};

export function HomeClassicView() {
  const { t, locale } = useTranslation();
  const { mode } = usePresentationMode();

  const texts = PAGE_TEXTS[locale] || PAGE_TEXTS.en;

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
            {texts.assistedTip}
          </p>
        </div>
      )}

      {/* Hero Section */}
      <section style={{ marginBottom: "3rem", textAlign: mode === "simple" ? "left" : "center" }}>
        {/* India-First Civic Identity Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.35rem 0.85rem",
            backgroundColor: "var(--color-india-saffron-subtle, rgba(200, 115, 26, 0.08))",
            border: "1px solid rgba(200, 115, 26, 0.3)",
            borderRadius: "var(--radius-full)",
            marginBottom: "1rem",
            fontSize: "0.8125rem",
            fontWeight: 700,
            color: "var(--color-ochre)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "var(--color-ochre)",
              animation: "progressPulse 2s ease-in-out infinite",
            }}
            aria-hidden="true"
          />
          <span>
            {locale === "hi"
              ? "भारत-प्रथम एकीकृत लोक सेवा मार्गदर्शिका"
              : locale === "bn"
                ? "ভারত-প্রথম সমন্বিত জনসেবা নির্দেশিকা"
                : locale === "ta"
                  ? "இந்தியா-முதன்மை ஒருங்கிணைந்த மக்கள் சேவை வழிகாட்டி"
                  : "India-First Unified Public Life Services Guide"}
          </span>
        </div>

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
          {texts.heroTitle}
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
          {texts.heroDesc}
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
            <span>{texts.browseBtn}</span>
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
            <span>{texts.howWorksBtn}</span>
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
          {texts.areasHeading}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              mode === "simple" ? "1fr" : "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {ECOSYSTEMS.map((item) => (
            <div
              key={item.id}
              className="civic-card-interactive"
              style={{
                backgroundColor: "var(--color-surface-page)",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                boxShadow: "var(--shadow-sm)",
              }}
            >
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
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: "var(--color-brand-primary-subtle)",
                      color: "var(--color-brand-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <EcosystemBadge ecosystem={item.id} size={18} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      margin: 0,
                      color: "var(--color-content-primary)",
                    }}
                  >
                    {item.titles[locale] || item.titles.en}
                  </h3>
                </div>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    backgroundColor: "var(--color-neutral-100)",
                    color: "var(--color-content-secondary)",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "var(--radius-xs)",
                    flexShrink: 0,
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
                {item.descs[locale] || item.descs.en}
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
                {texts.exploreArea}
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
          {texts.trustHeading}
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-content-secondary)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {texts.trustDesc}
        </p>
      </section>
    </div>
  );
}
