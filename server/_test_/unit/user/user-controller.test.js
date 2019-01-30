const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);


const {deleteBy, signup, verifyRecord} = require('../../../services/user.service');

/*******************************************
 SETUP
 *******************************************/

const UserModelName = 'User';
const VerifyModelName = 'Verify';
let userInstance = null;
let verifyInstance = null;

// omit username, username is assigned as email within route
const userData = {
    // username: 'pygnasak-controller',
    firstName: 'phouthalang-controller',
    lastName: 'phouthalang-controller',
    email: 'enrollmi@gmail.com',
    password: 'password-test--controller',
    passwordConfirm: 'password-test--controller',
    isActive: false
};


let db = null;
let server = null;

before(done => {

    connectDb().then(() => {
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

    deleteInstances().then(() => {
        userInstance = null;
        verifyInstance = null;
        server.close();
        done();
    });

});

async function connectDb() {
    db = require('../../../db/db.connection');
    await db.sequelize.sync({force: true});
}

async function deleteInstances() {
    if (userInstance !== null) {
        await deleteBy(userInstance.id, 'id', 'User');
        await deleteBy(userInstance.id, 'id', 'Verify');
    }
}

async function saveAndValidate() {
    userInstance = await signup(userData);
    await verifyRecord(userInstance.id);
    return userInstance;
}

async function signupUser() {
    userInstance = await signup(userData);
    return userInstance;
}

/*******************************************
 TESTS
 *******************************************/

// TODO NOTE => deleting a temp record is done through route, so model name is not important

describe('Post: /api/users/signup => when username does not exist', () => {

    it('should signup and create the user', done => {

        chai.request(server)
            .post('/api/users/signup')
            .send(userData)
            .end((err, res) => {
                if (err) {
                    console.log('/api/users/signup ', err);
                    done();
                }

                expect(res.status).to.equal(200);
                expect(res.body).to.not.have.property('errors');
                expect(res.body).to.have.property('username');
                expect(res.body).to.have.property('email');

                done();
            });
    });

});

describe('Post: /api/users/signup => when username exists', () => {

    it('should return user and add message to object if user has already signed up', done => {

        signupUser().then((user) => {

            chai.request(server)
                .post('/api/users/signup')
                .send(userData)
                .end((err, res) => {
                    if (err) {
                        console.log('/api/users/signup ', err);
                        done();
                    }

                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('message');

                    expect(res.body).to.not.have.property('errors');
                    expect(res.body).to.have.property('username');
                    expect(res.body).to.have.property('email');

                    done();
                });
        }).catch(e => {
            done(e);
        });

    });
});

describe('Get: /api/users/activate/:id => sets user account to active after confirming verification link', () => {

    it('should activate user account and delete verification record', done => {

        signupUser().then((user) => {

            chai.request(server)
                .get('/api/users/activate/' + user.id)
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                        done();
                    }


                    console.log(res.body);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.have.property('errors');
                    expect(res.body).to.equal(1);

                    done();
                });

        }).catch(e => {
            done(e);
        })
    });

});

describe('Post: /api/users/login => when user w/ username does not exist', () => {

    it('should not find a user', done => {

        chai.request(server)
            .post('/api/users/login')
            .send({
                username: userData.username,
                password: userData.password,
                passwordConfirm: userData.passwordConfirm
            })
            .end((err, res) => {
                if (err) {
                    console.log('/api/users/login =>  ', err);
                    done();
                }

                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message');
                expect(res.body).to.not.have.property('errors');
                expect(res.body).to.not.have.property('username');
                expect(res.body).to.not.have.property('email');

                done();

            })
    });

});

describe('Post: /api/users/login => when user has an account, but has not verified => logging in by username', () => {

    it('should find a user having an active account', done => {

        signupUser().then((user) => {

            chai.request(server)
                .post('/api/users/login')
                .send({
                    username: user.username,
                    email: user.email,
                    password: userData.password,
                    passwordConfirm: userData.passwordConfirm
                })
                .end((err, res) => {
                    if (err) {
                        console.log('/api/users/login =>  ', err);
                        done();
                    }

                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('message');
                    expect(res.body.isActive).to.equal(false);
                    expect(res.body).to.not.have.property('errors');
                    expect(res.body).to.have.property('username');
                    expect(res.body).to.have.property('email');

                    done();

                })
        }).catch(e => {
            done(e);
        })

    });

});

describe('Post: /api/users/login when user account has been verified and is active => by username', () => {

    it('should find a user with an active account and return authToken', done => {

        saveAndValidate().then((user) => {
            // login the user
            chai.request(server)
                .post('/api/users/login')
                .send({
                    username: user.username,
                    email: user.email,
                    password: userData.password,
                    passwordConfirm: userData.passwordConfirm
                })
                .end((err, res) => {
                    if (err) {
                        console.log('/api/users/login =>  ', err);
                        done();
                    }

                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('authToken');
                    expect(res.body).to.have.property('password');
                    expect(res.body.isActive).to.equal(true);

                    expect(res.body).to.not.have.property('errors');
                    expect(res.body).to.have.property('username');
                    expect(res.body).to.have.property('email');

                    done();

                })

        }).catch(e => {
            done(e);
        })
    });
});

describe('Delete: /api/users/:id delete a user by id', () => {

    it('should delete the user by its id', done => {

        saveAndValidate().then((user) => {

            // login the user
            chai.request(server)
                .delete('/api/users/' + user.id)
                .end((err, res) => {
                    if (err) {
                        console.log('/api/users/login =>  ', err);
                        done();
                    }

                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.have.property('errors');
                    expect(res.body).to.equal(1);

                    done();

                })
        });
    });

});