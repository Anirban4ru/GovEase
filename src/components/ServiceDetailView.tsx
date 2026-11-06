"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CatalogueService, ECOSYSTEMS } from "../lib/catalogue";
import { useTranslation } from "../context/I18nContext";
import { useSavedServices } from "../hooks/useSavedServices";
import { OutboundHandoffModal } from "./OutboundHandoffModal";
import { DocumentReadinessChecklist } from "./DocumentReadinessChecklist";
import { ServiceExplainerGuide } from "./ServiceExplainerGuide";

interface ServiceDetailViewProps {
  service: CatalogueService;
}

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const { locale } = useTranslation();
  const { isSaved: checkIsSaved, toggleSave } = useSavedServices();
  const [isHandoffModalOpen, setIsHandoffModalOpen] = useState(false);

  const isSaved = checkIsSaved(service.id);

  const ecosystemMeta = ECOSYSTEMS.find((e) => e.id === service.ecosystem);
  const ecosystemTitle =
    locale === "hi" && ecosystemMeta?.titleHi
      ? ecosystemMeta.titleHi
      : ecosystemMeta?.titleEn || service.ecosystem;
  const title = locale === "hi" && service.title.hi ? service.title.hi : service.title.en;
  const goal = locale === "hi" && service.goal.hi ? service.goal.hi : service.goal.en;
  const summary = locale === "hi" && service.summary.hi ? service.summary.hi : service.summary.en;
  const eligibility =
    locale === "hi" && service.eligibility_summary.text.hi
      ? service.eligibility_summary.text.hi
      : service.eligibility_summary.text.en;

  return (
    <div className="app-container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <ol
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-content-tertiary)",
          }}
        >
          <li>
            <Link
              href="/"
              style={{ color: "var(--color-content-secondary)", textDecoration: "none" }}
            >
              {locale === "hi" ? "मुख्य पृष्ठ" : "Home"}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/explore"
              style={{ color: "var(--color-content-secondary)", textDecoration: "none" }}
            >
              {locale === "hi" ? "सेवा सूची" : "Explore"}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li
            aria-current="page"
            style={{ fontWeight: 600, color: "var(--color-content-primary)" }}
          >
            {title}
          </li>
        </ol>
      </nav>

      {/* Header & Meta Badges */}
      <header
        style={{
          borderBottom: "1px solid var(--color-border-default)",
          paddingBottom: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                backgroundColor: "var(--color-brand-primary-subtle)",
                color: "var(--color-brand-primary)",
                padding: "0.25rem 0.625rem",
                borderRadius: "var(--radius-xs)",
              }}
            >
              {ecosystemTitle}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: "var(--color-neutral-100)",
                color: "var(--color-content-secondary)",
                padding: "0.25rem 0.5rem",
                borderRadius: "var(--radius-xs)",
              }}
            >
              Class {service.integration_classification}:{" "}
              {locale === "hi" ? "आधिकारिक नेविगेशन" : "Official Link Navigation"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => toggleSave(service.id)}
            aria-label={
              isSaved
                ? locale === "hi"
                  ? "सहेजा गया"
                  : "Saved locally"
                : locale === "hi"
                  ? "सहेजें"
                  : "Save reference"
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 0.875rem",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: isSaved ? "var(--color-brand-primary)" : "var(--color-content-secondary)",
              backgroundColor: isSaved ? "var(--color-brand-primary-subtle)" : "transparent",
              border: `1px solid ${
                isSaved ? "var(--color-brand-primary)" : "var(--color-border-default)"
              }`,
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              minHeight: "var(--min-touch-target)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
            <span>
              {isSaved
                ? locale === "hi"
                  ? "सहेजा गया"
                  : "Saved locally"
                : locale === "hi"
                  ? "सहेजें"
                  : "Save reference"}
            </span>
          </button>
        </div>

        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--color-content-primary)",
            margin: "0 0 0.5rem 0",
            lineHeight: 1.25,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--color-content-secondary)",
            margin: 0,
            fontWeight: 500,
          }}
        >
          <strong>{locale === "hi" ? "लक्ष्य:" : "User Goal:"}</strong> {goal}
        </p>
      </header>

      {/* Main Content Grid: Information + Action Sidebar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Left Column: Comprehensive Service Guidance */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          {/* Summary */}
          <section>
            <h2
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--color-content-primary)",
                marginBottom: "0.5rem",
              }}
            >
              {locale === "hi" ? "सेवा का विवरण" : "Overview & Purpose"}
            </h2>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.6,
                color: "var(--color-content-secondary)",
                margin: 0,
              }}
            >
              {summary}
            </p>
          </section>

          {/* Interactive Step-by-Step Explainer Guide */}
          <ServiceExplainerGuide serviceId={service.id} />

          {/* Interactive Document Readiness Checklist */}
          <DocumentReadinessChecklist
            serviceId={service.id}
            documents={service.documents_required}
          />

          {/* Eligibility Guidance (Informational Only Disclaimer) */}
          <section
            style={{
              backgroundColor: "var(--color-surface-page)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-md)",
              padding: "1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  color: "var(--color-content-primary)",
                  margin: 0,
                }}
              >
                {locale === "hi" ? "पात्रता एवं शर्तें" : "Who May Apply (Informational)"}
              </h2>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  backgroundColor: "var(--color-neutral-100)",
                  color: "var(--color-content-tertiary)",
                  padding: "0.15rem 0.4rem",
                  borderRadius: "var(--radius-xs)",
                  textTransform: "uppercase",
                }}
              >
                Informational Only
              </span>
            </div>
            <p
              style={{
                fontSize: "0.9375rem",
                lineHeight: 1.6,
                color: "var(--color-content-secondary)",
                margin: "0 0 0.5rem 0",
              }}
            >
              {eligibility}
            </p>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--color-content-tertiary)",
                margin: 0,
              }}
            >
              {locale === "hi"
                ? "* अंतिम पात्रता और नियम केवल आधिकारिक सरकारी पोर्टल पर ही निर्धारित किए जाते हैं।"
                : "* Final eligibility and rules are determined exclusively by the official portal."}
            </p>
          </section>

          {/* Fees & Processing Schedule */}
          <section>
            <h2
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--color-content-primary)",
                marginBottom: "0.5rem",
              }}
            >
              {locale === "hi" ? "शुल्क एवं लागत" : "Fees & Official Tariffs"}
            </h2>
            <p
              style={{
                fontSize: "0.9375rem",
                lineHeight: 1.6,
                color: "var(--color-content-secondary)",
                margin: "0 0 0.5rem 0",
              }}
            >
              {service.fees.details}
            </p>
            <span style={{ fontSize: "0.8125rem", color: "var(--color-content-tertiary)" }}>
              {locale === "hi" ? "सत्यापित स्रोत:" : "Sourced from:"}{" "}
              <a href={service.fees.source_url} target="_blank" rel="noopener noreferrer">
                {new URL(service.fees.source_url).hostname}
              </a>
            </span>
          </section>
        </div>

        {/* Right Column: Provider Card & Official Action Trigger */}
        <aside
          style={{
            backgroundColor: "var(--color-surface-card)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--color-content-tertiary)",
                textTransform: "uppercase",
              }}
            >
              {locale === "hi" ? "अधिकृत प्रदाता" : "Authorised Provider"}
            </span>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--color-content-primary)",
                margin: "0.25rem 0 0 0",
              }}
            >
              {service.provider.name}
            </h3>
            <span style={{ fontSize: "0.8125rem", color: "var(--color-content-secondary)" }}>
              {service.provider.type.toUpperCase()} • {service.geographic_scope.level.toUpperCase()}
            </span>
          </div>

          <div style={{ borderTop: "1px solid var(--color-border-default)", paddingTop: "1rem" }}>
            <button
              type="button"
              onClick={() => setIsHandoffModalOpen(true)}
              style={{
                width: "100%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.25rem",
                backgroundColor: "var(--color-brand-primary)",
                color: "var(--color-content-inverse)",
                fontWeight: 700,
                fontSize: "0.9375rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                cursor: "pointer",
                minHeight: "var(--min-touch-target)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span>{locale === "hi" ? "आधिकारिक पोर्टल पर जाएँ" : "Go to Official Portal"}</span>
              <svg
                width="16"
                height="16"
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
            </button>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--color-content-tertiary)",
                textAlign: "center",
                margin: "0.5rem 0 0 0",
              }}
            >
              {locale === "hi"
                ? "यह सुरक्षित रूप से आधिकारिक सरकारी वेबसाइट खोलेगा।"
                : "Opens the verified official government portal in a new tab."}
            </p>
          </div>

          {/* Verification Record Meta */}
          <div
            style={{
              backgroundColor: "var(--color-surface-page)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-sm)",
              padding: "0.875rem",
              fontSize: "0.75rem",
              color: "var(--color-content-secondary)",
              lineHeight: 1.5,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "var(--color-content-primary)",
                marginBottom: "0.25rem",
              }}
            >
              {locale === "hi" ? "सत्यापन रिकॉर्ड" : "Governance & Audit Record"}
            </div>
            <div>
              <strong>{locale === "hi" ? "सत्यापन तिथि:" : "Last Verified:"}</strong>{" "}
              {service.verification.last_verified_on}
            </div>
            <div>
              <strong>{locale === "hi" ? "सत्यापनकर्ता:" : "Verified By:"}</strong>{" "}
              {service.verification.verified_by}
            </div>
            <div>
              <strong>{locale === "hi" ? "अगली समीक्षा:" : "Next Review Due:"}</strong>{" "}
              {service.verification.next_review_due}
            </div>
            <div>
              <strong>{locale === "hi" ? "गंतव्य भाषाएं:" : "Languages:"}</strong>{" "}
              {service.languages_at_destination.join(", ").toUpperCase()}
            </div>
          </div>
        </aside>
      </div>

      {/* Outbound Link Safety Modal */}
      <OutboundHandoffModal
        isOpen={isHandoffModalOpen}
        onClose={() => setIsHandoffModalOpen(false)}
        destinationUrl={service.official_url}
        providerName={service.provider.name}
        serviceTitle={title}
      />
    </div>
  );
}
