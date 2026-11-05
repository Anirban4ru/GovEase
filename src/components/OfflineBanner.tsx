"use client";

import React, { useSyncExternalStore, useState, useEffect } from "react";
import { useTranslation } from "../context/I18nContext";

function subscribeOnline(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getOnlineSnapshot(): boolean {
  return typeof navigator !== "undefined" ? navigator.onLine : true;
}

function getServerOnlineSnapshot(): boolean {
  return true;
}

export function OfflineBanner() {
  const { t } = useTranslation();
  const isOnline = useSyncExternalStore(
    subscribeOnline,
    getOnlineSnapshot,
    getServerOnlineSnapshot,
  );
  const isOffline = !isOnline;
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    const handleOnlineEvent = () => {
      setShowRestored(true);
      const timer = setTimeout(() => setShowRestored(false), 4000);
      return () => clearTimeout(timer);
    };

    window.addEventListener("online", handleOnlineEvent);
    return () => {
      window.removeEventListener("online", handleOnlineEvent);
    };
  }, []);

  if (!isOffline && !showRestored) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        backgroundColor: isOffline
          ? "var(--color-status-warning-bg)"
          : "var(--color-status-success-bg)",
        color: isOffline ? "var(--color-status-warning)" : "var(--color-status-success)",
        borderBottom: `1px solid ${
          isOffline ? "var(--color-status-warning-border)" : "var(--color-status-success-border)"
        }`,
        padding: "0.5rem 1rem",
        fontSize: "0.875rem",
        fontWeight: 600,
        textAlign: "center",
      }}
    >
      <div className="app-container">
        {isOffline ? t("common.offlineNotice") : t("common.onlineNotice")}
      </div>
    </div>
  );
}
