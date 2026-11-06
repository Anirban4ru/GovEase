"use client";

import React, { useState } from "react";
import {
  calculateCivicFee,
  FeeServiceType,
  FeeCalculationResult,
} from "../lib/fee-calculator";
import { useTranslation } from "../context/I18nContext";

export function CivicTariffCalculator() {
  const { locale } = useTranslation();
  const [serviceType, setServiceType] = useState<FeeServiceType>("DRIVING_LICENCE_RENEWAL");
  const [monthsExpired, setMonthsExpired] = useState<number>(0);
  const [panMode, setPanMode] = useState<"PHYSICAL_INDIA" | "ELECTRONIC_PDF" | "PHYSICAL_INTERNATIONAL">("PHYSICAL_INDIA");
  const [aadhaarType, setAadhaarType] = useState<"CHILD_MANDATORY_5_15" | "DEMOGRAPHIC" | "BIOMETRIC">("DEMOGRAPHIC");

  const result: FeeCalculationResult = calculateCivicFee({
    serviceType,
    monthsSinceExpiry: monthsExpired,
    panDeliveryMode: panMode,
    aadhaarUpdateType: aadhaarType,
  });

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
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            margin: "0 0 0.25rem 0",
            color: "var(--color-content-primary)",
          }}
        >
          {locale === "hi"
            ? "आधिकारिक सरकारी शुल्क और अनुग्रह अवधि (Grace Period) कैलकुलेटर"
            : "Statutory Civic Tariff & Penalty Calculator"}
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--color-content-secondary)", margin: 0 }}>
          {locale === "hi"
            ? "पता करें कि ड्राइविंग लाइसेंस नवीनीकरण, पैन कार्ड और आधार अपडेट की वास्तविक कानूनी फीस कितनी है, और दलालों से बचें।"
            : "Calculate exact statutory government fees, grace periods, and late penalty under Central Acts. Avoid inflated tout charges."}
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {[
          { id: "DRIVING_LICENCE_RENEWAL" as FeeServiceType, label: "Driving Licence Renewal" },
          { id: "PAN_REPRINT" as FeeServiceType, label: "PAN Card Reprint / e-PAN" },
          { id: "AADHAAR_UPDATE" as FeeServiceType, label: "Aadhaar Update / ASK" },
          { id: "E_SHRAM_REGISTRATION" as FeeServiceType, label: "e-Shram Worker Card" },
        ].map((tab) => {
          const isActive = serviceType === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setServiceType(tab.id)}
              style={{
                padding: "0.5rem 0.875rem",
                borderRadius: "var(--radius-xs, 4px)",
                fontSize: "0.8125rem",
                fontWeight: isActive ? 700 : 500,
                border: "1px solid var(--color-border-default)",
                backgroundColor: isActive ? "var(--color-brand-primary)" : "var(--color-surface-card)",
                color: isActive ? "var(--color-content-inverse)" : "var(--color-content-primary)",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {serviceType === "DRIVING_LICENCE_RENEWAL" && (
        <div
          style={{
            padding: "1rem",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--color-surface-card)",
            marginBottom: "1.25rem",
          }}
        >
          <label
            htmlFor="dl-months-slider"
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--color-content-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Licence Expiry Status:{" "}
            <span style={{ color: "var(--color-brand-primary)", fontWeight: 700 }}>
              {monthsExpired === 0
                ? "Expiring this month"
                : monthsExpired > 0
                ? `${monthsExpired} month(s) expired`
                : `${Math.abs(monthsExpired)} month(s) before expiry`}
            </span>
          </label>
          <input
            id="dl-months-slider"
            type="range"
            min={-11}
            max={36}
            step={1}
            value={monthsExpired}
            onChange={(e) => setMonthsExpired(Number(e.target.value))}
            style={{ width: "100%", cursor: "pointer", accentColor: "var(--color-brand-primary)" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.6875rem",
              color: "var(--color-content-tertiary)",
              marginTop: "0.25rem",
            }}
          >
            <span>-11 mo (Advance)</span>
            <span>0 (Current)</span>
            <span>+12 mo (1-yr Grace Limit)</span>
            <span>+36 mo (3 yrs late)</span>
          </div>
        </div>
      )}

      {serviceType === "PAN_REPRINT" && (
        <div
          style={{
            padding: "1rem",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--color-surface-card)",
            marginBottom: "1.25rem",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => setPanMode("PHYSICAL_INDIA")}
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.8125rem",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-xs, 4px)",
              backgroundColor: panMode === "PHYSICAL_INDIA" ? "var(--color-brand-primary)" : "transparent",
              color: panMode === "PHYSICAL_INDIA" ? "#fff" : "var(--color-content-primary)",
              cursor: "pointer",
            }}
          >
            Physical Card Delivery (India) - ₹50
          </button>
          <button
            type="button"
            onClick={() => setPanMode("ELECTRONIC_PDF")}
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.8125rem",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-xs, 4px)",
              backgroundColor: panMode === "ELECTRONIC_PDF" ? "var(--color-brand-primary)" : "transparent",
              color: panMode === "ELECTRONIC_PDF" ? "#fff" : "var(--color-content-primary)",
              cursor: "pointer",
            }}
          >
            e-PAN Download (PDF) - ₹8.26
          </button>
          <button
            type="button"
            onClick={() => setPanMode("PHYSICAL_INTERNATIONAL")}
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.8125rem",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-xs, 4px)",
              backgroundColor: panMode === "PHYSICAL_INTERNATIONAL" ? "var(--color-brand-primary)" : "transparent",
              color: panMode === "PHYSICAL_INTERNATIONAL" ? "#fff" : "var(--color-content-primary)",
              cursor: "pointer",
            }}
          >
            Foreign Delivery - ₹959
          </button>
        </div>
      )}

      {serviceType === "AADHAAR_UPDATE" && (
        <div
          style={{
            padding: "1rem",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--color-surface-card)",
            marginBottom: "1.25rem",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => setAadhaarType("CHILD_MANDATORY_5_15")}
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.8125rem",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-xs, 4px)",
              backgroundColor: aadhaarType === "CHILD_MANDATORY_5_15" ? "var(--color-brand-primary)" : "transparent",
              color: aadhaarType === "CHILD_MANDATORY_5_15" ? "#fff" : "var(--color-content-primary)",
              cursor: "pointer",
            }}
          >
            Child Biometrics (Ages 5 & 15) - ₹0 (Free)
          </button>
          <button
            type="button"
            onClick={() => setAadhaarType("DEMOGRAPHIC")}
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.8125rem",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-xs, 4px)",
              backgroundColor: aadhaarType === "DEMOGRAPHIC" ? "var(--color-brand-primary)" : "transparent",
              color: aadhaarType === "DEMOGRAPHIC" ? "#fff" : "var(--color-content-primary)",
              cursor: "pointer",
            }}
          >
            Demographic (Name, Address, Mobile) - ₹50
          </button>
          <button
            type="button"
            onClick={() => setAadhaarType("BIOMETRIC")}
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.8125rem",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-xs, 4px)",
              backgroundColor: aadhaarType === "BIOMETRIC" ? "var(--color-brand-primary)" : "transparent",
              color: aadhaarType === "BIOMETRIC" ? "#fff" : "var(--color-content-primary)",
              cursor: "pointer",
            }}
          >
            Biometric (Photo, Fingerprint, Iris) - ₹100
          </button>
        </div>
      )}

      {/* Results Box */}
      <div
        style={{
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-sm)",
          padding: "1.25rem",
          backgroundColor: "var(--color-surface-card)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-content-tertiary)", textTransform: "uppercase", fontWeight: 700 }}>
              Statutory Government Fee
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-brand-primary)", fontFamily: "var(--font-mono, monospace)" }}>
              ₹{result.statutoryTotalInr}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.75rem", color: "#dc2626", fontWeight: 600 }}>
              Typical Tout / Agent Charge
            </div>
            <div style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-content-secondary)", textDecoration: "line-through" }}>
              ₹{result.marketToutEstimateInr}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#14532d", fontWeight: 700 }}>
              Citizen Saves ₹{result.citizenSavingsInr} by Direct Application
            </div>
          </div>
        </div>

        {result.gracePeriodNotice && (
          <div
            style={{
              padding: "0.75rem",
              borderRadius: "var(--radius-xs, 4px)",
              border: `1px solid ${result.gracePeriodNotice.statusBadge === "RETEST_MANDATORY" ? "#dc2626" : "#15803d"}`,
              backgroundColor: result.gracePeriodNotice.statusBadge === "RETEST_MANDATORY" ? "rgba(220, 38, 38, 0.05)" : "#f0fdf4",
              marginBottom: "1rem",
            }}
          >
            <strong style={{ fontSize: "0.875rem", color: result.gracePeriodNotice.statusBadge === "RETEST_MANDATORY" ? "#991b1b" : "#14532d" }}>
              {result.gracePeriodNotice.message}
            </strong>
            <p style={{ fontSize: "0.8125rem", margin: "0.25rem 0 0 0", color: "var(--color-content-secondary)" }}>
              {result.gracePeriodNotice.actionAdvice}
            </p>
          </div>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-content-primary)", marginBottom: "0.5rem" }}>
            Official Statutory Fee Breakdown:
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            {result.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.8125rem",
                  padding: "0.375rem 0.5rem",
                  borderRadius: "3px",
                  backgroundColor: "var(--color-surface-page)",
                }}
              >
                <div>
                  <span style={{ color: "var(--color-content-primary)" }}>{item.label}</span>
                  <span style={{ display: "block", fontSize: "0.6875rem", color: "var(--color-content-tertiary)" }}>
                    Rule: {item.statutoryRule}
                  </span>
                </div>
                <strong style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--color-content-primary)" }}>
                  ₹{item.amountInr}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--color-border-default)",
            paddingTop: "0.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <div style={{ fontSize: "0.6875rem", color: "var(--color-content-tertiary)", maxWidth: "480px" }}>
            Statutory Authority: {result.legalReference}
          </div>
          <a
            href={result.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.375rem 0.75rem",
              backgroundColor: "var(--color-brand-primary)",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "var(--radius-xs, 4px)",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            Apply Directly Online →
          </a>
        </div>
      </div>
    </div>
  );
}
