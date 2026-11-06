"use client";

import React, { useState } from "react";
import {
  analyzeSmsSender,
  SenderAnalysisResult,
  VERIFIED_SMS_HEADERS,
} from "../lib/anti-scam-data";
import { useTranslation } from "../context/I18nContext";

export function AntiScamVerifier() {
  const { locale } = useTranslation();
  const [inputVal, setInputVal] = useState("");
  const [result, setResult] = useState<SenderAnalysisResult | null>(null);

  const handleCheck = (text: string) => {
    setInputVal(text);
    if (!text.trim()) {
      setResult(null);
      return;
    }
    const res = analyzeSmsSender(text);
    setResult(res);
  };

  return (
    <div
      style={{
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-md)",
        padding: "1.5rem",
        backgroundColor: "var(--color-surface-page)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1rem" }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(180, 83, 9, 0.12)",
            color: "#b45309",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              margin: "0 0 0.25rem 0",
              color: "var(--color-content-primary)",
            }}
          >
            {locale === "hi"
              ? "संदिग्ध सरकारी SMS और ई-चालान सत्यापन"
              : "Anti-Scam SMS & Phishing Sender Verifier"}
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--color-content-secondary)", margin: 0 }}>
            {locale === "hi"
              ? "जांचें कि क्या प्राप्त SMS या कॉल वास्तविक सरकारी विभाग (TRAI अधिकृत) से है या व्यक्तिगत नंबर से फर्जी चालान घोटाला है।"
              : "Verify whether an incoming SMS sender code is registered under official TRAI regulations or if it originates from an illicit personal mobile number."}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => handleCheck(e.target.value)}
          placeholder="e.g. AX-PARIVH, VK-UIDAI, or +91 98123 45678"
          aria-label="SMS sender code or phone number to verify"
          style={{
            flex: "1 1 280px",
            padding: "0.625rem 0.875rem",
            fontSize: "0.9375rem",
            fontFamily: "var(--font-mono, monospace)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--color-surface-card)",
            color: "var(--color-content-primary)",
          }}
        />
        <button
          type="button"
          onClick={() => handleCheck(inputVal)}
          style={{
            padding: "0.625rem 1.25rem",
            backgroundColor: "var(--color-brand-primary)",
            color: "var(--color-content-inverse)",
            border: "none",
            borderRadius: "var(--radius-sm)",
            fontWeight: 600,
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          {locale === "hi" ? "जांचें" : "Verify Sender"}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.375rem",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "1.25rem",
        }}
      >
        <span
          style={{ fontSize: "0.75rem", color: "var(--color-content-tertiary)", fontWeight: 600 }}
        >
          {locale === "hi" ? "उदाहरण देखें:" : "Test Presets:"}
        </span>
        {["AX-PARIVH", "VK-UIDAI", "CPGRAM", "9876543210"].map((sample) => (
          <button
            key={sample}
            type="button"
            onClick={() => handleCheck(sample)}
            style={{
              fontSize: "0.75rem",
              padding: "0.25rem 0.5rem",
              backgroundColor: "var(--color-surface-card)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-xs, 4px)",
              color: "var(--color-content-secondary)",
              cursor: "pointer",
            }}
          >
            {sample}
          </button>
        ))}
      </div>

      {result && (
        <div
          role="status"
          style={{
            padding: "1rem",
            borderRadius: "var(--radius-sm)",
            border: `1px solid ${
              result.category === "HIGH_RISK_PHONE"
                ? "#dc2626"
                : result.category === "OFFICIAL_GOV"
                  ? "#16a34a"
                  : "var(--color-border-default)"
            }`,
            backgroundColor:
              result.category === "HIGH_RISK_PHONE"
                ? "rgba(220, 38, 38, 0.05)"
                : result.category === "OFFICIAL_GOV"
                  ? "rgba(22, 163, 74, 0.05)"
                  : "var(--color-surface-card)",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "0.2rem 0.5rem",
                borderRadius: "3px",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#ffffff",
                backgroundColor:
                  result.category === "HIGH_RISK_PHONE"
                    ? "#dc2626"
                    : result.category === "OFFICIAL_GOV"
                      ? "#16a34a"
                      : "#64748b",
              }}
            >
              {result.category === "HIGH_RISK_PHONE"
                ? "FRAUD RISK"
                : result.category === "OFFICIAL_GOV"
                  ? "VERIFIED GOV SENDER"
                  : "UNVERIFIED SENDER"}
            </span>
            <strong style={{ fontSize: "0.9375rem", color: "var(--color-content-primary)" }}>
              {result.title}
            </strong>
          </div>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-content-secondary)",
              margin: "0 0 0.5rem 0",
              lineHeight: 1.5,
            }}
          >
            {result.explanation}
          </p>

          {result.officialDepartment && (
            <div
              style={{
                fontSize: "0.8125rem",
                color: "var(--color-content-primary)",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              Authorized Department:{" "}
              <span style={{ fontWeight: 400 }}>{result.officialDepartment}</span>
            </div>
          )}

          <div
            style={{
              fontSize: "0.8125rem",
              padding: "0.5rem 0.75rem",
              borderRadius: "var(--radius-xs, 4px)",
              backgroundColor: "var(--color-surface-page)",
              color: "var(--color-content-primary)",
              border: "1px dashed var(--color-border-default)",
            }}
          >
            <strong>Citizen Safety Rule:</strong> {result.safetyProtocol}
          </div>
        </div>
      )}

      <div
        style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--color-content-tertiary)" }}
      >
        Recognized central headers include: {Object.keys(VERIFIED_SMS_HEADERS).join(", ")}. Never
        share OTPs or click APK download links.
      </div>
    </div>
  );
}
