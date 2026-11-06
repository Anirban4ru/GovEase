import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import enTranslations from "../src/locales/en.json";
import hiTranslations from "../src/locales/hi.json";
import bnTranslations from "../src/locales/bn.json";
import taTranslations from "../src/locales/ta.json";

describe("App Shell - Internationalisation (i18n)", () => {
  it("has exact matching translation keys across English, Hindi, Bengali, and Tamil", () => {
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
    const bnKeys = getKeys(bnTranslations).sort();
    const taKeys = getKeys(taTranslations).sort();

    expect(enKeys).toEqual(hiKeys);
    expect(enKeys).toEqual(bnKeys);
    expect(enKeys).toEqual(taKeys);
  });

  it("contains critical disclaimer and data clearance strings in all four languages", () => {
    expect(enTranslations.common.disclaimerBadge).toContain("Independent Guide");
    expect(hiTranslations.common.disclaimerBadge).toContain("स्वतंत्र मार्गदर्शिका");
    expect(bnTranslations.common.disclaimerBadge).toContain("স্বাধীন সহায়িকা");
    expect(taTranslations.common.disclaimerBadge).toContain("சுயாதீன வழிகாட்டி");

    expect(enTranslations.common.clearData).toBeDefined();
    expect(hiTranslations.common.clearData).toBeDefined();
    expect(bnTranslations.common.clearData).toBeDefined();
    expect(taTranslations.common.clearData).toBeDefined();
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
  it("tokens.css defines primary brand color, minimum 44px touch target, and regional script font rules", () => {
    const rootDir = process.cwd();
    const tokensFile = path.join(rootDir, "src/styles/tokens.css");
    expect(fs.existsSync(tokensFile)).toBe(true);

    const content = fs.readFileSync(tokensFile, "utf8");
    expect(content).toContain("--color-brand-primary:");
    expect(content).toMatch(/--min-touch-target:\s*(44px|48px)/);
    expect(content).toContain('body[data-mode="simple"]');
    expect(content).toContain('body[data-mode="assisted"]');
    expect(content).toContain(":lang(hi)");
    expect(content).toContain(":lang(bn)");
    expect(content).toContain(":lang(ta)");
  });

  it("tokens.css and motion.css define palette tokens and micro-animation keyframes", () => {
    const rootDir = process.cwd();
    const tokensFile = path.join(rootDir, "src/styles/tokens.css");
    const motionFile = path.join(rootDir, "src/styles/motion.css");
    const tokenContent = fs.readFileSync(tokensFile, "utf8");
    const motionContent = fs.existsSync(motionFile) ? fs.readFileSync(motionFile, "utf8") : "";

    expect(tokenContent).toContain("--color-ochre:");
    expect(tokenContent).toContain("--color-teal:");
    expect(tokenContent).toContain(".civic-tricolor-bar");

    const allCss = tokenContent + "\n" + motionContent;
    expect(allCss).toContain("@keyframes soundWave");
    expect(allCss).toContain("@keyframes checkDraw");
    expect(allCss).toContain("@keyframes fieldReveal");
  });
});
