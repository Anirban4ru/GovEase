"use client";

import React from "react";
import { useTranslation } from "../../context/I18nContext";

export default function PrivacyPage() {
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
          {locale === "hi" ? "गोपनीयता और डेटा सुरक्षा नीति" : "Privacy & Data Governance Notice"}
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-content-secondary)", margin: 0 }}>
          {locale === "hi"
            ? "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP Act, 2023) के सिद्धांतों के तहत निर्मित।"
            : "Designed in accordance with India's Digital Personal Data Protection Act, 2023."}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px" }}>
        <div
          style={{
            padding: "1.25rem",
            backgroundColor: "var(--color-status-success-bg)",
            border: "1px solid var(--color-status-success-border)",
            borderRadius: "var(--radius-md)",
            fontSize: "0.9375rem",
            color: "var(--color-status-success)",
            fontWeight: 600,
          }}
        >
          {locale === "hi"
            ? "हम सर्वर पर आपका कोई भी व्यक्तिगत डेटा एकत्र या संग्रहीत नहीं करते हैं।"
            : "We do not collect, transmit, or store any personal data on our servers."}
        </div>

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
              color: "var(--color-content-primary)",
              marginTop: 0,
              marginBottom: "0.5rem",
            }}
          >
            1. What Data is Processed on Your Device
          </h2>
          <p style={{ lineHeight: 1.6, color: "var(--color-content-secondary)" }}>
            To provide a responsive, accessible experience, the following non-sensitive preferences
            are saved locally in your web browser&apos;s <code>localStorage</code>:
          </p>
          <ul
            style={{
              paddingLeft: "1.25rem",
              color: "var(--color-content-secondary)",
              lineHeight: 1.6,
            }}
          >
            <li>
              <strong>Language Preference:</strong> Your chosen interface language (<code>en</code>{" "}
              or <code>hi</code>).
            </li>
            <li>
              <strong>Presentation Mode:</strong> Your chosen display mode (<code>standard</code>,{" "}
              <code>simple</code>, or <code>assisted</code>).
            </li>
            <li>
              <strong>Saved Services:</strong> Any public service bookmark you choose to save on
              this device.
            </li>
          </ul>
          <p
            style={{
              lineHeight: 1.6,
              color: "var(--color-content-secondary)",
              margin: "0.75rem 0 0 0",
            }}
          >
            These preferences never leave your browser and can be completely wiped at any time using
            the <strong>Clear My Stored Preferences</strong> button in the footer.
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
              color: "var(--color-content-primary)",
              marginTop: 0,
              marginBottom: "0.5rem",
            }}
          >
            2. Absolute Prohibitions (Hard Rules)
          </h2>
          <p style={{ lineHeight: 1.6, color: "var(--color-content-secondary)" }}>
            The platform architecture strictly prohibits the capture, storage, logging, or
            transmission of:
          </p>
          <ul
            style={{
              paddingLeft: "1.25rem",
              color: "var(--color-content-secondary)",
              lineHeight: 1.6,
            }}
          >
            <li>Aadhaar numbers or biometric information</li>
            <li>One-Time Passwords (OTPs) of any kind</li>
            <li>Banking passwords, UPI PINs, or card security codes</li>
            <li>Government portal login credentials</li>
            <li>Medical records or health histories</li>
          </ul>
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
              color: "var(--color-content-primary)",
              marginTop: 0,
              marginBottom: "0.5rem",
            }}
          >
            3. Zero Third-Party Advertising or Tracking
          </h2>
          <p style={{ lineHeight: 1.6, color: "var(--color-content-secondary)", margin: 0 }}>
            We do not embed third-party advertising SDKs, session replay trackers, or commercial
            data brokers. Typography and assets are self-hosted to prevent third-party logging of
            citizen IP addresses.
          </p>
        </section>
      </div>
    </div>
  );
}
