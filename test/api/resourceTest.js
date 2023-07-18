const baseUrl = require('../../env');
const { expect } = require('chai')
const request = require('supertest')

describe('GET RESOURCE', function() {
    describe('get all resource datas', function() {
        const response = request(baseUrl()).get('/api/unknown')
        it('response status equal to 200', async function() {
            expect((await response).status).to.equal(200)
        });
        it('response body expected to be an object', async function() {
            expect((await response).body).to.be.a('object')
        });
        it('response body to have some properties', async function() {
            expect((await response).body).to.haveOwnProperty('page')
            expect((await response).body).to.haveOwnProperty('per_page')
            expect((await response).body).to.haveOwnProperty('total')
            expect((await response).body).to.haveOwnProperty('total_pages')
            expect((await response).body).to.haveOwnProperty('data')
            expect((await response).body).to.haveOwnProperty('support')
        });
    });

    describe('get single resource data', function() {
        const response = request(baseUrl()).get('/api/unknown/2')
        it('response status equal to 200', async function() {
            expect((await response).status).to.equal(200)
        });
        it('response body expected to be an object', async function() {
            expect((await response).body).to.be.a('object')
        });
        it('response body to have 2 properties', async function() {
            expect((await response).body).to.haveOwnProperty('data')
            expect((await response).body).to.haveOwnProperty('support')
        });
    });

    describe('can not get resource data', function() {
        const response = request(baseUrl()).get('/api/unknown/23')
        it('response status equal to 404', async function() {
            expect((await response).status).to.equal(404)
        });
    });
});