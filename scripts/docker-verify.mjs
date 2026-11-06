/**
 * Unified Life Services Platform - Container & Static Hosting Verification Drill
 * Validates Dockerfile, .dockerignore, static build integrity, security headers,
 * and HTTP healthcheck response.
 *
 * Usage: node scripts/docker-verify.mjs
 */

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { spawn, execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("============================================================");
console.log("Unified Life Services Platform - Production Container Drill");
console.log("============================================================\n");

let passed = true;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
  } else {
    console.error(`  ✗ ${message}`);
    passed = false;
  }
}

// 1. Dockerfile & .dockerignore static audits
console.log("1. Auditing Dockerfile and Container Security Controls...");
const dockerfilePath = path.join(rootDir, "Dockerfile");
assert(fs.existsSync(dockerfilePath), "Dockerfile exists");

const dockerfileContent = fs.readFileSync(dockerfilePath, "utf8");
assert(
  dockerfileContent.includes("AS builder") && dockerfileContent.includes("AS runner"),
  "Dockerfile employs multi-stage build (builder + runner)",
);
assert(
  dockerfileContent.includes("USER node") || dockerfileContent.includes("USER 100"),
  "Dockerfile enforces non-root unprivileged execution (USER node)",
);
assert(dockerfileContent.includes("EXPOSE 3000"), "Dockerfile exposes port 3000");
assert(
  dockerfileContent.includes("HEALTHCHECK"),
  "Dockerfile configures native container HEALTHCHECK",
);

const dockerignorePath = path.join(rootDir, ".dockerignore");
assert(fs.existsSync(dockerignorePath), ".dockerignore exists");
const dockerignoreContent = fs.readFileSync(dockerignorePath, "utf8");
assert(dockerignoreContent.includes("node_modules"), ".dockerignore excludes node_modules");
assert(dockerignoreContent.includes(".git"), ".dockerignore excludes .git repository");
assert(dockerignoreContent.includes(".next"), ".dockerignore excludes .next cache");

// 2. Production Static Export Verification
console.log("\n2. Auditing Static Export Assets...");
const outDir = path.join(rootDir, "out");
assert(fs.existsSync(outDir), "Static export output directory (out/) exists");
assert(fs.existsSync(path.join(outDir, "index.html")), "Root index.html exists in out/");
assert(
  fs.existsSync(path.join(outDir, "explore", "index.html")),
  "explore/index.html exists in out/",
);
assert(
  fs.existsSync(path.join(outDir, "settings", "index.html")),
  "settings/index.html exists in out/",
);

// 3. Static Server & Security Headers Live Verification
console.log("\n3. Testing Container Static Server Entrypoint & Audited Security Headers...");

const TEST_PORT = 3199;
const serverProcess = spawn(
  "node",
  [path.join(rootDir, "scripts", "static-server.mjs"), String(TEST_PORT)],
  {
    cwd: rootDir,
    stdio: "pipe",
  },
);

await new Promise((resolve) => setTimeout(resolve, 1500));

try {
  await new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:${TEST_PORT}/`, (res) => {
      assert(
        res.statusCode === 200,
        `Static server responded with HTTP 200 (status: ${res.statusCode})`,
      );
      assert(
        res.headers["x-content-type-options"] === "nosniff",
        "X-Content-Type-Options: nosniff header enforced",
      );
      assert(res.headers["x-frame-options"] === "DENY", "X-Frame-Options: DENY header enforced");
      assert(
        res.headers["referrer-policy"] === "strict-origin-when-cross-origin",
        "Referrer-Policy header enforced",
      );
      assert(
        res.headers["content-security-policy"]?.includes("frame-ancestors 'none'"),
        "CSP frame-ancestors 'none' enforced",
      );
      resolve();
    });
    req.on("error", (err) => {
      assert(false, `Failed to connect to local static server: ${err.message}`);
      reject(err);
    });
    req.setTimeout(5000, () => {
      assert(false, "Connection to static server timed out");
      req.destroy();
      reject(new Error("Timeout"));
    });
  });
} catch {
  // handled in assertions
} finally {
  serverProcess.kill();
}

// 4. Docker CLI Detection
console.log("\n4. Checking Host Docker CLI Availability...");
try {
  const dockerVersion = execSync("docker --version", { encoding: "utf8", stdio: "pipe" }).trim();
  console.log(`  ✓ Host Docker CLI detected: ${dockerVersion}`);
} catch {
  console.log(
    "  ℹ Host Docker CLI not detected or daemon inactive (Container spec verified via filesystem & server drill)",
  );
}

console.log("\n------------------------------------------------------------");
if (passed) {
  console.log("✓ PRODUCTION CONTAINER & STATIC SERVER DRILL: PASSED");
  console.log("------------------------------------------------------------\n");
  process.exit(0);
} else {
  console.error("✗ PRODUCTION CONTAINER & STATIC SERVER DRILL: FAILED");
  console.log("------------------------------------------------------------\n");
  process.exit(1);
}
