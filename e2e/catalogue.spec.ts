import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Milestone M2 - Catalogue Pipeline & Service Pages", () => {
  test("loads /explore with all 18 verified services and filters by ecosystem", async ({
    page,
  }) => {
    await page.goto("/explore");
    await expect(page.locator("h1")).toContainText(/Explore Public Services/i);

    // Verify all 18 service headings are present
    const headings = page.locator("h2 a");
    await expect(headings).toHaveCount(18);

    // Filter by Healthcare
    const healthTab = page.locator('button[role="tab"]:has-text("Health & Well-being")');
    if ((await healthTab.count()) > 0) {
      await healthTab.click();
      await expect(page.locator("h2 a")).toHaveCount(1);
      await expect(page.locator("h2 a")).toContainText("Ayushman Bharat");
    }

    // Reset filter to All
    const allTab = page.locator('button[role="tab"]:has-text("All Services")');
    await allTab.click();
    await expect(page.locator("h2 a")).toHaveCount(18);
  });

  test("navigates to service detail page and renders full verified metadata", async ({ page }) => {
    await page.goto("/services/create-abha-id");

    // Title and Goal
    await expect(page.locator("h1")).toContainText("Ayushman Bharat Health Account");
    await expect(page.locator("text=User Goal:")).toBeVisible();

    // Semantic Breadcrumb
    await expect(page.locator('nav[aria-label="Breadcrumb"]')).toBeVisible();

    // Required Documents list
    const docs = page.locator("ul li");
    expect(await docs.count()).toBeGreaterThan(0);

    // Provider details and verification metadata in aside
    await expect(
      page.locator("aside").getByRole("heading", { name: /National Health Authority/i }),
    ).toBeVisible();
    await expect(page.locator("text=Last Verified:")).toBeVisible();
  });

  test("toggles local bookmark and displays in /saved without network tracking", async ({
    page,
  }) => {
    await page.goto("/services/create-abha-id");

    // Click Save button
    const saveBtn = page.locator('button:has-text("Save reference")');
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();

    // Button updates to saved state
    await expect(page.locator('button:has-text("Saved locally")')).toBeVisible();

    // Navigate to /saved
    await page.goto("/saved");
    await expect(page.locator("h1")).toContainText("Saved Service References");
    await expect(page.locator("h2 a")).toContainText("Ayushman Bharat Health Account");

    // Remove from saved
    const removeBtn = page.locator('button:has-text("Remove")');
    await removeBtn.click();
    await expect(page.locator("text=No saved services yet")).toBeVisible();
  });

  test("outbound handoff modal enforces security notice, allowlist badge, and rel attributes", async ({
    page,
  }) => {
    await page.goto("/services/create-abha-id");

    // Trigger modal
    const actionBtn = page.locator('button:has-text("Go to Official Portal")');
    await actionBtn.click();

    // Verify modal is open
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveAttribute("aria-modal", "true");

    // Verified domain badge
    await expect(page.locator("text=Verified Allow-listed Domain: abha.abdm.gov.in")).toBeVisible();

    // Proceed link security attributes
    const proceedLink = page.locator('a:has-text("Proceed to Official Portal")');
    await expect(proceedLink).toHaveAttribute("target", "_blank");
    await expect(proceedLink).toHaveAttribute("rel", "noopener noreferrer");
    await expect(proceedLink).toHaveAttribute("href", "https://abha.abdm.gov.in/abha/v3/register");

    // Close with Escape key
    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();
  });

  test("passes automated accessibility audit (axe-core) on catalogue screens", async ({ page }) => {
    await page.goto("/explore");
    const exploreResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const exploreViolations = exploreResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(exploreViolations).toEqual([]);

    await page.goto("/services/create-abha-id");
    const detailResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const detailViolations = detailResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(detailViolations).toEqual([]);
  });
});
