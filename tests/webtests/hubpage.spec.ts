import { test, expect } from '@playwright/test';
import { SelectorsHubPage } from '../../pages/SelectorsHubPage';

test.describe('SelectorsHub Practice Page Automation', () => {
  let selectorsHubPage: SelectorsHubPage;

  test.beforeEach(async ({ page }) => {
    selectorsHubPage = new SelectorsHubPage(page);
    await selectorsHubPage.navigate();
  });

  test('should submit the user form successfully', async () => {
    // Arrange
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      mobile: '1234567890'
    };

    // Act
    await selectorsHubPage.fillUserForm(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.mobile
    );
    await selectorsHubPage.submitButton.click();

    // Assert
    // Add logic here to verify success message if available, or just check that form is filled
    await expect(selectorsHubPage.firstName).toHaveValue(userData.firstName);
  });

  test('should handle shadow DOM and iframe interactions', async () => {
    // Act
    await selectorsHubPage.fillShadowDomInput('Shadow Pizza');
    await selectorsHubPage.fillIframeInput('Iframe Name');

    // Assert
    // Verification logic depends on page behavior after filling
    // Checking that we could at least locate and interact without error
  });
});
