const baseUrl = require('../../env')
const { expect } = require('chai')
const request = require('supertest')

describe('get a single data but response delayed', () => {
    const response = request(baseUrl())
    .get('/api/users?delay=3')
    it('stauts response should take more than 2000ms', async function() {
        this.timeout(10000);
        expect((await response).status).to.equal(200)
    });
    it('response body expected to be an object', async () => {
        expect((await response).body).to.be.a('object')
    });
});

