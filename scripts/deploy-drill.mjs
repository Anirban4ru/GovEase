/**
 * Unified Life Services Platform - Multi-Target Production Deployment Drill
 * Validates static hosting artifacts, headers, clean URLs, 404 fallbacks,
 * W3C manifest, and offline service worker integration.
 *
 * Usage: node scripts/deploy-drill.mjs
 */

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "out");

console.log("================================================================");
console.log("Unified Life Services Platform - Multi-Target Deployment Drill");
console.log("================================================================\n");

let passed = true;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
  } else {
    console.error(`  ✗ ${message}`);
    passed = false;
  }
}

// 1. Audit Static Hosting Artifacts in out/
console.log("1. Auditing Static Hosting Files in out/...");
assert(fs.existsSync(outDir), "Static export directory (out/) exists");
assert(
  fs.existsSync(path.join(outDir, ".nojekyll")),
  ".nojekyll exists for GitHub Pages compatibility",
);
assert(
  fs.existsSync(path.join(outDir, "_headers")),
  "_headers exists for Cloudflare Pages / Caddy",
);
assert(
  fs.existsSync(path.join(outDir, "manifest.webmanifest")),
  "manifest.webmanifest exists in root",
);
assert(fs.existsSync(path.join(outDir, "sw.js")), "sw.js (Service Worker) exists in root");
assert(fs.existsSync(path.join(outDir, "404.html")), "404.html exists for static fallback routing");

// 2. Audit Clean Route Files
console.log("\n2. Auditing Static HTML Routes...");
const routesToCheck = [
  "index.html",
  "explore/index.html",
  "saved/index.html",
  "settings/index.html",
  "privacy/index.html",
  "help/index.html",
  "offline/index.html",
];
for (const r of routesToCheck) {
  assert(fs.existsSync(path.join(outDir, r)), `Route artifact out/${r} exists`);
}

// 3. Live Server Simulation & Header Audits
console.log("\n3. Testing Live Server Deployment & HTTP Response Headers...");
const TEST_PORT = 3288;
const serverProcess = spawn(
  "node",
  [path.join(rootDir, "scripts", "static-server.mjs"), String(TEST_PORT)],
  {
    cwd: rootDir,
    stdio: "pipe",
  },
);

await new Promise((resolve) => setTimeout(resolve, 1500));

function fetchUrl(targetPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:${TEST_PORT}${targetPath}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on("error", reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error("Timeout"));
    });
  });
}

try {
  // Test Root
  const rootRes = await fetchUrl("/");
  assert(rootRes.status === 200, "Root (/) returns HTTP 200");
  assert(
    rootRes.headers["content-type"]?.includes("text/html"),
    "Root returns text/html content type",
  );
  assert(
    rootRes.headers["x-content-type-options"] === "nosniff",
    "X-Content-Type-Options: nosniff present",
  );
  assert(rootRes.headers["x-frame-options"] === "DENY", "X-Frame-Options: DENY present");
  assert(
    rootRes.headers["referrer-policy"] === "strict-origin-when-cross-origin",
    "Referrer-Policy present",
  );
  assert(
    rootRes.headers["content-security-policy"]?.includes("frame-ancestors 'none'"),
    "CSP frame-ancestors 'none' present",
  );
  assert(
    !rootRes.body.includes("google-analytics.com") &&
      !rootRes.body.includes("googletagmanager.com"),
    "Zero third-party analytics detected in HTML",
  );

  // Test Web Manifest
  const manifestRes = await fetchUrl("/manifest.webmanifest");
  assert(manifestRes.status === 200, "manifest.webmanifest returns HTTP 200");
  assert(
    manifestRes.headers["content-type"]?.includes("json"),
    "manifest.webmanifest returns JSON MIME type",
  );

  // Test 404 Fallback
  const notFoundRes = await fetchUrl("/non-existent-service-drill/");
  assert(notFoundRes.status === 404, "Unknown route returns HTTP 404");
  assert(
    notFoundRes.body.includes("Page Not Found") || notFoundRes.body.includes("404"),
    "404 page body rendered correctly",
  );

  // Test Clean Subroute
  const exploreRes = await fetchUrl("/explore/");
  assert(exploreRes.status === 200, "Subroute /explore/ returns HTTP 200");
} catch (err) {
  assert(false, `Deployment drill HTTP request failed: ${err.message}`);
} finally {
  serverProcess.kill();
}

console.log("\n----------------------------------------------------------------");
if (passed) {
  console.log("✓ MULTI-TARGET DEPLOYMENT DRILL: PASSED (100% READY)");
  console.log("----------------------------------------------------------------\n");
  process.exit(0);
} else {
  console.error("✗ MULTI-TARGET DEPLOYMENT DRILL: FAILED");
  console.log("----------------------------------------------------------------\n");
  process.exit(1);
}
