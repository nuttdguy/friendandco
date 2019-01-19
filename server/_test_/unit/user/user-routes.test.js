// const request = require('supertest');
// const chai = require('chai');
// const expect = chai.expect;
//
// let db = null;
// let UserModel = null;
// let genUUID4 = null;
// let UserBody = null;
// let server = null;
// let app = null;
// const deleteUser = require('../../repository/user.repository').deleteUser;
//
// server = require('../server');
// app = require('../../app');
//
// // TESTS :: individual functions, then unit test route
//
// // [1]. delete user if exists
// // [2]. register user
//
// before((done) => {
//     // setup db connection
//     db = require('../../db/db.connection');
//     UserModel = db.sequelize.models.User;
//     genUUID4 = db.sequelize.genUUID4;
//     done();
// });
//
// after(done => {
//     done()
// });
//
// // load dummy data
// beforeEach(done => {
//     UserBody = {
//         username: 'username',
//         firstName: 'firstname',
//         lastName: 'lastname',
//         id: genUUID4(),
//         email: 'first@last.com',
//         password: 'password',
//         passwordConfirm: 'password'
//     };
//     done();
// });
//
//
// afterEach(done => {
//     // TODO delete the user from db
//     delete require.cache[require.resolve( '../server' )];
//     done()
// });
//
//
// describe('POST', () => {
//
//     it('/api/users/register registers a new user', done => {
//         request(app)
//             .post('/api/users/register')
//             .send(UserBody)
//             .end( (err, res) => {
//                 if (err) {
//                     console.log('/api/users/register ', err)
//                 }
//                 console.log(res.body );
//                 expect(res.statusCode).to.equal(200);
//                 expect(res.body.firstName).to.equal(UserBody.firstName);
//                 expect(res.body.lastName).to.equal(UserBody.lastName);
//
//                 // expect(res.body.password).to.equal(UserBody.password);
//                 UserModel = res.body;
//                 console.log(UserModel);
//
//
//                 // delete the user
//                 deleteUser(UserModel.id).then(result => console.log(result));
//                 done();
//             });
//     });
//
// });
//
//
//
//
//
