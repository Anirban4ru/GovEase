import { describe, it, expect } from "vitest";
import { INDIAN_STATES, getStatePortalsForService, getStateDisplayName } from "../src/lib/state-resolver";
import { getAllServices } from "../src/lib/catalogue";

describe("State & Union Territory Civic Resolver", () => {
  it("contains major Indian states with multilingual names", () => {
    expect(INDIAN_STATES.length).toBeGreaterThanOrEqual(15);
    const codes = INDIAN_STATES.map((s) => s.code);
    expect(codes).toContain("ALL");
    expect(codes).toContain("DL");
    expect(codes).toContain("MH");
    expect(codes).toContain("UP");
    expect(codes).toContain("WB");
    expect(codes).toContain("TN");
    expect(codes).toContain("KA");

    for (const state of INDIAN_STATES) {
      expect(state.name.en).toBeTruthy();
      expect(state.name.hi).toBeTruthy();
      expect(state.name.bn).toBeTruthy();
      expect(state.name.ta).toBeTruthy();
    }
  });

  it("resolves state-specific PDS portals for Ration Card service", () => {
    const portals = getStatePortalsForService("ration-card-nfsa-status", "ALL");
    expect(portals.length).toBeGreaterThanOrEqual(5);

    const wbPortal = getStatePortalsForService("ration-card-nfsa-status", "WB");
    expect(wbPortal.length).toBe(1);
    expect(wbPortal[0]?.officialUrl).toContain("wbpds.wb.gov.in");

    const mhPortal = getStatePortalsForService("ration-card-nfsa-status", "MH");
    expect(mhPortal.length).toBe(1);
    expect(mhPortal[0]?.officialUrl).toContain("mahafood.gov.in");
  });

  it("resolves state-specific civil registration portals for Birth Certificates", () => {
    const dlPortal = getStatePortalsForService("birth-certificate-crs", "DL");
    expect(dlPortal.length).toBe(1);
    expect(dlPortal[0]?.officialUrl).toContain("mcdonline.nic.in");

    const upPortal = getStatePortalsForService("birth-certificate-crs", "UP");
    expect(upPortal.length).toBe(1);
    expect(upPortal[0]?.officialUrl).toContain("e-nagarsewaup.gov.in");
  });

  it("all state portal URLs point strictly to government domains", () => {
    const allServices = getAllServices();
    for (const service of allServices) {
      const statePortals = getStatePortalsForService(service.id, "ALL");
      for (const portal of statePortals) {
        expect(portal.officialUrl).toMatch(/^https?:\/\/[a-zA-Z0-9.-]+\.(gov|nic)\.in/);
      }
    }
  });

  it("retrieves localized state display names correctly", () => {
    expect(getStateDisplayName("WB", "en")).toBe("West Bengal");
    expect(getStateDisplayName("WB", "hi")).toBe("पश्चिम बंगाल");
    expect(getStateDisplayName("WB", "bn")).toBe("পশ্চিমবঙ্গ");
    expect(getStateDisplayName("WB", "ta")).toBe("மேற்கு வங்கம்");
  });
});

