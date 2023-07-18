const baseUrl = require('../../env')
const { expect } = require('chai')
const request = require('supertest')

describe('GET USER', () => {
    describe('get all user data in 2nd page', () => {
        const response = request(baseUrl()).get('/api/users?page=2')
        it('response status equal to 200', async () => {
            expect((await response).status).to.equal(200)
        });
        it('response body to have property', async () => {
            expect((await response).body).to.haveOwnProperty(`page`)
            expect((await response).body).to.haveOwnProperty(`per_page`)
            expect((await response).body).to.haveOwnProperty(`total`)
            expect((await response).body).to.haveOwnProperty(`total_pages`)
            expect((await response).body).to.haveOwnProperty(`data`)
            expect((await response).body).to.haveOwnProperty(`support`)
        });
        it('response body expected to be a object', async () => {
            expect((await response).body).to.be.a('object')
        });
    });
    
    describe('get single user data', () => {
        const response = request(baseUrl()).get('/api/users/2')
        it('response status equal to 200', async () => {
            expect((await response).status).to.equal(200)
        });
        it('response body to have property', async () => {
            expect((await response).body).to.haveOwnProperty(`data`)
            expect((await response).body).to.haveOwnProperty(`support`)
        });
        it('response body expected to be a object', async () => {
            expect((await response).body).to.be.a('object')
        });
    });

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
    
    describe('can not get a single user not found', () => {
        const response = request(baseUrl()).get('/api/users/23')
        it('response status equal to 404', async () => {
            expect((await response).status).to.equal(404)
        });
    });
});

describe('POST USER', () => {
    describe('create user data', () => {
        const response = request(baseUrl())
        .post('/api/users')
        .send({
            "name": "morpheus",
            "job": "leader"
        })
        it('response status equal to 200', async () => {
            expect((await response).status).to.equal(201)
        });
        it('response body to have property', async () => {
            expect((await response).body).to.haveOwnProperty(`name`)
            expect((await response).body).to.haveOwnProperty(`job`)
        });
        it('response body expected to be a object', async () => {
            expect((await response).body).to.be.a('object')
        });
    });
});

describe('UPDATE USER', () => {
    describe('update user data', () => {
        const response = request(baseUrl())
        .put('/api/users/2')
        .send({
            "name": "morpheus",
            "job": "zion resident"
        })
        it('response status equal to 200', async () => {
            expect((await response).status).to.equal(200)
        });
        it('response body to have property', async () => {
            expect((await response).body).to.haveOwnProperty(`name`)
            expect((await response).body).to.haveOwnProperty(`job`)
            expect((await response).body).to.haveOwnProperty(`updatedAt`)
        });
        it('response body expected to be a object', async () => {
            expect((await response).body).to.be.a('object')
        });
    });
    
    describe('can not update user data', () => {
        const response = request(baseUrl())
        .put('/api/users')
        .send({
            "name": "morpheus",
            "job": "zion resident"
        })
        it('response status equal to 404', async () => {
            expect((await response).status).to.equal(404)
        });
    });
});

describe('PATCH USER', () => {
    describe('patch user data', () => {
        const response = request(baseUrl())
        .patch('/api/users/2')
        .send({
            "name": "morpheus",
            "job": "zion resident"
        })
        it('response status equal to 200', async () => {
            expect((await response).status).to.equal(200)
        });
        it('response body to have property', async () => {
            expect((await response).body).to.haveOwnProperty(`name`)
            expect((await response).body).to.haveOwnProperty(`job`)
            expect((await response).body).to.haveOwnProperty(`updatedAt`)
        });
        it('response body expected to be a object', async () => {
            expect((await response).body).to.be.a('object')
        });
    });
    
    describe('can not patch user data', () => {
        const response = request(baseUrl())
        .put('/api/users')
        .send({
            "name": "morpheus",
            "job": "zion resident"
        })
        it('response status equal to 404', async () => {
            expect((await response).status).to.equal(404)
        });
    });
});

describe('DELETE USER', () => {
    describe('delete user data', () => {
        const response = request(baseUrl())
        .delete('/api/users/2')
        it('response status equal to 204', async () => {
            expect((await response).status).to.equal(204)
        });
    });
});

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