import { describe, it, expect } from "vitest";
import {
  evaluateLifeStageMatches,
  generateCscPrepPack,
  LIFE_STAGE_OPTIONS,
  HOUSEHOLD_NEED_OPTIONS,
  LifeStageId,
  HouseholdNeedId,
} from "../src/lib/life-stage-engine";

describe("Milestone M10 - Citizen Life-Stage Navigator & Recommendation Engine", () => {
  it("defines comprehensive options with 4-language localized labels", () => {
    expect(LIFE_STAGE_OPTIONS.length).toBeGreaterThanOrEqual(6);
    expect(HOUSEHOLD_NEED_OPTIONS.length).toBeGreaterThanOrEqual(4);

    for (const opt of LIFE_STAGE_OPTIONS) {
      expect(opt.label.en).toBeTruthy();
      expect(opt.label.hi).toBeTruthy();
      expect(opt.label.bn).toBeTruthy();
      expect(opt.label.ta).toBeTruthy();
      expect(opt.description.en).toBeTruthy();
    }

    for (const need of HOUSEHOLD_NEED_OPTIONS) {
      expect(need.label.en).toBeTruthy();
      expect(need.label.hi).toBeTruthy();
      expect(need.label.bn).toBeTruthy();
      expect(need.label.ta).toBeTruthy();
    }
  });

  it("evaluates unorganised worker profile to recommend e-Shram, PMSBY, and PMJDY", () => {
    const matches = evaluateLifeStageMatches("unorganised-worker", "financial-welfare");
    expect(matches.length).toBeGreaterThanOrEqual(3);

    const ids = matches.map((m) => m.serviceId);
    expect(ids).toContain("eshram-card-registration");
    expect(ids).toContain("pm-suraksha-bima-yojana");
    expect(ids).toContain("pm-jan-dhan-yojana-account");

    const eshramMatch = matches.find((m) => m.serviceId === "eshram-card-registration");
    expect(eshramMatch?.officialSource).toBe("Ministry of Labour & Employment");
    expect(eshramMatch?.rationale.en).toContain("universal account number");
  });

  it("evaluates farmer profile to recommend PM-Kisan and PMAY-G", () => {
    const matches = evaluateLifeStageMatches("farmer", "health-housing");
    expect(matches.length).toBeGreaterThanOrEqual(3);

    const ids = matches.map((m) => m.serviceId);
    expect(ids).toContain("pm-kisan-status");
    expect(ids).toContain("pmay-beneficiary-status");
    expect(ids).toContain("ration-card-nfsa-status");
  });

  it("evaluates student profile to recommend NSP scholarships and DigiLocker", () => {
    const matches = evaluateLifeStageMatches("student", "transport-education");
    expect(matches.length).toBeGreaterThanOrEqual(3);

    const ids = matches.map((m) => m.serviceId);
    expect(ids).toContain("nsp-scholarship-discovery");
    expect(ids).toContain("digilocker-account-setup");
    expect(ids).toContain("voter-id-epic-download");
  });

  it("evaluates person with disability (PwD) profile to recommend UDID card", () => {
    const matches = evaluateLifeStageMatches("pwd", "identity-documents");
    expect(matches.length).toBeGreaterThanOrEqual(3);

    const ids = matches.map((m) => m.serviceId);
    expect(ids).toContain("swavlamban-udid-card");
    expect(ids).toContain("create-abha-id");
    expect(ids).toContain("digilocker-account-setup");
  });

  it("evaluates senior citizen profile to recommend EPF pension and Jan Dhan", () => {
    const matches = evaluateLifeStageMatches("senior", "financial-welfare");
    expect(matches.length).toBeGreaterThanOrEqual(3);

    const ids = matches.map((m) => m.serviceId);
    expect(ids).toContain("epf-passbook-claim-status");
    expect(ids).toContain("pm-jan-dhan-yojana-account");
    expect(ids).toContain("create-abha-id");
  });

  it("generates comprehensive CSC preparation pack with originals, copies, photos, and fee guidelines", () => {
    const pack = generateCscPrepPack(["pm-kisan-status", "swavlamban-udid-card"]);
    expect(pack.length).toBeGreaterThanOrEqual(5);

    const categories = pack.map((p) => p.category);
    expect(categories).toContain("originals");
    expect(categories).toContain("photocopies");
    expect(categories).toContain("photographs");
    expect(categories).toContain("fees");

    // All items must have 4-language support
    for (const item of pack) {
      expect(item.item.en).toBeTruthy();
      expect(item.item.hi).toBeTruthy();
      expect(item.item.bn).toBeTruthy();
      expect(item.item.ta).toBeTruthy();
      expect(item.notes.en).toBeTruthy();
    }
  });
});

