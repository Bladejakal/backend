// Core
const request = require('supertest');

// Set up environment variables
process.env.PORT = 3000;
process.env.PASSWORD = 'qwertY123!';

// Instruments
const { app } = require('../../../server');

let server = request(app);
let headers = null;

describe('should handle requests', () => {
    beforeAll(async done => {
        headers = {
            Authorization: process.env.PASSWORD
        };

        done();
    });

    test('post /auth/login should return 204 code', async done => {
        const response = await server.post('/auth/login');

        const {
            body: { data },
        } = response;

        expect(response.statusCode).toBe(204);
        done();
    });

    test('post /auth/logout should return 204 code', async done => {
        const response = await server.post('/auth/logout').set(headers);

        const {
            body: { data },
        } = response;

        expect(response.statusCode).toBe(204);
        done();
    });
});
