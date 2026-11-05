import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

describe("Service Catalogue Schema & Verification", () => {
  const rootDir = process.cwd();
  const serviceSchemaPath = path.join(rootDir, "catalogue/schema/service.schema.json");
  const serviceSchema = JSON.parse(fs.readFileSync(serviceSchemaPath, "utf8"));
  const validateService = ajv.compile(serviceSchema);

  it("validates driving-licence-renewal.json against service schema", () => {
    const filePath = path.join(rootDir, "catalogue/services/driving-licence-renewal.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const isValid = validateService(data);
    if (!isValid) {
      console.error(validateService.errors);
    }
    expect(isValid).toBe(true);
  });

  it("requires eligibility_summary to be informational only", () => {
    const filePath = path.join(rootDir, "catalogue/services/driving-licence-renewal.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    expect(data.eligibility_summary.is_informational_only).toBe(true);
  });

  it("enforces HTTPS for official URL", () => {
    const filePath = path.join(rootDir, "catalogue/services/driving-licence-renewal.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    expect(data.official_url.startsWith("https://")).toBe(true);
  });
});
