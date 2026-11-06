import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Milestone M4 - Saved Items, PWA Shell, Settings & Feedback Flow", () => {
  test("saved items supports export, clear all modal, and print view", async ({ page }) => {
    // 1. Pre-seed a saved service in localStorage
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("uls_saved_services", JSON.stringify(["create-abha-id"]));
    });

    await page.goto("/saved");
    await expect(page.locator("h2 a")).toContainText("Ayushman Bharat Health Account");

    // 2. Export button is present and clickable
    const exportBtn = page.locator('button:has-text("Export Backup")');
    await expect(exportBtn).toBeVisible();

    // 3. Clear All modal flow
    const clearAllBtn = page.locator('button:has-text("Clear All")');
    await clearAllBtn.click();

    // Modal appears
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal.locator("h2")).toContainText("Clear All Saved References?");

    // Confirm clear
    await modal.locator('button:has-text("Yes, Clear All")').click();
    await expect(modal).not.toBeVisible();

    // Empty state appears
    await expect(page.locator("text=No saved services yet")).toBeVisible();

    // 4. Print emulation check
    await page.emulateMedia({ media: "print" });
    const printHeading = page.locator("text=Personal Service Checklist");
    await expect(printHeading).toBeVisible();
    await page.emulateMedia({ media: "screen" });
  });

  test("settings page renders data inventory table and manages preferences", async ({ page }) => {
    await page.goto("/settings");

    // Check headings
    await expect(page.locator("h1")).toContainText("Preferences & Settings");

    // Check On-Device Data Inventory Table
    await expect(page.locator("text=uls_saved_services")).toBeVisible();
    await expect(page.locator("text=uls_presentation_mode")).toBeVisible();
    await expect(page.locator("text=uls_locale")).toBeVisible();
    await expect(page.locator("text=Zero Cookies Detected")).toBeVisible();

    // Switch Language to Hindi
    const hindiBtn = page.locator('button:has-text("हिंदी (Hindi)")');
    await hindiBtn.click();
    await expect(page.locator("h1")).toContainText("प्राथमिकताएं एवं सेटिंग्स");

    // Switch back to English
    const englishBtn = page.locator('button:has-text("English")');
    await englishBtn.click();
    await expect(page.locator("h1")).toContainText("Preferences & Settings");

    // Test Purge Modal
    const purgeBtn = page.locator('button:has-text("Purge All Local Data")');
    await purgeBtn.click();

    const purgeModal = page.locator('div[role="dialog"]');
    await expect(purgeModal).toBeVisible();
    await expect(purgeModal.locator("h2")).toContainText("Confirm Complete Data Purge");

    // Cancel purge
    await purgeModal.locator('button:has-text("Cancel")').click();
    await expect(purgeModal).not.toBeVisible();
  });

  test("offline fallback page displays mandatory verified date stamp", async ({ page }) => {
    await page.goto("/offline");

    await expect(page.locator("h1")).toContainText("You Are Currently Offline");
    // Verify mandatory catalogue verification date stamp
    await expect(
      page.locator("text=Offline catalogue snapshot verified on: 2026-11-05"),
    ).toBeVisible();
  });

  test("anonymous feedback modal detects and blocks sensitive data leaks", async ({ page }) => {
    await page.goto("/help");

    const feedbackBtn = page.locator('button:has-text("Submit Feedback / Correction")');
    await expect(feedbackBtn).toBeVisible();
    await feedbackBtn.click();

    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();

    const textarea = modal.locator("textarea");
    const emailBtn = modal.locator('button:has-text("Send via Email")');
    const copyBtn = modal.locator('button:has-text("Copy Report")');

    // Clean input enables buttons
    await textarea.fill("The link for Sarathi Licence renewal is working smoothly.");
    await expect(emailBtn).toBeEnabled();
    await expect(copyBtn).toBeEnabled();

    // Sensitive data input triggers anti-leak alert and disables submission
    await textarea.fill("My phone number is 9876543210 and aadhaar is 3456 7890 1234");
    const warning = modal.locator('div[role="alert"]');
    await expect(warning).toBeVisible();
    await expect(warning).toContainText("Privacy Warning");
    await expect(warning).toContainText("Aadhaar Number");
    await expect(warning).toContainText("Phone Number");

    await expect(emailBtn).toBeDisabled();
    await expect(copyBtn).toBeDisabled();

    // Clearing sensitive data restores buttons
    await textarea.fill("General question regarding scholarship eligibility criteria.");
    await expect(warning).not.toBeVisible();
    await expect(emailBtn).toBeEnabled();
    await expect(copyBtn).toBeEnabled();

    // Test Copy Report
    await copyBtn.click();
    await expect(modal.locator("text=✓ Report copied to clipboard!")).toBeVisible();

    // Close modal
    await modal.locator('button[aria-label="Close dialog"]').click();
    await expect(modal).not.toBeVisible();
  });

  test("web app manifest conforms to W3C specification", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    expect(response.status()).toBe(200);

    const manifest = await response.json();
    expect(manifest.name).toBe("Unified Life Services Platform");
    expect(manifest.short_name).toBe("Life Services");
    expect(manifest.display).toBe("standalone");
    expect(manifest.start_url).toBe("/");
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
  });

  test("passes axe-core accessibility audit across all M4 pages and modals", async ({ page }) => {
    // 1. Audit /settings
    await page.goto("/settings");
    let results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    let violations = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(violations).toEqual([]);

    // 2. Audit /offline
    await page.goto("/offline");
    results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    violations = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(violations).toEqual([]);

    // 3. Audit /help with Feedback Modal open
    await page.goto("/help");
    await page.locator('button:has-text("Submit Feedback / Correction")').click();
    await expect(page.locator('div[role="dialog"]')).toBeVisible();

    results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    violations = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(violations).toEqual([]);
  });
});
