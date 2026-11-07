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

  console.log("🎥 [1/6] Scene 1: Sovereign Civic Architecture & Trust Standards...");
  await page.goto("http://localhost:3000/");
  await page.waitForLoadState("networkidle");
  await setCaption(
    "🇮🇳 GovEase · India-First Civic Navigation Architecture",
    "Independent Public Guide · Zero Commercial Ads · Strict DPDP Act 2023 Compliance",
  );
  await page.waitForTimeout(2500);

  // Smooth scroll down to highlight the new spotlight
  await page.evaluate(() => window.scrollBy({ top: 480, behavior: "smooth" }));
  await page.waitForTimeout(2000);

  console.log("🎯 [2/6] Scene 2: NEW Personalized Eligibility & Citizen Matching Engine...");
  await setCaption(
    "🎯 Personalized Eligibility Engine & 1-Click Citizen Profiles",
    "Instant Zero-Knowledge Matching (Age, Income, BPL, Gender, State) · $0 Server Cost",
  );

  // Click 1-Click Demo Profile: Student / Scholarships
  const studentDemoBtn = page.locator('button:has-text("Student / Scholarships")').first();
  if (await studentDemoBtn.isVisible()) {
    await studentDemoBtn.click();
    await page.waitForTimeout(2500);

    // Show modal results
    await setCaption(
      "🎓 100% Client-Side Matching with Qualification Rationales",
      "Instant Scheme Discovery: NSP Scholarships, AICTE Pragati · Zero PII leaves browser thread",
    );
    await page.waitForTimeout(2500);

    // Switch demo profile inside modal: Agriculture & Livelihood
    const farmerDemoBtn = page
      .locator('div[role="dialog"] button:has-text("Agriculture & Livelihood")')
      .first();
    if (await farmerDemoBtn.isVisible()) {
      await farmerDemoBtn.click();
      await setCaption(
        "🌾 Instant Multi-Sector Profiles: Agriculture & Livelihood",
        "PM-Kisan Samman Nidhi & Farmer Grants matched automatically in milliseconds",
      );
      await page.waitForTimeout(2500);
    }

    // Switch to Women & Startups
    const womenDemoBtn = page
      .locator('div[role="dialog"] button:has-text("Women & Startups")')
      .first();
    if (await womenDemoBtn.isVisible()) {
      await womenDemoBtn.click();
      await setCaption(
        "👩 Women & Startups Affirmative Action Alignment",
        "Stand-Up India & MSME Collateral-Free Initiatives matched instantly",
      );
      await page.waitForTimeout(2500);
    }

    // Close modal
    const closeBtn = page.locator('div[role="dialog"] button[aria-label="Close dialog"]').first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(1000);
    }
  }

  // Scroll back to search
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await page.waitForTimeout(1500);

  console.log("🔍 [3/6] Scene 3: 100% In-Memory Multi-Script Search Engine...");
  await setCaption(
    "⚡ In-Memory Multi-Script Search Engine",
    "Instant Typo-Tolerant MiniSearch · Zero Server Latency across 18 Verified Services",
  );
  const searchInput = page.locator('input[type="search"]').first();
  await searchInput.click();
  await searchInput.pressSequentially("driving licence", { delay: 80 });
  await page.waitForTimeout(2000);

  console.log("📋 [4/6] Scene 4: 5-Phase Sequential Guide & Document Checklist...");
  await page.goto("http://localhost:3000/services/driving-licence-renewal");
  await page.waitForLoadState("networkidle");
  await setCaption(
    "📋 5-Phase Sequential Civic Guide & Document Readiness Checklist",
    "Plain-Language Guidance · CSC Pricing Transparency · Official Hand-Off Verification",
  );
  await page.waitForTimeout(2000);

  // Switch step tabs
  await page.evaluate(() => window.scrollBy({ top: 460, behavior: "smooth" }));
  await page.waitForTimeout(1200);

  const stepTabs = page.locator('button[role="tab"]');
  if ((await stepTabs.count()) >= 3) {
    await stepTabs.nth(1).click();
    await page.waitForTimeout(1200);
    await stepTabs.nth(2).click();
    await page.waitForTimeout(1200);
  }

  // Check off documents
  await page.evaluate(() => window.scrollBy({ top: 380, behavior: "smooth" }));
  await page.waitForTimeout(800);
  const checkboxes = page.locator('input[type="checkbox"]');
  const count = await checkboxes.count();
  for (let i = 0; i < Math.min(count, 3); i++) {
    await checkboxes.nth(i).click();
    await page.waitForTimeout(600);
  }
  await page.waitForTimeout(1500);

  console.log("✂️ [5/6] Scene 5: In-Browser Document Prep Studio & Canvas Processing...");
  await page.goto("http://localhost:3000/prep-studio");
  await page.waitForLoadState("networkidle");
  await setCaption(
    "✂️ In-Browser Document Prep Studio (Zero Cloud Storage)",
    "HTML5 Canvas Image Resizer & File Compression · Strictly Adheres to Official KB Limits",
  );
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollBy({ top: 350, behavior: "smooth" }));
  await page.waitForTimeout(1800);

  console.log("🌏 [6/6] Scene 6: Regional Multilingual Parity & Production Architecture...");
  await page.goto("http://localhost:3000/");
  await page.waitForLoadState("networkidle");

  const hiButton = page.locator('header button:has-text("हिंदी")').first();
  if (await hiButton.isVisible()) {
    await setCaption(
      "🌏 Multilingual Inclusion Parity (English · हिंदी · বাংলা · தமிழ்)",
      "Native Web Speech Synthesis · Zero Barriers for 1.4 Billion Indian Citizens",
    );
    await hiButton.click();
    await page.waitForTimeout(2500);
  }

  await setCaption(
    "🚀 GovEase · Open-Access Civic Infrastructure",
    "Next.js 16 Static Export · Turbopack · WCAG 2.2 AA · 100% Free & Open-Access Architecture",
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
    console.log(`\n🎉 New LinkedIn Showcase Video successfully generated: ${finalPath}`);
    return finalPath;
  }
}

recordAd()
  .then((p) => {
    console.log("Completed video build:", p);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Recording error:", err);
    process.exit(1);
  });
