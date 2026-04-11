// tests/api.spec.ts
import { test, expect } from '../../fixtures/wiremockFixture';

test('verify my success mapping', async ({ request, wiremock }) => {
  const response = await request.get('http://localhost:9090/api/success');
  
  expect(response.status()).toBe(200);
  
  const body = await response.json();
  expect(body.message).toContain('Meghana');
});