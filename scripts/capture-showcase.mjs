/**
 * Unified Life Services Platform - Showcase Screenshot Generator
 * Captures high-fidelity screenshots of all primary routes and states
 * for user inspection and deliverable verification.
 */

import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "out");
const targetDir = process.env.SCREENSHOT_DIR || path.join(rootDir, "docs", "screenshots");

fs.mkdirSync(targetDir, { recursive: true });

// Simple static server on port 3005
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let filePath = path.join(outDir, urlPath === "/" ? "index.html" : urlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath) && fs.existsSync(filePath + ".html")) {
    filePath = filePath + ".html";
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(outDir, "404.html");
  }

  const ext = path.extname(filePath);
  const mime = MIME_TYPES[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": mime });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(3005, async () => {
  console.log("Static server running on http://localhost:3005");

  const browser = await chromium.launch();

  // Desktop context
  const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  // 1. Home Page
  await desktopPage.goto("http://localhost:3005/");
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-01-home.png"),
    fullPage: false,
  });
  console.log("Captured showcase-01-home.png");

  // 2. Search Combobox with Live Suggestions
  const searchInput = desktopPage.locator('input[type="search"]').first();
  await searchInput.fill("driving");
  await desktopPage.waitForSelector('ul[role="listbox"]');
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-02-search-dropdown.png"),
    fullPage: false,
  });
  console.log("Captured showcase-02-search-dropdown.png");

  // 3. Explore Page
  await desktopPage.goto("http://localhost:3005/explore");
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-03-explore.png"),
    fullPage: false,
  });
  console.log("Captured showcase-03-explore.png");

  // 4. Service Detail Page (Header & Overview)
  await desktopPage.goto("http://localhost:3005/services/create-abha-id");
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-04-service-detail.png"),
    fullPage: false,
  });
  console.log("Captured showcase-04-service-detail.png");

  // 5. Saved Services with Pre-seeded bookmarks & Portability Action Bar
  await desktopPage.evaluate(() => {
    localStorage.setItem(
      "uls_saved_services",
      JSON.stringify(["create-abha-id", "driving-licence-renewal"]),
    );
  });
  await desktopPage.goto("http://localhost:3005/saved");
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-05-saved-portability.png"),
    fullPage: false,
  });
  console.log("Captured showcase-05-saved-portability.png");

  // 6. Settings Page with On-Device Data Inventory
  await desktopPage.goto("http://localhost:3005/settings");
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-06-settings-inventory.png"),
    fullPage: false,
  });
  console.log("Captured showcase-06-settings-inventory.png");

  // 7. Mobile View (390px iPhone viewport)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto("http://localhost:3005/explore");
  await mobilePage.screenshot({
    path: path.join(targetDir, "showcase-07-mobile-390px.png"),
    fullPage: false,
  });
  console.log("Captured showcase-07-mobile-390px.png");

  // 8. Service Detail: Interactive Explainer Guide & Checklist (Full View)
  await desktopPage.goto("http://localhost:3005/services/create-abha-id");
  const explainerHeading = desktopPage.locator("#explainer-guide-heading");
  await explainerHeading.scrollIntoViewIfNeeded();
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-08-explainer-guide.png"),
    fullPage: false,
  });
  console.log("Captured showcase-08-explainer-guide.png");

  // 9. Document Readiness Checklist with Items Checked & Active Progress
  const firstCheckbox = desktopPage.locator('input[type="checkbox"]').first();
  await firstCheckbox.check();
  const checklistHeading = desktopPage.locator("#readiness-checklist-heading");
  await checklistHeading.scrollIntoViewIfNeeded();
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-09-readiness-checklist.png"),
    fullPage: false,
  });
  console.log("Captured showcase-09-readiness-checklist.png");

  // 10. India-First Civic Identity (Header & Hero Motifs)
  await desktopPage.goto("http://localhost:3005/");
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-10-india-first-identity.png"),
    fullPage: false,
  });
  console.log("Captured showcase-10-india-first-identity.png");

  // 11. ReadAloudButton Audio Equalizer Wave Animation
  await desktopPage.goto("http://localhost:3005/services/create-abha-id");
  const readBtn = desktopPage.locator('button[aria-label="Read aloud"]').first();
  if ((await readBtn.count()) > 0) {
    await readBtn.click();
    await desktopPage.waitForTimeout(300);
    await desktopPage.screenshot({
      path: path.join(targetDir, "showcase-11-soundwave-equalizer.png"),
      fullPage: false,
    });
    console.log("Captured showcase-11-soundwave-equalizer.png");
  }

  // 12. Citizen Life-Stage Navigator (/guide - Recommendations View)
  await desktopPage.goto("http://localhost:3005/guide");
  const firstStageBtn = desktopPage.locator("section button.civic-card-interactive").first();
  await firstStageBtn.click();
  await desktopPage.waitForTimeout(200);
  const firstNeedBtn = desktopPage.locator("section button.civic-card-interactive").first();
  await firstNeedBtn.click();
  await desktopPage.waitForTimeout(200);
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-12-life-stage-navigator.png"),
    fullPage: false,
  });
  console.log("Captured showcase-12-life-stage-navigator.png");

  // 13. CSC Physical Visit Prep Pack Printable Checklist
  const cscToggleBtn = desktopPage.locator('button:has-text("Print CSC Prep Sheet")');
  if ((await cscToggleBtn.count()) > 0) {
    await cscToggleBtn.click();
    await desktopPage.waitForTimeout(200);
    await desktopPage.screenshot({
      path: path.join(targetDir, "showcase-13-csc-prep-pack.png"),
      fullPage: false,
    });
    console.log("Captured showcase-13-csc-prep-pack.png");
  }

  // 14. Step 1 of Guide for documentation
  await desktopPage.goto("http://localhost:3005/guide");
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-14-guide-step1.png"),
    fullPage: false,
  });

  // 15. Hindi Mode
  await desktopPage.goto("http://localhost:3005/");
  const hiBtn = desktopPage.locator('button:has-text("हिंदी")').first();
  if ((await hiBtn.count()) > 0) {
    await hiBtn.click();
    await desktopPage.waitForTimeout(200);
    await desktopPage.screenshot({
      path: path.join(targetDir, "showcase-15-hindi-mode.png"),
      fullPage: false,
    });
  }

  // 16. M11 Overhauled Calm Map Home View (Full Desktop)
  await desktopPage.goto("http://localhost:3005/");
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-16-calm-map-home.png"),
    fullPage: false,
  });
  console.log("Captured showcase-16-calm-map-home.png");

  // 17. M11 Side-by-Side Classic Comparison (?view=classic)
  await desktopPage.goto("http://localhost:3005/?view=classic");
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-17-classic-comparison.png"),
    fullPage: false,
  });
  console.log("Captured showcase-17-classic-comparison.png");

  // 18. M11 Goal-Phrased Discovery Grid ("What would you like to do?")
  await desktopPage.goto("http://localhost:3005/");
  const goalHeading = desktopPage.locator("#quick-goals-heading");
  await goalHeading.scrollIntoViewIfNeeded();
  await desktopPage.screenshot({
    path: path.join(targetDir, "showcase-18-goal-phrased-grid.png"),
    fullPage: false,
  });
  console.log("Captured showcase-18-goal-phrased-grid.png");

  // 19. M11 3D Radial Life System Close-up
  const radialSystemElem = desktopPage.locator('[aria-label="Interactive Life Areas Map"]');
  if ((await radialSystemElem.count()) > 0) {
    await radialSystemElem.scrollIntoViewIfNeeded();
    await radialSystemElem.screenshot({
      path: path.join(targetDir, "showcase-19-radial-3d-system.png"),
    });
    console.log("Captured showcase-19-radial-3d-system.png");
  }

  // 20. M11 Bengali Mode Calm Map View
  const bnBtn = desktopPage.locator('button:has-text("বাংলা")').first();
  if ((await bnBtn.count()) > 0) {
    await bnBtn.click();
    await desktopPage.waitForTimeout(200);
    await desktopPage.screenshot({
      path: path.join(targetDir, "showcase-20-bengali-calm-map.png"),
      fullPage: false,
    });
    console.log("Captured showcase-20-bengali-calm-map.png");
  }

  await browser.close();
  server.close(() => {
    console.log("Showcase capture complete.");
    process.exit(0);
  });
});
