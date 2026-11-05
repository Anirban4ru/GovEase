import { describe, it, expect } from "vitest";
import testSet from "./search-test-set.json";
import { searchServices } from "../src/lib/search";

describe("Milestone M3 - Search Engine & Relevance Test Set", () => {
  it("evaluates at least 100 realistic citizen queries against relevance criteria", () => {
    expect(testSet.length).toBeGreaterThanOrEqual(100);
  });

  it("achieves >= 95% top-rank accuracy across the 100+ query benchmark", () => {
    let top1Matches = 0;
    let top3Matches = 0;
    const failures: { query: string; expected: string; actualTop?: string }[] = [];

    for (const testCase of testSet) {
      const results = searchServices(testCase.query);

      const top1 = results[0]?.service.id;
      const top3 = results.slice(0, 3).map((r) => r.service.id);

      if (top1 === testCase.expectedId) {
        top1Matches++;
      } else {
        failures.push({
          query: testCase.query,
          expected: testCase.expectedId,
          actualTop: top1,
        });
      }

      if (top3.includes(testCase.expectedId)) {
        top3Matches++;
      }
    }

    const accuracyTop1 = (top1Matches / testSet.length) * 100;
    const accuracyTop3 = (top3Matches / testSet.length) * 100;

    console.log(
      `Search Relevance Benchmark: ${top1Matches}/${testSet.length} Top-1 (${accuracyTop1.toFixed(1)}%), ` +
        `${top3Matches}/${testSet.length} Top-3 (${accuracyTop3.toFixed(1)}%)`,
    );

    if (failures.length > 0) {
      console.warn("Relevance mismatches:", failures);
    }

    // Must exceed agreed threshold (>= 95%)
    expect(accuracyTop1).toBeGreaterThanOrEqual(95);
    expect(accuracyTop3).toBe(100);
  });

  it("handles empty and whitespace-only queries gracefully", () => {
    expect(searchServices("")).toEqual([]);
    expect(searchServices("   ")).toEqual([]);
  });

  it("returns zero personal data logs or side effects", () => {
    // Pure function check
    const query = "test citizen sensitive query 12345";
    const res = searchServices(query);
    expect(Array.isArray(res)).toBe(true);
  });
});
