import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

function parseHex(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ];
}

function srgbToLinear(c: number): number {
  const norm = c / 255;
  return norm <= 0.03928 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const bright = Math.max(lum1, lum2);
  const dark = Math.min(lum1, lum2);
  return (bright + 0.05) / (dark + 0.05);
}

describe("UI Overhaul Design Tokens & Contrast Verification", () => {
  const tokensPath = path.resolve(__dirname, "../src/styles/tokens.css");
  const cssContent = fs.readFileSync(tokensPath, "utf-8");

  it("defines all required Calm Map tokens per UI_OVERHAUL_PROMPT.md §1.4", () => {
    expect(cssContent).toContain("--color-ink: #0f1b2d;");
    expect(cssContent).toContain("--color-ground: #fbf8f3;");
    expect(cssContent).toContain("--color-ground-elevated: #ffffff;");
    expect(cssContent).toContain("--color-ochre: #a55705;");
    expect(cssContent).toContain("--color-ochre-ui: #c8731a;");
    expect(cssContent).toContain("--color-teal: #0e7c7b;");
    expect(cssContent).toContain("--color-clay: #9a3412;");
    expect(cssContent).toContain("--color-ink-blue: #1d4ed8;");
  });

  it("Ink on Ground achieves WCAG 2.2 AAA contrast (>= 7:1)", () => {
    const ratio = getContrastRatio("#0F1B2D", "#FBF8F3");
    expect(ratio).toBeGreaterThanOrEqual(14.0); // 14.8:1
  });

  it("Ochre on Ground achieves WCAG 2.2 AA contrast (>= 4.5:1)", () => {
    const ratio = getContrastRatio("#A55705", "#FBF8F3");
    expect(ratio).toBeGreaterThanOrEqual(4.5); // 5.0:1
  });

  it("Ochre UI on Ink achieves WCAG 2.2 AA contrast (>= 4.5:1)", () => {
    const ratio = getContrastRatio("#C8731A", "#0F1B2D");
    expect(ratio).toBeGreaterThanOrEqual(4.5); // 4.88:1
  });

  it("Teal on Ground achieves WCAG 2.2 AA contrast (>= 4.5:1)", () => {
    const ratio = getContrastRatio("#0E7C7B", "#FBF8F3");
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("Clay on Ground achieves WCAG 2.2 AA contrast (>= 4.5:1)", () => {
    const ratio = getContrastRatio("#9A3412", "#FBF8F3");
    expect(ratio).toBeGreaterThanOrEqual(5.0);
  });

  it("Ink-Blue on Ground achieves WCAG 2.2 AA contrast (>= 4.5:1)", () => {
    const ratio = getContrastRatio("#1D4ED8", "#FBF8F3");
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});
