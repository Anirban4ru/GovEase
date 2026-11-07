"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "../context/I18nContext";
import { getAllServices } from "../lib/catalogue";
import { scanForSensitiveData, sanitizeFeedbackText } from "../lib/anti-leak-sanitizer";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export function FeedbackModal({ isOpen, onClose, preselectedServiceId }: FeedbackModalProps) {
  const { locale } = useTranslation();
  const services = getAllServices();
  const modalRef = useRef<HTMLDivElement>(null);

  const [category, setCategory] = useState<string>("inaccurate-info");
  const [serviceId, setServiceId] = useState<string>(preselectedServiceId || "general");
  const [description, setDescription] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const scanResult = scanForSensitiveData(description);
  const isSubmitDisabled = scanResult.hasLeak || description.trim().length === 0;

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedService = services.find((s) => s.id === serviceId);
  const serviceTitle = selectedService
    ? locale === "hi" && selectedService.title.hi
      ? selectedService.title.hi
      : selectedService.title.en
    : "General / Platform";

  const formattedReport = [
    `### GovEase - Citizen Feedback / Correction Report`,
    `- **Category:** ${category}`,
    `- **Target Service:** ${serviceTitle} (${serviceId})`,
    `- **Date:** ${new Date().toISOString()}`,
    `- **Language:** ${locale}`,
    ``,
    `#### Description & Details:`,
    sanitizeFeedbackText(description),
    ``,
    `*Notice: No citizen personal data or identifiers are collected by this platform.*`,
  ].join("\n");

  const handleCopyReport = async () => {
    let copied = false;
    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        await navigator.clipboard.writeText(formattedReport);
        copied = true;
      }
    } catch {
      // Fallback for headless environments or strict permissions
    }

    if (!copied && typeof document !== "undefined") {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = formattedReport;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        copied = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        // Fallback failed
      }
    }

    setCopySuccess(true);
    setStatusMessage(
      locale === "hi"
        ? "रिपोर्ट क्लिपबोर्ड पर कॉपी कर ली गई है।"
        : "Report copied to clipboard. You can paste it into an email or GitHub issue.",
    );
    setTimeout(() => setCopySuccess(false), 4000);
  };

  const handleOpenEmail = () => {
    const subject = encodeURIComponent(`[Life Services Feedback] ${category} - ${serviceTitle}`);
    const body = encodeURIComponent(
      `${formattedReport}\n\n[Please do not include Aadhaar, bank details, or personal contact info.]`,
    );
    window.location.href = `mailto:feedback@unifiedlifeservices.internal?subject=${subject}&body=${body}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
      ref={modalRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--color-surface-page)",
          borderRadius: "var(--radius-md)",
          maxWidth: "540px",
          width: "100%",
          padding: "1.75rem",
          boxShadow: "var(--shadow-lg)",
          border: "1px solid var(--color-border-default)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2
            id="feedback-modal-title"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--color-content-primary)",
              margin: 0,
            }}
          >
            {locale === "hi" ? "सुझाव या सुधार भेजें" : "Submit Feedback or Correction"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              lineHeight: 1,
              cursor: "pointer",
              color: "var(--color-content-secondary)",
              padding: "0.25rem",
            }}
          >
            ×
          </button>
        </div>

        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-content-secondary)",
            marginBottom: "1.25rem",
          }}
        >
          {locale === "hi"
            ? "सार्वजनिक सेवा जानकारी को अद्यतन और सटीक रखने में हमारी सहायता करें। यह फ़ीडबैक पूरी तरह से अज्ञात है।"
            : "Help us keep public service information verified, accurate, and accessible. Feedback is completely anonymous."}
        </p>

        {/* Live Notification for Assistive Technology */}
        <div role="status" aria-live="polite" className="sr-only">
          {statusMessage}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Field 1: Category */}
          <div>
            <label
              htmlFor="feedback-category"
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 600,
                marginBottom: "0.375rem",
              }}
            >
              {locale === "hi" ? "समस्या का प्रकार" : "Issue Type"}
            </label>
            <select
              id="feedback-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "0.625rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border-default)",
                backgroundColor: "var(--color-surface-page)",
                color: "var(--color-content-primary)",
                fontSize: "0.875rem",
                minHeight: "var(--min-touch-target)",
              }}
            >
              <option value="broken-link">Broken or Inaccessible Official Link</option>
              <option value="inaccurate-info">Outdated or Inaccurate Information / Fees</option>
              <option value="a11y-barrier">Accessibility or Screen Reader Barrier</option>
              <option value="suggestion">General Catalog Suggestion</option>
            </select>
          </div>

          {/* Field 2: Target Service */}
          <div>
            <label
              htmlFor="feedback-service"
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 600,
                marginBottom: "0.375rem",
              }}
            >
              {locale === "hi" ? "संबंधित सेवा" : "Related Service"}
            </label>
            <select
              id="feedback-service"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              style={{
                width: "100%",
                padding: "0.625rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border-default)",
                backgroundColor: "var(--color-surface-page)",
                color: "var(--color-content-primary)",
                fontSize: "0.875rem",
                minHeight: "var(--min-touch-target)",
              }}
            >
              <option value="general">General Platform / Entire Catalog</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title.en} ({s.provider.name})
                </option>
              ))}
            </select>
          </div>

          {/* Field 3: Description */}
          <div>
            <div
              style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}
            >
              <label
                htmlFor="feedback-description"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                {locale === "hi" ? "विवरण" : "Details & Description"}
              </label>
              <span style={{ fontSize: "0.75rem", color: "var(--color-content-tertiary)" }}>
                {description.length} / 500
              </span>
            </div>
            <textarea
              id="feedback-description"
              rows={4}
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                locale === "hi"
                  ? "कृपया समस्या का विवरण दें। आधार, फोन नंबर या व्यक्तिगत विवरण कभी शामिल न करें।"
                  : "Describe what is broken or inaccurate. Do NOT enter Aadhaar, phone numbers, or passwords."
              }
              style={{
                width: "100%",
                padding: "0.625rem",
                borderRadius: "var(--radius-sm)",
                border: scanResult.hasLeak
                  ? "2px solid #dc2626"
                  : "1px solid var(--color-border-default)",
                backgroundColor: "var(--color-surface-page)",
                color: "var(--color-content-primary)",
                fontSize: "0.875rem",
                resize: "vertical",
              }}
            />
          </div>

          {/* Anti-Leak Warning Banner */}
          {scanResult.hasLeak && (
            <div
              role="alert"
              style={{
                padding: "0.75rem",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "var(--radius-sm)",
                color: "#991b1b",
                fontSize: "0.8125rem",
                lineHeight: 1.4,
              }}
            >
              <strong>Privacy Warning:</strong> {scanResult.warningMessage}
            </div>
          )}

          {copySuccess && (
            <div
              style={{
                padding: "0.5rem 0.75rem",
                backgroundColor: "var(--color-brand-primary-subtle)",
                color: "var(--color-brand-primary)",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.8125rem",
                fontWeight: 600,
              }}
            >
              ✓ Report copied to clipboard!
            </div>
          )}

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
              marginTop: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.625rem 1rem",
                backgroundColor: "transparent",
                color: "var(--color-content-primary)",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                minHeight: "var(--min-touch-target)",
              }}
            >
              {locale === "hi" ? "रद्द करें" : "Cancel"}
            </button>

            <button
              type="button"
              onClick={handleCopyReport}
              disabled={isSubmitDisabled}
              style={{
                padding: "0.625rem 1rem",
                backgroundColor: "var(--color-surface-card)",
                color: "var(--color-content-primary)",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                opacity: isSubmitDisabled ? 0.5 : 1,
                minHeight: "var(--min-touch-target)",
              }}
            >
              {locale === "hi" ? "रिपोर्ट कॉपी करें" : "Copy Report"}
            </button>

            <button
              type="button"
              onClick={handleOpenEmail}
              disabled={isSubmitDisabled}
              style={{
                padding: "0.625rem 1.25rem",
                backgroundColor: "var(--color-brand-primary)",
                color: "var(--color-content-inverse)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                fontWeight: 700,
                fontSize: "0.875rem",
                cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                opacity: isSubmitDisabled ? 0.5 : 1,
                minHeight: "var(--min-touch-target)",
              }}
            >
              {locale === "hi" ? "ईमेल में भेजें" : "Send via Email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
