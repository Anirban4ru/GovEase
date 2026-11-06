"use client";

import React, { useSyncExternalStore, useCallback } from "react";
import { useTranslation } from "../context/I18nContext";
import { ReadAloudButton } from "./ReadAloudButton";

interface DocumentReadinessChecklistProps {
  serviceId: string;
  documents: string[];
}

// Global dispatcher to keep multi-tab and same-tab components synchronized
const readinessListeners = new Set<() => void>();

function notifyReadinessListeners() {
  readinessListeners.forEach((listener) => listener());
}

function subscribeReadiness(callback: () => void) {
  readinessListeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    readinessListeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

export function DocumentReadinessChecklist({
  serviceId,
  documents,
}: DocumentReadinessChecklistProps) {
  const { locale } = useTranslation();
  const storageKey = `uls_readiness_${serviceId}`;

  const getSnapshot = useCallback((): string => {
    try {
      return localStorage.getItem(storageKey) || "[]";
    } catch {
      return "[]";
    }
  }, [storageKey]);

  const getServerSnapshot = useCallback((): string => "[]", []);

  const rawJson = useSyncExternalStore(subscribeReadiness, getSnapshot, getServerSnapshot);

  let checkedItems: string[] = [];
  try {
    const parsed = JSON.parse(rawJson);
    if (Array.isArray(parsed)) {
      checkedItems = parsed;
    }
  } catch {
    checkedItems = [];
  }

  const handleToggle = (doc: string) => {
    const next = checkedItems.includes(doc)
      ? checkedItems.filter((item) => item !== doc)
      : [...checkedItems, doc];

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Storage quota or restriction
    }
    notifyReadinessListeners();
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Storage restricted
    }
    notifyReadinessListeners();
  };

  const total = documents.length;
  const readyCount = documents.filter((doc) => checkedItems.includes(doc)).length;
  const percentage = total > 0 ? Math.round((readyCount / total) * 100) : 100;
  const isAllReady = total > 0 && readyCount === total;

  return (
    <section
      aria-labelledby="readiness-checklist-heading"
      style={{
        backgroundColor: "var(--color-surface-card)",
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-md)",
        padding: "1.25rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h2
            id="readiness-checklist-heading"
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "var(--color-content-primary)",
              margin: 0,
            }}
          >
            {locale === "hi"
              ? "दस्तावेज तत्परता चेकलिस्ट (जांच सूची)"
              : "Document Readiness Checklist"}
          </h2>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-content-secondary)",
              margin: "0.25rem 0 0 0",
            }}
          >
            {locale === "hi"
              ? "पोर्टल पर जाने से पहले अपने आवश्यक दस्तावेजों पर सही का निशान लगाएं।"
              : "Tick off documents you have ready before visiting the official portal."}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <ReadAloudButton
            text={
              locale === "hi"
                ? `आवश्यक दस्तावेज सूची: ${documents.join(", ")}। कुल ${total} दस्तावेज।`
                : `Required documents: ${documents.join(", ")}. Total ${total} documents.`
            }
            label={locale === "hi" ? "दस्तावेज सुनें" : "Listen to docs"}
          />
          {readyCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--color-content-secondary)",
                backgroundColor: "transparent",
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-xs)",
                padding: "0.25rem 0.625rem",
                cursor: "pointer",
                minHeight: "32px",
              }}
              aria-label={locale === "hi" ? "चेकलिस्ट रीसेट करें" : "Reset checklist ticks"}
            >
              {locale === "hi" ? "रीसेट करें" : "Reset"}
            </button>
          )}
        </div>
      </div>

      {/* Progress Metric Bar */}
      <div style={{ marginBottom: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: isAllReady ? "var(--color-status-success)" : "var(--color-brand-primary)",
            marginBottom: "0.375rem",
          }}
          aria-live="polite"
        >
          <span>
            {locale === "hi"
              ? `${readyCount} / ${total} दस्तावेज तैयार (${percentage}%)`
              : `${readyCount} of ${total} documents ready (${percentage}%)`}
          </span>
          <span
            style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-content-tertiary)" }}
          >
            {isAllReady
              ? locale === "hi"
                ? "✓ पूरी तैयारी संपन्न"
                : "✓ Fully Prepared"
              : locale === "hi"
                ? "तैयारी जारी"
                : "In Progress"}
          </span>
        </div>

        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={locale === "hi" ? "दस्तावेज तत्परता स्कोर" : "Document readiness score"}
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "var(--color-neutral-200)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              backgroundColor: isAllReady
                ? "var(--color-status-success)"
                : "var(--color-brand-primary)",
              transition: "width 350ms cubic-bezier(0.4, 0, 0.2, 1), background-color 250ms ease",
              animation: isAllReady ? "progressPulse 1.8s ease-in-out infinite" : "none",
            }}
          />
        </div>
      </div>

      {/* Checkbox Items */}
      <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
        <legend className="sr-only">
          {locale === "hi" ? "आवश्यक दस्तावेजों की सूची" : "List of required documents"}
        </legend>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.625rem",
          }}
        >
          {documents.map((doc, idx) => {
            const isChecked = checkedItems.includes(doc);
            const inputId = `doc-check-${serviceId}-${idx}`;

            return (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.5rem 0.625rem",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: isChecked ? "var(--color-surface-page)" : "transparent",
                  transition: "background-color 0.15s ease",
                }}
              >
                <input
                  type="checkbox"
                  id={inputId}
                  checked={isChecked}
                  onChange={() => handleToggle(doc)}
                  style={{
                    width: "18px",
                    height: "18px",
                    marginTop: "0.15rem",
                    cursor: "pointer",
                    accentColor: "var(--color-brand-primary)",
                    transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                    animation: isChecked ? "checkPop 0.25s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
                  }}
                />
                <label
                  htmlFor={inputId}
                  style={{
                    fontSize: "0.9375rem",
                    lineHeight: 1.5,
                    color: isChecked
                      ? "var(--color-content-tertiary)"
                      : "var(--color-content-primary)",
                    textDecoration: isChecked ? "line-through" : "none",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  {doc}
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {/* Privacy note */}
      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--color-content-tertiary)",
          marginTop: "1rem",
          marginBottom: 0,
          borderTop: "1px dashed var(--color-border-default)",
          paddingTop: "0.5rem",
        }}
      >
        🔒{" "}
        {locale === "hi"
          ? "यह चेकलिस्ट केवल आपके डिवाइस पर सहेजी जाती है। कोई भी डेटा किसी सर्वर पर नहीं भेजा जाता है।"
          : "Saved locally on your device. Zero checklist data is sent to any server."}
      </p>
    </section>
  );
}
