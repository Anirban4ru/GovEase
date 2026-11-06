import { describe, it, expect } from "vitest";
import { CIVIC_PRESETS, formatBytes } from "../src/lib/document-resizer";

describe("Document Prep Studio Engine", () => {
  it("defines standard passport photo specs adhering to Indian portal rules", () => {
    const passport = CIVIC_PRESETS.passport_photo;
    expect(passport).toBeDefined();
    expect(passport.minBytes).toBe(20 * 1024);
    expect(passport.maxBytes).toBe(50 * 1024);
    expect(passport.mimeType).toBe("image/jpeg");
    expect(passport.targetWidth).toBe(413);
    expect(passport.targetHeight).toBe(531);
    expect(passport.aspectRatio).toBeCloseTo(413 / 531, 3);
  });

  it("defines signature scan specs for UPSC/Parivahan/SSC", () => {
    const sig = CIVIC_PRESETS.signature;
    expect(sig).toBeDefined();
    expect(sig.minBytes).toBe(10 * 1024);
    expect(sig.maxBytes).toBe(20 * 1024);
    expect(sig.targetWidth).toBe(350);
    expect(sig.targetHeight).toBe(150);
  });

  it("defines ID document photocopy scan specs below 100 KB", () => {
    const idDoc = CIVIC_PRESETS.id_document;
    expect(idDoc).toBeDefined();
    expect(idDoc.maxBytes).toBe(100 * 1024);
    expect(idDoc.targetWidth).toBe(900);
    expect(idDoc.targetHeight).toBe(1200);
  });

  it("formats bytes accurately in KB", () => {
    expect(formatBytes(1024)).toBe("1.0 KB");
    expect(formatBytes(20 * 1024)).toBe("20.0 KB");
    expect(formatBytes(51200)).toBe("50.0 KB");
  });
});

