/**
 * Unified Life Services Platform - Catalogue Validation Script
 * Validates catalogue schema, domain allow-list, and governance rules.
 *
 * Usage: node scripts/validate-catalogue.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

let hasErrors = false;

function error(msg) {
  console.error(`❌ [ERROR] ${msg}`);
  hasErrors = true;
}

function success(msg) {
  console.log(`✅ [OK] ${msg}`);
}

function loadJson(relPath) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    error(`File not found: ${relPath}`);
    return null;
  }
  try {
    const raw = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    error(`Failed to parse JSON in ${relPath}: ${err.message}`);
    return null;
  }
}

console.log("--- Catalogue Validation Starting ---");

// 1. Load and compile schemas
const serviceSchema = loadJson("catalogue/schema/service.schema.json");
const allowlistSchema = loadJson("catalogue/schema/domain-allowlist.schema.json");

if (!serviceSchema || !allowlistSchema) {
  console.error("Fatal: Could not load JSON schemas.");
  process.exit(1);
}

const validateService = ajv.compile(serviceSchema);
const validateAllowlist = ajv.compile(allowlistSchema);

// 2. Validate domain allowlist
const domainAllowlistData = loadJson("catalogue/domain-allowlist.json");
if (domainAllowlistData) {
  const valid = validateAllowlist(domainAllowlistData);
  if (!valid) {
    error(`domain-allowlist.json failed schema validation:`);
    validateAllowlist.errors.forEach((err) =>
      console.error(`  - ${err.instancePath} ${err.message}`),
    );
  } else {
    success(
      `domain-allowlist.json conforms to schema (${domainAllowlistData.domains.length} domains listed).`,
    );
  }
}

const allowedDomains = new Set(
  (domainAllowlistData?.domains || []).map((d) => d.domain.toLowerCase()),
);

function isDomainAllowed(urlString) {
  try {
    const parsed = new URL(urlString);
    const host = parsed.hostname.toLowerCase();
    for (const allowed of allowedDomains) {
      if (host === allowed || host.endsWith(`.${allowed}`)) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

// 3. Validate all service entries
const servicesDir = path.join(rootDir, "catalogue", "services");
if (!fs.existsSync(servicesDir)) {
  error(`Services directory does not exist: ${servicesDir}`);
} else {
  const serviceFiles = fs.readdirSync(servicesDir).filter((f) => f.endsWith(".json"));
  console.log(`Found ${serviceFiles.length} service entries to validate.`);

  for (const file of serviceFiles) {
    const relFile = path.join("catalogue", "services", file);
    const serviceData = loadJson(relFile);
    if (!serviceData) continue;

    // Schema validation
    const valid = validateService(serviceData);
    if (!valid) {
      error(`${file} schema violations:`);
      validateService.errors.forEach((err) =>
        console.error(`  - ${err.instancePath} ${err.message}`),
      );
    }

    // Domain allow-list check on official_url
    if (serviceData.official_url && !isDomainAllowed(serviceData.official_url)) {
      error(`${file}: official_url "${serviceData.official_url}" is not on domain allow-list!`);
    }

    // Governance rule: active services cannot be unreviewed agent drafts
    if (
      serviceData.status === "active" &&
      serviceData.verification?.verified_by === "agent-draft-pending-human-review"
    ) {
      error(
        `${file}: service cannot have status 'active' when verified_by is 'agent-draft-pending-human-review'. Human review required.`,
      );
    }

    // Informational eligibility enforcement
    if (
      serviceData.eligibility_summary &&
      serviceData.eligibility_summary.is_informational_only !== true
    ) {
      error(`${file}: eligibility_summary.is_informational_only must be true.`);
    }

    if (!valid) {
      // already reported
    } else {
      success(`${file} passed schema and governance checks [status: ${serviceData.status}].`);
    }
  }
}

console.log("--- Catalogue Validation Finished ---");
if (hasErrors) {
  console.error("\n❌ Validation FAILED. Please correct errors listed above.");
  process.exit(1);
} else {
  console.log("\n✅ All catalogue entries and schemas validated successfully.");
  process.exit(0);
}
