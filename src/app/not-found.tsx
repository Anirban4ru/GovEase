import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="app-container"
      style={{ paddingTop: "4rem", paddingBottom: "4rem", textAlign: "center" }}
    >
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 700,
            color: "var(--color-brand-primary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          404 Error
        </span>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: 800,
            color: "var(--color-content-primary)",
            margin: "0.5rem 0 1rem 0",
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--color-content-secondary)",
            lineHeight: 1.6,
            marginBottom: "2rem",
          }}
        >
          The service guide or page you requested could not be located. It may have been updated,
          relocated, or temporarily retired.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.75rem 1.5rem",
              backgroundColor: "var(--color-brand-primary)",
              color: "var(--color-content-inverse)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              minHeight: "var(--min-touch-target)",
            }}
          >
            Return to Home
          </Link>
          <Link
            href="/explore"
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
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}
