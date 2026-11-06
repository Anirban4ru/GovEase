import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const M8_SERVICES = [
  {
    id: "digilocker-account-setup",
    expectedTitleSnippet: "DigiLocker",
    expectedJargonSnippet: "DigiLocker URI",
    officialDomainSnippet: "digilocker.gov.in",
  },
  {
    id: "pm-jan-dhan-yojana-account",
    expectedTitleSnippet: "Jan Dhan",
    expectedJargonSnippet: "Overdraft",
    officialDomainSnippet: "pmjdy.gov.in",
  },
  {
    id: "eshram-card-registration",
    expectedTitleSnippet: "e-Shram",
    expectedJargonSnippet: "UAN",
    officialDomainSnippet: "eshram.gov.in",
  },
  {
    id: "pm-suraksha-bima-yojana",
    expectedTitleSnippet: "Suraksha Bima",
    expectedJargonSnippet: "Auto-Debit",
    officialDomainSnippet: "jansuraksha.gov.in",
  },
  {
    id: "swavlamban-udid-card",
    expectedTitleSnippet: "Disability",
    expectedJargonSnippet: "UDID",
    officialDomainSnippet: "swavlambancard.gov.in",
  },
  {
    id: "parivahan-rc-transfer",
    expectedTitleSnippet: "Vehicle Registration",
    expectedJargonSnippet: "Form 29",
    officialDomainSnippet: "parivahan.gov.in",
  },
];

test.describe("Milestone M8 - Catalogue Expansion (18 Services)", () => {
  for (const service of M8_SERVICES) {
    test(`loads /services/${service.id} with verified metadata, 5-step guide, and 0 a11y violations`, async ({
      page,
    }) => {
      await page.goto(`/services/${service.id}`);

      // Verify Service Title
      const h1 = page.locator("h1");
      await expect(h1).toBeVisible();
      await expect(h1).toContainText(new RegExp(service.expectedTitleSnippet, "i"));

      // Verify User Goal section
      await expect(page.locator("text=User Goal:")).toBeVisible();

      // Verify 5-Step Explainer Guide
      const guideHeading = page.getByRole("heading", {
        name: /Step-by-Step Portal Navigation Guide/i,
      });
      await expect(guideHeading).toBeVisible();

      // Verify all 5 step tabs exist in the guide
      const tabs = page.locator('div[role="tablist"] button[role="tab"]');
      await expect(tabs).toHaveCount(5);

      // Verify Step 1 is active and shows Action Items
      await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
      await expect(page.locator('div[role="tabpanel"]')).toBeVisible();

      // Verify Outbound Handoff Modal opens with allow-listed URL
      const outboundBtn = page.locator('button:has-text("Go to Official Portal")').first();
      await expect(outboundBtn).toBeVisible();
      await outboundBtn.click();

      const modal = page.locator('div[role="dialog"][aria-modal="true"]');
      await expect(modal).toBeVisible();
      await expect(modal).toContainText(new RegExp(service.officialDomainSnippet, "i"));

      // Close modal
      const cancelBtn = modal.locator('button:has-text("Stay on Guide")');
      if ((await cancelBtn.count()) > 0) {
        await cancelBtn.click();
      } else {
        await page.keyboard.press("Escape");
      }
      await expect(modal).not.toBeVisible();

      // Run axe-core accessibility audit
      const a11yResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(a11yResults.violations).toEqual([]);
    });
  }
});
