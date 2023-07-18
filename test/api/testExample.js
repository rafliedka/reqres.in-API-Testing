const assert = require('chai').assert;
const app = require('../../test')

describe('welcome and test', function(){
    it('app should return welcome message', function(){
        assert.equal(app(), 'lets testing')
    })
})