// Core
const request = require('supertest');

// Set up environment variables
process.env.PORT = 3000;
process.env.PASSWORD = 'qwertY123!';

// Instruments
const { app } = require('../../../../server');

let server = request(app);
let headers = null;

describe('should handle post request', () => {
    beforeAll(async done => {
        headers = {
            Authorization: process.env.PASSWORD
        };

        done();
    });

    test('get should return empty object', async done => {
        const response = await server.get('/users/userHash').set(headers);

        const {
            body: { data },
        } = response;

        expect(response.statusCode).toBe(200);
        expect(data).toMatchObject({});
        done();
    });

    test('put should return empty object', async done => {
        const response = await server.put('/users/userHash').set(headers);

        const {
            body: { data },
        } = response;

        expect(response.statusCode).toBe(200);
        expect(data).toMatchObject({});
        done();
    });

    test('delete should return 204', async done => {
        const response = await server.delete('/users/userHash').set(headers);

        expect(response.statusCode).toBe(204);
        done();
    });

});
