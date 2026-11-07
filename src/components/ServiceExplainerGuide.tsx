"use client";

import React, { useState, useRef } from "react";
import { useTranslation } from "../context/I18nContext";
import { usePresentationMode } from "../context/ModeContext";
import type {
  ExplainerStep,
  ServiceExplainerGuide as IServiceExplainerGuide,
} from "../lib/service-explainer-data";
import { getJargon } from "../lib/jargon-glossary";
import { ReadAloudButton } from "./ReadAloudButton";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";

interface ServiceExplainerGuideProps {
  guide?: IServiceExplainerGuide;
  serviceId?: string;
}

export function ServiceExplainerGuide({ guide }: ServiceExplainerGuideProps) {
  const { locale } = useTranslation();
  const { mode } = usePresentationMode();
  const { isPlaying, hasVoiceForLocale } = useSpeechSynthesis();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (!guide || !guide.steps || guide.steps.length === 0) {
    return null;
  }

  const steps = guide.steps;
  const currentStep: ExplainerStep = steps[activeStepIndex] || steps[0];
  const relatedJargon = currentStep.relatedJargonKey
    ? getJargon(currentStep.relatedJargonKey)
    : undefined;

  const stepNarrative = [
    locale === "hi"
      ? `चरण ${currentStep.stepNumber}: ${currentStep.title.hi}`
      : `Phase ${currentStep.stepNumber}: ${currentStep.title.en}`,
    locale === "hi" ? currentStep.summary.hi : currentStep.summary.en,
    locale === "hi"
      ? "मुख्य कार्यवाही: " + currentStep.actionItems.hi.join(". ")
      : "Action steps: " + currentStep.actionItems.en.join(". "),
    currentStep.commonPitfallWarning
      ? locale === "hi"
        ? "सावधानी: " + currentStep.commonPitfallWarning.hi
        : "Caution: " + currentStep.commonPitfallWarning.en
      : "",
  ]
    .filter(Boolean)
    .join(". ");

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % steps.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + steps.length) % steps.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = steps.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveStepIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      aria-labelledby="explainer-guide-heading"
      style={{
        backgroundColor: "var(--color-surface-card)",
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-md)",
        padding: "1.5rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ marginBottom: "1.25rem" }}>
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}
        >
          <h2
            id="explainer-guide-heading"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--color-content-primary)",
              margin: 0,
            }}
          >
            {locale === "hi"
              ? "चरण-दर-चरण नेविगेशन मार्गदर्शिका"
              : "Step-by-Step Portal Navigation Guide"}
          </h2>
          {mode === "assisted" && (
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                backgroundColor: "var(--color-brand-primary-subtle)",
                color: "var(--color-brand-primary)",
                padding: "0.15rem 0.5rem",
                borderRadius: "var(--radius-xs)",
                textTransform: "uppercase",
              }}
            >
              {locale === "hi" ? "सहायता मोड सक्रिय" : "Assisted Mode Active"}
            </span>
          )}
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-content-secondary)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {locale === "hi"
            ? "आधिकारिक सरकारी पोर्टल पर बिना भटके या फर्जी विज्ञापनों में फंसे सुरक्षित आवेदन करने के 5 स्पष्ट चरण।"
            : "A 5-phase sequential walkthrough to navigate the official government portal safely without confusion or ad traps."}
        </p>
      </div>

      {/* Roving Tablist Navigation */}
      <div
        role="tablist"
        aria-label={
          locale === "hi" ? "नेविगेशन गाइड के 5 चरण" : "5 Steps of Portal Navigation Guide"
        }
        style={{
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid var(--color-border-default)",
          marginBottom: "1.5rem",
        }}
      >
        {steps.map((step, idx) => {
          const isSelected = activeStepIndex === idx;
          const stepTitle = locale === "hi" ? step.title.hi : step.title.en;

          return (
            <button
              key={step.stepNumber}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              role="tab"
              id={`step-tab-${step.stepNumber}`}
              aria-controls={`step-panel-${step.stepNumber}`}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveStepIndex(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.875rem",
                fontSize: "0.8125rem",
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? "var(--color-brand-primary)" : "var(--color-content-secondary)",
                backgroundColor: isSelected ? "var(--color-brand-primary-subtle)" : "transparent",
                border: "1px solid",
                borderColor: isSelected
                  ? "var(--color-brand-primary)"
                  : "var(--color-border-default)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                minHeight: "var(--min-touch-target)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: isSelected
                    ? "var(--color-brand-primary)"
                    : "var(--color-neutral-200)",
                  color: isSelected
                    ? "var(--color-content-inverse)"
                    : "var(--color-content-secondary)",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                }}
              >
                {step.stepNumber}
              </span>
              <span>{stepTitle.split(":")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tabpanel */}
      <div
        role="tabpanel"
        id={`step-panel-${currentStep.stepNumber}`}
        aria-labelledby={`step-tab-${currentStep.stepNumber}`}
        tabIndex={0}
        style={{
          outline: "none",
          animation: "fadeInStep 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Step Header */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "0.25rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--color-brand-primary)",
                letterSpacing: "0.05em",
              }}
            >
              {locale === "hi"
                ? `चरण ${currentStep.stepNumber} / ${steps.length}`
                : `Phase ${currentStep.stepNumber} of ${steps.length}`}
            </span>
            <ReadAloudButton
              text={stepNarrative}
              label={locale === "hi" ? "चरण सुनें" : "Listen to step"}
            />
          </div>
          <h3
            style={{
              fontSize: "1.1875rem",
              fontWeight: 700,
              color: "var(--color-content-primary)",
              margin: "0.25rem 0 0.5rem 0",
            }}
          >
            {locale === "hi" ? currentStep.title.hi : currentStep.title.en}
          </h3>
          <p
            style={{
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              color: "var(--color-content-secondary)",
              margin: 0,
            }}
          >
            {locale === "hi" ? currentStep.summary.hi : currentStep.summary.en}
          </p>
        </div>

        {/* Action Items List with Karaoke-style Visual Read-Along Focus */}
        <div
          style={{
            backgroundColor: isPlaying
              ? "var(--color-brand-primary-subtle)"
              : "var(--color-surface-page)",
            border: "1px solid",
            borderColor: isPlaying ? "var(--color-brand-primary)" : "var(--color-border-default)",
            borderLeft: isPlaying
              ? "4px solid var(--color-ink-blue)"
              : "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-sm)",
            padding: "1rem 1.25rem",
            marginBottom: "1.25rem",
            transition: "all 200ms ease",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <h4
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--color-content-primary)",
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {locale === "hi" ? "कार्यवाही के मुख्य बिंदु:" : "Key Action Steps:"}
            </h4>

            {isPlaying && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--color-ink-blue)",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-ink-blue)",
                  }}
                />
                <span>{locale === "hi" ? "सक्रिय दृश्य वाचन" : "Active Read-Along Focus"}</span>
              </span>
            )}
          </div>
          <ol
            style={{
              paddingLeft: "1.25rem",
              margin: 0,
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              color: "var(--color-content-primary)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {(locale === "hi" ? currentStep.actionItems.hi : currentStep.actionItems.en).map(
              (item, idx) => (
                <li key={idx}>{item}</li>
              ),
            )}
          </ol>

          {!hasVoiceForLocale(locale) && (
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--color-content-tertiary)",
                marginTop: "0.75rem",
                paddingTop: "0.5rem",
                borderTop: "1px dashed var(--color-border-subtle)",
              }}
            >
              {locale === "hi"
                ? "डिवाइस सूचना: क्षेत्रीय वॉयस इंजन अनुपलब्ध होने पर दृश्य फोकस मोड सक्रिय रहता है।"
                : "Accessibility Notice: When a device lacks Indian regional voice packs, visual focus read-along guides you step-by-step."}
            </div>
          )}
        </div>

        {/* Common Pitfall Warning Banner */}
        {currentStep.commonPitfallWarning && (
          <div
            style={{
              backgroundColor: "var(--color-neutral-100)",
              borderLeft: "4px solid var(--color-status-warning)",
              borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
              padding: "0.875rem 1rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b45309"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flexShrink: 0, marginTop: "2px" }}
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: "0.8125rem",
                  color: "var(--color-content-primary)",
                  marginBottom: "0.25rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {locale === "hi"
                  ? "सावधानी / सामान्य त्रुटि"
                  : "Important Warning / Avoid Pitfalls"}
              </strong>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: "var(--color-content-secondary)",
                  margin: 0,
                }}
              >
                {locale === "hi"
                  ? currentStep.commonPitfallWarning.hi
                  : currentStep.commonPitfallWarning.en}
              </p>
            </div>
          </div>
        )}

        {/* Related Jargon Demystification Card */}
        {relatedJargon && (
          <div
            style={{
              backgroundColor: "var(--color-brand-primary-subtle)",
              border: "1px solid var(--color-brand-primary)",
              borderRadius: "var(--radius-sm)",
              padding: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.375rem",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-ochre)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-brand-primary)",
                }}
              >
                {locale === "hi"
                  ? "सरल भाषा में समझें (शब्दावली)"
                  : "Plain-Language Term Explainer"}
              </span>
            </div>

            <h5
              style={{
                fontSize: "0.9375rem",
                fontWeight: 700,
                color: "var(--color-content-primary)",
                margin: "0 0 0.25rem 0",
              }}
            >
              {locale === "hi" ? relatedJargon.title.hi : relatedJargon.title.en}
            </h5>

            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.5,
                color: "var(--color-content-secondary)",
                margin: "0 0 0.5rem 0",
              }}
            >
              {locale === "hi"
                ? relatedJargon.plainExplanation.hi
                : relatedJargon.plainExplanation.en}
            </p>

            <p
              style={{
                fontSize: "0.8125rem",
                lineHeight: 1.4,
                color: "var(--color-content-primary)",
                margin: 0,
                fontWeight: 500,
              }}
            >
              <strong>{locale === "hi" ? "यह क्यों जरूरी है:" : "Why this matters:"}</strong>{" "}
              {locale === "hi" ? relatedJargon.whyItMatters.hi : relatedJargon.whyItMatters.en}
            </p>
          </div>
        )}

        {/* Step Navigation Controls (Previous / Next) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--color-border-default)",
          }}
        >
          <button
            type="button"
            disabled={activeStepIndex === 0}
            onClick={() => {
              const prev = Math.max(0, activeStepIndex - 1);
              setActiveStepIndex(prev);
              tabRefs.current[prev]?.focus();
            }}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.8125rem",
              fontWeight: 600,
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border-default)",
              backgroundColor: "transparent",
              color:
                activeStepIndex === 0
                  ? "var(--color-content-tertiary)"
                  : "var(--color-content-primary)",
              cursor: activeStepIndex === 0 ? "not-allowed" : "pointer",
              minHeight: "var(--min-touch-target)",
              opacity: activeStepIndex === 0 ? 0.5 : 1,
            }}
          >
            ← {locale === "hi" ? "पिछला चरण" : "Previous Step"}
          </button>

          <span style={{ fontSize: "0.8125rem", color: "var(--color-content-tertiary)" }}>
            {activeStepIndex + 1} / {steps.length}
          </span>

          <button
            type="button"
            disabled={activeStepIndex === steps.length - 1}
            onClick={() => {
              const next = Math.min(steps.length - 1, activeStepIndex + 1);
              setActiveStepIndex(next);
              tabRefs.current[next]?.focus();
            }}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.8125rem",
              fontWeight: 600,
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border-default)",
              backgroundColor:
                activeStepIndex === steps.length - 1 ? "transparent" : "var(--color-brand-primary)",
              color:
                activeStepIndex === steps.length - 1
                  ? "var(--color-content-tertiary)"
                  : "var(--color-content-inverse)",
              cursor: activeStepIndex === steps.length - 1 ? "not-allowed" : "pointer",
              minHeight: "var(--min-touch-target)",
              opacity: activeStepIndex === steps.length - 1 ? 0.5 : 1,
            }}
          >
            {locale === "hi" ? "अगला चरण" : "Next Step"} →
          </button>
        </div>
      </div>
    </section>
  );
}
