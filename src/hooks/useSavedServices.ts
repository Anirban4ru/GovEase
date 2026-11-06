"use client";

import { useSyncExternalStore } from "react";
import { createBackupPayload, parseAndValidateBackup, ImportResult } from "../lib/saved-backup";

const SAVED_STORAGE_KEY = "uls_saved_services";
const listeners = new Set<() => void>();

function notifyListeners(newIds: string[]) {
  try {
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(newIds));
  } catch {
    // Storage unavailable
  }
  cachedRaw = JSON.stringify(newIds);
  cachedIds = newIds;
  listeners.forEach((listener) => listener());
}

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
    const current = getSavedSnapshot();
    let updated: string[];
    if (current.includes(id)) {
      updated = current.filter((item) => item !== id);
    } else {
      updated = [...current, id];
    }
    notifyListeners(updated);
  };

  const removeSave = (id: string) => {
    const current = getSavedSnapshot();
    const updated = current.filter((item) => item !== id);
    notifyListeners(updated);
  };

  const clearAll = () => {
    notifyListeners([]);
  };

  const exportBackup = (): string => {
    const current = getSavedSnapshot();
    const payload = createBackupPayload(current);
    const jsonStr = JSON.stringify(payload, null, 2);

    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `life-services-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    return jsonStr;
  };

  const importBackup = (rawJson: string): ImportResult => {
    const result = parseAndValidateBackup(rawJson);
    if (!result.success || !result.ids) {
      return result;
    }

    // Merge without duplicates
    const current = getSavedSnapshot();
    const merged = Array.from(new Set([...current, ...result.ids]));
    notifyListeners(merged);

    return result;
  };

  const importIds = (incomingIds: string[]): number => {
    const validIncoming = incomingIds.filter(Boolean);
    if (validIncoming.length === 0) return 0;
    const current = getSavedSnapshot();
    const merged = Array.from(new Set([...current, ...validIncoming]));
    notifyListeners(merged);
    return validIncoming.length;
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return {
    savedIds,
    toggleSave,
    removeSave,
    clearAll,
    exportBackup,
    importBackup,
    importIds,
    isSaved,
  };
}
