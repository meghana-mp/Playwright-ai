import { Page, Locator } from '@playwright/test';

export class SelectorsHubPage {
  readonly page: Page;
  readonly userEmail: Locator;
  readonly password: Locator;
  readonly company: Locator;
  readonly mobileNumber: Locator;
  readonly country: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Using standard locators that are guaranteed to work for this specific page
    this.userEmail = page.locator('input[name="wpforms[fields][0][first]"]');
    this.password = page.locator('input[name="wpforms[fields][0][last]"]');
    this.company = page.locator('input[name="wpforms[fields][1]"]');
    this.mobileNumber = page.locator('input[name="wpforms[fields][2]"]');
    this.country = page.locator('input[name="wpforms[fields][2]"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async navigate() {
    await this.page.goto('https://selectorshub.com/xpath-practice-page/');
    // Give the page time to fully load JS
    await this.page.waitForLoadState('networkidle');
  }

  async fillUserForm(firstName: string, lastName: string, email: string, mobile: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.mobileNumber.fill(mobile);
  }

  async fillShadowDomInput(value: string) {
    // SelectorsHub shadow DOM
    const shadowHost = this.page.locator('div#userName');
    await shadowHost.locator('input#kils').fill(value);
  }

  async fillIframeInput(value: string) {
    // Handling changing iframe
    const frame = this.page.frameLocator('iframe[name^="pact"]');
    await frame.locator('input[placeholder="Enter name"]').fill(value);
  }
}
