"use client";

import React from "react";
import { CIVIC_HELPLINES, CivicHelpline } from "../lib/anti-scam-data";
import { useTranslation } from "../context/I18nContext";

export function EmergencyHelplineSection() {
  const { locale } = useTranslation();

  return (
    <div
      style={{
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-md)",
        padding: "1.5rem",
        backgroundColor: "var(--color-surface-page)",
      }}
    >
      <div style={{ marginBottom: "1.25rem" }}>
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#16a34a",
            }}
            aria-hidden="true"
          />
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              margin: 0,
              color: "var(--color-content-primary)",
            }}
          >
            {locale === "hi"
              ? "आधिकारिक राष्ट्रीय आपातकालीन एवं नागरिक हेल्पलाइन"
              : "Statutory Civic & Emergency Helplines"}
          </h2>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--color-content-secondary)", margin: 0 }}>
          {locale === "hi"
            ? "सीधे डायल करने योग्य निःशुल्क सरकारी संपर्क नंबर। साइबर धोखाधड़ी या आपातकालीन स्थिति में तुरंत कॉल करें।"
            : "Toll-free, verified government helpline numbers directly reachable from your device without intermediaries."}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {CIVIC_HELPLINES.map((item: CivicHelpline) => {
          const serviceTitle =
            item.serviceName[locale as "en" | "hi" | "bn" | "ta"] || item.serviceName.en;
          const purpose =
            item.emergencyPurpose[locale as "en" | "hi" | "bn" | "ta"] || item.emergencyPurpose.en;

          return (
            <div
              key={item.number}
              style={{
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-sm)",
                padding: "1rem",
                backgroundColor: "var(--color-surface-card)",
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
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "var(--color-brand-primary)",
                    }}
                  >
                    {item.number}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      padding: "0.15rem 0.4rem",
                      borderRadius: "3px",
                      backgroundColor: "#dcfce7",
                      color: "#14532d",
                      fontWeight: 700,
                    }}
                  >
                    {item.operatingHours}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 700,
                    color: "var(--color-content-primary)",
                    margin: "0 0 0.25rem 0",
                  }}
                >
                  {serviceTitle}
                </h3>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-content-tertiary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.authority}
                </div>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--color-content-secondary)",
                    margin: "0 0 1rem 0",
                    lineHeight: 1.45,
                  }}
                >
                  {purpose}
                </p>
              </div>

              <a
                href={item.dialNumber}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.875rem",
                  backgroundColor: "var(--color-brand-primary)",
                  color: "var(--color-content-inverse)",
                  textDecoration: "none",
                  borderRadius: "var(--radius-xs, 4px)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  minHeight: "36px",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {locale === "hi" ? `डायल करें ${item.number}` : `Call ${item.number}`}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
