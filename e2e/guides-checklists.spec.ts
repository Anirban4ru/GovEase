import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Milestone M5 - Interactive Explainer Guides & Readiness Checklists", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("renders 5-step explainer guide and navigates steps via tabs and buttons", async ({
    page,
  }) => {
    await page.goto("/services/create-abha-id");

    // Verify explainer guide heading
    await expect(
      page.getByRole("heading", { name: /Step-by-Step Portal Navigation Guide/i }),
    ).toBeVisible();

    // Verify 5 tab buttons exist
    const tabs = page.locator('div[role="tablist"] button[role="tab"]');
    await expect(tabs).toHaveCount(5);

    // Initial state: Step 1 active
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator('div[role="tabpanel"]')).toContainText("Check Pre-requisites");
    await expect(page.locator("text=Keep your 12-digit Aadhaar number ready.")).toBeVisible();

    // Verify Pitfall Warning on Step 1
    await expect(page.locator("text=Never pay any agent or cyber cafe")).toBeVisible();

    // Click on Step 2 tab
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator('div[role="tabpanel"]')).toContainText(
      "Navigate to Official ABDM Portal",
    );
    await expect(
      page.locator('div[role="tabpanel"]').getByText("abha.abdm.gov.in").first(),
    ).toBeVisible();

    // Click 'Next Step' button to advance to Step 3
    const nextBtn = page.getByRole("button", { name: /Next Step/i });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator('div[role="tabpanel"]')).toContainText("Enter Details & Verify OTP");

    // Verify 'Previous Step' button takes back to Step 2
    const prevBtn = page.getByRole("button", { name: /Previous Step/i });
    await prevBtn.click();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator('div[role="tabpanel"]')).toContainText(
      "Navigate to Official ABDM Portal",
    );
  });

  test("supports keyboard arrow navigation across tabs", async ({ page }) => {
    await page.goto("/services/create-abha-id");

    const tabs = page.locator('div[role="tablist"] button[role="tab"]');
    await tabs.nth(0).focus();
    await expect(tabs.nth(0)).toBeFocused();

    // ArrowRight navigates to Tab 2
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator('div[role="tabpanel"]')).toContainText(
      "Navigate to Official ABDM Portal",
    );

    // ArrowRight to Tab 3
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");

    // ArrowLeft back to Tab 2
    await page.keyboard.press("ArrowLeft");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  });

  test("displays plain-language jargon definition card and assisted mode indicator", async ({
    page,
  }) => {
    await page.goto("/services/create-abha-id");

    // Step 1 has eKYC jargon definition
    await expect(page.locator("text=Plain-Language Term Explainer")).toBeVisible();
    await expect(page.locator("text=eKYC (Online Identity Verification)")).toBeVisible();
    await expect(page.locator("text=Why this matters:")).toBeVisible();

    // Switch presentation mode to Assisted via Header menu
    await page.getByRole("button", { name: /Display Mode|प्रदर्शन मोड/i }).click();
    await page.getByRole("menuitem", { name: /Assisted|सहायता प्राप्त/i }).click();

    // Assisted Mode badge appears in explainer guide
    await expect(page.locator("text=Assisted Mode Active")).toBeVisible();
  });

  test("interacts with document readiness checklist and persists state in localStorage", async ({
    page,
  }) => {
    await page.goto("/services/driving-licence-renewal");

    // driving-licence-renewal has 4 documents
    await expect(page.locator("text=0 of 4 documents ready (0%)")).toBeVisible();
    const progressbar = page.locator('div[role="progressbar"]');
    await expect(progressbar).toHaveAttribute("aria-valuenow", "0");

    // Tick first document checkbox
    const checkboxes = page.locator('input[type="checkbox"]');
    const firstCheckbox = checkboxes.nth(0);
    await firstCheckbox.check();

    // Counter updates live (1 of 4 = 25%)
    await expect(page.locator("text=1 of 4 documents ready (25%)")).toBeVisible();
    await expect(progressbar).toHaveAttribute("aria-valuenow", "25");

    // Tick second document (2 of 4 = 50%)
    await checkboxes.nth(1).check();
    await expect(page.locator("text=2 of 4 documents ready (50%)")).toBeVisible();

    // Reload page to verify persistence across sessions
    await page.reload();
    await expect(page.locator("text=2 of 4 documents ready (50%)")).toBeVisible();

    // Tick third & fourth documents -> 100% Fully Prepared
    await checkboxes.nth(2).check();
    await checkboxes.nth(3).check();
    await expect(page.locator("text=4 of 4 documents ready (100%)")).toBeVisible();
    await expect(page.locator("text=Fully Prepared")).toBeVisible();

    // Reset checklist
    const resetBtn = page.getByRole("button", { name: /Reset checklist ticks/i });
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    // Returns to 0%
    await expect(page.locator("text=0 of 4 documents ready (0%)")).toBeVisible();
    await expect(progressbar).toHaveAttribute("aria-valuenow", "0");
  });

  test("renders bilingual Hindi translations cleanly", async ({ page }) => {
    await page.goto("/services/create-abha-id");

    // Switch to Hindi via header language button
    await page.getByRole("button", { name: "हिंदी" }).click();

    // Check Hindi headings
    await expect(
      page.getByRole("heading", { name: "चरण-दर-चरण नेविगेशन मार्गदर्शिका" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "दस्तावेज तत्परता चेकलिस्ट (जांच सूची)" }),
    ).toBeVisible();

    // Step 1 title in Hindi
    await expect(page.locator('div[role="tabpanel"]')).toContainText(
      "आवश्यक पूर्व-तैयारी की जांच करें",
    );

    // Jargon callout in Hindi
    await expect(page.locator("text=सरल भाषा में समझें (शब्दावली)")).toBeVisible();
    await expect(page.locator("text=ई-केवाईसी (ऑनलाइन पहचान सत्यापन)")).toBeVisible();
  });

  test("verifies all 6 seed services have explainer guides and checklists rendered", async ({
    page,
  }) => {
    const serviceIds = [
      "create-abha-id",
      "driving-licence-renewal",
      "nsp-scholarship-discovery",
      "pm-kisan-status",
      "aadhaar-pvc-card",
      "consumer-helpline-grievance",
    ];

    for (const id of serviceIds) {
      await page.goto(`/services/${id}`);
      await expect(
        page.getByRole("heading", { name: /Step-by-Step Portal Navigation Guide/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: /Document Readiness Checklist/i }),
      ).toBeVisible();
      await expect(page.locator('div[role="tablist"] button[role="tab"]')).toHaveCount(5);
    }
  });

  test("passes axe-core accessibility audit on service detail page with tabs and checklists", async ({
    page,
  }) => {
    await page.goto("/services/create-abha-id");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
