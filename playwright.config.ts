import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Global Setup/Teardown are now commented out as you move to Fixtures */
  // globalSetup: './fixtures/global-setup.ts',
  // globalTeardown: './fixtures/global-teardown.ts',
  
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  /* Multi-Reporter setup: Standard HTML + Allure */
  reporter: [
    ['html'], 
    ['allure-playwright', { outputFolder: 'allure-reports' }]
  ],

  use: {
    /* Trace is vital for your "Senior" debugging workflow */
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  outputDir: 'test-results/',

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});