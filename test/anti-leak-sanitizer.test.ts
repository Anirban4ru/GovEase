import { describe, it, expect } from "vitest";
import { scanForSensitiveData, sanitizeFeedbackText } from "../src/lib/anti-leak-sanitizer";

describe("Milestone M4 - Sensitive Data Anti-Leak Sanitizer", () => {
  it("allows standard, non-sensitive issue descriptions", () => {
    const text =
      "The link for Driving Licence Renewal points to state selection, which works well.";
    const result = scanForSensitiveData(text);
    expect(result.hasLeak).toBe(false);
    expect(result.detectedTypes).toEqual([]);
    expect(result.warningMessage).toBeUndefined();
  });

  it("detects 12-digit Aadhaar numbers with spaces", () => {
    const text = "My aadhaar is 3456 7890 1234 please check status";
    const result = scanForSensitiveData(text);
    expect(result.hasLeak).toBe(true);
    expect(result.detectedTypes).toContain("Aadhaar Number");
    expect(result.warningMessage).toContain("Aadhaar Number");
  });

  it("detects 12-digit Aadhaar numbers without spaces", () => {
    const text = "Reference number 987654321098 entered on portal";
    const result = scanForSensitiveData(text);
    expect(result.hasLeak).toBe(true);
    expect(result.detectedTypes).toContain("Aadhaar Number");
  });

  it("detects 10-digit Indian phone numbers", () => {
    const text = "Please call me back on 9876543210 regarding the scholarship";
    const result = scanForSensitiveData(text);
    expect(result.hasLeak).toBe(true);
    expect(result.detectedTypes).toContain("Phone Number");
  });

  it("detects email addresses", () => {
    const text = "Send response to citizen.test@example.com immediately";
    const result = scanForSensitiveData(text);
    expect(result.hasLeak).toBe(true);
    expect(result.detectedTypes).toContain("Email Address");
  });

  it("detects multiple simultaneous identifiers", () => {
    const text = "Contact 9823456789 or email test@gmail.com with aadhaar 4567 8901 2345";
    const result = scanForSensitiveData(text);
    expect(result.hasLeak).toBe(true);
    expect(result.detectedTypes).toContain("Phone Number");
    expect(result.detectedTypes).toContain("Email Address");
    expect(result.detectedTypes).toContain("Aadhaar Number");
  });

  it("enforces text truncation to maxLength", () => {
    const longText = "A".repeat(600);
    const sanitized = sanitizeFeedbackText(longText, 500);
    expect(sanitized.length).toBe(500);
  });
});
