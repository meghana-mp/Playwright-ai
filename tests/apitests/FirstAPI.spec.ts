import { test, expect } from '@playwright/test';



//First MockTest to validate if the local wiremock server is running on port 9090 and returning the expected response for the /api/success endpoint. Make sure to update the port in the request URL to match your WireMock configuration.
test('validate local wiremock on port 9090', async ({ request }) => {
  // Update the port here to 9090
  const response = await request.get('http://127.0.0.1:9090/api/success');

  // Basic validation
  expect(response.status()).toBe(200);
  
  const body = await response.json();
  
  // Verify the custom message you wrote in the JSON file
  expect(body.message).toBe('Meghana, your mock is working!');
});