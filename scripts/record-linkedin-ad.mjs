import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function recordAd() {
  const outputDir = path.resolve("./public/videos");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();

  // Helper to update stylish bottom caption banner
  const setCaption = async (title, subtitle) => {
    await page.evaluate(
      ({ title, subtitle }) => {
        let el = document.getElementById("linkedin-ad-caption");
        if (!el) {
          el = document.createElement("div");
          el.id = "linkedin-ad-caption";
          el.style.position = "fixed";
          el.style.bottom = "28px";
          el.style.left = "50%";
          el.style.transform = "translateX(-50%)";
          el.style.backgroundColor = "rgba(13, 53, 112, 0.95)";
          el.style.color = "#ffffff";
          el.style.padding = "10px 24px";
          el.style.borderRadius = "30px";
          el.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.35)";
          el.style.zIndex = "999999";
          el.style.fontFamily = "system-ui, -apple-system, sans-serif";
          el.style.textAlign = "center";
          el.style.border = "1.5px solid #fc7d1b";
          el.style.backdropFilter = "blur(12px)";
          el.style.transition = "all 0.3s ease";
          el.style.pointerEvents = "none";
          document.body.appendChild(el);
        }
        el.innerHTML = `
          <div style="font-size: 15px; font-weight: 800; letter-spacing: 0.02em; color: #ffffff; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span>${title}</span>
          </div>
          <div style="font-size: 12px; font-weight: 500; color: #fbd38d; margin-top: 2px;">
            ${subtitle}
          </div>
        `;
      },
      { title, subtitle },
    );
  };

  console.log("🎥 [1/6] Recording Scene 1: Sovereign Home & Calm Map Architecture...");
  await page.goto("http://localhost:3000/");
  await page.waitForLoadState("networkidle");
  await setCaption(
    "🇮🇳 GovEase · India-First Civic Navigation Architecture",
    "Independent Public Guide · Zero Commercial Ads · 100% Verified .gov.in Portals",
  );
  await page.waitForTimeout(2500);

  // Smooth scroll down to explore sections
  await page.evaluate(() => window.scrollBy({ top: 380, behavior: "smooth" }));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: "smooth" }));
  await page.waitForTimeout(2500);

  // Scroll back to top
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await page.waitForTimeout(1500);

  console.log("🔍 [2/6] Recording Scene 2: 100% In-Memory Multi-Script Search...");
  await setCaption(
    "⚡ Instant Multi-Script Search Engine",
    "100% In-Memory MiniSearch · Typo-Tolerant · Zero Server Latency",
  );
  const searchInput = page.locator('input[type="search"]').first();
  await searchInput.click();
  await searchInput.pressSequentially("driving licence", { delay: 90 });
  await page.waitForTimeout(2000);

  // Navigate to service
  await searchInput.fill("");
  await searchInput.pressSequentially("ration card", { delay: 90 });
  await page.waitForTimeout(2000);

  console.log("📋 [3/6] Recording Scene 3: 5-Phase Sequential Guide & Document Checklist...");
  await page.goto("http://localhost:3000/services/driving-licence-renewal");
  await page.waitForLoadState("networkidle");
  await setCaption(
    "📋 5-Phase Sequential Walkthrough & Document Readiness Checklist",
    "Jargon-Free Plain Language · Live Preparation Score · Zero Data Harvesting",
  );
  await page.waitForTimeout(2500);

  // Switch step tabs
  await page.evaluate(() => window.scrollBy({ top: 450, behavior: "smooth" }));
  await page.waitForTimeout(1500);

  const stepTabs = page.locator('button[role="tab"]');
  if ((await stepTabs.count()) >= 3) {
    await stepTabs.nth(1).click();
    await page.waitForTimeout(1500);
    await stepTabs.nth(2).click();
    await page.waitForTimeout(1500);
  }

  // Interact with document checklist
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: "smooth" }));
  await page.waitForTimeout(1000);

  const checkboxes = page.locator('input[type="checkbox"]');
  const count = await checkboxes.count();
  for (let i = 0; i < Math.min(count, 3); i++) {
    await checkboxes.nth(i).click();
    await page.waitForTimeout(800);
  }
  await page.waitForTimeout(1500);

  console.log("✂️ [4/6] Recording Scene 4: In-Browser Document Prep Studio...");
  await page.goto("http://localhost:3000/prep-studio");
  await page.waitForLoadState("networkidle");
  await setCaption(
    "✂️ In-Browser Civic Document Prep Studio",
    "Local HTML5 Canvas · Precise KB Byte Budgets · Zero Bytes Leave Device",
  );
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollBy({ top: 350, behavior: "smooth" }));
  await page.waitForTimeout(2000);

  console.log("🛡️ [5/6] Recording Scene 5: Anti-Scam SMS Verifier & Regional Parity...");
  await page.goto("http://localhost:3000/help");
  await page.waitForLoadState("networkidle");
  await setCaption(
    "🛡️ TRAI Anti-Scam SMS Verifier & Helplines",
    "Identify Genuine Official Sender Headers · Expose Cyber Fraud Immediately",
  );
  await page.waitForTimeout(2500);

  await page.evaluate(() => window.scrollBy({ top: 350, behavior: "smooth" }));
  await page.waitForTimeout(2000);

  // Switch to Hindi
  const hiButton = page.locator('header button:has-text("हिंदी")').first();
  if (await hiButton.isVisible()) {
    await setCaption(
      "🌏 Inclusive Multilingual Parity (EN · हिंदी · বাংলা · தமிழ்)",
      "Zero Linguistic Barriers · Complete Dictionary Parity Across 4 Official Languages",
    );
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await page.waitForTimeout(1000);
    await hiButton.click();
    await page.waitForTimeout(2500);
  }

  console.log("🚀 [6/6] Recording Scene 6: Outro & Production Architecture...");
  await page.goto("http://localhost:3000/");
  await page.waitForLoadState("networkidle");
  await setCaption(
    "🚀 GovEase · Engineered for 1.4 Billion Citizens",
    "Next.js 16 · Turbopack · WCAG 2.2 AA · 100% Free & Open-Access Architecture",
  );
  await page.waitForTimeout(3000);

  // Close page to flush video
  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    const finalPath = path.resolve("./public/videos/govease-linkedin-showcase.webm");
    fs.copyFileSync(videoPath, finalPath);
    console.log(`\n🎉 Showcase Video successfully recorded and saved to: ${finalPath}`);
    return finalPath;
  }
}

recordAd()
  .then((p) => {
    console.log("Done:", p);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Recording error:", err);
    process.exit(1);
  });
