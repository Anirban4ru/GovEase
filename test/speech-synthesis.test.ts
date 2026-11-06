import { describe, it, expect } from "vitest";
import { selectBestVoice, prepareTextForSpeech } from "../src/hooks/useSpeechSynthesis";

describe("Speech Synthesis Voice Selection & Text Sanitization", () => {
  const mockVoices = [
    { name: "Microsoft David - English (United States)", lang: "en-US" },
    { name: "Google हिन्दी", lang: "hi-IN" },
    { name: "Google English (India)", lang: "en-IN" },
    { name: "Microsoft Heera - Hindi (India)", lang: "hi" },
  ];

  it("selects exact hi-IN or hi-prefix voice when language is hi", () => {
    const selected = selectBestVoice(mockVoices, "hi");
    expect(selected).toBeDefined();
    expect(selected?.lang).toBe("hi-IN");
  });

  it("prioritizes en-IN voice for Indian English when language is en", () => {
    const selected = selectBestVoice(mockVoices, "en");
    expect(selected).toBeDefined();
    expect(selected?.lang).toBe("en-IN");
  });

  it("falls back to generic english voice if en-IN is unavailable", () => {
    const fallbackVoices = [
      { name: "Microsoft David", lang: "en-US" },
      { name: "Google French", lang: "fr-FR" },
    ];
    const selected = selectBestVoice(fallbackVoices, "en");
    expect(selected).toBeDefined();
    expect(selected?.lang).toBe("en-US");
  });

  it("returns undefined gracefully if no voice matching language is available", () => {
    const nonMatchingVoices = [
      { name: "Google French", lang: "fr-FR" },
      { name: "Google Deutsch", lang: "de-DE" },
    ];
    const selected = selectBestVoice(nonMatchingVoices, "hi");
    expect(selected).toBeUndefined();
  });

  it("sanitizes rupee symbols to readable currency text", () => {
    const raw = "The official reprint fee is ₹50 plus ₹8.26 for postal delivery.";
    const cleaned = prepareTextForSpeech(raw);
    expect(cleaned).toBe(
      "The official reprint fee is 50 Rupees plus 8.26 Rupees for postal delivery.",
    );
  });

  it("collapses redundant whitespace and trims ends", () => {
    const raw = "   Phase 1:  Preparation.    Please bring Aadhaar card.  ";
    const cleaned = prepareTextForSpeech(raw);
    expect(cleaned).toBe("Phase 1: Preparation. Please bring Aadhaar card.");
  });
});
