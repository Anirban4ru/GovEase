"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../../context/I18nContext";
import { getAllServices, ECOSYSTEMS } from "../../lib/catalogue";
import { useSavedServices } from "../../hooks/useSavedServices";

export default function SavedPage() {
  const { locale } = useTranslation();
  const { savedIds, removeSave } = useSavedServices();

  const allServices = getAllServices();
  const savedServices = allServices.filter((s) => savedIds.includes(s.id));

  return (
    <div className="app-container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--color-content-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {locale === "hi" ? "सहेजे गए सेवा संदर्भ" : "Saved Service References"}
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-content-secondary)", margin: 0 }}>
          {locale === "hi"
            ? "आपके द्वारा सहेजी गई सेवाएँ केवल इस डिवाइस पर सुरक्षित रूप से संग्रहीत हैं।"
            : "Services you bookmark are saved exclusively on your local device without any server tracking."}
        </p>
      </div>

      {savedServices.length === 0 ? (
        <div
          style={{
            border: "1px dashed var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            padding: "3rem 1.5rem",
            textAlign: "center",
            backgroundColor: "var(--color-surface-card)",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-content-tertiary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: "0 auto 1rem auto" }}
            aria-hidden="true"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--color-content-primary)",
              marginBottom: "0.5rem",
            }}
          >
            {locale === "hi" ? "अभी कोई सहेजी गई सेवा नहीं है" : "No saved services yet"}
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--color-content-secondary)",
              maxWidth: "480px",
              margin: "0 auto 1.5rem auto",
            }}
          >
            {locale === "hi"
              ? "सेवा सूची ब्राउज़ करते समय आप किसी भी सेवा को त्वरित पहुँच के लिए यहाँ सहेज सकते हैं।"
              : "When browsing services, bookmark items for quick offline access on this device."}
          </p>
          <Link
            href="/explore"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.625rem 1.25rem",
              backgroundColor: "var(--color-brand-primary)",
              color: "var(--color-content-inverse)",
              fontWeight: 700,
              fontSize: "0.875rem",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              minHeight: "var(--min-touch-target)",
            }}
          >
            {locale === "hi" ? "सेवाएं खोजें" : "Explore Services"}
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {savedServices.map((service) => {
            const ecosystemMeta = ECOSYSTEMS.find((e) => e.id === service.ecosystem);
            const ecosystemTitle =
              locale === "hi" && ecosystemMeta?.titleHi
                ? ecosystemMeta.titleHi
                : ecosystemMeta?.titleEn || service.ecosystem;
            const title = locale === "hi" && service.title.hi ? service.title.hi : service.title.en;
            const goal = locale === "hi" && service.goal.hi ? service.goal.hi : service.goal.en;

            return (
              <div
                key={service.id}
                style={{
                  backgroundColor: "var(--color-surface-page)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ flex: 1, minWidth: "260px" }}>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      backgroundColor: "var(--color-brand-primary-subtle)",
                      color: "var(--color-brand-primary)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "var(--radius-xs)",
                      display: "inline-block",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {ecosystemTitle}
                  </span>
                  <h2 style={{ fontSize: "1.125rem", fontWeight: 700, margin: "0 0 0.25rem 0" }}>
                    <Link
                      href={`/services/${service.id}`}
                      style={{ color: "var(--color-content-primary)", textDecoration: "none" }}
                    >
                      {title}
                    </Link>
                  </h2>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-content-secondary)",
                      margin: 0,
                    }}
                  >
                    {goal}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Link
                    href={`/services/${service.id}`}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "var(--color-brand-primary)",
                      color: "var(--color-content-inverse)",
                      borderRadius: "var(--radius-sm)",
                      fontWeight: 600,
                      fontSize: "0.8125rem",
                      textDecoration: "none",
                      minHeight: "var(--min-touch-target)",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    {locale === "hi" ? "विवरण देखें" : "View guide"}
                  </Link>

                  <button
                    type="button"
                    onClick={() => removeSave(service.id)}
                    aria-label={`Remove ${title} from saved items`}
                    style={{
                      padding: "0.5rem 0.75rem",
                      backgroundColor: "transparent",
                      color: "var(--color-content-tertiary)",
                      border: "1px solid var(--color-border-default)",
                      borderRadius: "var(--radius-sm)",
                      fontWeight: 600,
                      fontSize: "0.8125rem",
                      cursor: "pointer",
                      minHeight: "var(--min-touch-target)",
                    }}
                  >
                    {locale === "hi" ? "हटाएं" : "Remove"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
