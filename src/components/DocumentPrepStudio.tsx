"use client";

import React, { useState, useRef } from "react";
import { useTranslation } from "../context/I18nContext";
import {
  CIVIC_PRESETS,
  processCivicImage,
  formatBytes,
  ProcessedDocumentResult,
} from "../lib/document-resizer";

export function DocumentPrepStudio() {
  const { locale } = useTranslation();
  const [selectedPreset, setSelectedPreset] =
    useState<keyof typeof CIVIC_PRESETS>("passport_photo");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [result, setResult] = useState<ProcessedDocumentResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const preset = CIVIC_PRESETS[selectedPreset];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg(
        locale === "hi"
          ? "कृपया एक मान्य छवि फ़ाइल (JPEG, PNG, WebP) अपलोड करें।"
          : "Please upload a valid image file (JPEG, PNG, WebP).",
      );
      return;
    }

    setErrorMsg("");
    setOriginalFile(file);
    setIsProcessing(true);

    try {
      const processed = await processCivicImage(file, selectedPreset);
      setResult(processed);
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : locale === "hi"
            ? "छवि संपीड़न में त्रुटि हुई।"
            : "Error processing and compressing image.",
      );
      setResult(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePresetChange = async (newPreset: keyof typeof CIVIC_PRESETS) => {
    setSelectedPreset(newPreset);
    if (originalFile) {
      setIsProcessing(true);
      try {
        const processed = await processCivicImage(originalFile, newPreset);
        setResult(processed);
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : "Error processing image.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.dataUrl;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "var(--color-content-primary)",
              margin: 0,
            }}
          >
            {locale === "hi"
              ? "दस्तावेज़ एवं फोटो तैयारी स्टूडियो"
              : locale === "bn"
                ? "নথি ও ছবি প্রস্তুতি স্টুডিও"
                : locale === "ta"
                  ? "ஆவண மற்றும் புகைப்பட தயாரிப்பு ஸ்டுடியோ"
                  : "Civic Document & Photo Prep Studio"}
          </h2>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 700,
              backgroundColor: "var(--color-status-success-bg)",
              color: "var(--color-status-success-text)",
              border: "1px solid var(--color-status-success-border)",
              padding: "0.15rem 0.5rem",
              borderRadius: "var(--radius-xs)",
              textTransform: "uppercase",
            }}
          >
            100% In-Browser RAM
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
            ? "सरकारी पोर्टलों (UPSC, SSC, परिवहन, पासपोर्ट) के लिए फोटो व हस्ताक्षर को आवश्यक KB आकार में तुरंत संपीड़ित करें। आपकी कोई भी फोटो सर्वर पर नहीं भेजी जाती।"
            : "Instantly crop and compress photos, signatures, and ID cards to exact portal KB specifications. Zero bytes ever leave your device."}
        </p>
      </div>

      {/* Preset Selector */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.8125rem",
            fontWeight: 700,
            color: "var(--color-content-primary)",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.025em",
          }}
        >
          {locale === "hi" ? "सरकारी मानक प्रीसेट चुनें:" : "Select Government Portal Preset:"}
        </label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {(Object.keys(CIVIC_PRESETS) as (keyof typeof CIVIC_PRESETS)[]).map((key) => {
            const p = CIVIC_PRESETS[key];
            const isSelected = selectedPreset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handlePresetChange(key)}
                style={{
                  textAlign: "left",
                  padding: "0.85rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid",
                  borderColor: isSelected
                    ? "var(--color-brand-primary)"
                    : "var(--color-border-default)",
                  backgroundColor: isSelected
                    ? "var(--color-brand-primary-subtle)"
                    : "var(--color-surface-page)",
                  color: "var(--color-content-primary)",
                  cursor: "pointer",
                  minHeight: "var(--min-touch-target)",
                  transition: "all 120ms ease",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                  {p.name[locale] || p.name.en}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-content-secondary)",
                    lineHeight: 1.4,
                  }}
                >
                  {p.description[locale] || p.description.en}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Box */}
      <div
        style={{
          border: "2px dashed var(--color-border-default)",
          borderRadius: "var(--radius-sm)",
          padding: "2rem 1.5rem",
          textAlign: "center",
          backgroundColor: "var(--color-surface-page)",
          marginBottom: "1.5rem",
          cursor: "pointer",
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          aria-label="Upload document image"
        />
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-brand-primary)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ margin: "0 auto 0.75rem auto" }}
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <div
          style={{
            fontWeight: 700,
            fontSize: "0.9375rem",
            color: "var(--color-content-primary)",
            marginBottom: "0.25rem",
          }}
        >
          {originalFile
            ? originalFile.name
            : locale === "hi"
              ? "यहाँ अपनी फोटो या हस्ताक्षर अपलोड करें"
              : "Click to upload photo, signature, or document"}
        </div>
        <div style={{ fontSize: "0.8125rem", color: "var(--color-content-tertiary)" }}>
          {locale === "hi"
            ? "JPEG, PNG या WebP • कोई भी फ़ाइल इंटरनेट पर नहीं भेजी जाती"
            : "Supports JPEG, PNG, WebP • 100% Zero Data Transmission"}
        </div>
      </div>

      {/* Processing Status */}
      {isProcessing && (
        <div
          style={{
            textAlign: "center",
            padding: "1rem",
            color: "var(--color-brand-primary)",
            fontWeight: 600,
          }}
        >
          {locale === "hi"
            ? "छवि संपीड़ित और पुनः आकार दी जा रही है..."
            : "Compressing and calibrating exact byte size..."}
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "var(--color-status-danger-bg)",
            color: "var(--color-status-danger-text)",
            border: "1px solid var(--color-status-danger-border)",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.875rem",
            marginBottom: "1.25rem",
          }}
        >
          {errorMsg}
        </div>
      )}

      {/* Processed Result Preview & Verification */}
      {result && !isProcessing && (
        <div
          style={{
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-sm)",
            padding: "1.25rem",
            backgroundColor: "var(--color-surface-page)",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "var(--color-status-success-text)",
                backgroundColor: "var(--color-status-success-bg)",
                border: "1px solid var(--color-status-success-border)",
                padding: "0.25rem 0.65rem",
                borderRadius: "var(--radius-xs)",
              }}
            >
              ✓{" "}
              {locale === "hi"
                ? "आधिकारिक पोर्टल विनिर्देशों के अनुरूप"
                : "Compliant with Official Portal Specifications"}
            </span>
            <span style={{ fontSize: "0.8125rem", color: "var(--color-content-tertiary)" }}>
              Quality: {result.qualityUsed}% • {result.width} × {result.height} px
            </span>
          </div>

          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
            {/* Visual Thumbnail */}
            <div
              style={{
                width: "120px",
                height: "140px",
                backgroundColor: "#f1f5f9",
                borderRadius: "var(--radius-xs)",
                border: "1px solid var(--color-border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.dataUrl}
                alt="Prepared Document Preview"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </div>

            {/* Metrics Breakdown */}
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                  fontSize: "0.8125rem",
                }}
              >
                <div>
                  <div style={{ color: "var(--color-content-tertiary)", marginBottom: "0.2rem" }}>
                    {locale === "hi" ? "मूल फ़ाइल आकार:" : "Original File Size:"}
                  </div>
                  <div style={{ fontWeight: 600 }}>
                    {originalFile ? formatBytes(originalFile.size) : "-"}
                  </div>
                </div>
                <div>
                  <div style={{ color: "var(--color-content-tertiary)", marginBottom: "0.2rem" }}>
                    {locale === "hi" ? "तैयार फ़ाइल आकार:" : "Optimized File Size:"}
                  </div>
                  <div style={{ fontWeight: 800, color: "var(--color-brand-primary)" }}>
                    {formatBytes(result.sizeBytes)}
                  </div>
                </div>
                <div>
                  <div style={{ color: "var(--color-content-tertiary)", marginBottom: "0.2rem" }}>
                    {locale === "hi" ? "अनुमत आकार सीमा:" : "Target Range Budget:"}
                  </div>
                  <div style={{ fontWeight: 600 }}>
                    {formatBytes(preset.minBytes)} – {formatBytes(preset.maxBytes)}
                  </div>
                </div>
                <div>
                  <div style={{ color: "var(--color-content-tertiary)", marginBottom: "0.2rem" }}>
                    {locale === "hi" ? "आउटपुट प्रारूप:" : "Output Format:"}
                  </div>
                  <div style={{ fontWeight: 600 }}>JPEG (High Compression)</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleDownload}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.25rem",
                backgroundColor: "var(--color-brand-primary)",
                color: "#ffffff",
                borderRadius: "var(--radius-sm)",
                fontWeight: 700,
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
                minHeight: "var(--min-touch-target)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{locale === "hi" ? "तैयार छवि डाउनलोड करें" : "Download Prepared File"}</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: "0.65rem 1rem",
                backgroundColor: "transparent",
                color: "var(--color-content-secondary)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border-default)",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                minHeight: "var(--min-touch-target)",
              }}
            >
              {locale === "hi" ? "दूसरी फोटो चुनें" : "Upload Another Photo"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
