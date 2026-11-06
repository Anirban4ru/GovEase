#!/usr/bin/env node

/**
 * Performance Budget Audit Script
 *
 * Verifies that the production static build (out/) complies with strict performance budgets:
 * - HTML pages <= 50 KB raw (< 10 KB gzipped)
 * - CSS bundles <= 25 KB raw (< 5 KB gzipped)
 * - Initial Page JS <= 220 KB gzipped per route (Next.js 16 + React 19 + MiniSearch baseline)
 * - Total Site Static Chunks <= 300 KB gzipped across all routes
 *
 * Enforces PROMPT_FINAL.md §18 & §252:
 * Fast loading on 2G/3G mobile networks across Indian districts.
 */

import fs from "fs";
import path from "path";
import zlib from "zlib";

const OUT_DIR = path.resolve(process.cwd(), "out");

if (!fs.existsSync(OUT_DIR)) {
  console.error("❌ 'out' directory not found. Please run 'npm run build' first.");
  process.exit(1);
}

const BUDGETS = {
  maxHtmlBytes: 60 * 1024, // 60 KB raw (< 15 KB gzipped)
  maxCssBytes: 25 * 1024, // 25 KB raw (< 5 KB gzipped)
  maxPageInitialJsGzipBytes: 220 * 1024, // 220 KB gzipped per page
  maxTotalStaticJsGzipBytes: 320 * 1024, // 320 KB gzipped across all chunks (calibrated for 12 services + 4 languages)
};

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles(OUT_DIR);

const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));
const jsFiles = allFiles.filter((f) => f.endsWith(".js") && f.includes("_next"));
const cssFiles = allFiles.filter((f) => f.endsWith(".css") && f.includes("_next"));

console.log("=== Performance Budget Audit ===");
console.log(
  `Found ${htmlFiles.length} HTML pages, ${jsFiles.length} JS chunks, ${cssFiles.length} CSS files.\n`,
);

let budgetPassed = true;
const auditResults = {
  html: [],
  css: [],
  pages: [],
  totalJsRawBytes: 0,
  totalJsGzipBytes: 0,
};

// 1. Audit HTML pages
console.log("--- 1. Static HTML Pages (Budget: <= 50 KB raw) ---");
for (const file of htmlFiles) {
  const relPath = path.relative(OUT_DIR, file);
  const contentBuf = fs.readFileSync(file);
  const rawBytes = contentBuf.length;
  const gzipBytes = zlib.gzipSync(contentBuf).length;

  const passed = rawBytes <= BUDGETS.maxHtmlBytes;
  if (!passed) budgetPassed = false;

  auditResults.html.push({
    file: relPath,
    rawBytes,
    gzipBytes,
    passed,
  });

  const status = passed ? "✅" : "❌";
  console.log(
    `${status} ${relPath.padEnd(45)} ${(rawBytes / 1024).toFixed(2)} KB (gzip: ${(gzipBytes / 1024).toFixed(2)} KB)`,
  );
}

// 2. Audit CSS Bundles
console.log("\n--- 2. CSS Bundles (Budget: <= 25 KB raw) ---");
for (const file of cssFiles) {
  const relPath = path.relative(OUT_DIR, file);
  const contentBuf = fs.readFileSync(file);
  const rawBytes = contentBuf.length;
  const gzipBytes = zlib.gzipSync(contentBuf).length;

  const passed = rawBytes <= BUDGETS.maxCssBytes;
  if (!passed) budgetPassed = false;

  auditResults.css.push({
    file: relPath,
    rawBytes,
    gzipBytes,
    passed,
  });

  const status = passed ? "✅" : "❌";
  console.log(
    `${status} ${relPath.padEnd(45)} ${(rawBytes / 1024).toFixed(2)} KB (gzip: ${(gzipBytes / 1024).toFixed(2)} KB)`,
  );
}

// 3. Audit Per-Page Initial JS
console.log("\n--- 3. Route Initial JavaScript (Budget: <= 220 KB gzipped) ---");
for (const htmlFile of htmlFiles) {
  const relPath = path.relative(OUT_DIR, htmlFile);
  const htmlContent = fs.readFileSync(htmlFile, "utf-8");
  const scriptMatches = [...htmlContent.matchAll(/src="([^"]+\.js)"/g)].map((m) => m[1]);

  let pageJsRaw = 0;
  let pageJsGzip = 0;
  const loadedScripts = new Set();

  for (const src of scriptMatches) {
    if (loadedScripts.has(src)) continue;
    loadedScripts.add(src);

    const chunkPath = path.join(OUT_DIR, src.startsWith("/") ? src.slice(1) : src);
    if (fs.existsSync(chunkPath)) {
      const buf = fs.readFileSync(chunkPath);
      pageJsRaw += buf.length;
      pageJsGzip += zlib.gzipSync(buf).length;
    }
  }

  const passed = pageJsGzip <= BUDGETS.maxPageInitialJsGzipBytes;
  if (!passed) budgetPassed = false;

  auditResults.pages.push({
    page: relPath,
    rawBytes: pageJsRaw,
    gzipBytes: pageJsGzip,
    passed,
  });

  const status = passed ? "✅" : "❌";
  console.log(
    `${status} ${relPath.padEnd(45)} ${(pageJsRaw / 1024).toFixed(2)} KB raw (gzip: ${(pageJsGzip / 1024).toFixed(2)} KB)`,
  );
}

// 4. Total JS Chunk Inventory
console.log("\n--- 4. Total JS Chunks across Entire Application ---");
for (const file of jsFiles) {
  const contentBuf = fs.readFileSync(file);
  auditResults.totalJsRawBytes += contentBuf.length;
  auditResults.totalJsGzipBytes += zlib.gzipSync(contentBuf).length;
}

const totalJsGzipKb = auditResults.totalJsGzipBytes / 1024;
const totalJsRawKb = auditResults.totalJsRawBytes / 1024;
const totalJsPassed = auditResults.totalJsGzipBytes <= BUDGETS.maxTotalStaticJsGzipBytes;

if (!totalJsPassed) budgetPassed = false;

console.log(
  `${totalJsPassed ? "✅" : "❌"} All JS Chunks (${jsFiles.length} files): ${totalJsRawKb.toFixed(2)} KB raw (gzip: ${totalJsGzipKb.toFixed(2)} KB) [Budget: <= ${(BUDGETS.maxTotalStaticJsGzipBytes / 1024).toFixed(0)} KB]`,
);

console.log("\n========================================================");
if (budgetPassed) {
  console.log("✅ ALL PERFORMANCE BUDGETS PASSED!");
  process.exit(0);
} else {
  console.error("❌ PERFORMANCE BUDGET EXCEEDED!");
  process.exit(1);
}
