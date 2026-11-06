"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "../context/I18nContext";

export function Footer() {
  const { t } = useTranslation();
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleClearData = () => {
    try {
      localStorage.clear();
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 5000);
    } catch {
      // Ignored
    }
  };

  return (
    <footer
      style={{
        backgroundColor: "var(--color-neutral-100)",
        borderTop: "1px solid var(--color-border-default)",
        paddingTop: "2.5rem",
        paddingBottom: "5rem", // Extra spacing for mobile bottom navigation bar
        marginTop: "auto",
        fontSize: "0.875rem",
        color: "var(--color-content-secondary)",
      }}
    >
      <div className="app-container">
        {/* Top Section: Notice and Links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "0.75rem",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/apple-touch-icon.png"
                alt="GovEase"
                width="32"
                height="32"
                style={{
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border-default)",
                  backgroundColor: "#ffffff",
                }}
              />
              <h2
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                <span style={{ color: "var(--color-govease-navy, #0c2340)" }}>Gov</span>
                <span style={{ color: "var(--color-govease-saffron, #f26a1b)" }}>Ease</span>
              </h2>
            </div>
            <p style={{ lineHeight: 1.6, margin: 0 }}>{t("footer.aboutText")}</p>
            <div
              style={{
                marginTop: "1rem",
                fontSize: "0.8125rem",
                color: "var(--color-content-tertiary)",
              }}
            >
              {t("common.disclaimerNotice")}
            </div>
          </div>

          <div>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--color-content-primary)",
                marginBottom: "0.75rem",
              }}
            >
              {t("footer.privacy")}
            </h2>
            <p style={{ lineHeight: 1.6, margin: 0, marginBottom: "0.75rem" }}>
              {t("footer.privacyText")}
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <li>
                <Link href="/privacy">{t("footer.privacy")}</Link>
              </li>
              <li>
                <Link href="/help">{t("nav.help")}</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleClearData}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "var(--color-content-link)",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    textAlign: "left",
                  }}
                >
                  {t("common.clearData")}
                </button>
              </li>
            </ul>

            {clearedNotice && (
              <div
                role="status"
                aria-live="polite"
                style={{
                  marginTop: "0.75rem",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "var(--color-status-success-bg)",
                  color: "var(--color-status-success)",
                  border: "1px solid var(--color-status-success-border)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.8125rem",
                }}
              >
                {t("common.dataClearedNotice")}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Copyright & Anti-Monetisation Guarantee */}
        <div
          style={{
            borderTop: "1px solid var(--color-border-default)",
            paddingTop: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            fontSize: "0.8125rem",
            color: "var(--color-content-tertiary)",
          }}
        >
          <div>{t("footer.allRightsReserved")}</div>
          <div>
            Built with strict data minimisation standards conforming to the Digital Personal Data
            Protection Act, 2023.
          </div>
        </div>
      </div>
    </footer>
  );
}
