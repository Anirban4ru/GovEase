import { describe, it, expect } from "vitest";
import { calculateCivicFee } from "../src/lib/fee-calculator";

describe("Statutory Fee & Penalty Calculator Engine", () => {
  it("calculates driving licence renewal within standard grace period without penalty", () => {
    const res = calculateCivicFee({
      serviceType: "DRIVING_LICENCE_RENEWAL",
      monthsSinceExpiry: 3,
    });

    expect(res.statutoryTotalInr).toBe(400); // 200 base + 200 smart card
    expect(res.gracePeriodNotice?.isWithinGrace).toBe(true);
    expect(res.gracePeriodNotice?.statusBadge).toBe("WITHIN_GRACE");
    expect(res.citizenSavingsInr).toBeGreaterThan(1000);
  });

  it("applies mandatory late penalty and re-test requirement if expired over 1 year", () => {
    const res = calculateCivicFee({
      serviceType: "DRIVING_LICENCE_RENEWAL",
      monthsSinceExpiry: 18, // 1.5 years expired (> 12 months)
    });

    expect(res.gracePeriodNotice?.isWithinGrace).toBe(false);
    expect(res.gracePeriodNotice?.statusBadge).toBe("RETEST_MANDATORY");
    expect(res.statutoryTotalInr).toBe(1400); // 200 base + 200 card + 1000 late fee
    expect(res.items.some((i) => i.label.includes("Late Renewal Penalty"))).toBe(true);
  });

  it("calculates official PAN reprint fee of ₹50 against inflated tout charges", () => {
    const res = calculateCivicFee({
      serviceType: "PAN_REPRINT",
      panDeliveryMode: "PHYSICAL_INDIA",
    });

    expect(res.statutoryTotalInr).toBe(50);
    expect(res.citizenSavingsInr).toBe(300);
  });

  it("verifies ₹0 statutory fee for mandatory child Aadhaar biometric update (ages 5 & 15)", () => {
    const res = calculateCivicFee({
      serviceType: "AADHAAR_UPDATE",
      aadhaarUpdateType: "CHILD_MANDATORY_5_15",
    });

    expect(res.statutoryTotalInr).toBe(0);
    expect(res.items[0].statutoryRule).toContain("100% Free");
  });

  it("verifies ₹0 statutory fee for e-Shram worker UAN registration", () => {
    const res = calculateCivicFee({
      serviceType: "E_SHRAM_REGISTRATION",
    });

    expect(res.statutoryTotalInr).toBe(0);
  });
});
