"use client";

import React, { useEffect, useRef } from "react";
import { useTranslation } from "../context/I18nContext";

interface OutboundHandoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationUrl: string;
  providerName: string;
  serviceTitle: string;
}

export function OutboundHandoffModal({
  isOpen,
  onClose,
  destinationUrl,
  providerName,
  serviceTitle,
}: OutboundHandoffModalProps) {
  const { locale } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const proceedBtnRef = useRef<HTMLAnchorElement>(null);

  // Parse hostname safely
  let hostname = "";
  try {
    hostname = new URL(destinationUrl).hostname;
  } catch {
    hostname = destinationUrl;
  }

  // Handle Escape key and focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    proceedBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        padding: "1rem",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="motion-reveal"
        style={{
          backgroundColor: "var(--color-surface-page)",
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          maxWidth: "540px",
          width: "100%",
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Header */}
        <div>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              backgroundColor: "var(--color-brand-primary-subtle)",
              color: "var(--color-brand-primary)",
              padding: "0.25rem 0.5rem",
              borderRadius: "var(--radius-xs)",
              display: "inline-block",
              marginBottom: "0.5rem",
            }}
          >
            {locale === "hi" ? "आधिकारिक पोर्टल प्रस्थान" : "Official Portal Handoff"}
          </span>
          <h2
            id="modal-title"
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "var(--color-content-primary)",
              margin: 0,
            }}
          >
            {locale === "hi"
              ? "आप आधिकारिक सरकारी पोर्टल पर जा रहे हैं"
              : "You are leaving the Independent Guide"}
          </h2>
        </div>

        {/* Description & Domain Confirmation */}
        <div
          id="modal-description"
          style={{
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            color: "var(--color-content-secondary)",
          }}
        >
          <p style={{ margin: "0 0 0.75rem 0" }}>
            {locale === "hi" ? (
              <>
                आप <strong>{serviceTitle}</strong> के लिए अधिकृत पोर्टल पर जा रहे हैं, जो{" "}
                <strong>{providerName}</strong> द्वारा संचालित है।
              </>
            ) : (
              <>
                You are about to access <strong>{serviceTitle}</strong> directly on the portal
                operated by <strong>{providerName}</strong>.
              </>
            )}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "var(--color-surface-card)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-sm)",
              padding: "0.625rem 0.875rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--color-content-primary)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-status-success)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>
              {locale === "hi" ? "अनुमत सरकारी डोमेन:" : "Verified Allow-listed Domain:"}{" "}
              <code style={{ color: "var(--color-brand-primary)" }}>{hostname}</code>
            </span>
          </div>
        </div>

        {/* Security / Fraud Warning */}
        <div
          style={{
            backgroundColor: "var(--color-neutral-100)",
            borderLeft: "4px solid var(--color-brand-primary)",
            padding: "0.75rem 1rem",
            fontSize: "0.8125rem",
            color: "var(--color-content-secondary)",
            lineHeight: 1.5,
            borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
          }}
        >
          <strong>{locale === "hi" ? "सुरक्षा निर्देश:" : "Safety Reminder:"}</strong>{" "}
          {locale === "hi"
            ? "आधिकारिक सरकारी पोर्टल कभी भी आपसे फोन या ईमेल पर बैंक पासवर्ड, यूपीआई पिन या ओटीपी नहीं मांगते हैं।"
            : "Official government portals will never ask you for your bank password, UPI PIN, or OTP over personal phone or email."}
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "0.75rem",
            marginTop: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "0.625rem 1.25rem",
              backgroundColor: "transparent",
              color: "var(--color-content-secondary)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-sm)",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
              minHeight: "var(--min-touch-target)",
            }}
          >
            {locale === "hi" ? "मार्गदर्शिका पर रहें" : "Stay on Guide"}
          </button>

          <a
            ref={proceedBtnRef}
            href={destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1.25rem",
              backgroundColor: "var(--color-brand-primary)",
              color: "var(--color-content-inverse)",
              border: "1px solid transparent",
              borderRadius: "var(--radius-sm)",
              fontWeight: 700,
              fontSize: "0.875rem",
              textDecoration: "none",
              cursor: "pointer",
              minHeight: "var(--min-touch-target)",
            }}
          >
            <span>
              {locale === "hi" ? "आधिकारिक पोर्टल पर जाएँ" : "Proceed to Official Portal"}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
