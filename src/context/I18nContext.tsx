"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import enTranslations from "../locales/en.json";
import hiTranslations from "../locales/hi.json";

export type Locale = "en" | "hi";

type TranslationDictionary = typeof enTranslations;

const dictionaries: Record<Locale, TranslationDictionary> = {
  en: enTranslations,
  hi: hiTranslations,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (keyPath: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = "uls_locale_preference";

const localeListeners = new Set<() => void>();

function subscribeLocale(callback: () => void) {
  localeListeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    localeListeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getLocaleSnapshot(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "hi") return "hi";
  } catch {
    // Storage access restricted
  }
  return "en";
}

function getServerLocaleSnapshot(): Locale {
  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribeLocale, getLocaleSnapshot, getServerLocaleSnapshot);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // Storage access disabled
    }
    localeListeners.forEach((listener) => listener());
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split(".");
    let current: unknown = dictionaries[locale];

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = (current as Record<string, unknown>)[key];
      } else {
        return keyPath;
      }
    }

    if (typeof current === "string") {
      return current;
    }

    return keyPath;
  };

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
