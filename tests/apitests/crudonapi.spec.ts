import { test, expect } from '../fixtures/wiremockFixture';

test.describe('Second Mock API Tests', () => {
    // Port 9090 as per your setup
    const BASE_URL = 'http://127.0.0.1:9090';

    test('GET Request - Priority 1', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/users/1`);
        
        // Assertion equivalent to .statusCode(200)
        expect(response.status()).toBe(200);
        
        // Log all equivalent
        console.log(await response.json());
    });

    test('POST Request - Priority 2', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/api/users`, {
            headers: { 'Content-Type': 'application/json' },
            data: { "name": "Meghana" }
        });

        expect(response.status()).toBe(201);
        console.log(await response.json());
    });

    test('PUT Request - Priority 3', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/api/users/1`, {
            headers: { 'Content-Type': 'application/json' },
            data: { "name": "Meghana", "role": "Lead" }
        });

        expect(response.status()).toBe(200);
        console.log(await response.json());
    });

    test('DELETE Request - Priority 4', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/api/users/1`);

        // Asserting 200 as per your Java code
        expect(response.status()).toBe(200);
    });
});