const assert = require('assert');
const { describe, it } = require('mocha')
const request = require('supertest');
const app = require('./api')

;

describe('API Suite test', () => {

    describe('/contact', () => {
        it('Should request the contact page and return HTTP Status 200', async() => {
            const response = await request(app)
                .get('/contact')
                .expect(200);

            assert.deepStrictEqual(response.text, 'contact us page');
        });
    });

    describe('/hi', () => {
        it('Should request an incorrect route /hi and redirect to /hello route', async() => {
            const response = await request(app)
                .get('/hi')
                .expect(200);

            assert.deepStrictEqual(response.text, 'Hello world');
        });
    });

    describe('/login', () => {
        it('Should login successfully in the login route and return HTTP Status 200', async() => {
            const response = await request(app)
                .post('/login')
                .send({ username: 'EnzoHenrique', password: '123' })
                .expect(200);

            assert.deepStrictEqual(response.text, 'Login succeeded!');
        });

        it('Should deny authorization when requesting it using wrong credentials and return HTTP Status 401', async() => {
            const response = await request(app)
                .post('/login')
                .send({ username: 'FakeUser', password: '321' })
                .expect(401);

            assert.ok(response.unauthorized);
            assert.deepStrictEqual(response.text, 'Logging failed!');
        });
    });

});