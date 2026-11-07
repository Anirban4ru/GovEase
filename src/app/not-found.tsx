"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SERVICE_REDIRECTS: Record<string, string> = {
  "abha-health-id": "create-abha-id",
  abha: "create-abha-id",
  "health-id": "create-abha-id",
  ayushman: "create-abha-id",
  "national-scholarship-portal": "nsp-scholarship-discovery",
  scholarships: "nsp-scholarship-discovery",
  scholarship: "nsp-scholarship-discovery",
  nsp: "nsp-scholarship-discovery",
  "pm-kisan-samman-nidhi": "pm-kisan-status",
  "pm-kisan": "pm-kisan-status",
  pmkisan: "pm-kisan-status",
  kisan: "pm-kisan-status",
  "jan-dhan": "pm-jan-dhan-yojana-account",
  "pm-jan-dhan": "pm-jan-dhan-yojana-account",
  pmjdy: "pm-jan-dhan-yojana-account",
  "birth-certificate": "birth-certificate-crs",
  crs: "birth-certificate-crs",
  "voter-id": "voter-id-epic-download",
  voter: "voter-id-epic-download",
  epic: "voter-id-epic-download",
  "pan-card": "pan-card-reprint",
  pan: "pan-card-reprint",
  digilocker: "digilocker-account-setup",
  eshram: "eshram-card-registration",
  "e-shram": "eshram-card-registration",
  "epf-passbook": "epf-passbook-claim-status",
  epf: "epf-passbook-claim-status",
  epfo: "epf-passbook-claim-status",
  uan: "epf-passbook-claim-status",
  "ration-card": "ration-card-nfsa-status",
  ration: "ration-card-nfsa-status",
  nfsa: "ration-card-nfsa-status",
  "driving-licence": "driving-licence-renewal",
  "driving-license": "driving-licence-renewal",
  sarathi: "driving-licence-renewal",
  pmay: "pmay-beneficiary-status",
  "awas-yojana": "pmay-beneficiary-status",
  udid: "swavlamban-udid-card",
  swavlamban: "swavlamban-udid-card",
  "rc-transfer": "parivahan-rc-transfer",
  "consumer-helpline": "consumer-helpline-grievance",
};

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pathname = window.location.pathname.toLowerCase();

    // Check if URL matches a known service alias
    for (const [alias, targetId] of Object.entries(SERVICE_REDIRECTS)) {
      if (pathname.includes(alias)) {
        router.replace(`/services/${targetId}/`);
        return;
      }
    }
  }, [router]);

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
