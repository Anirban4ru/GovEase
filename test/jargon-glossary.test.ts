import { describe, it, expect } from "vitest";
import { JARGON_GLOSSARY, getJargon, getAllJargon } from "../src/lib/jargon-glossary";

describe("Bureaucratic Jargon Glossary", () => {
  it("should contain all required core public service jargon terms", () => {
    const requiredKeys = ["ekyc", "otr", "dbt", "abha_address", "sarathi_selection", "pvc_card"];
    for (const key of requiredKeys) {
      expect(JARGON_GLOSSARY[key]).toBeDefined();
      expect(JARGON_GLOSSARY[key].term).toBeTruthy();
    }
  });

  it("should have complete bilingual titles, plain explanations, and why-it-matters statements", () => {
    const terms = getAllJargon();
    expect(terms.length).toBeGreaterThanOrEqual(6);

    for (const item of terms) {
      expect(item.title.en.trim().length).toBeGreaterThan(0);
      expect(item.title.hi.trim().length).toBeGreaterThan(0);

      expect(item.plainExplanation.en.trim().length).toBeGreaterThan(20);
      expect(item.plainExplanation.hi.trim().length).toBeGreaterThan(20);

      expect(item.whyItMatters.en.trim().length).toBeGreaterThan(15);
      expect(item.whyItMatters.hi.trim().length).toBeGreaterThan(15);
    }
  });

  it("should look up terms case-insensitively", () => {
    expect(getJargon("EKYC")).toEqual(JARGON_GLOSSARY["ekyc"]);
    expect(getJargon("eKYC")).toEqual(JARGON_GLOSSARY["ekyc"]);
    expect(getJargon("dbt")).toEqual(JARGON_GLOSSARY["dbt"]);
    expect(getJargon("unknown_term")).toBeUndefined();
  });
});
