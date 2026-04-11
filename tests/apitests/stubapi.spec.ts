import { test, expect } from '../../fixtures/wiremockFixture';

/**
 * This test file executes against WireMock stubs.
 * Ensure your WireMock standalone JAR is running on port 9090
 * and these mappings are present in your 'mappings' folder.
 */
test.describe('WireMock Stubbed API Execution', () => {
    
    const BASE_URL = 'http://127.0.0.1:9090';

    test('GET Request - Verify Success Message', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/success`);
        
        expect(response.status()).toBe(200);
        const body = await response.json();
        
        // Matches your stub body: "Meghana, your mock is working!"
        expect(body.message).toContain('Meghana');
        console.log('GET Response:', body);
    });

    test('POST Request - Create User Stub', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/api/users`, {
            data: { "name": "Meghana" }
        });

        expect(response.status()).toBe(201);
        const body = await response.json();
        
        // Matches your stub body: "User created successfully!"
        expect(body.status).toBe('User created successfully!');
    });

    test('PUT Request - Update User Stub', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/api/users/101`, {
            data: { "name": "Meghana", "role": "Lead" }
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        
        // Matches your stub body: "Updated successfully"
        expect(body.status).toBe('Updated successfully');
    });

    test('DELETE Request - Remove User Stub', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/api/users/101`);

        expect(response.status()).toBe(200);
        const body = await response.json();
        
        // Matches your stub body: "User 1 has been permanently removed."
        expect(body.message).toBe('User 1 has been permanently removed.');
        console.log('DELETE Response:', body);
    });
});