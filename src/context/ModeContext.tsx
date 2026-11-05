"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type PresentationMode = "standard" | "simple" | "assisted";

interface ModeContextType {
  mode: PresentationMode;
  setMode: (mode: PresentationMode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

const STORAGE_KEY = "uls_presentation_mode";

const modeListeners = new Set<() => void>();

function subscribeMode(callback: () => void) {
  modeListeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    modeListeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getModeSnapshot(): PresentationMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "standard" || saved === "simple" || saved === "assisted") {
      return saved;
    }
  } catch {
    // Storage access restricted
  }
  return "standard";
}

function getServerModeSnapshot(): PresentationMode {
  return "standard";
}

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const mode = useSyncExternalStore(subscribeMode, getModeSnapshot, getServerModeSnapshot);

  useEffect(() => {
    document.body.setAttribute("data-mode", mode);
  }, [mode]);

  const setMode = (newMode: PresentationMode) => {
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {
      // Storage access disabled
    }
    modeListeners.forEach((listener) => listener());
  };

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
}

export function usePresentationMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("usePresentationMode must be used within a ModeProvider");
  }
  return context;
}
