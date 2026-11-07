import type { Metadata } from "next";
import Link from "next/link";
import { PersonalizedEligibilityModal } from "../../components/PersonalizedEligibilityModal";
import { IconLock, IconShield, IconBuilding, IconDocument } from "../../components/CivicIcons";

export const metadata: Metadata = {
  title: "Personalized Eligibility Check & Schemes Discovery | GovEase",
  description:
    "Discover government schemes, student scholarships, and welfare benefits you qualify for based on age, gender, education, income, social category, ration card status, and location. 100% Zero-Knowledge & DPDP Act compliant.",
};

export default function EligibilityPage() {
  return (
    <div className="app-container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <ol
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-content-tertiary)",
          }}
        >
          <li>
            <Link
              href="/"
              style={{ color: "var(--color-content-secondary)", textDecoration: "none" }}
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li
            aria-current="page"
            style={{ fontWeight: 600, color: "var(--color-content-primary)" }}
          >
            Personalized Eligibility Check
          </li>
        </ol>
      </nav>

      {/* Page Title & Context Header */}
      <div style={{ marginBottom: "2rem", maxWidth: "860px", margin: "0 auto 2rem auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.3rem 0.75rem",
            backgroundColor: "#ecfdf5",
            border: "1px solid #a7f3d0",
            borderRadius: "var(--radius-full, 9999px)",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#065f46",
            marginBottom: "0.75rem",
          }}
        >
          <IconLock size={13} color="#065f46" />
          <span>100% Client-Side Evaluation • DPDP Act 2023 Compliant</span>
        </div>
        <h1
          style={{
            fontSize: "2.125rem",
            fontWeight: 800,
            color: "var(--color-govease-navy, #0d3570)",
            lineHeight: 1.2,
            marginBottom: "0.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          Personalized Citizen Eligibility Engine
        </h1>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--color-content-secondary)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Input your demographic profile, education level, household income, ration category, and
          location to immediately discover which Central and State government welfare initiatives
          and scholarships you qualify for — with explicit eligibility rationales.
        </p>
      </div>

      {/* Embedded Screener Wizard */}
      <div style={{ marginBottom: "3rem" }}>
        <PersonalizedEligibilityModal embedded={true} />
      </div>

      {/* Privacy, Accuracy & Methodology Guarantees */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "1.5rem",
          backgroundColor: "#f8fafc",
          borderRadius: "var(--radius-lg, 12px)",
          border: "1px solid var(--color-border-default)",
        }}
      >
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--color-govease-navy, #0d3570)",
            marginBottom: "0.75rem",
          }}
        >
          Guaranteed Privacy & Evaluation Methodology
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#1e293b",
                margin: "0 0 0.25rem 0",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <IconShield size={14} color="#0d3570" />
              <span>Zero Data Transmission</span>
            </h3>
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.5 }}>
              Your age, income, caste, disability, and landholding data never leave your browser
              thread. No analytics, tracking pixels, or remote database logging.
            </p>
          </div>
          <div>
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#1e293b",
                margin: "0 0 0.25rem 0",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <IconBuilding size={14} color="#0d3570" />
              <span>Official Sovereign Guidelines</span>
            </h3>
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.5 }}>
              Eligibility algorithms are cross-referenced directly against official Ministry of
              Social Justice, MoAFW, DBT Bharat, and state department gazettes.
            </p>
          </div>
          <div>
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#1e293b",
                margin: "0 0 0.25rem 0",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <IconDocument size={14} color="#0d3570" />
              <span>Instant Report & Print Dossier</span>
            </h3>
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.5 }}>
              Export a checklist summary or print your qualified schemes dossier directly to take to
              your local Gram Panchayat, CSC VLE, or Citizen Service Kiosk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
