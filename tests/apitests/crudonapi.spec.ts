import { test, expect } from '../../fixtures/wiremockFixture';

test.describe('Second Mock API Tests', () => {
    // Port 9090 as per your setup
    const BASE_URL = 'http://127.0.0.1:9090';

    test('GET Request - Priority 1', async ({ request, wiremock }) => {
        const response = await request.get(`${BASE_URL}/api/success`);
        
         expect(response.status()).toBe(200);
  
         const body = await response.json();
         expect(body.message).toContain('Meghana');
    });

    test('POST Request - Priority 2', async ({ request, wiremock }) => {
        const response = await request.post(`${BASE_URL}/api/users`, {
            headers: { 'Content-Type': 'application/json' },
            data: { "name": "Meghana" }
        });

        expect(response.status()).toBe(201);
        console.log(await response.json());
    });

    test('PUT Request - Priority 3', async ({ request, wiremock }) => {
        const response = await request.put(`${BASE_URL}/api/users/101`, {
            headers: { 'Content-Type': 'application/json' },
            data: { "name": "Meghana", "role": "Lead" }
        });

        expect(response.status()).toBe(200);
        console.log(await response.json());
    });

    test('DELETE Request - Priority 4', async ({ request, wiremock }) => {
        const response = await request.delete(`${BASE_URL}/api/users/101`);

        // Asserting 200 as per your Java code
        expect(response.status()).toBe(200);
    });
});