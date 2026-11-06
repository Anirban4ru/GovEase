import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("App Shell - Core Layout & Accessibility", () => {
  test("loads home page with semantic landmarks and no horizontal overflow", async ({ page }) => {
    await page.goto("/");

    // Verify main landmarks exist
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // Verify skip to main content link exists
    const skipLink = page.locator(".skip-to-content");
    await expect(skipLink).toHaveAttribute("href", "#main-content");

    // Verify no horizontal overflow at current viewport
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });

  test("runs automated accessibility audit (axe-core) with zero critical/serious violations", async ({
    page,
  }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const criticalOrSerious = accessibilityScanResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );

    if (criticalOrSerious.length > 0) {
      console.error("Accessibility Violations Found:", JSON.stringify(criticalOrSerious, null, 2));
    }

    expect(criticalOrSerious).toEqual([]);
  });

  test("switches language between English, Hindi, Bengali, and Tamil while preserving context", async ({
    page,
  }) => {
    await page.goto("/");

    // Default English
    await expect(page.locator("h1")).toContainText("A calm map of everyday public life services");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    // Switch to Hindi
    await page.getByRole("button", { name: /Hindi/i }).first().click();
    await expect(page.locator("h1")).toContainText("आवश्यक जनसेवाओं का शांत व स्पष्ट मानचित्र");
    await expect(page.locator("html")).toHaveAttribute("lang", "hi");

    // Switch to Bengali
    await page
      .getByRole("button", { name: /Bengali/i })
      .first()
      .click();
    await expect(page.locator("h1")).toContainText(
      "প্রয়োজনীয় নাগরিক সেবার স্বচ্ছ ও নির্ভরযোগ্য মানচিত্র",
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "bn");

    // Switch to Tamil
    await page.getByRole("button", { name: /Tamil/i }).first().click();
    await expect(page.locator("h1")).toContainText("அத்தியாவசிய மக்கள் சேவைகளின் அமைதியான வரைபடம்");
    await expect(page.locator("html")).toHaveAttribute("lang", "ta");

    // Switch back to English
    await page
      .getByRole("button", { name: /English/i })
      .first()
      .click();
    await expect(page.locator("h1")).toContainText("A calm map of everyday public life services");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("switches presentation mode (Standard, Simple, Assisted)", async ({ page }) => {
    await page.goto("/");

    // Default mode is standard
    await expect(page.locator("body")).toHaveAttribute("data-mode", "standard");

    // Open mode menu
    await page.getByRole("button", { name: /Display Mode|प्रदर्शन मोड/i }).click();

    // Switch to Simple
    await page.getByRole("menuitem", { name: /Simple|सरल/i }).click();
    await expect(page.locator("body")).toHaveAttribute("data-mode", "simple");

    // Switch to Assisted
    await page.getByRole("button", { name: /Display Mode|प्रदर्शन मोड/i }).click();
    await page.getByRole("menuitem", { name: /Assisted|सहायता प्राप्त/i }).click();
    await expect(page.locator("body")).toHaveAttribute("data-mode", "assisted");
  });

  test("navigates across all primary routes without error", async ({ page }) => {
    const routes = ["/", "/explore", "/saved", "/help", "/privacy"];

    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main#main-content")).toBeVisible();
    }
  });

  test("serves security headers (nosniff, frame denial, CSP)", async ({ page }) => {
    const response = await page.goto("/");
    const headers = response?.headers() || {};

    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });

  test("captures responsive viewport screenshot for M1 gate evidence", async ({
    page,
  }, testInfo) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const projectName = testInfo.project.name;
    await page.screenshot({
      path: `e2e/screenshots/m1-app-shell-${projectName}.png`,
      fullPage: true,
    });
  });
});
