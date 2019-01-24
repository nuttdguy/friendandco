const chai = require('chai');
const expect = chai.expect;

const {
    // activateUser,
    // deleteUser,
    createTempRecord,
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

const UserModelName = 'User';
const VerifyModelName = 'Verify';

const userData = {
    username: 'username-service',
    firstName: 'firstname-service',
    lastName: 'lastname-service',
    email: 'service-first@last.com',
    password: 'password-test--service'
};


let db = null;
let userInstance = null;
let verifyInstance = null;
let UserModel = null;
let VerifyModel = null;
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
        deleteByPk(UserModelName, userInstance.id);
        userInstance = null;
    }
    if (verifyInstance !== null) {
        deleteByPk(VerifyModelName, verifyInstance.id);
        verifyInstance = null;
    }
    done();

});


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

// Function: createTempRecord(modelName, userData) function
describe('creates a temporary record that associates user id that record', () => {

    // requires a saved user record
    before(done => {
         buildAndSave(UserModelName, userData).then(res => {
             userInstance = {...res};
             done();
         });
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

// Function:


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


// login user
// [1]. get the user by their username
// [2]. get the user by their email
// [3].
// [4].
// [5].