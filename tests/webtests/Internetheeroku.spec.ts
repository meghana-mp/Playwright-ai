import { test, expect, Page, Locator} from '@playwright/test';  

test.describe('The Internet Heroku App Tests', () => {
test('Link and check Box', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');

  //Checkboxes test
  await page.getByRole('link', { name: 'Checkboxes' }).click();


  const checkbox1 = page.locator('#checkboxes input[type="checkbox"]').nth(0);
  const checkbox2 = page.locator('#checkboxes input[type="checkbox"]').nth(1);

  await expect(checkbox1).not.toBeChecked();
  await expect(checkbox2).toBeChecked();

  await checkbox1.check();
  await expect(checkbox1).toBeChecked();

  await checkbox2.uncheck();
  await expect(checkbox2).not.toBeChecked();
});

})