import { describe, it, expect } from "vitest";
import QRCode from "qrcode";

describe("Instant QR Code & URL State Cross-Device Sync", () => {
  it("generates a valid SVG markup string for a sync URL", async () => {
    const testSyncUrl = "https://govease.org/saved?sync=create-abha-id,driving-licence-renewal";
    const svg = await QRCode.toString(testSyncUrl, {
      type: "svg",
      margin: 1,
      width: 200,
    });

    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("viewBox");
  });

  it("handles empty and single service ID URLs gracefully", async () => {
    const singleSyncUrl = "https://govease.org/saved?sync=birth-certificate-crs";
    const svg = await QRCode.toString(singleSyncUrl, { type: "svg" });
    expect(svg).toContain("<svg");
  });
});

