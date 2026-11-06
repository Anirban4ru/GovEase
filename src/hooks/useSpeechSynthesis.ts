"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import type { Locale } from "../context/I18nContext";

export interface SpeechSynthesisState {
  isSupported: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  hasVoiceForLocale: (lang?: Locale) => boolean;
  speak: (text: string, lang?: Locale) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

export function selectBestVoice<T extends { lang: string }>(
  voices: T[],
  lang: Locale = "en",
): T | undefined {
  if (lang === "hi") {
    return voices.find((v) => v.lang === "hi-IN" || v.lang.toLowerCase().startsWith("hi"));
  }
  if (lang === "bn") {
    return (
      voices.find((v) => v.lang === "bn-IN") ||
      voices.find((v) => v.lang === "bn-BD") ||
      voices.find((v) => v.lang.toLowerCase().startsWith("bn"))
    );
  }
  if (lang === "ta") {
    return (
      voices.find((v) => v.lang === "ta-IN") ||
      voices.find((v) => v.lang === "ta-LK") ||
      voices.find((v) => v.lang.toLowerCase().startsWith("ta"))
    );
  }
  return (
    voices.find((v) => v.lang === "en-IN") ||
    voices.find((v) => v.lang.toLowerCase().startsWith("en"))
  );
}

export function prepareTextForSpeech(text: string, lang: Locale = "en"): string {
  let currencyLabel = "Rupees";
  if (lang === "hi") currencyLabel = "रुपये";
  else if (lang === "bn") currencyLabel = "টাকা";
  else if (lang === "ta") currencyLabel = "ரூபாய்";

  return text
    .replace(/\s+/g, " ")
    .replace(/₹\s*([0-9,.]+)/g, `$1 ${currencyLabel}`)
    .trim();
}

const subscribeSupport = () => () => {};
const getSupportSnapshot = () => typeof window !== "undefined" && "speechSynthesis" in window;
const getServerSupportSnapshot = () => false;

export function useSpeechSynthesis(): SpeechSynthesisState {
  const isSupported = useSyncExternalStore(
    subscribeSupport,
    getSupportSnapshot,
    getServerSupportSnapshot,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const updateVoices = () => {
        try {
          voicesRef.current = window.speechSynthesis.getVoices();
        } catch {
          voicesRef.current = [];
        }
      };

      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    setIsPlaying(false);
    setIsPaused(false);
    currentUtteranceRef.current = null;
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.pause();
        setIsPaused(true);
      } catch {
        // ignore
      }
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } catch {
        // ignore
      }
    }
  }, []);

  const speak = useCallback((text: string, lang: Locale = "en") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    // Stop previous utterance
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }

    const cleaned = prepareTextForSpeech(text, lang);
    if (!cleaned) {
      setIsPlaying(false);
      setIsPaused(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.rate = 0.95; // Clear, accessible tempo for civic instructions
    utterance.pitch = 1.0;

    // Select localized voice if available
    const voices =
      voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
    const chosenVoice = selectBestVoice(voices, lang);
    if (chosenVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang;
    } else {
      if (lang === "hi") utterance.lang = "hi-IN";
      else if (lang === "bn") utterance.lang = "bn-IN";
      else if (lang === "ta") utterance.lang = "ta-IN";
      else utterance.lang = "en-IN";
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      currentUtteranceRef.current = null;
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      currentUtteranceRef.current = null;
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    currentUtteranceRef.current = utterance;
    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, []);

  const hasVoiceForLocale = useCallback((lang: Locale = "en") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    const voices =
      voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
    return !!selectBestVoice(voices, lang);
  }, []);

  return {
    isSupported,
    isPlaying,
    isPaused,
    hasVoiceForLocale,
    speak,
    pause,
    resume,
    stop,
  };
}
