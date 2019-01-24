const chai = require('chai');
const expect = chai.expect;

const {
    // activateUser,
    // deleteUser,
    buildVerifyRecord,
    getModelBy,
    // loginUser,
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
let db = null;
let user = null;
const userData = {
    username: 'username-service',
    firstName: 'firstname-service',
    lastName: 'lastname-service',
    email: 'service-first@last.com',
    password: 'password-test--service'
};

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
//     if (user.id) {
//         deleteByPk(UserModelName, user.id).then(res => {
//             done();
//         });
//     } else {
//         done();
//     }
//
// });


// UNIT TEST FOR SIGN-UP AND LOGIN
// new login
// signup => send verify email; url is user id
// => login => find user => check if activated user => if not, respond with verify email=
// AFTER verified; always check for activated user flag


// Build and save user
function buildAndSave(ModelName, modelData) {
    const user = buildModel(ModelName, modelData);
    return save(ModelName, user);
}

// Function: signup(data, modelName, field, value)
describe('Register/Signup up a new user by username', () => {

    const UserModelName = 'User';
    let UserModel = null;

    before(done => {
        UserModel = db.sequelize.models[UserModelName];
        done();
    });



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

                user = {...res};
                done();
        }).catch(e => {
            done(e);
        });

    });


    // TODO OMIT THIS STEP
    // it('should build a verify record with user id as key', done => {
    //
    //     buildVerifyRecord(userData).then(res => {
    //
    //         expect(res).to.be.instanceof(VerifyModel);
    //         expect(res.id).to.equal(userData.id);
    //
    //         done();
    //     }).catch(e => {
    //         done();
    //     })
    // });


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

// Function: newVerifyRecord() function
// describe('verify function', () => {
//
//     const User = 'User';
//     const TestModelName = 'Verify';
//     let user = null;
//     let verify = null;
//
//     before(done => {
//
//         // build required models for test
//         user = buildModel(User, {
//             username: 'username-service',
//             firstName: 'firstname-service',
//             lastName: 'lastname-service',
//             email: 'service-first@last.com',
//             password: 'password-test--service'
//         });
//
//         verify = buildModelWithAssociatedId(TestModelName, 'id', user.id);
//
//         // save required models for test
//         user.save().then(userRecord => {
//             verify.save().then(verifyRecord => {
//                 user = userRecord;
//                 verify = verifyRecord;
//
//                 done();
//             }).catch(e => {
//                 done(e);
//             })
//         }).catch(e => {
//             done(e);
//         });
//
//     });
//
//     after(done => {
//         done();
//     });
//
//     it(`should save one ${TestModelName} record by id`, done => {
//
//         done();
//     });
//
//     it(`should get one ${TestModelName} record by id`, done => {
//
//         getModelBy(TestModelName, 'id', user.id).then(res => {
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
//
//     });
//
//     it(`should delete one ${TestModelName} record by user id`, done => {
//         deleteByPk(TestModelName, user.id).then(res => {
//
//             expect(res).to.equal(1);
//             expect(res).to.be.a('number');
//
//             done();
//         }).catch(e => {
//             done(e);
//         });
//     })
//
// });


// login user
// [1]. get the user by their username
// [2]. get the user by their email
// [3].
// [4].
// [5].