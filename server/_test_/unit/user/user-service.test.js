const chai = require('chai');
const expect = chai.expect;

const {
    createTempRecord,
    deleteBy,
    findModelBy,
    isPasswordMatch,
    login,
    sendVerificationMail,
    signup,
    verifyRecord
    // resetPassword,
    // updateUser
} = require('../../../services/user.service');

const {
    buildModel,
    save
} = require('../../../repository/user.repository');


/*******************************************
                    SETUP
 *******************************************/

const UserModelName = 'User';
const VerifyModelName = 'Verify';

const userData = {
    username: 'pygnasak-service',
    firstName: 'phouthalang-service',
    lastName: 'phouthalang-service',
    email: 'pygnasak@yahoo.com',
    password: 'password-test--service',
    isActive: false
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


afterEach(done => {

    if (userInstance !== null) {
        deleteBy(UserModelName, 'id', userInstance.id);
        userInstance = null;
    }
    if (verifyInstance !== null) {
        deleteBy(VerifyModelName, 'id', verifyInstance.id);
        verifyInstance = null;
    }
    done();

});


/*******************************************
            BUILD AND SAVE HELPERS
 *******************************************/

// Build and save user
function buildAndSave(ModelName, modelData) {
    const user = buildModel(ModelName, modelData);
    return save(ModelName, user);
}

// signup and create temp record
async function signupAndCreateTempRecord() {
    try {
        userInstance = await signup(userData, UserModelName, 'username', userData.username);
        verifyInstance = await createTempRecord(VerifyModelName, userInstance);
        console.log('done signing up and creating temp record ... ');
    } catch (e) {
        return e;
    }
}


/*******************************************
                TESTS
 *******************************************/

// Function: signup(data, modelName, field, value)
describe('signing up user with a username', () => {

    it('should create and save user when username is not found', done => {

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

// Function: signup(data, modelName, field, value)
describe('signing up user with a username, but user is already registered', () => {

    before(done => {
        buildAndSave(UserModelName, userData).then(res => {
            userInstance = {...res};
            done();
        }).catch(e => {
            done(e);
        })
    });

    it('should return user that has signed up', done => {

        signup(userData, UserModelName, 'username', userData.username)
            .then(res => {

                expect(res).to.be.an('object');
                expect(res.username).to.equal(userData.username);

                done();
            }).catch(e => {
            done(e);
        });
    });

});

// Function: createTempRecord(modelName, userData)
describe('creating a temporary record that associates a user id that record', () => {

    before(done => {
        buildAndSave(UserModelName, userData).then(res => {
            userInstance = {...res};
            done();
        }).catch(e => {
            done(e);
        })
    });

    it(`should create and save ${VerifyModelName} record and associating user id as its id`, done => {

        createTempRecord(VerifyModelName, userInstance).then(res => {

            expect(res.id).to.equal(userInstance.id);

            done();
        }).catch(e => {
            done(e);
        })
    });

});

// Function: login(modelName, data)
describe('logging in a user with inactive flag set to FALSE', () => {

    before(done => {
        signupAndCreateTempRecord().then(res => {
            done();
        }).catch(e => {
            console.log(e);
        });
    });

    it('should find a valid user that has an isActive flag set to FALSE', done => {
        login(UserModelName, 'username', userData.username, userData).then(res => {

            expect(res).to.be.an('object');
            expect(res).to.have.any.keys('id', 'email', 'username');
            expect(res.isActive).to.equal(false);

            userInstance = {...res};
            done();

        }).catch(e => {
            done(e);
        })

    });

    it('should not find a valid user', done => {

        const username = 'invalid-username'; // set username as an invalid username
        login(UserModelName, 'username', username, userData).then(res => {

            expect(res).to.not.exist;

            done();
        }).catch(e => {
            done(e);
        })
    });

});

// Function: login(modelName, data)
describe('logging in a user with inactive flag set to TRUE', () => {

    before(done => {
        userData.isActive = true;  // set isActive Flag to true
        signup(userData, UserModelName, 'username', userData.username).then(savedUser => {
            createTempRecord(VerifyModelName, savedUser, 'verify').then(res => {
                done();
            }).catch(e => {
                done(e);
            })
        }).catch(e => {
            done(e);
        })
    });

    it('should find a valid user with activated account', done => {

        // console.log(userInstance);
        login(UserModelName, 'username', userData.username, userData).then(res => {

            expect(res).to.be.an('object');
            expect(res).to.have.any.keys('id', 'email', 'username');
            expect(res.isActive).to.equal(true);

            done();
        }).catch(e => {
            done(e);
        })
    });

    it('should sign token of a user with an isActive flag set to TRUE', done => {

        login(UserModelName, 'username', userData.username, userData).then(res => {

            expect(res).to.be.an('object');
            expect(res).to.have.any.keys('id', 'email', 'username', 'authToken');
            expect(res.isActive).to.equal(true);

            done();

        }).catch(e => {
            done(e);
        })
    })
});

// Function: isPasswordMatch(payload, userAccount)
describe('logging in with a valid user password', () => {

    before(done => {
        signupAndCreateTempRecord().then(res => {
            done();
        }).catch(e => {
            console.log(e);
        });
    });

    it('should be a valid password', done => {
        isPasswordMatch(userData, userInstance).then(res => {
            expect(res).to.exist;
            expect(res).to.be.a('string');

            done();
        }).catch(e => {
            done(e);
        })
    });

});

// Function: isPasswordMatch(payload, userAccount)
describe('logging in with an invalid user password', () => {

    before(done => {
        signupAndCreateTempRecord().then(res => {
            done();
        }).catch(e => {
            console.log(e);
        });
    });

    it('should be an invalid password', done => {
        const diffUser = {...userData, password: 'invalid-password'}; // set an invalid password
        isPasswordMatch(diffUser, userInstance).then(res => {

            expect(res).to.not.exist;

            done();
        }).catch(e => {
            done(e);
        })
    });
});

// Function: verifyRecord(modelName, field, value)
describe('activating a users account by verify record id', () => {

    before(done => {
        signupAndCreateTempRecord().then(res => {
            done();
        }).catch(e => {
            console.log(e);
        });
    });

    it('should delete verify record by its id', done => {

        verifyRecord(VerifyModelName, 'id', verifyInstance.id).then(res => {

            expect(res).to.equal(1);
            expect(res).to.be.a('number');

            done();
        }).catch(e => {
            done();
        })

    })

});

// Function: findModelBy(model, field, value)
describe('finds a record by email, username or id', () => {

    beforeEach(done => {
        buildAndSave(UserModelName, userData).then(res => {
            userInstance = {...res};
            done();
        }).catch(e => {
            done(e);
        })
    });


    it(`should get one user by email`, done => {

        findModelBy(UserModelName, 'email', userData.email).then(res => {

            expect(res).to.have.property('email');
            expect(res.email).to.equal(res.email);

            done();
        }).catch(e => {
            done(e);
        });

    });

    it(`should get one user by username`, done => {
        findModelBy(UserModelName, 'username', userData.username).then(res => {

            expect(res).to.have.property('username');
            expect(res.username).to.equal(userData.username);

            done();

        }).catch(e => {

            done(e);
        });
    });

    it(`should get one user by id`, done => {
        findModelBy(UserModelName, 'id', userInstance.id).then(res => {

            expect(res).to.have.property('id');
            expect(res.id).to.equal(userInstance.id);

            done();

        }).catch(e => {

            done(e);
        });
    })

});

// Function: deleteBy(modelName, field, value)
describe('delete a record by model-name, field, and value', () => {

    beforeEach(done => {
        buildAndSave(UserModelName, userData).then(res => {
            userInstance = {...res};
            done();
        }).catch(e => {
            done(e);
        })
    });

    it('should delete by username', done => {

        deleteBy(UserModelName, 'username', userData.username).then(res => {

            expect(res).to.be.a('number');
            expect(res).to.equal(1);

            done();
        }).catch(e => {
            done(e);
        });
    });

    it('should delete by email', done => {

        deleteBy(UserModelName, 'email', userData.email).then(res => {

            expect(res).to.be.a('number');
            expect(res).to.equal(1);

            done();
        }).catch(e => {
            done(e);
        });
    });

    it('should delete by id', done => {

        deleteBy(UserModelName, 'id', userInstance.id).then(res => {

            expect(res).to.be.a('number');
            expect(res).to.equal(1);

            done();
        }).catch(e => {
            done(e);
        });
    });

});

// TODO note ... test passes, but is disabled so that it does not send emails
// Function: sendVerificationMail(userId, userEmail)
describe('sending a verification email to the users email address', () => {

    before(done => {
        signupAndCreateTempRecord().then(res => {
            done();
        }).catch(e => {
            console.log(e);
        });
    });

    it('should send an email to the user email account with a verification link', done => {

        // sendVerificationMail(userInstance.id, userInstance.email)
        //     .then(res => {
        //
        //         expect(res).to.be.an('object');
        //         expect(res).to.have.any.keys('response', 'messageId', 'envelope', 'accepted');
        //
        //         done();
        //     }).catch(e => {
        //         done(e);
        //     })
        done();

    }).timeout(4000);

});



