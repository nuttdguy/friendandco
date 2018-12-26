// const mocha = require('mocha');
const chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

const request = require('supertest');
const app = require('../server.test');
const agent = request.agent(app);


describe('GET /api/auth/user/test', function() {

    it('should have number ', function(done) {
        agent.get('/api/auth/user/test')
            .expect('Content-Type', /text\/html/)
            .expect(200)
            .then(res => {
                assert(res.body.message, 1)
            });
    })

});



describe('check test is running', () => {
    it('should print hello to console', (done) => {
        let message = 'hello';
        message.should.be.a('string');
        expect(message).to.equal('hello');
        assert.isString(message);
        done();
    });
});

