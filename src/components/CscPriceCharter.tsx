"use client";

import React from "react";
import { useTranslation } from "../context/I18nContext";

export interface CscRateItem {
  service: string;
  statutoryMaxFee: string;
  isFree: boolean;
  legalAuthority: string;
}

export const CSC_RATE_SCHEDULE: CscRateItem[] = [
  {
    service: "e-Shram Worker Registration & UAN Card Print",
    statutoryMaxFee: "₹0 (100% Free)",
    isFree: true,
    legalAuthority: "Ministry of Labour & Employment pays CSC directly per registration",
  },
  {
    service: "Ayushman Card (PM-JAY) Golden Card Generation",
    statutoryMaxFee: "₹0 (100% Free)",
    isFree: true,
    legalAuthority: "National Health Authority (NHA) Mandate",
  },
  {
    service: "Aadhaar Mandatory Biometric Update (Ages 5 and 15)",
    statutoryMaxFee: "₹0 (100% Free)",
    isFree: true,
    legalAuthority: "UIDAI Official Gazette Circular",
  },
  {
    service: "Aadhaar Demographic Update (Address, Mobile, Name)",
    statutoryMaxFee: "₹50",
    isFree: false,
    legalAuthority: "UIDAI Maximum Retail Statutory Tariff",
  },
  {
    service: "Aadhaar Biometric Update (Adult Iris / Fingerprint / Photo)",
    statutoryMaxFee: "₹100",
    isFree: false,
    legalAuthority: "UIDAI Maximum Retail Statutory Tariff",
  },
  {
    service: "Standard B&W A4 Document Printing",
    statutoryMaxFee: "₹5 per page max",
    isFree: false,
    legalAuthority: "CSC e-Governance Services India Ltd. Guidelines",
  },
  {
    service: "Document Scanning & PDF Upload",
    statutoryMaxFee: "₹10 per document max",
    isFree: false,
    legalAuthority: "MeitY CSC Standard Operating Protocol",
  },
];

export function CscPriceCharter() {
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
      <div style={{ marginBottom: "1rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            margin: "0 0 0.25rem 0",
            color: "var(--color-content-primary)",
          }}
        >
          {locale === "hi"
            ? "जन सेवा केंद्र (CSC / ग्राहक सेवा केंद्र) वैधानिक दर सूची"
            : "Authorized CSC (Common Service Center) Statutory Rate Charter"}
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--color-content-secondary)", margin: 0 }}>
          {locale === "hi"
            ? "MeitY एवं विभिन्न मंत्रालयों द्वारा निर्धारित अधिकतम आधिकारिक शुल्क। कोई भी केंद्र इससे अधिक पैसे नहीं मांग सकता।"
            : "Statutory fee ceilings mandated by the Ministry of Electronics & IT (MeitY). Overcharging is an offence punishable under the Consumer Protection Act 2019."}
        </p>
      </div>

      <div
        tabIndex={0}
        role="region"
        aria-label="Authorized CSC Statutory Rate Charter Table"
        style={{ overflowX: "auto", marginBottom: "1.25rem" }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.8125rem",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid var(--color-border-default)",
                backgroundColor: "var(--color-surface-card)",
              }}
            >
              <th
                scope="col"
                style={{ padding: "0.625rem 0.75rem", color: "var(--color-content-primary)" }}
              >
                Civic Service
              </th>
              <th
                scope="col"
                style={{
                  padding: "0.625rem 0.75rem",
                  color: "var(--color-content-primary)",
                  width: "160px",
                }}
              >
                Max Legal Fee
              </th>
              <th
                scope="col"
                style={{ padding: "0.625rem 0.75rem", color: "var(--color-content-primary)" }}
              >
                Statutory Authority
              </th>
            </tr>
          </thead>
          <tbody>
            {CSC_RATE_SCHEDULE.map((item, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: "1px solid var(--color-border-default)",
                  backgroundColor: idx % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)",
                }}
              >
                <td
                  style={{
                    padding: "0.625rem 0.75rem",
                    fontWeight: 600,
                    color: "var(--color-content-primary)",
                  }}
                >
                  {item.service}
                </td>
                <td style={{ padding: "0.625rem 0.75rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "3px",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono, monospace)",
                      backgroundColor: item.isFree ? "#dcfce7" : "var(--color-surface-card)",
                      color: item.isFree ? "#14532d" : "var(--color-content-primary)",
                      border: "1px solid var(--color-border-default)",
                    }}
                  >
                    {item.statutoryMaxFee}
                  </span>
                </td>
                <td
                  style={{
                    padding: "0.625rem 0.75rem",
                    color: "var(--color-content-secondary)",
                    fontSize: "0.75rem",
                  }}
                >
                  {item.legalAuthority}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          padding: "0.75rem 1rem",
          borderRadius: "var(--radius-sm)",
          backgroundColor: "var(--color-surface-card)",
          border: "1px solid var(--color-border-default)",
        }}
      >
        <div>
          <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#991b1b" }}>
            Is a local shop asking for excess money?
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--color-content-secondary)" }}>
            Report overcharging to the National Consumer Helpline at <strong>1915</strong> or email
            grievance to support@csc.gov.in.
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <a
            href="https://locator.csccloud.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.4rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              backgroundColor: "var(--color-surface-page)",
              color: "var(--color-content-primary)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-xs, 4px)",
              textDecoration: "none",
            }}
          >
            Locate Official CSC Center →
          </a>
          <a
            href="https://appointments.uidai.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.4rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              backgroundColor: "var(--color-brand-primary)",
              color: "#ffffff",
              border: "none",
              borderRadius: "var(--radius-xs, 4px)",
              textDecoration: "none",
            }}
          >
            Locate Aadhaar Seva Kendra →
          </a>
        </div>
      </div>
    </div>
  );
}
