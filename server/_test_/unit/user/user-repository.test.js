const chai = require('chai');
const expect = chai.expect;

// load user repository functions for testing
const {

    buildEducation,
    buildHistory,
    buildPersona,
    buildPhoto,
    buildProfile,
    buildUser,
    buildVerify,
    buildWork,

    activateAccount,
    deleteUser,
    deleteVerify,
    findByEmail,
    findById,
    findByUsername,
    findVerify,
    saveUser,
    updateUser
} = require('../../../repository/user.repository');


// load dummy data
beforeEach(done => {
    done();
});

after(done => {
    done()
});


// User
// [1]. find a user object
// [2]. build a user object
// [3]. save a user object
// [4]. update a user object
// [5]. delete a user object

describe('CRUD User', () => {

    let db = null;
    let UserModel = null;

    let user = null;
    let genUUID4 = null;
    let UserData = null;
    let bcryptPassword = null;
    let foundUser = null;
    let originUser = null;


    before((done) => {
        db = require('../../../db/db.connection'); // get db connection
        genUUID4 = db.genUUID4;
        UserModel = db.sequelize.models.User;
        bcryptPassword = require('../../../services/common/common.service').bcryptPassword;
        done();
    });

    after(done => {
        done()
    });

    beforeEach(done => {
        foundUser = null;
        done();
    });

    it('should build sequelize user model', done => {
        UserData = {
            username: 'username',
            firstName: 'firstname',
            lastName: 'lastname',
            id: genUUID4(),
            email: 'first@last.com',
            password: 'password-test'
        };


        user = buildUser(UserData);
        expect(user.username).to.equal(UserData.username);
        expect(user.firstName).to.equal(UserData.firstName);
        expect(user.lastName).to.equal(UserData.lastName);
        expect(user.email).to.equal(UserData.email);
        expect(user.password).to.equal(UserData.password);
        // expect(User.password).to.equal('wrong');
        expect(user).to.be.instanceof(UserModel);
        done();

    });

    it('should hash and set user password to hashed password', done => {

        bcryptPassword(user).then(hash => {
            user.password = hash;
            expect(user.password).to.not.be.equal(UserData.password);
            expect(user.password).to.equal(hash);

            // expect(user.password).to.equal(30);
            done();
        }).catch(e => {
            done(e);
        });

    });

    it('should save user to database', done => {

        saveUser(user).then(res => {
            originUser = {...user.dataValues};
            expect(originUser.username).to.equal(user.username);

            done();
        }).catch(e => {
            done(e);
        });

    });

    it('should find a user by ID, when user does exist', done => {

        findById(user.id).then(res => {
            foundUser = res;

            expect(foundUser.id).to.equal(originUser.id);
            done();

        }).catch(e => {
            done(e);
        });


    });

    it('should find a user by EMAIL, when user does exist', done => {

        findByEmail(user.email).then(res => {
            foundUser = res;

            expect(foundUser.email).to.equal(originUser.email);
            done();

        }).catch(e => {
            done(e);
        });
    });

    it('should find a user by Username, when user does exist', done => {

        findByUsername(user.username).then(res => {
            foundUser = res;

            expect(foundUser.username).to.equal(originUser.username);
            done();

        }).catch(e => {
            done(e);
        });
    });

    it('should update user by id', done => {
        user.username = 'changing username';

        updateUser(user).then(res => {
            foundUser = res;

            expect(foundUser.username).to.equal(user.username);
            expect(foundUser.username).to.not.be.equal(originUser.username);
            done();

        }).catch(e => {
            done(e);
        })
    })
});


// [1]. find a user object
// [2]. build a user object
// [3]. save a user object
// [4]. update a user object
// [5]. delete a user object


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









