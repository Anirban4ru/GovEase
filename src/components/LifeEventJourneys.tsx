"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "../context/I18nContext";
import { LIFE_EVENT_JOURNEYS } from "../lib/life-event-bundles";

const STORAGE_KEY = "govease_journey_completed_steps";

export function LifeEventJourneys() {
  const { locale } = useTranslation();
  const [activeJourneyId, setActiveJourneyId] = useState<string>("newborn-arrival");
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompletedSteps(JSON.parse(stored));
      }
    } catch {
      // localStorage disabled / private browsing
    }
  }, []);

  const toggleStep = (stepKey: string) => {
    setCompletedSteps((prev) => {
      const updated = { ...prev, [stepKey]: !prev[stepKey] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const currentJourney =
    LIFE_EVENT_JOURNEYS.find((j) => j.id === activeJourneyId) || LIFE_EVENT_JOURNEYS[0];

  const completedCount = currentJourney.steps.filter(
    (s) => completedSteps[`${currentJourney.id}_${s.serviceId}`],
  ).length;

  const progressPercent = Math.round((completedCount / currentJourney.steps.length) * 100);

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-card)",
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-md)",
        padding: "1.75rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "var(--color-content-primary)",
              margin: 0,
            }}
          >
            {locale === "hi"
              ? "जीवन घटना समग्र यात्राएं (Life Event Journeys)"
              : locale === "bn"
                ? "জীবনের গুরুত্বপূর্ণ পর্যায়ভিত্তিক সামগ্রিক যাত্রা"
                : locale === "ta"
                  ? "வாழ்க்கை நிகழ்வு ஒருங்கிணைந்த பயணங்கள்"
                  : "Composite Life Event Journeys"}
          </h2>
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
            Multi-Service Pathways
          </span>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--color-content-secondary)", margin: 0, lineHeight: 1.5 }}>
          {locale === "hi"
            ? "अलग-अलग सेवाओं को खोजने के बजाय, जीवन की प्रमुख घटनाओं के अनुसार क्रमबद्ध दस्तावेज़ प्रक्रिया का पालन करें।"
            : "Instead of navigating single services in silos, follow integrated end-to-end dependency pathways."}
        </p>
      </div>

      {/* Journey Selection Tabs */}
      <div
        role="tablist"
        aria-label="Select Life Event Journey"
        style={{
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--color-border-default)",
          marginBottom: "1.5rem",
        }}
      >
        {LIFE_EVENT_JOURNEYS.map((journey) => {
          const isSelected = journey.id === activeJourneyId;
          const journeyTitle = journey.title[locale] || journey.title.en;

          return (
            <button
              key={journey.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveJourneyId(journey.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid",
                borderColor: isSelected ? "var(--color-brand-primary)" : "var(--color-border-default)",
                backgroundColor: isSelected ? "var(--color-brand-primary)" : "var(--color-surface-page)",
                color: isSelected ? "#ffffff" : "var(--color-content-secondary)",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                minHeight: "var(--min-touch-target)",
                transition: "all 120ms ease",
              }}
            >
              <span>{journeyTitle.split("(")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Journey Overview Banner & Progress Meter */}
      {currentJourney && (
        <div>
          <div
            style={{
              backgroundColor: "var(--color-surface-page)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-sm)",
              padding: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, margin: "0 0 0.25rem 0", color: "var(--color-content-primary)" }}>
                  {currentJourney.title[locale] || currentJourney.title.en}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-content-secondary)", margin: 0 }}>
                  {currentJourney.overview[locale] || currentJourney.overview.en}
                </p>
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  backgroundColor: "var(--color-neutral-100)",
                  color: "var(--color-content-tertiary)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "var(--radius-xs)",
                }}
              >
                Target: {currentJourney.targetCitizens}
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Journey completion progress"
                style={{
                  flex: 1,
                  height: "8px",
                  backgroundColor: "var(--color-border-default)",
                  borderRadius: "var(--radius-full)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progressPercent}%`,
                    backgroundColor: progressPercent === 100 ? "#16a34a" : "var(--color-brand-primary)",
                    transition: "width 200ms ease",
                  }}
                />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-content-secondary)" }}>
                {completedCount} / {currentJourney.steps.length} Steps Completed ({progressPercent}%)
              </span>
            </div>
          </div>

          {/* Sequential Step Nodes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {currentJourney.steps.map((step) => {
              const stepKey = `${currentJourney.id}_${step.serviceId}`;
              const isDone = Boolean(completedSteps[stepKey]);

              return (
                <div
                  key={step.serviceId}
                  style={{
                    border: `1px solid ${isDone ? "#16a34a" : "var(--color-border-default)"}`,
                    borderRadius: "var(--radius-sm)",
                    padding: "1.25rem",
                    backgroundColor: isDone ? "rgba(22, 163, 74, 0.04)" : "var(--color-surface-page)",
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                    position: "relative",
                  }}
                >
                  {/* Step Completion Checkbox */}
                  <div style={{ paddingTop: "0.25rem", flexShrink: 0 }}>
                    <input
                      id={`check-${stepKey}`}
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleStep(stepKey)}
                      aria-label={`Mark step ${step.sequence} as completed`}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        accentColor: "var(--color-brand-primary)",
                      }}
                    />
                  </div>

                  {/* Step Sequence Badge */}
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: isDone ? "#16a34a" : "var(--color-brand-primary)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.875rem",
                      flexShrink: 0,
                    }}
                  >
                    {step.sequence}
                  </div>

                  {/* Step Details */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginBottom: "0.35rem",
                      }}
                    >
                      <h4
                        style={{
                          margin: 0,
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "var(--color-content-primary)",
                          textDecoration: isDone ? "line-through" : "none",
                        }}
                      >
                        {step.stepTitle[locale] || step.stepTitle.en}
                      </h4>
                      <Link
                        href={`/services/${step.serviceId}`}
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: 700,
                          color: "var(--color-brand-primary)",
                          textDecoration: "underline",
                        }}
                      >
                        {locale === "hi" ? "पूर्ण मार्गदर्शिका देखें →" : "View Step Guide →"}
                      </Link>
                    </div>

                    {/* Why this step first */}
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-content-secondary)",
                        lineHeight: 1.5,
                        margin: "0 0 0.75rem 0",
                      }}
                    >
                      <strong>Why First:</strong> {step.whyFirst[locale] || step.whyFirst.en}
                    </p>

                    {/* Prerequisites */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-content-tertiary)" }}>
                        Prerequisites:
                      </span>
                      {step.prerequisites.map((pre, pIdx) => (
                        <span
                          key={pIdx}
                          style={{
                            fontSize: "0.75rem",
                            padding: "0.15rem 0.45rem",
                            backgroundColor: "var(--color-surface-card)",
                            border: "1px solid var(--color-border-default)",
                            borderRadius: "var(--radius-xs)",
                            color: "var(--color-content-secondary)",
                          }}
                        >
                          {pre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
