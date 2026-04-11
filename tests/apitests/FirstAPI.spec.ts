import { test, expect } from '@playwright/test';

test('validate local wiremock on port 9090', async ({ request }) => {
  // Update the port here to 9090
  const response = await request.get('http://127.0.0.1:9090/api/success');

  // Basic validation
  expect(response.status()).toBe(200);
  
  const body = await response.json();
  
  // Verify the custom message you wrote in the JSON file
  expect(body.message).toBe('Meghana, your mock is working!');
});