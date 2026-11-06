import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Desktop-1440px",
      use: {
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "Tablet-768px",
      use: {
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: "Mobile-360px",
      use: {
        viewport: { width: 360, height: 800 },
      },
    },
    {
      name: "Mobile-320px",
      use: {
        viewport: { width: 320, height: 640 },
      },
    },
  ],
  webServer: {
    command: "node scripts/static-server.mjs 3000",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
