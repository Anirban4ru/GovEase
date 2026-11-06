import { describe, it, expect } from "vitest";
import { analyzeSmsSender, CIVIC_HELPLINES, VERIFIED_SMS_HEADERS } from "../src/lib/anti-scam-data";

describe("Anti-Scam Verification & Emergency Helplines Engine", () => {
  it("flags personal 10-digit mobile numbers as HIGH RISK cyber fraud", () => {
    const res1 = analyzeSmsSender("+91 9876543210");
    expect(res1.isHighRiskScam).toBe(true);
    expect(res1.isGovernment).toBe(false);
    expect(res1.category).toBe("HIGH_RISK_PHONE");
    expect(res1.safetyProtocol).toContain("1930");

    const res2 = analyzeSmsSender("9812345678");
    expect(res2.isHighRiskScam).toBe(true);
  });

  it("verifies official TRAI registered government headers", () => {
    const resParivahan = analyzeSmsSender("AX-PARIVH");
    expect(resParivahan.isGovernment).toBe(true);
    expect(resParivahan.isHighRiskScam).toBe(false);
    expect(resParivahan.category).toBe("OFFICIAL_GOV");
    expect(resParivahan.officialDepartment).toContain("Parivahan");

    const resUidai = analyzeSmsSender("VK-UIDAI");
    expect(resUidai.isGovernment).toBe(true);
    expect(resUidai.officialDepartment).toContain("Aadhaar");

    const resCpgram = analyzeSmsSender("CPGRAM");
    expect(resCpgram.isGovernment).toBe(true);
  });

  it("classifies unknown alphanumeric sender as unverified commercial", () => {
    const res = analyzeSmsSender("XY-FLPKRT");
    expect(res.isGovernment).toBe(false);
    expect(res.isHighRiskScam).toBe(false);
    expect(res.category).toBe("UNKNOWN_HEADER");
  });

  it("contains critical statutory national helplines including Cybercrime 1930 and Consumer 1915", () => {
    const numbers = CIVIC_HELPLINES.map((h) => h.number);
    expect(numbers).toContain("1930");
    expect(numbers).toContain("1915");
    expect(numbers).toContain("14555");
    expect(numbers).toContain("1947");

    const cyber = CIVIC_HELPLINES.find((h) => h.number === "1930");
    expect(cyber?.authority).toContain("Ministry of Home Affairs");
    expect(cyber?.operatingHours).toContain("24x7");
  });
});
