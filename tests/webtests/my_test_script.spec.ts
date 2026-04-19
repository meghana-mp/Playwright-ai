import { test, expect } from '@playwright/test';

test.describe('SelectorsHub Practice Page Automation', () => {

test('test', async ({ page }) => {
  await page.goto('https://selectorshub.com/xpath-practice-page/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('meghana@np.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('test1232');
  await page.getByRole('textbox', { name: 'Password' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter your company' }).fill('globant');
  await page.getByRole('textbox', { name: 'Enter your company' }).press('Tab');
  await page.getByRole('spinbutton').fill('757676767676');
  await page.getByRole('spinbutton').press('Tab');
  await page.getByRole('textbox', { name: 'Country' }).fill('india');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('textbox', { name: 'Enter your first crush name' }).click();
  await page.getByRole('textbox', { name: 'Enter your first crush name' }).click();
  await page.getByRole('textbox', { name: 'Enter your first crush name' }).fill('test');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'DownLoad Link' }).click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'SelectorsHub Youtube Channel', exact: true }).click();
  const page2 = await page2Promise;
});

});
