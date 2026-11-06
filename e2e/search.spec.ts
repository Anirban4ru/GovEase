import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Milestone M3 - Search & Discovery Engine", () => {
  test("searches on home page, displays accessible dropdown, and navigates via keyboard", async ({
    page,
  }) => {
    await page.goto("/");

    // Focus search input on home
    const searchInput = page.locator('input[type="search"]').first();
    await expect(searchInput).toBeVisible();

    // Type query
    await searchInput.fill("driving");

    // Dropdown listbox appears
    const listbox = page.locator('ul[role="listbox"]');
    await expect(listbox).toBeVisible();

    // Verify option content
    const option = page.locator('li[role="option"]').first();
    await expect(option).toContainText("Driving Licence Renewal");

    // Arrow down and press Enter
    await searchInput.press("ArrowDown");
    await searchInput.press("Enter");

    // Navigates to detail page
    await expect(page).toHaveURL(/.*\/services\/driving-licence-renewal/);
    await expect(page.locator("h1")).toContainText("Driving Licence Renewal");
  });

  test("submits query with Enter key to navigate to /explore?q=...", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.locator('input[type="search"]').first();
    await searchInput.fill("scholarship");
    await searchInput.press("Enter");

    await expect(page).toHaveURL(/.*\/explore\/?\?q=scholarship/);
    await expect(page.locator("h2 a").first()).toContainText("National Scholarship Portal");
  });

  test("live filtering on explore handles transliterations, typos, and clear button", async ({
    page,
  }) => {
    await page.goto("/explore");

    const exploreSearchInput = page.locator('input[type="search"]');
    await expect(exploreSearchInput).toBeVisible();

    // Test Hinglish transliteration: "kisan paisa"
    await exploreSearchInput.fill("kisan paisa");
    await expect(page.locator("h2 a").first()).toContainText("PM-Kisan Samman Nidhi");

    // Click clear button
    const clearBtn = page.locator('button[aria-label="Clear search query"]');
    await expect(clearBtn).toBeVisible();
    await clearBtn.click();
    await expect(page.locator("h2 a")).toHaveCount(12);

    // Test common typo: "adhaar"
    await exploreSearchInput.fill("adhaar");
    await expect(page.locator("h2 a").first()).toContainText("Aadhaar PVC Card");
  });

  test("displays accessible empty state when query matches no services and allows reset", async ({
    page,
  }) => {
    await page.goto("/explore");

    const searchInput = page.locator('input[type="search"]');
    await searchInput.fill("unknownservicexyz");

    // Empty state heading and helper
    await expect(page.locator("text=No matching services found")).toBeVisible();

    // Reset button restores all services
    const resetBtn = page.locator('button:has-text("View all services")');
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    await expect(page.locator("h2 a")).toHaveCount(12);
  });

  test("passes axe-core accessibility audit with search dropdown open", async ({ page }) => {
    await page.goto("/");
    const searchInput = page.locator('input[type="search"]').first();
    await searchInput.fill("abha");

    // Ensure listbox is open
    await expect(page.locator('ul[role="listbox"]')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const violations = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(violations).toEqual([]);
  });
});
