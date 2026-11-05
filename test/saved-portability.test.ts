import { describe, it, expect } from "vitest";
import { createBackupPayload, parseAndValidateBackup } from "../src/lib/saved-backup";

describe("Milestone M4 - Saved Services Data Portability", () => {
  const validServiceId = "create-abha-id";
  const anotherValidServiceId = "driving-licence-renewal";

  it("creates a well-formed backup payload with valid service IDs", () => {
    const payload = createBackupPayload([validServiceId, anotherValidServiceId, "non-existent-id"]);
    expect(payload.format).toBe("unified-life-services-backup-v1");
    expect(payload.savedServiceIds).toEqual([validServiceId, anotherValidServiceId]);
    expect(typeof payload.exportedAt).toBe("string");
  });

  it("successfully parses and validates a genuine backup JSON string", () => {
    const payload = createBackupPayload([validServiceId, anotherValidServiceId]);
    const jsonString = JSON.stringify(payload);

    const result = parseAndValidateBackup(jsonString);
    expect(result.success).toBe(true);
    expect(result.count).toBe(2);
    expect(result.ids).toEqual([validServiceId, anotherValidServiceId]);
    expect(result.error).toBeUndefined();
  });

  it("rejects malformed non-JSON input gracefully", () => {
    const result = parseAndValidateBackup("not-valid-json { broken");
    expect(result.success).toBe(false);
    expect(result.error).toBe("MALFORMED_JSON");
    expect(result.ids).toBeUndefined();
  });

  it("rejects JSON missing the required schema format key", () => {
    const badSchema = JSON.stringify({ savedServiceIds: [validServiceId] });
    const result = parseAndValidateBackup(badSchema);
    expect(result.success).toBe(false);
    expect(result.error).toBe("INVALID_SCHEMA");
  });

  it("filters out unknown, corrupt, or injected IDs from external sources", () => {
    const mixedPayload = {
      format: "unified-life-services-backup-v1",
      exportedAt: new Date().toISOString(),
      savedServiceIds: [
        validServiceId,
        "malicious-xss-<script>",
        "random-unregistered-service",
        anotherValidServiceId,
        12345, // invalid non-string type
      ],
    };

    const result = parseAndValidateBackup(JSON.stringify(mixedPayload));
    expect(result.success).toBe(true);
    expect(result.count).toBe(2);
    expect(result.ids).toEqual([validServiceId, anotherValidServiceId]);
  });

  it("deduplicates identical IDs gracefully", () => {
    const duplicatePayload = {
      format: "unified-life-services-backup-v1",
      exportedAt: new Date().toISOString(),
      savedServiceIds: [validServiceId, validServiceId, validServiceId],
    };

    const result = parseAndValidateBackup(JSON.stringify(duplicatePayload));
    expect(result.success).toBe(true);
    expect(result.count).toBe(1);
    expect(result.ids).toEqual([validServiceId]);
  });
});
