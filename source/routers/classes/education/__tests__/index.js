// Core
const request = require('supertest');

// Set up environment variables
process.env.PORT = 3000;
process.env.PASSWORD = 'qwertY123!';

// Instruments
const { app } = require('../../../../server');

let server = request(app);
let headers = null;

describe('should handle requests', () => {
    beforeAll(async done => {
        headers = {
            Authorization: process.env.PASSWORD
        };

        done();
    });

    test('post /classes/classHash/enroll should return empty array', async done => {
        const response = await server.post('/classes/classHash/enroll').set(headers);

        const {
            body: { data },
        } = response;

        expect(response.statusCode).toBe(200);
        expect(data).toHaveLength(0);
        done();
    });
});
