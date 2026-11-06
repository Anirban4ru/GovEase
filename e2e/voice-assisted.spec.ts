import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Milestone M6 - Voice Read-Aloud & Expanded Catalogue Services", () => {
  const newServiceRoutes = [
    {
      id: "voter-id-epic-download",
      titleSnippet: "Voter ID Registration",
      officialDomain: "voters.eci.gov.in",
    },
    {
      id: "ration-card-nfsa-status",
      titleSnippet: "Ration Card",
      officialDomain: "nfsa.gov.in",
    },
    {
      id: "pan-card-reprint",
      titleSnippet: "PAN Card Reprint",
      officialDomain: "onlineservices.nsdl.com",
    },
    {
      id: "epf-passbook-claim-status",
      titleSnippet: "EPF Member Passbook",
      officialDomain: "epfindia.gov.in",
    },
    {
      id: "pmay-beneficiary-status",
      titleSnippet: "PM Awas Yojana",
      officialDomain: "pmayg.nic.in",
    },
    {
      id: "birth-certificate-crs",
      titleSnippet: "Birth & Death Registration",
      officialDomain: "crsorgi.gov.in",
    },
  ];

  for (const service of newServiceRoutes) {
    test(`renders verified service details for ${service.id} with allow-listed domain`, async ({
      page,
    }) => {
      await page.goto(`/services/${service.id}`);

      // Verify Title
      await expect(page.locator("h1")).toContainText(service.titleSnippet);

      // Verify Verified Domain Badge
      await expect(page.locator(`text=${service.officialDomain}`).first()).toBeVisible();

      // Verify Explainer Guide tabs (5 phases)
      const tabs = page.locator('div[role="tablist"] button[role="tab"]');
      await expect(tabs).toHaveCount(5);

      // Verify Document Checklist exists
      await expect(page.locator("#readiness-checklist-heading")).toBeVisible();
    });
  }

  test("ReadAloudButton is present on service overview, step guide, and checklist", async ({
    page,
  }) => {
    // Mock window.speechSynthesis in browser context
    await page.addInitScript(() => {
      window.speechSynthesis = {
        speak: () => {},
        cancel: () => {},
        pause: () => {},
        resume: () => {},
        getVoices: () => [
          {
            name: "Google Hindi",
            lang: "hi-IN",
            default: true,
            localService: true,
            voiceURI: "hi",
          } as SpeechSynthesisVoice,
          {
            name: "Google English",
            lang: "en-IN",
            default: false,
            localService: true,
            voiceURI: "en",
          } as SpeechSynthesisVoice,
        ],
        onvoiceschanged: null,
        paused: false,
        pending: false,
        speaking: false,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      };
    });

    await page.goto("/services/voter-id-epic-download");

    // Overview Read Aloud Button
    const overviewReadBtn = page.getByRole("button", {
      name: /^Read aloud$|^सुनें \(बोलकर पढ़ें\)$/i,
    });
    await expect(overviewReadBtn).toBeVisible();

    // Explainer Guide Step Read Aloud Button
    const stepReadBtn = page.getByRole("button", {
      name: /^Listen to step$|^चरण सुनें$/i,
    });
    await expect(stepReadBtn).toBeVisible();

    // Document Checklist Read Aloud Button
    const docsReadBtn = page.getByRole("button", {
      name: /^Listen to docs$|^दस्तावेज सुनें$/i,
    });
    await expect(docsReadBtn).toBeVisible();

    // Click overview read-aloud button to toggle speech
    await overviewReadBtn.click();
    await expect(
      page.getByRole("button", {
        name: /^Stop reading$|^आवाज बंद करें$/i,
      }),
    ).toBeVisible();

    // Click again to stop
    await page
      .getByRole("button", {
        name: /^Stop reading$|^आवाज बंद करें$/i,
      })
      .click();
    await expect(overviewReadBtn).toBeVisible();
  });

  test("passes automated accessibility audit (axe-core) on new M6 service pages", async ({
    page,
  }) => {
    await page.goto("/services/voter-id-epic-download");
    const voterResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const voterViolations = voterResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(voterViolations).toEqual([]);

    await page.goto("/services/pan-card-reprint");
    const panResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const panViolations = panResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(panViolations).toEqual([]);
  });
});
