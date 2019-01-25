const chai = require('chai');
const expect = chai.expect;

const {
    // activateUser,
    // deleteUser,
    createTempRecord,
    getModelBy,
    isPasswordMatch,
    login,
    sendVerificationMail,
    signup,
    // resetPassword,
    // updateUser
} = require('../../../services/user.service');

const {
    buildModelWithAssociatedId,
    buildModel,
    deleteBy,
    deleteByPk,
    save
} = require('../../../repository/user.repository');


// setup db connection and sync

const UserModelName = 'User';
const VerifyModelName = 'Verify';

const userData = {
    username: 'pygnasak-service',
    firstName: 'phouthalang-service',
    lastName: 'phouthalang-service',
    email: 'pygnasak@yahoo.com',
    password: 'password-test--service'
};


let db = null;
let userInstance = null;
let verifyInstance = null;
let UserModel = null;
before(done => {

    db = require('../../../db/db.connection');
    db.sequelize.sync({force: true}).then(res => {
        console.log('done connecting to database ... ', '00003');

        UserModel = db.sequelize.models[UserModelName];
        done();

    }).catch(err => {
        console.log('error trying to connect to db ... ', err);
        done(err);
    })

});


after(done => {

    if (userInstance !== null ) {
        deleteByPk(UserModelName, userInstance.id);
        userInstance = null;
    }
    if (verifyInstance !== null ) {
        deleteByPk(VerifyModelName, verifyInstance.id);
        verifyInstance = null;
    }
    done();

});


// UNIT TEST FOR SIGN-UP AND LOGIN
// => login => find user => check if activated user => if not, respond with verify email=
// AFTER verified; always check for activated user flag

// Build and save user
function buildAndSave(ModelName, modelData) {
    const user = buildModel(ModelName, modelData);
    return save(ModelName, user);
}

// signup and create temp record
function signupAndCreateTempRecord(done) {
    signup(userData, UserModelName, 'username', userData.username).then(savedUser => {
        userInstance = {...savedUser};

        createTempRecord(VerifyModelName, userInstance, 'verify').then(res => {
            verifyInstance = {...res};
            done();
        }).catch(e => {
            done(e);
        })
    }).catch(e => {
        done(e);
    })
}


// Function: signup(data, modelName, field, value)
describe('register / sign-up up a new user; looking up existing by username', () => {

    it('should return USER OBJECT when the USER IS FOUND', done => {

        signup(userData, UserModelName, 'username', userData.username)
            .then(res => {

                expect(res).to.be.an('object');
                expect(res).to.not.equal(null);

                done();
        }).catch(e => {
            done(e);
        });
    });

    it('should CREATE AND SAVE A USER when no existing user has been found', done => {

        signup(userData, UserModelName, 'username', userData.username)
            .then(res => {

                expect(res).to.be.an('object');
                expect(res.password).to.not.equal(userData.password);
                expect(res.username).to.equal(userData.username);

                userInstance = {...res};
                done();
        }).catch(e => {
            done(e);
        });

    });

});

// Function: createTempRecord(modelName, userData)
describe('creates a temporary record that associates user id that record', () => {

    // requires a saved user record
    before(done => {
        done();
    });

    it(`should CREATE AND SAVE ONE ${VerifyModelName} record and associating USER ID AS ID`, done => {

        createTempRecord(VerifyModelName, userInstance, 'verify').then(res => {

            expect(res.id).to.equal(userInstance.id);

            verifyInstance = {...res};
            done();
        }).catch(e => {
            done(e);
        })
    });

});

// TODO ... leave this test disabled so it does not send emails
// Function: sendVerificationMail(userId, userEmail)
// describe('send a verification email to users email address', () => {
//
//     before(done => {
//         signupAndCreateTempRecord(done, res => {
//             done(res);
//         });
//     });
//
//     it('should send an email to the user email account with a verification link', done => {
//
//         sendVerificationMail(userInstance.id, userInstance.email).then(res => {
//
//             expect(res).to.be.an('object');
//             expect(res).to.have.any.keys('response', 'messageId', 'envelope', 'accepted');
//             done();
//         }).catch(e => {
//             done(e);
//         })
//
//     })
// });

// Function: login(modelName, data)
describe('finds user having an inactive account', () => {

    before(done => {
        signupAndCreateTempRecord(done, res => {
            userInstance = {...res};

            // set the generated password hash to the original password for testing
            userInstance.password = userData.password;
            done(res);
        })
    });

    it('should find user by username', done => {
        login(UserModelName, 'username', userInstance.username, userInstance).then(res => {

            expect(res).to.be.an('object');
            expect(res.username).to.equal(userData.username);

            userInstance = {...res};
            done();
        }).catch(e => {
            done(e);
        })
    });

    it('should not be active and return found user', done => {

        // console.log(userInstance.password, userData.password, ' <<======= PP0002');
        login(UserModelName, 'username', userInstance.username, userInstance).then(res => {

            expect(res).to.be.an('object');
            expect(res).to.have.any.keys('id', 'email', 'username');
            expect(res.isActive).to.equal(false);

            userInstance = {...res};
            done();

        }).catch(e => {
            done(e);
        })

    });
});

//
describe('logging in with a user password', done => {

    before(done => {
        signupAndCreateTempRecord(done, res => {
            userInstance = {...res};

            // set the generated password hash to the original password for testing
            userInstance.password = userData.password;
            done(res);
        })
    });

    it('should be a valid password', done => {
        isPasswordMatch(userData, userInstance).then(res => {
            expect(res).to.equal(true);

            done();
        }).catch(e => {
            done(e);
        })
    });

    it('should be an invalid password', done => {

        isPasswordMatch(userInstance, userInstance).then(res => {

            expect(res).to.equal(false);
            done();
        }).catch(e => {
            done(e);
        })
    })

});


// Function: getModelBy(model, field, value)
// describe('getModelBy function', () => {
//
//     const counter = Math.random();
//     const ModelName = 'User';
//     let user = null;
//
//     before(done => {
//
//         user = buildModel(ModelName, {
//             username: 'username-service',
//             firstName: 'firstname-service',
//             lastName: 'lastname-service',
//             email: 'service-first@last.com',
//             password: 'password-test--service'
//         });
//
//         save(ModelName, user).then(res => {
//             user = {...res};
//             done();
//         }).catch(e => {
//             done(e);
//         });
//
//     });
//
//     after(done => {
//         deleteBy(ModelName, 'id', user.id);
//         done();
//     });
//
//     it(`should get one ${ModelName} by email`, done => {
//
//         getModelBy(ModelName, 'email', user.email).then(res => {
//
//             expect(res).to.have.property('email');
//             expect(res.email).to.equal(res.email);
//
//             done();
//
//         }).catch(e => {
//             deleteByPk(ModelName, user.id);
//             done(e);
//         });
//
//     });
//
//     it(`should get one ${ModelName} by username`, done => {
//         getModelBy(ModelName, 'username', user.username).then(res => {
//
//             expect(res).to.have.property('username');
//             expect(res.username).to.equal(user.username);
//
//             done();
//
//         }).catch(e => {
//
//             done(e);
//         });
//     });
//
//     it(`should get one ${ModelName} by id`, done => {
//         getModelBy(ModelName, 'id', user.id).then(res => {
//
//             expect(res).to.have.property('id');
//             expect(res.id).to.equal(user.id);
//
//             done();
//
//         }).catch(e => {
//
//             done(e);
//         });
//     })
//
// });

