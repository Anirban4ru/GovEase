"use client";

import { useSyncExternalStore } from "react";

const SAVED_STORAGE_KEY = "uls_saved_services";
const listeners = new Set<() => void>();

function subscribeSaved(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

let cachedRaw: string | null = null;
let cachedIds: string[] = [];

function getSavedSnapshot(): string[] {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(SAVED_STORAGE_KEY) : null;
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedIds = raw ? JSON.parse(raw) : [];
    }
    return cachedIds;
  } catch {
    return cachedIds;
  }
}

const SERVER_SNAPSHOT: string[] = [];

function getServerSnapshot(): string[] {
  return SERVER_SNAPSHOT;
}

export function useSavedServices() {
  const savedIds = useSyncExternalStore(subscribeSaved, getSavedSnapshot, getServerSnapshot);

  const toggleSave = (id: string) => {
    try {
      const current = getSavedSnapshot();
      let updated: string[];
      if (current.includes(id)) {
        updated = current.filter((item) => item !== id);
      } else {
        updated = [...current, id];
      }
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(updated));
      cachedRaw = JSON.stringify(updated);
      cachedIds = updated;
      listeners.forEach((listener) => listener());
    } catch {
      // Storage unavailable
    }
  };

  const removeSave = (id: string) => {
    try {
      const current = getSavedSnapshot();
      const updated = current.filter((item) => item !== id);
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(updated));
      cachedRaw = JSON.stringify(updated);
      cachedIds = updated;
      listeners.forEach((listener) => listener());
    } catch {
      // Storage unavailable
    }
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return { savedIds, toggleSave, removeSave, isSaved };
}
