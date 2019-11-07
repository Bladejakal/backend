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

    test('get /classes/classHash should return empty object', async done => {
        const response = await server.get('/classes/classHash').set(headers);

        const {
            body: { data },
        } = response;

        expect(response.statusCode).toBe(200);
        expect(data).toMatchObject({});
        done();
    });

    test('put /classes/classHash should return empty object', async done => {
        const response = await server.put('/classes/classHash').set(headers);

        const {
            body: { data },
        } = response;

        expect(response.statusCode).toBe(200);
        expect(data).toMatchObject({});
        done();
    });

    test('delete /classes/classHash should return 204', async done => {
        const response = await server.delete('/classes/classHash').set(headers);

        expect(response.statusCode).toBe(204);
        done();
    });
});
