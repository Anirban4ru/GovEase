import { describe, it, expect } from "vitest";
import {
  evaluateCitizenEligibility,
  QUICK_DEMO_PROFILES,
  DEFAULT_CITIZEN_PROFILE,
  CitizenProfile,
} from "../src/lib/eligibility-matcher";

describe("Personalized Eligibility Matcher Engine", () => {
  it("matches student scholarships for the Student demo profile", () => {
    const studentDemo = QUICK_DEMO_PROFILES.find((p) => p.id === "student-scholarships");
    expect(studentDemo).toBeDefined();

    const matches = evaluateCitizenEligibility(studentDemo!.profile);
    expect(matches.length).toBeGreaterThan(0);

    const nspMatch = matches.find((m) => m.serviceId === "nsp-scholarship-discovery");
    expect(nspMatch).toBeDefined();
    expect(nspMatch!.matchScore).toBeGreaterThanOrEqual(90);
    expect(nspMatch!.qualificationReasons.en.length).toBeGreaterThan(0);
    expect(
      nspMatch!.qualificationReasons.en.some((r) => r.toLowerCase().includes("education")),
    ).toBe(true);
  });

  it("matches PM-Kisan and agricultural welfare for the Farmer demo profile", () => {
    const farmerDemo = QUICK_DEMO_PROFILES.find((p) => p.id === "agriculture-livelihood");
    expect(farmerDemo).toBeDefined();

    const matches = evaluateCitizenEligibility(farmerDemo!.profile);
    expect(matches.length).toBeGreaterThan(0);

    const kisanMatch = matches.find((m) => m.serviceId === "pm-kisan-status");
    expect(kisanMatch).toBeDefined();
    expect(kisanMatch!.matchScore).toBe(100);
    expect(
      kisanMatch!.qualificationReasons.en.some(
        (r) => r.toLowerCase().includes("cultivating") || r.toLowerCase().includes("farmer"),
      ),
    ).toBe(true);
  });

  it("matches women empowerment initiatives and scholarships for female profile", () => {
    const womenDemo = QUICK_DEMO_PROFILES.find((p) => p.id === "women-startups");
    expect(womenDemo).toBeDefined();

    const matches = evaluateCitizenEligibility(womenDemo!.profile);
    expect(matches.length).toBeGreaterThan(0);

    const womenMatch = matches.find((m) => m.serviceId === "standup-india-women-entrepreneurs");
    expect(womenMatch).toBeDefined();
    expect(
      womenMatch!.qualificationReasons.en.some((r) => r.toLowerCase().includes("female")),
    ).toBe(true);
  });

  it("matches UDID card and ADIP aids for Divyangjan profile with benchmark disability", () => {
    const divyangjanDemo = QUICK_DEMO_PROFILES.find((p) => p.id === "accessibility-divyangjan");
    expect(divyangjanDemo).toBeDefined();

    const matches = evaluateCitizenEligibility(divyangjanDemo!.profile);
    expect(matches.length).toBeGreaterThan(0);

    const udidMatch = matches.find((m) => m.serviceId === "swavlamban-udid-card");
    expect(udidMatch).toBeDefined();
    expect(udidMatch!.matchScore).toBe(100);
    expect(
      udidMatch!.qualificationReasons.en.some((r) => r.toLowerCase().includes("disability")),
    ).toBe(true);

    const adipMatch = matches.find((m) => m.serviceId === "adip-disability-aids");
    expect(adipMatch).toBeDefined();
  });

  it("matches e-Shram and worker welfare for the Unorganised Worker demo profile", () => {
    const workerDemo = QUICK_DEMO_PROFILES.find((p) => p.id === "informal-gig-worker");
    expect(workerDemo).toBeDefined();

    const matches = evaluateCitizenEligibility(workerDemo!.profile);
    expect(matches.length).toBeGreaterThan(0);

    const eshramMatch = matches.find((m) => m.serviceId === "eshram-card-registration");
    expect(eshramMatch).toBeDefined();
    expect(eshramMatch!.matchScore).toBeGreaterThanOrEqual(95);

    const janDhanMatch = matches.find((m) => m.serviceId === "pm-jan-dhan-yojana-account");
    expect(janDhanMatch).toBeDefined();
  });

  it("appropriately handles income ceilings (e.g. above 8 Lakhs excludes BPL food subsidies)", () => {
    const affluentProfile: CitizenProfile = {
      ...DEFAULT_CITIZEN_PROFILE,
      familyIncome: "above_8lakh",
      rationCard: "none",
    };

    const matches = evaluateCitizenEligibility(affluentProfile);
    const nfsaMatch = matches.find((m) => m.serviceId === "ration-card-nfsa-status");
    expect(nfsaMatch).toBeUndefined(); // BPL/NFSA should not match above 8 Lakhs without ration card
  });

  it("includes multilingual qualification rationales across all 4 supported locales", () => {
    const matches = evaluateCitizenEligibility(DEFAULT_CITIZEN_PROFILE);
    expect(matches.length).toBeGreaterThan(0);

    for (const match of matches) {
      expect(match.title.en).toBeDefined();
      expect(match.title.hi).toBeDefined();
      expect(match.title.bn).toBeDefined();
      expect(match.title.ta).toBeDefined();

      expect(match.highlightBenefit.en).toBeDefined();
      expect(match.highlightBenefit.hi).toBeDefined();

      expect(match.qualificationReasons.en.length).toBeGreaterThan(0);
      expect(match.qualificationReasons.hi.length).toBeGreaterThan(0);
      expect(match.qualificationReasons.bn.length).toBeGreaterThan(0);
      expect(match.qualificationReasons.ta.length).toBeGreaterThan(0);
    }
  });

  it("enforces rule versioning, effective dates, and sovereign policy circular links on all schemes", () => {
    // Evaluate across multiple demo profiles to hit all schemes
    const allMatches = [
      ...evaluateCitizenEligibility(DEFAULT_CITIZEN_PROFILE),
      ...QUICK_DEMO_PROFILES.flatMap((p) => evaluateCitizenEligibility(p.profile)),
    ];

    expect(allMatches.length).toBeGreaterThan(0);

    for (const match of allMatches) {
      expect(match.ruleVersion).toMatch(/^v\d{4}\.\d{2}$/); // e.g. "v2026.11"
      expect(match.effectiveDate.length).toBeGreaterThan(0);
      expect(match.policySourceUrl).toMatch(/^https?:\/\//);
      expect(match.policySourceTitle.length).toBeGreaterThan(0);
    }
  });
});
