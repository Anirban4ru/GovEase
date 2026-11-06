import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Civic Capstone Zero-Cost Extensions", () => {
  test("renders In-Browser Civic Document Prep Studio and switches presets", async ({ page }) => {
    await page.goto("/prep-studio");

    // Title and description
    await expect(page.locator("h1")).toContainText(/Prep Studio/i);

    // Verify 3 preset options exist
    await expect(page.getByText("Passport-size Photograph").first()).toBeVisible();
    await expect(page.getByText("Applicant Signature Scan").first()).toBeVisible();
    await expect(page.getByText("Aadhaar / ID Card Photocopy Scan").first()).toBeVisible();

    // Verify privacy badge
    await expect(page.getByText("100% In-Browser RAM")).toBeVisible();

    // Run axe audit
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const criticalViolations = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(criticalViolations).toHaveLength(0);
  });

  test("renders Multi-Service Life Event Journeys with sequential steps and progress tracking", async ({
    page,
  }) => {
    await page.goto("/journeys");

    await expect(page.locator("h1")).toContainText(/Life Event/i);

    // Verify 4 primary journeys are present in tabs
    await expect(page.getByRole("tab", { name: /Newborn Child/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /Higher Education/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /Informal & Gig Worker/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /Senior Citizen/i })).toBeVisible();

    // Check newborn child steps
    await expect(page.getByText("Step 1: Obtain CRS Digital Birth Certificate")).toBeVisible();
    await expect(page.getByText("Step 2: Enroll for Blue Baal Aadhaar")).toBeVisible();

    // Check interaction: check off step 1
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();

    // Run axe audit
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const criticalViolations = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(criticalViolations).toHaveLength(0);
  });

  test("renders Help page with Helplines, Anti-Scam Verifier, Tariff Calculator, and CSC Charter", async ({
    page,
  }) => {
    await page.goto("/help");

    await expect(page.locator("h1")).toContainText(/Civic Help/i);

    // Verify 1930 Cybercrime and 1915 Consumer helplines
    await expect(page.getByText("1930", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("1915", { exact: true }).first()).toBeVisible();
    await expect(page.locator('a[href="tel:1930"]')).toBeVisible();

    // Verify Anti-Scam Verifier
    const verifyInput = page.locator('input[aria-label="SMS sender code or phone number to verify"]');
    await expect(verifyInput).toBeVisible();

    // Test preset button: AX-PARIVH
    await page.getByRole("button", { name: "AX-PARIVH" }).click();
    await expect(page.locator("text=VERIFIED OFFICIAL GOVERNMENT SENDER")).toBeVisible();

    // Test suspicious 10-digit number
    await verifyInput.fill("9876543210");
    await page.getByRole("button", { name: "Verify Sender" }).click();
    await expect(page.locator("text=HIGH RISK WARNING")).toBeVisible();

    // Verify Tariff Calculator
    await expect(page.getByText("Statutory Government Fee", { exact: true }).first()).toBeVisible();
    await page.getByRole("button", { name: "PAN Card Reprint / e-PAN" }).click();
    await expect(page.locator("text=Physical Card Delivery (India) - ₹50")).toBeVisible();

    // Verify CSC Rate Schedule table
    await expect(page.locator("text=Authorized CSC (Common Service Center) Statutory Rate Charter")).toBeVisible();
    await expect(page.locator("text=₹0 (100% Free)").first()).toBeVisible();

    // Run axe audit
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const criticalViolations = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(criticalViolations).toHaveLength(0);
  });
});
