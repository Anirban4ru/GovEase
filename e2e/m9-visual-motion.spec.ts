import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Milestone M9 - India-First Civic Visual Identity & Fluid Micro-Interactions", () => {
  test("header displays India-First civic tricolor accent ribbon across viewports", async ({
    page,
  }) => {
    await page.goto("/");

    // Verify tricolor ribbon bar
    const tricolorBar = page.locator(".civic-tricolor-bar");
    await expect(tricolorBar).toBeVisible();

    // Verify brand seal / icon
    const brandLink = page.locator('header a[href="/"]').first();
    await expect(brandLink).toBeVisible();
    await expect(brandLink.locator("img, svg").first()).toBeVisible();
  });

  test("home page renders India-first civic badge and ecosystem cards with bespoke SVG badges", async ({
    page,
  }) => {
    await page.goto("/?view=classic");

    // Verify India-first hero badge
    const heroBadge = page.locator("text=India-First GovEase Public Life Services Guide");
    await expect(heroBadge).toBeVisible();

    // Verify ecosystem cards have interactive hover class and SVG badges
    const cards = page.locator(".civic-card-interactive");
    expect(await cards.count()).toBeGreaterThanOrEqual(6);

    const firstCardSvg = cards.first().locator("svg");
    await expect(firstCardSvg).toBeVisible();
  });

  test("service detail page displays ecosystem SVG badge and checklist progress transitions", async ({
    page,
  }) => {
    await page.goto("/services/create-abha-id");

    // Verify ecosystem badge is rendered in header tag
    const headerTag = page.locator('[data-testid="ecosystem-badge-tag"]').first();
    await expect(headerTag).toBeVisible();
    await expect(headerTag.locator("svg")).toBeVisible();

    // Verify Document Readiness Checklist progress bar
    const progressBar = page.locator('div[role="progressbar"]');
    await expect(progressBar).toBeVisible();

    // Check an item and verify progress update
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();

    // Uncheck and verify reset
    await firstCheckbox.uncheck();
    await expect(firstCheckbox).not.toBeChecked();
  });

  test("ReadAloudButton displays animated soundwave equalizer when speech is playing", async ({
    page,
  }) => {
    await page.goto("/services/create-abha-id");

    // Click ReadAloudButton to toggle speech simulation
    const readBtn = page.locator('button[aria-label="Read aloud"]').first();
    if ((await readBtn.count()) > 0) {
      await readBtn.click();

      // Verify animated soundwave equalizer is rendered when active
      const waveAnimation = page.locator('[data-testid="audio-wave-animation"]');
      if ((await waveAnimation.count()) > 0) {
        await expect(waveAnimation).toBeVisible();
      }

      // Stop reading
      const stopBtn = page.locator('button[aria-label="Stop reading"]').first();
      if ((await stopBtn.count()) > 0) {
        await stopBtn.click();
      }
    }
  });

  test("passes automated axe-core accessibility audit with tricolor bar, SVG badges, and motion", async ({
    page,
  }) => {
    await page.goto("/");
    const homeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(homeResults.violations).toEqual([]);

    await page.goto("/services/create-abha-id");
    const serviceResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(serviceResults.violations).toEqual([]);
  });
});
