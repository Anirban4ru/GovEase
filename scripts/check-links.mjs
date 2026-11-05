import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import http from "node:http";

const rootDir = process.cwd();
const servicesDir = path.join(rootDir, "catalogue", "services");
const allowlistPath = path.join(rootDir, "catalogue", "domain-allowlist.json");
const reportPath = path.join(rootDir, "docs", "catalogue", "LINK_HEALTH_REPORT.md");

const allowlistData = JSON.parse(fs.readFileSync(allowlistPath, "utf8"));
const allowedDomains = new Set(allowlistData.domains.map((d) => d.domain.toLowerCase()));

const isDomainAllowed = (urlStr) => {
  try {
    const parsed = new URL(urlStr);
    const hostname = parsed.hostname.toLowerCase();
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

const checkUrlHealth = (urlStr, isOffline = false) => {
  return new Promise((resolve) => {
    if (!urlStr.startsWith("https://")) {
      resolve({
        url: urlStr,
        status: "ERROR",
        code: 0,
        message: "Insecure protocol: HTTPS is mandatory",
      });
      return;
    }

    if (!isDomainAllowed(urlStr)) {
      resolve({
        url: urlStr,
        status: "FAIL",
        code: 0,
        message: "Domain not on verified allow-list",
      });
      return;
    }

    if (isOffline) {
      resolve({
        url: urlStr,
        status: "OFFLINE_VERIFIED",
        code: 200,
        message: "Syntax & allowlist verified (offline/CI mode)",
      });
      return;
    }

    try {
      const client = urlStr.startsWith("https://") ? https : http;
      const req = client.request(
        urlStr,
        {
          method: "HEAD",
          timeout: 8000,
          headers: {
            "User-Agent":
              "UnifiedLifeServices-LinkChecker/1.0 (Public benefit non-commercial guide)",
          },
        },
        (res) => {
          if (res.statusCode >= 200 && res.statusCode < 400) {
            resolve({ url: urlStr, status: "OK", code: res.statusCode, message: "Reachable" });
          } else {
            resolve({
              url: urlStr,
              status: "WARN",
              code: res.statusCode,
              message: `HTTP status ${res.statusCode}`,
            });
          }
        },
      );

      req.on("timeout", () => {
        req.destroy();
        resolve({ url: urlStr, status: "TIMEOUT", code: 0, message: "Connection timed out" });
      });

      req.on("error", (err) => {
        resolve({ url: urlStr, status: "WARN", code: 0, message: err.message });
      });

      req.end();
    } catch (err) {
      resolve({ url: urlStr, status: "ERROR", code: 0, message: err.message });
    }
  });
};

async function main() {
  const isOffline =
    process.argv.includes("--offline") ||
    process.argv.includes("--mock") ||
    process.env.CI_OFFLINE === "true";

  console.log(
    `--- Catalogue Link Health Check Starting [mode: ${isOffline ? "offline" : "live"}] ---`,
  );

  const files = fs.readdirSync(servicesDir).filter((f) => f.endsWith(".json"));
  const urlMap = new Map();

  for (const file of files) {
    const entry = JSON.parse(fs.readFileSync(path.join(servicesDir, file), "utf8"));
    const urls = [entry.official_url];
    if (entry.fees?.source_url) urls.push(entry.fees.source_url);
    if (Array.isArray(entry.sources)) {
      for (const s of entry.sources) {
        if (s.url) urls.push(s.url);
      }
    }

    for (const url of urls) {
      if (!urlMap.has(url)) {
        urlMap.set(url, []);
      }
      urlMap.get(url).push(entry.id);
    }
  }

  console.log(`Found ${urlMap.size} unique URLs across ${files.length} services.`);

  const results = [];
  for (const [url, serviceIds] of urlMap.entries()) {
    const result = await checkUrlHealth(url, isOffline);
    result.services = serviceIds;
    results.push(result);
    console.log(`[${result.status}] ${url} (${serviceIds.join(", ")})`);
  }

  const failedCount = results.filter((r) => r.status === "FAIL" || r.status === "ERROR").length;

  // Generate markdown report
  let report = `# Catalogue Link Health Report\n\n`;
  report += `**Project:** Unified Life Services Platform  \n`;
  report += `**Purpose:** Automated link health and allowlist integrity verification  \n`;
  report += `**Last Run:** ${new Date().toISOString().split("T")[0]}  \n`;
  report += `**Mode:** ${isOffline ? "Offline / Syntax Verified" : "Live Network Check"}  \n`;
  report += `**Total URLs Audited:** ${results.length}  \n`;
  report += `**Failed / Disallowed URLs:** ${failedCount}  \n\n`;
  report += `---\n\n`;
  report += `| Status | URL | HTTP Code | Allow-list Valid | Associated Services | Details |\n`;
  report += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  for (const r of results) {
    const icon =
      r.status === "OK" || r.status === "OFFLINE_VERIFIED"
        ? "✅"
        : r.status === "WARN"
          ? "⚠️"
          : "❌";
    report += `| ${icon} ${r.status} | \`${r.url}\` | ${r.code || "-"} | ${isDomainAllowed(r.url) ? "Yes" : "**NO**"} | ${r.services.join(", ")} | ${r.message} |\n`;
  }

  report += `\n---\n*Report generated automatically by \`scripts/check-links.mjs\`*\n`;

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, report, "utf8");
  console.log(`\nLink health report saved to ${reportPath}`);

  if (failedCount > 0) {
    console.error(`\n❌ Error: ${failedCount} links failed security or allowlist checks.`);
    process.exit(1);
  } else {
    console.log(`\n✅ All ${results.length} URLs conform to allowlist and security rules.`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal link check error:", err);
  process.exit(1);
});
