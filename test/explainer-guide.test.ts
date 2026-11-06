import { describe, it, expect } from "vitest";
import { EXPLAINER_GUIDES } from "../src/lib/service-explainer-data";
import { JARGON_GLOSSARY } from "../src/lib/jargon-glossary";

describe("Service Explainer Guide Data", () => {
  const seedServiceIds = [
    "create-abha-id",
    "driving-licence-renewal",
    "nsp-scholarship-discovery",
    "pm-kisan-status",
    "aadhaar-pvc-card",
    "consumer-helpline-grievance",
    "voter-id-epic-download",
    "ration-card-nfsa-status",
    "pan-card-reprint",
    "epf-passbook-claim-status",
    "pmay-beneficiary-status",
    "birth-certificate-crs",
  ];

  it("should have complete 5-step explainer guides for all 12 services", () => {
    for (const serviceId of seedServiceIds) {
      const guide = EXPLAINER_GUIDES[serviceId];
      expect(guide, `Guide missing for ${serviceId}`).toBeDefined();
      expect(guide.steps).toHaveLength(5);

      guide.steps.forEach((step, idx) => {
        expect(step.stepNumber).toBe(idx + 1);
        expect(step.title.en.trim().length).toBeGreaterThan(0);
        expect(step.title.hi.trim().length).toBeGreaterThan(0);

        expect(step.summary.en.trim().length).toBeGreaterThan(10);
        expect(step.summary.hi.trim().length).toBeGreaterThan(10);

        expect(step.actionItems.en.length).toBeGreaterThanOrEqual(2);
        expect(step.actionItems.hi.length).toBeGreaterThanOrEqual(2);

        if (step.relatedJargonKey) {
          expect(
            JARGON_GLOSSARY[step.relatedJargonKey],
            `Invalid jargon key '${step.relatedJargonKey}' in service ${serviceId} step ${step.stepNumber}`,
          ).toBeDefined();
        }

        if (step.commonPitfallWarning) {
          expect(step.commonPitfallWarning.en.trim().length).toBeGreaterThan(10);
          expect(step.commonPitfallWarning.hi.trim().length).toBeGreaterThan(10);
        }
      });
    }
  });

  it("should have relevant pitfall warnings against phishing, fake agents, or unapproved fees", () => {
    // create-abha-id step 1 or 2 should warn against paid agents
    const abhaSteps = EXPLAINER_GUIDES["create-abha-id"].steps;
    const hasAbhaWarning = abhaSteps.some(
      (s) => s.commonPitfallWarning && s.commonPitfallWarning.en.toLowerCase().includes("free"),
    );
    expect(hasAbhaWarning).toBe(true);

    // aadhaar-pvc-card should warn against overcharging or commercial printouts
    const pvcSteps = EXPLAINER_GUIDES["aadhaar-pvc-card"].steps;
    const hasPvcWarning = pvcSteps.some(
      (s) => s.commonPitfallWarning && s.commonPitfallWarning.en.includes("₹50"),
    );
    expect(hasPvcWarning).toBe(true);
  });
});
