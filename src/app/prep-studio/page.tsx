import type { Metadata } from "next";
import { DocumentPrepStudio } from "../../components/DocumentPrepStudio";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Civic Document & Photo Prep Studio | GovEase",
  description:
    "100% in-browser, zero-knowledge photo and signature resizer for Indian government portal applications (UPSC, SSC, Parivahan, NHA). Processed entirely in RAM.",
};

export default function PrepStudioPage() {
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
            <Link href="/" style={{ color: "var(--color-content-secondary)", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" style={{ fontWeight: 600, color: "var(--color-content-primary)" }}>
            Document Prep Studio
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
          Civic Document & Photo Prep Studio
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--color-content-secondary)", margin: 0, maxWidth: "760px" }}>
          Avoid cyber-cafe extortion and application rejections. Calibrate your passport photos, signatures, and ID cards to exact portal KB dimensions directly inside your browser without uploading to any external server.
        </p>
      </div>

      <DocumentPrepStudio />
    </div>
  );
}

