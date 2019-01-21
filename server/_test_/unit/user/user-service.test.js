// const chai = require('chai');
// const expect = chai.expect;
//
// const {
//     // activateUser,
//     // deleteUser,
//     getBy,
//     // loginUser,
//     // registerUser,
//     // resetPassword,
//     // updateUser
// } = require('../../../services/user.service');
//
// const {
//     buildModel,
//     deleteOne,
//     save
// } = require('../../../repository/user.repository');

// UNIT TEST FOR SIGN-UP AND LOGIN
// new login
// signup => send verify email; url is user id
// => login => find user => check if activated user => if not, respond with verify email=
// AFTER verified; always check for activated user flag


// get by function
// [1]. get a user by email
// [2]. get a user by username
// [3]. get a user by their id
// describe('getBy function', () => {
//
//     let db = null;
//     const ModelName = 'User';
//     let Model = null;
//     let user = null;
//
//     let copiedResponse = null;
//
//     before(done => {
//         db = require('../../../db/db.connection');
//         Model = db.sequelize.models[ModelName];
//
//         user = buildModel(ModelName, {
//             username: 'username',
//             firstName: 'firstname',
//             lastName: 'lastname',
//             email: 'first@last.com',
//             password: 'password-test'
//         });
//         save(ModelName, user).then(res => { user = res });
//
//         done();
//     });
//
//     after(done => {
//         Model.destroy({where: {id: user.id}});
//         done();
//     });
//
//     it(`should get one ${ModelName} by email`, done => {
//
//         getBy(ModelName, 'email', user.email).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse).to.have.property('email');
//             expect(copiedResponse.email).to.equal(user.email);
//
//             done();
//
//         }).catch(e => {
//
//             console.log(e);
//             done(e);
//         });
//
//     });
//
//     it(`should get one ${ModelName} by username`, done => {
//         getBy(ModelName, 'username', user.username).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse).to.have.property('username');
//             expect(copiedResponse.username).to.equal(user.username);
//
//             done();
//
//         }).catch(e => {
//
//             console.log(e);
//             done(e);
//         });
//     })
//
//     it(`should get one ${ModelName} by id`, done => {
//         getBy(ModelName, 'id', user.id).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse).to.have.property('id');
//             expect(copiedResponse.id).to.equal(user.id);
//
//             done();
//
//         }).catch(e => {
//
//             console.log(e);
//             done(e);
//         });
//     })
//
// });

// verify function
// [1]. find verify record by user id
// describe('verify function', () => {
//
//     let db = null;
//     const User = 'User';
//     const TestModelName = 'Verify';
//
//     let ReqModel = null;
//     let TestModel = null;
//     let user = null;
//     let verify = null;
//
//     let copiedResponse = null;
//
//     before(done => {
//         db = require('../../../db/db.connection');
//
//         // required model for testing
//         ReqModel = db.sequelize.models[User];
//
//         // required model for this test
//         TestModel = db.sequelize.models[TestModelName];
//
//         // build required models for test
//         user = buildModel(User, {
//             username: 'username',
//             firstName: 'firstname',
//             lastName: 'lastname',
//             email: 'first@last.com',
//             password: 'password-test'
//         });
//
//         verify = buildModel(TestModelName, ReqModel);
//
//         // save required models for test
//         user.save().then(userRecord => {
//             verify.save().then(verifyRecord => {
//                 user = userRecord;
//                 verify = verifyRecord;
//             }).catch(e => {
//                 console.log(e);
//                 done(e);
//             })
//         }).catch(e => {
//             console.log(e);
//             done(e);
//         });
//
//     });
//
//     after(done => {
//         deleteOne(User, user.id);
//         deleteOne(TestModelName, user.id);
//         done();
//     });
//
//     // it(`should get one ${TestModelName} record by id`, done => {
//     //
//     //
//     //     getBy(TestModelName, 'id', user.id).then(res => {
//     //         copiedResponse = res;
//     //
//     //         expect(copiedResponse).to.have.property('id');
//     //         expect(copiedResponse.id).to.equal(user.id);
//     //
//     //         done();
//     //
//     //     }).catch(e => {
//     //
//     //         console.log(e);
//     //         done(e);
//     //     });
//     //
//     // });
//
// });


// login user
// [1]. get the user by their username
// [2]. get the user by their email
// [3].
// [4].
// [5].