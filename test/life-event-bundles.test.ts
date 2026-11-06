import { describe, it, expect } from "vitest";
import { LIFE_EVENT_JOURNEYS } from "../src/lib/life-event-bundles";

describe("Life Event Journeys Architecture", () => {
  it("provides four primary life milestone journeys", () => {
    expect(LIFE_EVENT_JOURNEYS.length).toBe(4);
    const ids = LIFE_EVENT_JOURNEYS.map((j) => j.id);
    expect(ids).toContain("newborn-arrival");
    expect(ids).toContain("higher-education-employment");
    expect(ids).toContain("unorganised-worker-safety");
    expect(ids).toContain("senior-citizen-pension");
  });

  it("verifies sequential progression and prerequisites for newborn child journey", () => {
    const newborn = LIFE_EVENT_JOURNEYS.find((j) => j.id === "newborn-arrival");
    expect(newborn).toBeDefined();
    expect(newborn?.steps.length).toBe(3);

    // Step 1: Birth certificate must be first
    expect(newborn?.steps[0].sequence).toBe(1);
    expect(newborn?.steps[0].serviceId).toBe("birth-certificate-crs");

    // Step 2: Baal Aadhaar
    expect(newborn?.steps[1].sequence).toBe(2);
    expect(newborn?.steps[1].prerequisites).toContain("CRS Birth Certificate");

    // Step 3: ABHA Health ID
    expect(newborn?.steps[2].sequence).toBe(3);
  });

  it("ensures all journeys contain multilingual step titles and rationales", () => {
    for (const journey of LIFE_EVENT_JOURNEYS) {
      expect(journey.title.en).toBeTruthy();
      expect(journey.title.hi).toBeTruthy();
      expect(journey.title.bn).toBeTruthy();
      expect(journey.title.ta).toBeTruthy();

      for (const step of journey.steps) {
        expect(step.stepTitle.en).toBeTruthy();
        expect(step.whyFirst.en).toBeTruthy();
        expect(step.prerequisites.length).toBeGreaterThan(0);
      }
    }
  });
});

