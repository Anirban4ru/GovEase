import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { getAllServices, getServiceById, getServicesByEcosystem } from "../src/lib/catalogue";

const rootDir = process.cwd();
const serviceSchemaPath = path.join(rootDir, "catalogue", "schema", "service.schema.json");
const allowlistPath = path.join(rootDir, "catalogue", "domain-allowlist.json");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const serviceSchema = JSON.parse(fs.readFileSync(serviceSchemaPath, "utf8"));
const validateService = ajv.compile(serviceSchema);
const allowlistData = JSON.parse(fs.readFileSync(allowlistPath, "utf8"));
const allowedDomains = new Set(
  allowlistData.domains.map((d: { domain: string }) => d.domain.toLowerCase()),
);

const isDomainAllowed = (urlStr: string): boolean => {
  try {
    const hostname = new URL(urlStr).hostname.toLowerCase();
    for (const allowed of allowedDomains) {
      if (hostname === allowed || hostname.endsWith(`.${allowed}`)) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
};

describe("Catalogue Engine & Seed Integrity", () => {
  it("loads 18 verified services across 6 life ecosystems", () => {
    const services = getAllServices();
    expect(services.length).toBe(18);

    const ecosystems = new Set(services.map((s) => s.ecosystem));
    expect(ecosystems.size).toBe(6);
    expect(ecosystems.has("healthcare")).toBe(true);
    expect(ecosystems.has("education")).toBe(true);
    expect(ecosystems.has("finance-and-welfare")).toBe(true);
    expect(ecosystems.has("government-and-citizen")).toBe(true);
    expect(ecosystems.has("mobility-and-transport")).toBe(true);
    expect(ecosystems.has("utilities-and-local")).toBe(true);
  });

  it("every service strictly conforms to service.schema.json", () => {
    const services = getAllServices();
    for (const service of services) {
      const valid = validateService(service);
      if (!valid) {
        console.error(
          `Validation failure in ${(service as { id?: string }).id}:`,
          validateService.errors,
        );
      }
      expect(valid).toBe(true);
    }
  });

  it("every service URL points to an allow-listed official domain", () => {
    const services = getAllServices();
    for (const service of services) {
      expect(isDomainAllowed(service.official_url)).toBe(true);
      expect(service.official_url.startsWith("https://")).toBe(true);

      if (service.fees.source_url) {
        expect(isDomainAllowed(service.fees.source_url)).toBe(true);
      }

      for (const src of service.sources) {
        expect(isDomainAllowed(src.url)).toBe(true);
      }
    }
  });

  it("correctly queries services by ID and ecosystem", () => {
    const dl = getServiceById("driving-licence-renewal");
    expect(dl).toBeDefined();
    expect(dl?.title.en).toBe("Driving Licence Renewal");

    const nonExistent = getServiceById("invalid-id-xyz");
    expect(nonExistent).toBeUndefined();

    const healthServices = getServicesByEcosystem("healthcare");
    expect(healthServices.length).toBe(1);
    expect(healthServices[0]?.id).toBe("create-abha-id");
  });

  it("enforces informational eligibility disclaimers on all services", () => {
    const services = getAllServices();
    for (const s of services) {
      expect(s.eligibility_summary.is_informational_only).toBe(true);
      expect(s.integration_classification).toBe(5);
      expect(s.feature_state).toBe("official-link-only");
    }
  });
});
