"use client";

import React, { useState } from "react";
import { INDIAN_STATES, getStatePortalsForService, StatePortalLink } from "../lib/state-resolver";
import { OutboundHandoffModal } from "./OutboundHandoffModal";

interface StatePortalSectionProps {
  serviceId: string;
  locale: "en" | "hi" | "bn" | "ta";
}

export function StatePortalSection({ serviceId, locale }: StatePortalSectionProps) {
  const allStatePortals = getStatePortalsForService(serviceId, "ALL");
  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);

  if (allStatePortals.length === 0) {
    return null;
  }

  const availableStateCodes = new Set(allStatePortals.map((p) => p.stateCode));
  const filteredStates = INDIAN_STATES.filter(
    (s) => s.code === "ALL" || availableStateCodes.has(s.code),
  );

  const displayedPortals: StatePortalLink[] =
    selectedState === "ALL"
      ? allStatePortals
      : allStatePortals.filter((p) => p.stateCode === selectedState);

  return (
    <section
      aria-labelledby="state-resolver-heading"
      style={{
        backgroundColor: "var(--color-surface-card)",
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-md)",
        padding: "1.5rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.25rem",
            }}
          >
            <h2
              id="state-resolver-heading"
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--color-content-primary)",
                margin: 0,
              }}
            >
              {locale === "hi"
                ? "राज्य-विशिष्ट आधिकारिक पोर्टल"
                : locale === "bn"
                  ? "রাজ্যভিত্তিক সরকারি পোর্টাল"
                  : locale === "ta"
                    ? "மாநில அதிகாரப்பூர்வ போர்ட்டல்கள்"
                    : "State & Regional Official Portals"}
            </h2>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                backgroundColor: "var(--color-brand-primary-subtle)",
                color: "var(--color-brand-primary)",
                padding: "0.15rem 0.45rem",
                borderRadius: "var(--radius-xs)",
              }}
            >
              {allStatePortals.length} {locale === "hi" ? "राज्य उपलब्ध" : "States Registered"}
            </span>
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
              ? "भारत में यह सेवा राज्य स्तर पर प्रशासित होती है। अपने राज्य का आधिकारिक पोर्टल चुनें:"
              : "In India, this service is administered by state departments. Select your State/UT below:"}
          </p>
        </div>

        {/* State Dropdown Selector */}
        <div>
          <label htmlFor="state-select" style={{ display: "none" }}>
            {locale === "hi" ? "राज्य चुनें" : "Select State"}
          </label>
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border-strong)",
              backgroundColor: "var(--color-surface-page)",
              color: "var(--color-content-primary)",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
              minHeight: "var(--min-touch-target)",
            }}
          >
            {filteredStates.map((st) => (
              <option key={st.code} value={st.code}>
                {st.name[locale] || st.name.en}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* State Portals Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "0.875rem",
        }}
      >
        {displayedPortals.map((portal) => {
          const stateMatch = INDIAN_STATES.find((s) => s.code === portal.stateCode);
          const stateName = stateMatch?.name[locale] || stateMatch?.name.en || portal.stateCode;

          return (
            <div
              key={`${portal.stateCode}-${portal.officialUrl}`}
              style={{
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-sm)",
                padding: "1rem",
                backgroundColor: "var(--color-surface-page)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.75rem",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.35rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--color-brand-primary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.025em",
                    }}
                  >
                    {stateName}
                  </span>
                  <span style={{ fontSize: "0.6875rem", color: "var(--color-content-tertiary)" }}>
                    Verified .gov.in
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    color: "var(--color-content-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {portal.portalName}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-content-tertiary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {portal.department}
                </div>
                {portal.notes && (
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-content-secondary)",
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    {portal.notes}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setHandoffUrl(portal.officialUrl)}
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 0.75rem",
                    backgroundColor: "var(--color-surface-card)",
                    color: "var(--color-brand-primary)",
                    border: "1px solid var(--color-border-default)",
                    borderRadius: "var(--radius-xs)",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    minHeight: "var(--min-touch-target)",
                    transition: "border-color 150ms ease",
                  }}
                >
                  <span>{locale === "hi" ? "आधिकारिक पोर्टल खोलें" : "Open State Portal"}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {handoffUrl && (
        <OutboundHandoffModal
          isOpen={true}
          onClose={() => setHandoffUrl(null)}
          destinationUrl={handoffUrl}
          providerName="State Government Department"
          serviceTitle="Official State Public Service Portal"
        />
      )}
    </section>
  );
}
