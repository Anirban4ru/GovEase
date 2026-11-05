"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error internally without exposing details to user interface
    console.error("Application error boundary triggered:", error.message);
  }, [error]);

  return (
    <div
      className="app-container"
      style={{ paddingTop: "4rem", paddingBottom: "4rem", textAlign: "center" }}
    >
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "var(--color-status-error-bg)",
            color: "var(--color-status-error)",
            marginBottom: "1.25rem",
          }}
          aria-hidden="true"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--color-content-primary)",
            marginBottom: "0.75rem",
          }}
        >
          Unable to Load Service Information
        </h1>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--color-content-secondary)",
            lineHeight: 1.6,
            marginBottom: "2rem",
          }}
        >
          We encountered an unexpected technical issue. Your saved device preferences remain secure.
          Please try refreshing the page or returning to the home screen.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.75rem 1.5rem",
              backgroundColor: "var(--color-brand-primary)",
              color: "var(--color-content-inverse)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              borderRadius: "var(--radius-sm)",
              border: "none",
              cursor: "pointer",
              minHeight: "var(--min-touch-target)",
            }}
          >
            Try Again
          </button>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.75rem 1.25rem",
              backgroundColor: "var(--color-surface-card)",
              color: "var(--color-content-primary)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              border: "1px solid var(--color-border-default)",
              minHeight: "var(--min-touch-target)",
            }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
