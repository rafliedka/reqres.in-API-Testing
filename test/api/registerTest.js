const baseUrl = require('../../env');
const { expect } = require('chai')
const request = require('supertest')

describe('POST REGISTER', function() {
    describe('successfully registred', function() {
        const response = request(baseUrl())
        .post('/api/register')
        .send({
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        })
        it('response status equal to 200', async function() {
            expect((await response).status).to.equal(200)
        });
        it('response body expected to be an object', async function() {
            expect((await response).body).to.be.a('object')
        });
        it('response body have 2 properties', async function() {
            expect((await response).body).to.haveOwnProperty('id')
            expect((await response).body).to.haveOwnProperty('token')
        });
    });
    
    describe('failed to registr', function() {
        const response = request(baseUrl())
        .post('/api/register')
        .send({
            "email": "sydney@fife"
        })
        it('response status equal to 400', async function() {
            expect((await response).status).to.equal(400)
        });
        it('response body expected to be an object', async function() {
            expect((await response).body).to.be.a('object')
        });
        it('response should return error message', async function() {
            expect((await response).body).to.own.include({
                "error": "Missing password"
            })
        });
    });
});