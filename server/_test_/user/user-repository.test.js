const chai = require('chai');
const expect = chai.expect;

let db = null;
let UserModel = null;
let genUUID4 = null;
let UserBody = null;

// load user repository functions for testing
const {
    activateAccount,
    buildProfile,
    deleteUser,
    deleteVerifyEmail,
    findByEmail,
    findById,
    findByUsername,
    findVerifyEmail,
    saveUser,
    updateUser
} = require('../../repository/user.repository');

// TESTS :: individual functions, then unit test route

// User
// [1]. build a user object
// [2]. save a user object
// [3]. update a user object
// [4]. delete a user object

// Verify
// [1]. build a verify email object
// [2]. save a verify email object
// [3]. update a verify email object
// [4]. delete a verify email object

// Profile
// [1]. build a profile object
// [2]. save a profile object
// [3]. update a profile object
// [4]. delete a profile object

// Education
// [1]. build an education object
// [2]. save an education object
// [3]. update an education object
// [4]. delete an education object

// History
// [1]. build a history object
// [2]. save a history object
// [3]. update a history object
// [4]. delete a history object

// Persona
// [1]. build a persona object
// [2]. save a persona object
// [3]. update a persona object
// [4]. delete a persona object

// Photo
// [1]. build a photo object
// [2]. save a photo object
// [3]. update a photo object
// [4]. delete a photo object

// Work
// [1]. build a work object
// [2]. save a work object
// [3]. update a work object
// [4]. delete a work object


before((done) => {
    // setup db connection
    db = require('../../db/db.connection');
    UserModel = db.sequelize.models.User;
    genUUID4 = db.sequelize.genUUID4;
    done();
});

// load dummy data
beforeEach(done => {
    UserBody = {
        username: 'username',
        firstName: 'firstname',
        lastName: 'lastname',
        id: genUUID4(),
        email: 'first@last.com',
        password: 'password',
        passwordConfirm: 'password'
    };
    done();
});

afterEach(done => {
    // TODO delete the user from db
    delete require.cache[require.resolve( '../server' )];
    done()
});

after(done => {
    done()
});



describe('POST', () => {

    it('/api/users/register registers a new user', done => {

    });

});





