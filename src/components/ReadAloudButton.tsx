"use client";

import React from "react";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { useTranslation } from "../context/I18nContext";
import { usePresentationMode } from "../context/ModeContext";

interface ReadAloudButtonProps {
  text: string;
  label?: string;
  size?: "sm" | "md";
}

export function ReadAloudButton({ text, label, size = "sm" }: ReadAloudButtonProps) {
  const { locale } = useTranslation();
  const { mode } = usePresentationMode();
  const { isSupported, isPlaying, speak, stop } = useSpeechSynthesis();

  // If browser does not support SpeechSynthesis, render nothing gracefully
  if (!isSupported) {
    return null;
  }

  const handleToggle = () => {
    if (isPlaying) {
      stop();
    } else {
      speak(text, locale);
    }
  };

  const stopLabels: Record<string, string> = {
    en: "Stop reading",
    hi: "आवाज बंद करें",
    bn: "পড়া বন্ধ করুন",
    ta: "வாசிப்பதை நிறுத்துங்கள்",
  };

  const defaultReadLabels: Record<string, string> = {
    en: "Read aloud",
    hi: "सुनें (बोलकर पढ़ें)",
    bn: "শুনুন (পড়ে শোনান)",
    ta: "கேளுங்கள் (சத்தமாக வாசிக்கவும்)",
  };

  const defaultLabel = isPlaying
    ? stopLabels[locale] || stopLabels.en
    : label || defaultReadLabels[locale] || defaultReadLabels.en;

  const isAssisted = mode === "assisted";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={defaultLabel}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: size === "sm" ? "0.375rem 0.625rem" : "0.5rem 0.875rem",
        fontSize: size === "sm" ? "0.75rem" : "0.8125rem",
        fontWeight: 600,
        backgroundColor: isPlaying
          ? "var(--color-brand-primary)"
          : isAssisted
            ? "var(--color-brand-primary-subtle)"
            : "var(--color-neutral-100)",
        color: isPlaying ? "var(--color-content-inverse)" : "var(--color-content-primary)",
        border: "1px solid",
        borderColor: isPlaying
          ? "var(--color-brand-primary)"
          : isAssisted
            ? "var(--color-brand-primary)"
            : "var(--color-border-default)",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        minHeight: "var(--min-touch-target)",
        transition: "all 0.15s ease",
      }}
    >
      {isPlaying ? (
        // Stop icon (square)
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
          aria-hidden="true"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      ) : (
        // Speaker / Audio icon
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
      <span>{defaultLabel}</span>
      {isPlaying && (
        <span
          data-testid="audio-wave-animation"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",
            height: "12px",
            marginLeft: "0.25rem",
          }}
          aria-hidden="true"
        >
          <span
            style={{
              display: "inline-block",
              width: "3px",
              height: "12px",
              backgroundColor: "currentColor",
              borderRadius: "1px",
              animation: "soundWave 0.8s ease-in-out infinite",
              animationDelay: "0s",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: "3px",
              height: "12px",
              backgroundColor: "currentColor",
              borderRadius: "1px",
              animation: "soundWave 0.8s ease-in-out infinite",
              animationDelay: "0.2s",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: "3px",
              height: "12px",
              backgroundColor: "currentColor",
              borderRadius: "1px",
              animation: "soundWave 0.8s ease-in-out infinite",
              animationDelay: "0.4s",
            }}
          />
        </span>
      )}
      {isAssisted && !isPlaying && (
        <span
          aria-hidden="true"
          style={{
            fontSize: "0.625rem",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "var(--color-brand-primary)",
            marginLeft: "0.25rem",
          }}
        >
          {locale === "hi" ? "सहायक" : "Voice"}
        </span>
      )}
    </button>
  );
}
