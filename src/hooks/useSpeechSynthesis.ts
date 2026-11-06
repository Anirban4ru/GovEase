"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";

export interface SpeechSynthesisState {
  isSupported: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  speak: (text: string, lang?: "en" | "hi") => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

export function selectBestVoice<T extends { lang: string }>(
  voices: T[],
  lang: "en" | "hi",
): T | undefined {
  if (lang === "hi") {
    return voices.find((v) => v.lang === "hi-IN" || v.lang.toLowerCase().startsWith("hi"));
  }
  return (
    voices.find((v) => v.lang === "en-IN") ||
    voices.find((v) => v.lang.toLowerCase().startsWith("en"))
  );
}

export function prepareTextForSpeech(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/₹\s*([0-9,.]+)/g, "$1 Rupees")
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
      setIsPlaying(false);
      setIsPaused(false);
      currentUtteranceRef.current = null;
    }
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

  const speak = useCallback((text: string, lang: "en" | "hi" = "en") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    // Stop previous utterance
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }

    const cleaned = prepareTextForSpeech(text);
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
      utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";
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

  return {
    isSupported,
    isPlaying,
    isPaused,
    speak,
    pause,
    resume,
    stop,
  };
}
