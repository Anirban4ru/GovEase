"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchServices } from "../lib/search";
import { useTranslation } from "../context/I18nContext";

interface SearchBarProps {
  placeholder?: string;
  onSearchChange?: (query: string) => void;
  showDropdown?: boolean;
  initialQuery?: string;
}

export function SearchBar({
  placeholder,
  onSearchChange,
  showDropdown = true,
  initialQuery = "",
}: SearchBarProps) {
  const { locale } = useTranslation();
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isDismissed, setIsDismissed] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isListening, setIsListening] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  // Initialize Speech Recognition if supported
  const handleVoiceSearch = () => {
    if (typeof window === "undefined") return;

    interface SpeechResultEvent {
      results?: Array<Array<{ transcript?: string }>>;
    }

    interface BrowserSpeechRecognition {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onstart: () => void;
      onresult: (event: SpeechResultEvent) => void;
      onerror: () => void;
      onend: () => void;
      start: () => void;
      stop: () => void;
    }

    type SpeechCtor = new () => BrowserSpeechRecognition;

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: SpeechCtor }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: SpeechCtor }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        locale === "hi"
          ? "आपके ब्राउज़र में वॉइस सर्च समर्थित नहीं है। कृपया गूगल क्रोम या एज का उपयोग करें।"
          : "Voice search is not supported on this browser. Please use Chrome, Edge, or Android WebView.",
      );
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang =
        locale === "hi" ? "hi-IN" : locale === "bn" ? "bn-IN" : locale === "ta" ? "ta-IN" : "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechResultEvent) => {
        const transcript = event.results?.[0]?.[0]?.transcript || "";
        if (transcript.trim()) {
          setQuery(transcript);
          setIsDismissed(false);
          if (onSearchChange) {
            onSearchChange(transcript);
          }
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Derive results directly during rendering
  const results = query.trim().length > 0 ? searchServices(query) : [];
  const isOpen = showDropdown && !isDismissed && results.length > 0;

  // Handle clicking outside to dismiss suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDismissed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value;
    setQuery(nextVal);
    setIsDismissed(false);
    setSelectedIndex(-1);
    if (onSearchChange) {
      onSearchChange(nextVal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (e.key === "Enter" && query.trim()) {
        router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        const target = results[selectedIndex];
        if (target) {
          router.push(`/services/${target.service.id}/`);
          setIsDismissed(true);
        }
      } else {
        router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
        setIsDismissed(true);
      }
    } else if (e.key === "Escape") {
      setIsDismissed(true);
    }
  };

  const clearQuery = () => {
    setQuery("");
    setIsDismissed(true);
    setSelectedIndex(-1);
    if (onSearchChange) {
      onSearchChange("");
    }
    inputRef.current?.focus();
  };

  const defaultPlaceholder =
    locale === "hi"
      ? "सेवा खोजें (जैसे: ड्राइविंग लाइसेंस, आभा कार्ड, किसान सम्मान निधि...)"
      : "Search services (e.g. driving licence, ABHA card, PM Kisan, scholarship...)";

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      {/* Accessible Polite Status for Screen Readers */}
      <div
        role="status"
        aria-live="polite"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
        }}
      >
        {query.trim().length > 0
          ? `${results.length} ${locale === "hi" ? "सेवाएं मिलीं" : "services found"}`
          : ""}
      </div>

      <div
        role="search"
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "var(--color-surface-page)",
          border: "2px solid var(--color-border-default)",
          borderRadius: "var(--radius-md)",
          padding: "0.25rem 0.5rem 0.25rem 1rem",
          boxShadow: "var(--shadow-sm)",
          transition: "border-color var(--transition-fast)",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-content-tertiary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ flexShrink: 0, marginRight: "0.5rem" }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-activedescendant={
            selectedIndex >= 0 && results[selectedIndex]
              ? `search-opt-${results[selectedIndex].service.id}`
              : undefined
          }
          aria-label={locale === "hi" ? "सेवा खोजें" : "Search public services"}
          placeholder={placeholder || defaultPlaceholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0 && showDropdown) setIsDismissed(false);
          }}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "1rem",
            backgroundColor: "transparent",
            color: "var(--color-content-primary)",
            padding: "0.625rem 0",
            minHeight: "var(--min-touch-target)",
          }}
        />

        {/* Voice Search Microphone Button */}
        <button
          type="button"
          onClick={handleVoiceSearch}
          aria-label={
            isListening
              ? locale === "hi"
                ? "सुन रहा हूँ... बोलिए"
                : "Listening... speak now"
              : locale === "hi"
                ? "आवाज से खोजें"
                : "Search by voice"
          }
          style={{
            background: isListening ? "rgba(220, 38, 38, 0.12)" : "transparent",
            border: isListening ? "1px solid #dc2626" : "none",
            borderRadius: "var(--radius-xs)",
            color: isListening ? "#dc2626" : "var(--color-content-tertiary)",
            cursor: "pointer",
            padding: "0.5rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "var(--min-touch-target)",
            minWidth: "var(--min-touch-target)",
            transition: "all 150ms ease",
          }}
          title={
            isListening
              ? locale === "hi"
                ? "सुन रहा हूँ... बोलिए"
                : "Listening... speak now"
              : locale === "hi"
                ? "आवाज से खोजें"
                : "Search by voice"
          }
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </button>

        {query.length > 0 && (
          <button
            type="button"
            onClick={clearQuery}
            aria-label={locale === "hi" ? "खोज साफ़ करें" : "Clear search query"}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-content-tertiary)",
              cursor: "pointer",
              padding: "0.5rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "var(--min-touch-target)",
              minWidth: "var(--min-touch-target)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Instant Dropdown Suggestions */}
      {isOpen && results.length > 0 && (
        <ul
          id="search-suggestions"
          role="listbox"
          aria-label="Search suggestions"
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            backgroundColor: "var(--color-surface-page)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
            listStyle: "none",
            padding: "0.5rem 0",
            margin: 0,
            zIndex: 1000,
            maxHeight: "360px",
            overflowY: "auto",
          }}
        >
          {results.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            const title =
              locale === "hi" && item.service.title.hi
                ? item.service.title.hi
                : item.service.title.en;
            const goal =
              locale === "hi" && item.service.goal.hi ? item.service.goal.hi : item.service.goal.en;

            return (
              <li
                key={item.service.id}
                id={`search-opt-${item.service.id}`}
                role="option"
                aria-selected={isSelected}
                onMouseDown={(e) => {
                  // Prevent input blur before click triggers
                  e.preventDefault();
                }}
                onClick={() => {
                  router.push(`/services/${item.service.id}/`);
                  setIsDismissed(true);
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                style={{
                  padding: "0.75rem 1rem",
                  cursor: "pointer",
                  backgroundColor: isSelected ? "var(--color-brand-primary-subtle)" : "transparent",
                  borderLeft: isSelected
                    ? "3px solid var(--color-brand-primary)"
                    : "3px solid transparent",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      color: "var(--color-content-primary)",
                    }}
                  >
                    {title}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      backgroundColor: "var(--color-neutral-100)",
                      color: "var(--color-content-secondary)",
                      padding: "0.15rem 0.4rem",
                      borderRadius: "var(--radius-xs)",
                    }}
                  >
                    {item.service.ecosystem.replace(/-/g, " ")}
                  </span>
                </div>
                <span style={{ fontSize: "0.8125rem", color: "var(--color-content-secondary)" }}>
                  {goal}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
