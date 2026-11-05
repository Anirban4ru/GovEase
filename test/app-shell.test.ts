import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import enTranslations from "../src/locales/en.json";
import hiTranslations from "../src/locales/hi.json";

describe("App Shell - Internationalisation (i18n)", () => {
  it("has matching translation keys in English and Hindi", () => {
    const getKeys = (obj: Record<string, unknown>, prefix = ""): string[] => {
      let keys: string[] = [];
      for (const [k, v] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${k}` : k;
        if (typeof v === "object" && v !== null && !Array.isArray(v)) {
          keys = keys.concat(getKeys(v as Record<string, unknown>, fullKey));
        } else {
          keys.push(fullKey);
        }
      }
      return keys;
    };

    const enKeys = getKeys(enTranslations).sort();
    const hiKeys = getKeys(hiTranslations).sort();

    expect(enKeys).toEqual(hiKeys);
  });

  it("contains critical disclaimer strings in both languages", () => {
    expect(enTranslations.common.disclaimerBadge).toContain("Independent Guide");
    expect(hiTranslations.common.disclaimerBadge).toContain("स्वतंत्र मार्गदर्शिका");
    expect(enTranslations.common.clearData).toBeDefined();
    expect(hiTranslations.common.clearData).toBeDefined();
  });
});

describe("App Shell - Security Headers & Static Config", () => {
  it("public/_headers defines strict CSP, no sniffing, and framing denial", () => {
    const rootDir = process.cwd();
    const headersFile = path.join(rootDir, "public/_headers");
    expect(fs.existsSync(headersFile)).toBe(true);

    const content = fs.readFileSync(headersFile, "utf8");
    expect(content).toContain("X-Content-Type-Options: nosniff");
    expect(content).toContain("X-Frame-Options: DENY");
    expect(content).toContain("frame-ancestors 'none'");
    expect(content).toContain("Referrer-Policy: strict-origin-when-cross-origin");
  });
});

describe("App Shell - Design Tokens", () => {
  it("tokens.css defines Civic Slate primary color and 44px min-touch-target", () => {
    const rootDir = process.cwd();
    const tokensFile = path.join(rootDir, "src/styles/tokens.css");
    expect(fs.existsSync(tokensFile)).toBe(true);

    const content = fs.readFileSync(tokensFile, "utf8");
    expect(content).toContain("--color-brand-primary: #1d4e8f");
    expect(content).toContain("--min-touch-target: 44px");
    expect(content).toContain('body[data-mode="simple"]');
    expect(content).toContain('body[data-mode="assisted"]');
    expect(content).toContain(":lang(hi)");
  });
});
