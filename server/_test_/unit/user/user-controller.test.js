const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);


const {deleteBy} = require('../../../services/user.service');

/*******************************************
 SETUP
 *******************************************/

const UserModelName = 'User';
const VerifyModelName = 'Verify';
let userInstance = null;
let verifyInstance = null;

const userData = {
    username: 'pygnasak-controller',
    firstName: 'phouthalang-controller',
    lastName: 'phouthalang-controller',
    email: 'pygnasak@yahoo.com',
    password: 'password-test--controller',
    passwordConfirm: 'password-test--controller',
    isActive: false
};


let db = null;
let server = null;

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

beforeEach(done => {
    server = require('../../../server');
    done();
});

afterEach(done => {

    if (userInstance !== null) {
        deleteBy(UserModelName, 'id', userInstance.id);
        deleteBy(VerifyModelName, 'id', userInstance.id);
        userInstance = null;
        verifyInstance = null;
    }

    server.close();
    done();
});



/*******************************************
 TESTS
 *******************************************/



describe('Route: /api/users/signup => when username does not exist', () => {

    it('should signup and create the user', done => {

        chai.request(server)
            .post('/api/users/signup')
            .send(userData)
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/signup ', err);
                    done();
                }

                expect(res.status).to.equal(200);
                expect(res.body.firstName).to.equal(userData.firstName);
                expect(res.body.lastName).to.equal(userData.lastName);
                expect(res.body.username).to.equal(userData.username);

                userInstance = res.body;
                done();
            });
    });

});

describe('Route: /api/users/signup => when username exists', () => {

    before(done => {

        chai.request(server)
            .post('/api/users/signup')
            .send(userData)
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/signup ', err);
                    done();
                }

                expect(res.status).to.equal(200);
                expect(res.body.firstName).to.equal(userData.firstName);
                expect(res.body.lastName).to.equal(userData.lastName);
                expect(res.body.username).to.equal(userData.username);

                userInstance = res.body;
                done();
            });
    });

    it('should return user and add message to object if user has already signed up', done => {

        chai.request(server)
            .post('/api/users/signup')
            .send(userData)
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/signup ', err);
                    done();
                }

                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message');
                expect(res.body.username).to.equal(userData.username);

                userInstance = res.body;
                done();
            });
    });
});

describe('Route: /api/users/login => when user + username does not exist', () => {

    it('should not find a user', done => {

        chai.request(server)
            .post('/api/users/login')
            .send({
                username: userData.username,
                password: userData.password,
                passwordConfirm: userData.passwordConfirm
            })
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/login =>  ', err);
                    done();
                }

                console.log(res.body);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message');
                expect(res.body).to.not.have.property('username');

                done();

            })
    });

});

describe('Route: /api/users/login => when user has an account, but is not active / verified => find by username', () => {

    before(done => {

        chai.request(server)
            .post('/api/users/signup')
            .send(userData)
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/signup ', err);
                    done();
                }

                expect(res.status).to.equal(200);
                expect(res.body.firstName).to.equal(userData.firstName);
                expect(res.body.lastName).to.equal(userData.lastName);
                expect(res.body.username).to.equal(userData.username);

                userInstance = res.body;
                done();
            });
    });

    it('should find a user having an active account', done => {

        chai.request(server)
            .post('/api/users/login')
            .send({
                username: userData.username,
                password: userData.password,
                passwordConfirm: userData.passwordConfirm
            })
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/login =>  ', err);
                    done();
                }

                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message');
                expect(res.body.isActive).to.equal(false);

                done();

            })


    });

});

describe('Route: /api/users/activate/:userId => when user confirms verification link', () => {

    before(done => {
        chai.request(server)
            .post('/api/users/signup')
            .send(userData)
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/signup ', err);
                    done();
                }

                expect(res.status).to.equal(200);
                expect(res.body.firstName).to.equal(userData.firstName);
                expect(res.body.lastName).to.equal(userData.lastName);
                expect(res.body.username).to.equal(userData.username);

                userInstance = res.body;
                done();
            });
    });

    it('should delete verify record', done => {

        chai.request(server)
            .get('/api/users/activate/'+userInstance.id)
            .end( (err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }

                expect(res.status).to.equal(200);
                expect(res.body.isActive).to.equal(true);
                expect(res.body).to.have.any.keys(['id', 'username', 'isActive']);

                done();
            });
    });

});


// TODO activate account, then login when account is active
// describe('Route: /api/users/login find by username and return', () => {
//
//     before(done => {
//         signupUser().then(res => {
//             done();
//         });
//     });
//
//     it('should find a user having an active account', done => {
//
//         chai.request(server)
//             .post('/api/users/login')
//             .send({
//                 username: userData.username,
//                 password: userData.password,
//                 passwordConfirm: userData.passwordConfirm
//             })
//             .end( (err, res) => {
//                 if (err) {
//                     console.log('/api/users/login =>  ', err);
//                     done();
//                 }
//
//                 expect(res.status).to.equal(200);
//                 expect(res.body).to.have.property('message');
//                 expect(res.body.isActive).to.equal(false);
//
//                 responseData = res.body;
//                 done();
//
//             })
//
//
//     });
//
// });