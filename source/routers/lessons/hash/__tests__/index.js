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

    test('get /lessons/lessonHash should return empty object', async done => {
        const response = await server.get('/lessons/lessonHash').set(headers);

        const {
            body: { data },
        } = response;

        expect(response.statusCode).toBe(200);
        expect(data).toMatchObject({});
        done();
    });

    test('put /lessons/lessonHash should return empty object', async done => {
        const response = await server.put('/lessons/lessonHash').set(headers);

        const {
            body: { data },
        } = response;

        expect(response.statusCode).toBe(200);
        expect(data).toMatchObject({});
        done();
    });

    test('delete /lessons/lessonHash should return 204', async done => {
        const response = await server.delete('/lessons/lessonHash').set(headers);

        expect(response.statusCode).toBe(204);
        done();
    });
});
