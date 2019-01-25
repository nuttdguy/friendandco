const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../../testing-server');

module.exports = {
    createTempRecord,
    deleteBy,
    findModelBy,
    isPasswordMatch,
    login,
    sendVerificationMail,
    signup,
    verifyRecord,
} = require('../../../routes/user.controller');


/*******************************************
 SETUP
 *******************************************/

const UserModelName = 'User';
const VerifyModelName = 'Verify';
let responseData = null;

const userData = {
    username: 'pygnasak-service',
    firstName: 'phouthalang-service',
    lastName: 'phouthalang-service',
    email: 'pygnasak@yahoo.com',
    password: 'password-test--service',
    isActive: false
};


let db = null;
before(done => {

    db = require('../../../db/db.connection');
    db.sequelize.sync({force: true}).then(res => {
        console.log('done connecting to database ... ', '00003');
        done();

    }).catch(err => {
        console.log('error trying to connect to db ... ', err);
        done(err);
    })

});

// afterEach(done => {
//
//     request(app)
//         .delete('/api/users/')
//         .send(responseData.id)
//         .end((err, res) => {
//             if (err) {
//                 console.log('/api/users/:id  => Delete =>  ', err)
//             }
//             done(res);
//         })
// });


/*******************************************
 TESTS
 *******************************************/





describe('Route: /api/users/register ', () => {

    it('should register the user', done => {
        request(app)
            .post('/api/users/register')
            .send(userData)
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/register ', err)
                }
                // console.log(res.body );
                expect(res.statusCode).to.equal(200);
                expect(res.body.firstName).to.equal(userData.firstName);
                expect(res.body.lastName).to.equal(userData.lastName);

                responseData = res.body;
                done();
            });
    });

});

//
//
//
//
