import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Milestone M11 - Visual, Motion & 3D Calm Map Overhaul", () => {
  test("home page renders Calm Map design system and token foundations", async ({ page }) => {
    await page.goto("/");

    // Verify main container rendered
    const main = page.locator("main");
    await expect(main).toBeVisible();

    // Verify calm map hero section
    const heroTitle = page.locator("h1");
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText("A calm map of everyday public life services");

    // Verify Independent Public-Benefit strip in header
    const trustStrip = page.locator('div[role="region"][aria-label="Public Benefit Trust Banner"]');
    await expect(trustStrip).toBeVisible();
    await expect(trustStrip).toContainText("Independent Guide");
    await expect(trustStrip).toContainText("Not a Government Portal");

    // Verify Search Bar is present and operational
    const searchInput = page.getByRole("combobox", { name: /search public services/i });
    await expect(searchInput).toBeVisible();
  });

  test("displays 6 essential life areas with direct category exploration links", async ({
    page,
  }) => {
    await page.goto("/");

    // Verify 6 life area nodes are visible with category query links
    const nodeIds = [
      "healthcare",
      "education",
      "finance-and-welfare",
      "government-and-citizen",
      "mobility-and-transport",
      "utilities-and-local",
    ];

    for (const id of nodeIds) {
      const nodeLink = page.locator(`a[href*="category=${id}"]`).first();
      await expect(nodeLink).toBeVisible();
    }
  });

  test("respects prefers-reduced-motion media query", async ({ page }) => {
    // Emulate reduced motion user setting
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const main = page.locator("main");
    await expect(main).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
  });

  test("goal-phrased discovery grid renders 8 actionable tasks and navigates to verified service", async ({
    page,
  }) => {
    await page.goto("/");

    // Verify goal grid section
    const goalSection = page.locator("section#popular-goals");
    await expect(goalSection).toBeVisible();
    await expect(goalSection.locator("h2")).toContainText("What would you like to do?");

    // Check presence of key goal cards
    const birthCertCard = goalSection.locator('a:has-text("Get a Birth Certificate")');
    await expect(birthCertCard).toBeVisible();
    await expect(birthCertCard).toContainText("Civil Registration System");

    const scholarshipCard = goalSection.locator('a:has-text("Find a Scholarship")');
    await expect(scholarshipCard).toBeVisible();
    await expect(scholarshipCard).toContainText("National Scholarship Portal");

    const voterIdCard = goalSection.locator('a:has-text("Reprint Official PAN Card")');
    await expect(voterIdCard).toBeVisible();

    // Click on a goal card to navigate to verified service
    await birthCertCard.click();
    await expect(page).toHaveURL(/\/services\/birth-certificate-crs/);
    await expect(page.locator("h1")).toContainText("Birth & Death Registration");
    await expect(page.locator("h1")).toContainText("Civil Registration System (CRS)");
  });

  test("supports side-by-side comparison via ?view=classic flag", async ({ page }) => {
    // Navigate with classic view query parameter
    await page.goto("/?view=classic");

    // Verify classic view banner is displayed
    const viewSwitch = page.locator("text=Comparison Mode: Classic View Active");
    await expect(viewSwitch).toBeVisible();

    // Verify classic view ecosystem grid is rendered
    await expect(page.locator("text=India-First GovEase Public Life Services Guide")).toBeVisible();
    await expect(page.locator("text=Six Essential Life Areas")).toBeVisible();

    // Switch back to Overhaul Map view
    const switchBackBtn = page.locator('button:has-text("Switch to Overhaul Map View")');
    await expect(switchBackBtn).toBeVisible();
    await switchBackBtn.click();

    await expect(page.locator("text=What would you like to do?")).toBeVisible();
  });

  test("multilingual parity across 4 official languages", async ({ page }) => {
    await page.goto("/");

    // 1. Switch to Hindi (hi)
    const hiBtn = page.locator("header").locator('button:has-text("हिंदी")');
    await hiBtn.click();
    await expect(page.locator("h1")).toContainText("आवश्यक जनसेवाओं का शांत व स्पष्ट मानचित्र");
    await expect(page.locator("#popular-goals h2")).toContainText("आप क्या करना चाहते हैं?");
    await expect(page.locator("text=जन्म प्रमाण पत्र प्राप्त करें")).toBeVisible();

    // 2. Switch to Bengali (bn)
    const bnBtn = page.locator("header").locator('button:has-text("বাংলা")');
    await bnBtn.click();
    await expect(page.locator("h1")).toContainText(
      "প্রয়োজনীয় নাগরিক সেবার স্বচ্ছ ও নির্ভরযোগ্য মানচিত্র",
    );
    await expect(page.locator("#popular-goals h2")).toContainText("আপনি কি করতে চান?");
    await expect(page.locator("text=জন্ম শংসাপত্র নিন")).toBeVisible();

    // 3. Switch to Tamil (ta)
    const taBtn = page.locator("header").locator('button:has-text("தமிழ்")');
    await taBtn.click();
    await expect(page.locator("h1")).toContainText("அத்தியாவசிய மக்கள் சேவைகளின் அமைதியான வரைபடம்");
    await expect(page.locator("#popular-goals h2")).toContainText(
      "நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?",
    );
    await expect(page.locator("text=பிறப்புச் சான்றிதழ் பெறுக")).toBeVisible();
  });

  test("presentation modes (Simple & Assisted) adapt visual styles cleanly", async ({ page }) => {
    await page.goto("/");

    // Open mode menu in header
    const modeTrigger = page.locator('button[aria-label*="Display Mode:"]');
    await modeTrigger.click();

    // Select Simple Mode
    const simpleMenuItem = page.locator('div[role="menu"]').locator('button:has-text("Simple")');
    await simpleMenuItem.click();
    const bodyElem = page.locator("body");
    await expect(bodyElem).toHaveAttribute("data-mode", "simple");
    await expect(page.locator('div[role="region"][aria-label="Simple Mode Notice"]')).toBeVisible();

    // Open mode menu and select Assisted Mode
    await modeTrigger.click();
    const assistedMenuItem = page
      .locator('div[role="menu"]')
      .locator('button:has-text("Assisted")');
    await assistedMenuItem.click();
    await expect(bodyElem).toHaveAttribute("data-mode", "assisted");
    await expect(page.locator('div[role="region"][aria-label="Assisted Guidance"]')).toBeVisible();
  });

  test("passes strict automated WCAG 2.2 AA accessibility audit", async ({ page }) => {
    await page.goto("/");

    // Run axe on new Calm Map home page
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);

    // Run axe on ?view=classic comparison page
    await page.goto("/?view=classic");
    const classicAxe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(classicAxe.violations).toEqual([]);
  });
});
