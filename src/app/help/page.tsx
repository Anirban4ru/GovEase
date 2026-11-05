"use client";

import React from "react";
import { useTranslation } from "../../context/I18nContext";

export default function HelpPage() {
  const { locale } = useTranslation();

  return (
    <div className="app-container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--color-content-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {locale === "hi" ? "सहायता और मार्गदर्शन" : "Help & Information"}
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-content-secondary)", margin: 0 }}>
          {locale === "hi"
            ? "इस स्वतंत्र सार्वजनिक सेवा मार्गदर्शिका का उपयोग कैसे करें।"
            : "How to use this independent public service discovery guide."}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px" }}>
        <section
          style={{
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            backgroundColor: "var(--color-surface-page)",
          }}
        >
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--color-brand-primary)",
              marginTop: 0,
              marginBottom: "0.5rem",
            }}
          >
            {locale === "hi" ? "1. यह क्या है और क्या नहीं है?" : "1. What is this platform?"}
          </h2>
          <p style={{ lineHeight: 1.6, color: "var(--color-content-secondary)", margin: 0 }}>
            {locale === "hi"
              ? "यह मंच एक स्वतंत्र नागरिक मार्गदर्शिका है। यह आधिकारिक सरकारी पोर्टल नहीं है और किसी भी सरकारी विभाग का प्रतिनिधित्व नहीं करता है। हमारा उद्देश्य नागरिकों को बिना किसी भ्रामक विज्ञापन के सही आधिकारिक वेबसाइट और आवश्यक दस्तावेजों की जानकारी प्रदान करना है।"
              : "This platform is an independent citizen guide. It is NOT an official government portal and does not replace official infrastructure. Our purpose is to help citizens discover services in plain language and direct them safely to the verified official destination."}
          </p>
        </section>

        <section
          style={{
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            backgroundColor: "var(--color-surface-page)",
          }}
        >
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--color-brand-primary)",
              marginTop: 0,
              marginBottom: "0.5rem",
            }}
          >
            {locale === "hi"
              ? "2. आधिकारिक लिंक सुरक्षा और डोमेन अनुमति सूची"
              : "2. Official Link Safety & Allowed Domains"}
          </h2>
          <p style={{ lineHeight: 1.6, color: "var(--color-content-secondary)", margin: 0 }}>
            {locale === "hi"
              ? "हम केवल आधिकारिक सरकारी डोमेन (जैसे *.gov.in, *.nic.in) के लिंक प्रदान करते हैं। फर्जी या क्लोन वेबसाइटों से बचने के लिए प्रत्येक लिंक का नियमित रूप से परीक्षण किया जाता है।"
              : "Every outbound link in our catalogue must match our verified domain allow-list (such as *.gov.in and *.nic.in). Outbound links open in a new window with strict security attributes to protect you against spoofing and phishing."}
          </p>
        </section>

        <section
          style={{
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            backgroundColor: "var(--color-surface-page)",
          }}
        >
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--color-brand-primary)",
              marginTop: 0,
              marginBottom: "0.5rem",
            }}
          >
            {locale === "hi"
              ? "3. गलत लिंक या पुरानी जानकारी की सूचना दें"
              : "3. Report an Outdated Link or Information"}
          </h2>
          <p
            style={{
              lineHeight: 1.6,
              color: "var(--color-content-secondary)",
              margin: "0 0 1rem 0",
            }}
          >
            {locale === "hi"
              ? "यदि आपको किसी सेवा के लिंक या विवरण में कोई विसंगति दिखाई देती है, तो आप हमारी सार्वजनिक रिपोजिटरी में सुधार का सुझाव दे सकते हैं।"
              : "If you notice a broken link, outdated fee schedule, or inaccurate eligibility description, let us know through our open correction register."}
          </p>
          <div style={{ fontSize: "0.875rem", color: "var(--color-content-tertiary)" }}>
            Anonymous correction workflow — no user account or personal details required.
          </div>
        </section>
      </div>
    </div>
  );
}
