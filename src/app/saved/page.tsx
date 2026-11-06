"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "../../context/I18nContext";
import { getAllServices, ECOSYSTEMS } from "../../lib/catalogue";
import { useSavedServices } from "../../hooks/useSavedServices";
import { QrSyncModal } from "../../components/QrSyncModal";

export default function SavedPage() {
  const { locale } = useTranslation();
  const { savedIds, removeSave, clearAll, exportBackup, importBackup, importIds } =
    useSavedServices();

  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isConfirmingClear, setIsConfirmingClear] = useState<boolean>(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const allServices = getAllServices();
  const savedServices = allServices.filter((s) => savedIds.includes(s.id));

  // Listen for ?sync=id1,id2 from QR Code or link sharing
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const syncParam = params.get("sync");
    if (syncParam) {
      const incoming = syncParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const validCatalogueIds = new Set(allServices.map((s) => s.id));
      const validIncoming = incoming.filter((id) => validCatalogueIds.has(id));
      if (validIncoming.length > 0) {
        setTimeout(() => {
          importIds(validIncoming);
          setStatusMessage(
            locale === "hi"
              ? `✓ क्यूआर कोड सिंक सफल: ${validIncoming.length} सेवा संदर्भ इस डिवाइस में आयात किए गए!`
              : `✓ QR Sync Successful: ${validIncoming.length} service references cloned to this device!`,
          );
        }, 0);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [allServices, importIds, locale]);

  // Escape listener for clear modal
  useEffect(() => {
    if (!isConfirmingClear) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsConfirmingClear(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isConfirmingClear]);

  const handleExport = () => {
    try {
      exportBackup();
      setStatusMessage(
        locale === "hi"
          ? "बैकअप फ़ाइल सफलतापूर्वक डाउनलोड की गई।"
          : "Backup file downloaded successfully.",
      );
    } catch {
      setStatusMessage(
        locale === "hi" ? "बैकअप डाउनलोड करने में त्रुटि।" : "Error generating backup download.",
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        const result = importBackup(content);
        if (result.success) {
          setStatusMessage(
            locale === "hi"
              ? `${result.count} सेवाएं सफलतापूर्वक आयात की गईं।`
              : `Imported ${result.count} service references successfully.`,
          );
        } else {
          setStatusMessage(
            locale === "hi" ? `आयात विफल: ${result.message}` : `Import failed: ${result.message}`,
          );
        }
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleConfirmClear = () => {
    clearAll();
    setIsConfirmingClear(false);
    setStatusMessage(
      locale === "hi"
        ? "सभी सहेजी गई सेवाएं साफ़ कर दी गई हैं।"
        : "All saved service references have been cleared.",
    );
  };

  return (
    <div className="app-container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      {/* Polite Live Region for Assistive Technology Announcements */}
      <div
        role="status"
        aria-live="polite"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {statusMessage}
      </div>

      {/* Screen Header */}
      <div className="no-print" style={{ marginBottom: "2rem" }}>
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

        {/* Visual Status Toast */}
        {statusMessage && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              backgroundColor: "var(--color-brand-primary-subtle)",
              color: "var(--color-brand-primary)",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.875rem",
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{statusMessage}</span>
            <button
              type="button"
              onClick={() => setStatusMessage("")}
              aria-label="Dismiss message"
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                padding: "0.25rem",
                fontWeight: 700,
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Data Portability & Checklist Action Bar */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          {/* Hidden File Input for Import */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            style={{ display: "none" }}
            aria-label="Upload JSON backup file"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "var(--color-surface-card)",
              color: "var(--color-content-primary)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-sm)",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
              minHeight: "var(--min-touch-target)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {locale === "hi" ? "बैकअप आयात करें" : "Import Backup"}
          </button>

          {savedServices.length > 0 && (
            <>
              <button
                type="button"
                onClick={handleExport}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--color-surface-card)",
                  color: "var(--color-content-primary)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  minHeight: "var(--min-touch-target)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {locale === "hi" ? "बैकअप निर्यात करें" : "Export Backup"}
              </button>

              <button
                type="button"
                onClick={() => setIsQrModalOpen(true)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--color-surface-card)",
                  color: "var(--color-content-primary)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  minHeight: "var(--min-touch-target)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
                {locale === "hi" ? "फोन में भेजें (QR)" : "Sync to Mobile (QR)"}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--color-surface-card)",
                  color: "var(--color-content-primary)",
                  border: "1px solid var(--color-border-default)",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  minHeight: "var(--min-touch-target)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                {locale === "hi" ? "चेकलिस्ट प्रिंट करें" : "Print Checklist"}
              </button>

              <button
                type="button"
                onClick={() => setIsConfirmingClear(true)}
                style={{
                  padding: "0.5rem 1rem",
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
                {locale === "hi" ? "सभी हटाएं" : "Clear All"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Print-Only Document Heading */}
      <div
        className="print-only"
        role="region"
        aria-label="Print Document Heading"
        style={{ marginBottom: "2rem", borderBottom: "2px solid #000", paddingBottom: "1rem" }}
      >
        <div style={{ fontSize: "20pt", margin: "0 0 0.5rem 0", fontWeight: 800 }}>
          GovEase - Personal Service Checklist
        </div>
        <p style={{ margin: "0 0 0.25rem 0", fontSize: "10pt" }}>
          Citizen Reference Document • Printed on:{" "}
          {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
        </p>
        <p style={{ margin: 0, fontSize: "9pt", color: "#555" }}>
          Notice: This platform is an independent public-benefit navigation aid. Always verify
          requirements directly on official government portals.
        </p>
      </div>

      {/* Main Content Area */}
      {savedServices.length === 0 ? (
        <div
          className="no-print"
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
              ? "सेवा सूची ब्राउज़ करते समय आप किसी भी सेवा को त्वरित पहुँच के लिए यहाँ सहेज सकते हैं, या पहले से सहेजा गया बैकअप आयात कर सकते हैं।"
              : "Bookmark items while browsing services for quick access, or import an existing backup file."}
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
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {savedServices.map((service) => {
              const ecosystemMeta = ECOSYSTEMS.find((e) => e.id === service.ecosystem);
              const ecosystemTitle =
                locale === "hi" && ecosystemMeta?.titleHi
                  ? ecosystemMeta.titleHi
                  : ecosystemMeta?.titleEn || service.ecosystem;
              const title =
                locale === "hi" && service.title.hi ? service.title.hi : service.title.en;
              const goal = locale === "hi" && service.goal.hi ? service.goal.hi : service.goal.en;

              return (
                <div
                  key={service.id}
                  className="print-card"
                  style={{
                    backgroundColor: "var(--color-surface-page)",
                    border: "1px solid var(--color-border-default)",
                    borderRadius: "var(--radius-md)",
                    padding: "1.25rem 1.5rem",
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
                      <h2
                        style={{ fontSize: "1.125rem", fontWeight: 700, margin: "0 0 0.25rem 0" }}
                      >
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

                    <div
                      className="no-print"
                      style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                    >
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

                  {/* Print-Only Structured Checklist Details */}
                  <div
                    className="print-only"
                    style={{
                      marginTop: "1rem",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid #eee",
                      fontSize: "9pt",
                    }}
                  >
                    <p style={{ margin: "0 0 0.25rem 0" }}>
                      <strong>Official Portal:</strong> {service.official_url}
                    </p>
                    <p style={{ margin: "0 0 0.25rem 0" }}>
                      <strong>Provider:</strong> {service.provider.name} ({service.provider.type}{" "}
                      level)
                    </p>
                    <p style={{ margin: "0 0 0.25rem 0" }}>
                      <strong>Fee:</strong>{" "}
                      {service.fees.is_fee_required ? service.fees.details : "Free of charge"}
                    </p>
                    <p style={{ margin: "0 0 0.25rem 0" }}>
                      <strong>Last Verified:</strong> {service.verification.last_verified_on}
                    </p>
                    <div style={{ marginTop: "0.5rem" }}>
                      <strong>Required Documents Checklist:</strong>
                      <ul style={{ margin: "0.25rem 0 0 1.25rem", padding: 0 }}>
                        {service.documents_required.map((doc: string, idx: number) => (
                          <li key={idx}>[ ] {doc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Printable CSC Prep Pack Verification Sign-off & Anti-Exploitation Warning */}
          <div
            className="print-only"
            style={{
              marginTop: "2.5rem",
              paddingTop: "1.25rem",
              borderTop: "2px dashed #000",
              fontSize: "9pt",
              lineHeight: 1.6,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: "10pt", marginBottom: "0.25rem" }}>
              CITIZEN PROTECTION & OFFICIAL FEE COMPLIANCE:
            </div>
            <p style={{ margin: "0 0 0.5rem 0" }}>
              Common Service Centers (CSC), cyber-cafes, and kiosk operators are legally prohibited
              from charging more than the government-mandated tariffs printed above. In case of
              bribery, intermediary extortion, or overcharging, report immediately to the National
              Consumer Helpline at <strong>1915</strong> or National Cybercrime Reporting Portal at{" "}
              <strong>1930</strong>.
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
              <div>
                <span>Citizen Name: ___________________________</span>
              </div>
              <div>
                <span>Signature / Verification: ___________________________</span>
              </div>
              <div>
                <span>Date: ____ / ____ / 2026</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Accessible Clear All Confirmation Modal */}
      {isConfirmingClear && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-modal-title"
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
              maxWidth: "460px",
              width: "100%",
              padding: "1.75rem",
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--color-border-default)",
            }}
          >
            <h2
              id="clear-modal-title"
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--color-content-primary)",
                marginTop: 0,
                marginBottom: "0.75rem",
              }}
            >
              {locale === "hi"
                ? "क्या आप सभी संदर्भ हटाना चाहते हैं?"
                : "Clear All Saved References?"}
            </h2>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--color-content-secondary)",
                marginBottom: "1.5rem",
                lineHeight: 1.5,
              }}
            >
              {locale === "hi"
                ? "यह क्रिया इस डिवाइस से आपके द्वारा सहेजे गए सभी संदर्भों को हटा देगी। यदि आप उन्हें रखना चाहते हैं, तो पहले बैकअप निर्यात करें।"
                : "This action will remove all saved service bookmarks from this device. You can export a backup first if you wish to retain them."}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setIsConfirmingClear(false)}
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
                onClick={handleConfirmClear}
                style={{
                  padding: "0.625rem 1rem",
                  backgroundColor: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  minHeight: "var(--min-touch-target)",
                }}
              >
                {locale === "hi" ? "हाँ, सभी हटाएं" : "Yes, Clear All"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zero-Knowledge QR Code Sync Modal */}
      <QrSyncModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        savedIds={savedIds}
        locale={locale}
      />
    </div>
  );
}
