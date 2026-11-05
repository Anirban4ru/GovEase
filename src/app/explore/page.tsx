"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "../../context/I18nContext";
import { usePresentationMode } from "../../context/ModeContext";
import { getAllServices, ECOSYSTEMS } from "../../lib/catalogue";
import { searchServices } from "../../lib/search";
import { SearchBar } from "../../components/SearchBar";

function ExploreContent() {
  const { t, locale } = useTranslation();
  const { mode } = usePresentationMode();
  const searchParams = useSearchParams();
  const paramQuery = searchParams?.get("q") || "";

  // Track user input query; fall back to URL param if not typed yet
  const [typedQuery, setTypedQuery] = useState<string | null>(null);
  const [selectedEcosystem, setSelectedEcosystem] = useState<string>("all");

  const searchQuery = typedQuery !== null ? typedQuery : paramQuery;

  // Compute filtered services based on search query and ecosystem tab
  const baseServices =
    searchQuery.trim().length > 0
      ? searchServices(searchQuery).map((r) => r.service)
      : getAllServices();

  const filteredServices =
    selectedEcosystem === "all"
      ? baseServices
      : baseServices.filter((s) => s.ecosystem === selectedEcosystem);

  const filterTabs = [
    { id: "all", labelEn: "All Services", labelHi: "सभी सेवाएं" },
    ...ECOSYSTEMS.map((e) => ({
      id: e.id,
      labelEn: e.titleEn,
      labelHi: e.titleHi,
    })),
  ];

  const clearAllFilters = () => {
    setTypedQuery("");
    setSelectedEcosystem("all");
  };

  return (
    <div className="app-container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--color-content-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {locale === "hi" ? "सार्वजनिक सेवा सूची" : "Explore Public Services"}
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-content-secondary)", margin: 0 }}>
          {locale === "hi"
            ? "सत्यापित सरकारी सेवाओं को खोजें या जीवन क्षेत्र के अनुसार फ़िल्टर करें।"
            : "Search verified government services or filter by life area and citizen goal."}
        </p>
      </div>

      {/* Prominent Live Search Input */}
      <div style={{ marginBottom: "1.5rem", maxWidth: "680px" }}>
        <SearchBar
          initialQuery={searchQuery}
          showDropdown={false}
          onSearchChange={(q) => setTypedQuery(q)}
          placeholder={
            locale === "hi"
              ? "कीवर्ड द्वारा खोजें (जैसे: लाइसेंस, छात्रवृत्ति, किसान, आधार...)"
              : "Filter by keyword (e.g. licence, scholarship, kisan, aadhaar...)"
          }
        />
      </div>

      {/* Ecosystem Filter Tabs */}
      <div
        role="tablist"
        aria-label="Filter services by ecosystem"
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
          borderBottom: "1px solid var(--color-border-default)",
          paddingBottom: "1rem",
        }}
      >
        {filterTabs.map((tab) => {
          const isActive = selectedEcosystem === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedEcosystem(tab.id)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "1px solid",
                borderColor: isActive
                  ? "var(--color-brand-primary)"
                  : "var(--color-border-default)",
                backgroundColor: isActive
                  ? "var(--color-brand-primary)"
                  : "var(--color-surface-page)",
                color: isActive ? "var(--color-content-inverse)" : "var(--color-content-secondary)",
                cursor: "pointer",
                minHeight: "var(--min-touch-target)",
                transition: "all var(--transition-fast)",
              }}
            >
              {locale === "hi" ? tab.labelHi : tab.labelEn}
            </button>
          );
        })}
      </div>

      {/* Results Count / Filter Indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem",
          fontSize: "0.875rem",
          color: "var(--color-content-secondary)",
        }}
      >
        <div>
          <strong>{filteredServices.length}</strong>{" "}
          {filteredServices.length === 1
            ? locale === "hi"
              ? "सेवा मिली"
              : "service found"
            : locale === "hi"
              ? "सेवाएं मिलीं"
              : "services found"}
          {searchQuery && (
            <span>
              {" "}
              {locale === "hi" ? "के लिए" : "matching"} &ldquo;<strong>{searchQuery}</strong>&rdquo;
            </span>
          )}
        </div>

        {(searchQuery || selectedEcosystem !== "all") && (
          <button
            type="button"
            onClick={clearAllFilters}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-brand-primary)",
              textDecoration: "underline",
              fontWeight: 600,
              fontSize: "0.8125rem",
              cursor: "pointer",
            }}
          >
            {locale === "hi" ? "सभी फ़िल्टर साफ़ करें" : "Reset filters"}
          </button>
        )}
      </div>

      {/* Services Grid or Empty Search State */}
      {filteredServices.length === 0 ? (
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
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-content-tertiary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: "0 auto 1rem auto" }}
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--color-content-primary)",
              marginBottom: "0.5rem",
            }}
          >
            {locale === "hi" ? "कोई मेल नहीं मिला" : "No matching services found"}
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
              ? "कृपया अलग कीवर्ड का उपयोग करें या सामान्य शब्दों में खोजें (जैसे: लाइसेंस, छात्रवृत्ति, किसान, आधार, स्वास्थ्य कार्ड)।"
              : "Try different keywords or broader citizen intents (e.g. licence, scholarship, kisan, health card, complaint)."}
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.625rem 1.25rem",
              backgroundColor: "var(--color-brand-primary)",
              color: "var(--color-content-inverse)",
              fontWeight: 700,
              fontSize: "0.875rem",
              borderRadius: "var(--radius-sm)",
              border: "none",
              cursor: "pointer",
              minHeight: "var(--min-touch-target)",
            }}
          >
            {locale === "hi" ? "सभी सेवाएं देखें" : "View all services"}
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              mode === "simple" ? "1fr" : "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredServices.map((service) => {
            const ecosystemMeta = ECOSYSTEMS.find((e) => e.id === service.ecosystem);
            const ecosystemLabel =
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
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "var(--shadow-sm)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      backgroundColor: "var(--color-brand-primary-subtle)",
                      color: "var(--color-brand-primary)",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "var(--radius-xs)",
                    }}
                  >
                    {ecosystemLabel}
                  </span>

                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: service.fees.is_fee_required
                        ? "var(--color-content-tertiary)"
                        : "var(--color-status-success)",
                    }}
                  >
                    {service.fees.is_fee_required
                      ? locale === "hi"
                        ? "शुल्क लागू"
                        : "Fee applicable"
                      : locale === "hi"
                        ? "निःशुल्क सेवा"
                        : "Free public service"}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    margin: "0 0 0.5rem 0",
                    color: "var(--color-content-primary)",
                    lineHeight: 1.3,
                  }}
                >
                  <Link
                    href={`/services/${service.id}`}
                    style={{
                      color: "var(--color-content-primary)",
                      textDecoration: "none",
                    }}
                  >
                    {title}
                  </Link>
                </h2>

                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--color-content-secondary)",
                    lineHeight: 1.5,
                    margin: "0 0 1.25rem 0",
                    flex: 1,
                  }}
                >
                  {goal}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid var(--color-border-default)",
                    paddingTop: "0.875rem",
                    fontSize: "0.8125rem",
                    color: "var(--color-content-tertiary)",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <span>
                    {t("common.verifiedOn")} {service.verification.last_verified_on}
                  </span>

                  <Link
                    href={`/services/${service.id}`}
                    style={{
                      fontWeight: 700,
                      color: "var(--color-brand-primary)",
                      textDecoration: "underline",
                    }}
                  >
                    {locale === "hi" ? "सेवा विवरण देखें →" : "View guide →"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="app-container" style={{ padding: "2rem" }}>
          Loading catalogue...
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
