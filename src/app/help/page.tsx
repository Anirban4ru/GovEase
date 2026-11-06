"use client";

import React, { useState } from "react";
import { useTranslation } from "../../context/I18nContext";
import { FeedbackModal } from "../../components/FeedbackModal";
import { EmergencyHelplineSection } from "../../components/EmergencyHelplineSection";
import { AntiScamVerifier } from "../../components/AntiScamVerifier";
import { CivicTariffCalculator } from "../../components/CivicTariffCalculator";
import { CscPriceCharter } from "../../components/CscPriceCharter";

export default function HelpPage() {
  const { locale } = useTranslation();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

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
          {locale === "hi"
            ? "सहायता, सुरक्षा और हेल्पलाइन"
            : "Civic Help, Helplines & Anti-Scam Verification"}
        </h1>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--color-content-secondary)",
            margin: 0,
            maxWidth: "760px",
          }}
        >
          {locale === "hi"
            ? "आपातकालीन टोल-फ्री हेल्पलाइन, संदिग्ध सरकारी SMS और ई-चालान सत्यापन, आधिकारिक सरकारी शुल्क कैलकुलेटर, और जन सेवा केंद्र (CSC) की कानूनी दरें।"
            : "Statutory national emergency helplines, TRAI-verified SMS scam detection, official civic tariff calculations, and the MeitY Common Service Center rate charter."}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Statutory Emergency Helplines */}
        <section>
          <EmergencyHelplineSection />
        </section>

        {/* Anti-Scam & SMS Phishing Verifier */}
        <section>
          <AntiScamVerifier />
        </section>

        {/* Statutory Civic Fee & Grace Period Penalty Calculator */}
        <section>
          <CivicTariffCalculator />
        </section>

        {/* Authorized CSC Price Charter */}
        <section>
          <CscPriceCharter />
        </section>

        {/* Core Principles & Trust Model */}
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
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--color-content-primary)",
              marginTop: 0,
              marginBottom: "1rem",
            }}
          >
            {locale === "hi"
              ? "मंच के मूल सिद्धांत एवं सुरक्षा वास्तुकला"
              : "GovEase Architectural Trust Principles"}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "var(--color-brand-primary)",
                  margin: "0 0 0.25rem 0",
                }}
              >
                1. Zero-Intermediary Handoff
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-content-secondary)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                GovEase never acts as a broker or payment gateway. All citizen actions redirect
                strictly to verified sovereign portals (*.gov.in / *.nic.in) registered under
                national DNS.
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "var(--color-brand-primary)",
                  margin: "0 0 0.25rem 0",
                }}
              >
                2. DPDP Act 2023 Compliance
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-content-secondary)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Zero personal data retention. All tools, photo cropping, and document compression
                occur strictly in your local browser memory using offscreen HTML5 Canvas. No bytes
                leave your device.
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "var(--color-brand-primary)",
                  margin: "0 0 0.25rem 0",
                }}
              >
                3. Open Correction Register
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-content-secondary)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                If you encounter a broken government endpoint or an updated state fee rule, submit a
                correction to our public registry.
              </p>
              <button
                type="button"
                onClick={() => setFeedbackOpen(true)}
                style={{
                  marginTop: "0.75rem",
                  padding: "0.4rem 0.75rem",
                  backgroundColor: "var(--color-surface-card)",
                  color: "var(--color-content-primary)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-xs, 4px)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                Submit Feedback / Correction
              </button>
            </div>
          </div>
        </section>
      </div>

      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
