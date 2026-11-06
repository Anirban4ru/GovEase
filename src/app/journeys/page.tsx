import type { Metadata } from "next";
import Link from "next/link";
import { LifeEventJourneys } from "../../components/LifeEventJourneys";

export const metadata: Metadata = {
  title: "Composite Life Event Journeys | GovEase",
  description:
    "Integrated multi-service pathways across newborn arrival, higher education, unorganised worker welfare, and senior citizen retirement dignity.",
};

export default function JourneysPage() {
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
            Life Event Journeys
          </li>
        </ol>
      </nav>

      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--color-content-primary)",
            marginBottom: "0.5rem",
          }}
        >
          Composite Life Event Journeys
        </h1>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--color-content-secondary)",
            margin: 0,
            maxWidth: "760px",
          }}
        >
          Indian public administration is organized by ministries, but citizen lives are organized
          by milestones. Follow integrated, sequential document roadmaps that link multiple
          departments into one clear path.
        </p>
      </div>

      <LifeEventJourneys />
    </div>
  );
}
