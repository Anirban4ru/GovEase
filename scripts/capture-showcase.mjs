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
const targetDir =
  "C:\\Users\\anirb\\.gemini\\antigravity\\brain\\93883785-a23d-47e1-804d-347a6bc1c9f6\\screenshots";

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

  await browser.close();
  server.close(() => {
    console.log("Showcase capture complete.");
    process.exit(0);
  });
});
