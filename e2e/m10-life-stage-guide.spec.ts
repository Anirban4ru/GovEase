import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Milestone M10 - Citizen Life-Stage Navigator & CSC Prep Pack", () => {
  test("completes 3-step life stage screening and receives tailored recommendations", async ({
    page,
  }) => {
    await page.goto("/guide");

    // Verify page heading and informational disclaimer banner
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(
      page.locator('div[role="region"][aria-label="Informational Disclaimer"]'),
    ).toBeVisible();

    // Verify Step 1 is active
    await expect(page.locator("#step1-heading")).toBeVisible();
    const workerBtn = page.locator("button:has-text('Unorganised / Gig / Daily-Wage Worker')");
    await expect(workerBtn).toBeVisible();
    await workerBtn.click();

    // Verify Step 2 is active
    await expect(page.locator("#step2-heading")).toBeVisible();
    const financeBtn = page.locator("button:has-text('Financial Security, Insurance & Banking')");
    await expect(financeBtn).toBeVisible();
    await financeBtn.click();

    // Verify Step 3 Recommendations are rendered
    await expect(page.locator("#step3-heading")).toBeVisible();

    // Check tailored matches: e-Shram, PMSBY, PMJDY
    const eshramCard = page.locator("article:has-text('e-Shram Card Registration')");
    await expect(eshramCard).toBeVisible();
    await expect(eshramCard.locator("text=Ministry of Labour & Employment")).toBeVisible();

    const pmsbyCard = page.locator("article:has-text('PM Suraksha Bima Yojana (PMSBY)')");
    await expect(pmsbyCard).toBeVisible();

    // Bookmark e-Shram
    const saveBtn = eshramCard.locator("button").filter({ hasText: /Save/ });
    await saveBtn.click();
    await expect(eshramCard.locator("button").filter({ hasText: /Saved/ })).toBeVisible();

    // Toggle CSC Physical Visit Prep Pack
    const cscToggleBtn = page.locator("button:has-text('Print CSC Prep Sheet')");
    await cscToggleBtn.click();
    await expect(page.locator("h3:has-text('Physical Visit Preparation Sheet')")).toBeVisible();
    await expect(page.locator("text=Original Aadhaar Card")).toBeVisible();
    await expect(page.locator("text=Recent Passport-Size Color Photographs")).toBeVisible();

    // Return to cards
    const viewCardsBtn = page.locator("button:has-text('View Services')");
    await viewCardsBtn.click();
    await expect(eshramCard).toBeVisible();

    // Reset wizard
    const resetBtn = page.locator("button:has-text('Start Over')");
    await resetBtn.click();
    await expect(page.locator("#step1-heading")).toBeVisible();
  });

  test("runs student profile screening and recommends NSP and DigiLocker", async ({ page }) => {
    await page.goto("/guide");

    // Step 1: Select Student
    const studentBtn = page.locator("button:has-text('Student or Young Learner')");
    await studentBtn.click();

    // Step 2: Select Education
    const transportEduBtn = page.locator("button:has-text('Transport, Vehicles & Education')");
    await transportEduBtn.click();

    // Step 3: Verify NSP and DigiLocker
    await expect(
      page.locator("article:has-text('National Scholarship Portal (NSP) Discovery')"),
    ).toBeVisible();
    await expect(
      page.locator("article:has-text('DigiLocker Citizen Account Setup')"),
    ).toBeVisible();
  });

  test("passes automated axe-core accessibility audit across all wizard steps", async ({
    page,
  }) => {
    await page.goto("/guide");

    // Audit Step 1
    const step1Results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(step1Results.violations).toEqual([]);

    // Audit Step 2
    await page.locator("button:has-text('Farmer or Agricultural Landholder')").click();
    const step2Results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(step2Results.violations).toEqual([]);

    // Audit Step 3
    await page.locator("button:has-text('Healthcare & Subsidised Housing')").click();
    const step3Results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(step3Results.violations).toEqual([]);
  });
});
