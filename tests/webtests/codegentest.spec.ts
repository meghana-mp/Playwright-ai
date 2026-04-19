import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.getByRole('link', { name: 'Today\'s Deals' }).click();
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).click();
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('bags for women');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).press('Enter');
  await page.getByRole('navigation', { name: 'Primary' }).getByLabel('Expand to Change Language or').click();
  await page.getByRole('link', { name: 'Choose a language for shopping in Amazon India. The current selection is' }).click();
  await page.locator('div:nth-child(7) > .a-radio > label > .a-icon').click();
  await page.getByRole('button', { name: 'மாற்றங்களைச் சேமி' }).click();
  await page.getByRole('link', { name: 'Amazon.in' }).click();
  await page.getByRole('button', { name: 'டெலிவரி முகவரி: Bengaluru' }).click();
  await page.locator('div').filter({ hasText: 'உங்களுடைய இருப்பிடத்தைத் தேர்ந்தெடுக்கவும்உங்களுடைய இருப்பிடத்தைத் தேர்ந்தெடுக்க' }).first().click();
});