const baseUrl = require('../../env');
const { expect } = require('chai')
const request = require('supertest')

describe('POST LOGIN', () => {
    describe('successfully login', () => {
        const response = request(baseUrl())
        .post('/api/login')
        .send({
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        })
        it('response status equal to 200', async function() {
            expect((await response).status).to.equal(200)
        });
        it('response body expected to be an object', async function() {
            expect((await response).body).to.be.a('object')
        });
        it('response body expected to return token', async function() {
            expect((await response).body).to.haveOwnProperty('token')
        });
    });
    
    describe('failed to login', () => {
        const response = request(baseUrl())
        .post('/api/login')
        .send({
            "email": "peter@klaven"
        })
        it('response status equal to 400', async function() {
            expect((await response).status).to.equal(400)
        });
        it('response body expected to be an object', async function() {
            expect((await response).body).to.be.a('object')
        });
        it('response body resturn error message', async function() {
            expect((await response).body).to.own.include({
                "error": "Missing password"
            })
        });
    });
});