const router = require('../routes/user.controller');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');

const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

// Load routes
require('../routes/index.routes')(app);

const { User, genUUID4 } = require('../dto-to-delete/index.dto');

// setup db connection
before((done) => {
    global.client = require('../dto-to-delete/db.connection');
    done();
});

// load dummy data
beforeEach(done => {
    let user = {
        username: 'username',
        firstName: 'firstname',
        lastName: 'lastname',
        id: genUUID4(),
        email: 'first@last.com',
        password: 'password'
    };
    User.create(user).then(user => {
        done();
    })
});


// after(done => {
//     global.client.end();
//     done();
// });


afterEach(done => {

    User.destroy({where: {}}).then(num => {
        done();
    });
});


describe('POST', () => {
    it('/api/profile/register creates a profile', done => {
        const userA = {
            username: 'username',
            firstName: 'firstname',
            lastName: 'lastname',
            id: genUUID4(),
            email: 'first@last.com',
            password: 'password'
        };
        request(app)
            .post('/api/profile/register')
            .send(userA)
            .end( (err, res) => {
                if (err) {
                    console.log('/api/profile/register ', err)
                }
                expect(res.statusCode).to.equal(200);
                expect(res.body.firstName).to.equal(userA.firstName);
                expect(res.body.lastName).to.equal(userA.lastName);
                expect(res.body.password).to.equal(userA.password);
                done();
            });
    });

});




