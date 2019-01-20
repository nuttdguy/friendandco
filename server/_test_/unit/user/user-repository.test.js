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
    deleteEducation,
    deleteProfile,
    deleteUser,
    deleteVerify,
    findByEmail,
    findById,
    findByUsername,
    findProfile,
    findVerify,
    saveProfile,
    saveUser,
    saveVerify,
    updateProfile,
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
    let UserData = null;
    let bcryptPassword = null;
    let foundUser = null;
    let originUser = null;


    before((done) => {
        db = require('../../../db/db.connection'); // get db connection
        UserModel = db.sequelize.models.User;
        bcryptPassword = require('../../../services/common/common.service').bcryptPassword;
        done();
    });

    after(done => {
        deleteUser(originUser.id);
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
            email: 'first@last.com',
            password: 'password-test'
        };


        user = buildUser(UserData);
        expect(user.id).to.be.a('string');
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
    });

    it('should delete user by id', done => {
        deleteUser(user.id).then(res => {
            foundUser = res;

            expect(foundUser).to.equal(1);
            expect(foundUser).to.be.a('number');
            done()
        }).catch(e => {
            done(e);
        })
    })

});


// Verify
// [1]. build a verify email object
// [2]. save a verify email object
// [3]. update a verify email object
// [4]. delete a verify email object
describe('CRUD Verify', () => {

    let db = null;
    let userPayload = null;
    let VerifyModel = null;

    let verify = null;
    let foundVerify = null;
    let originVerify = null;


    before((done) => {
        db = require('../../../db/db.connection');
        VerifyModel = db.sequelize.models.Verify;

        userPayload = buildUser({
            username: 'verifyUsername',
            firstName: 'verifyName',
            lastName: 'lastname',
            email: 'first@verify.com',
            password: 'verify-password-test'
        });

        done();
    });

    beforeEach(done => {
        foundVerify = null;
        done();
    });

    after(done => {
        deleteUser(userPayload.id);
        done();
    });

    it('should build sequelize Verify model with user data as payload', done => {

        verify = buildVerify(userPayload); // send user payload

        expect(verify.dataValues.id).to.be.a('string');
        expect(verify.dataValues).to.contain.all.keys('id');
        expect(verify).to.be.instanceof(VerifyModel);
        done();

    });

    it('should enforce user model constraint when saving verify record to database', done => {

        saveUser(userPayload).then(user => {

            saveVerify(verify).then(res => {
                originVerify = {...verify.dataValues}; // save original

                expect(res.id).to.equal(userPayload.id);
                expect(res).to.have.all.keys('id', 'createdAt', 'updatedAt');

                userPayload = {...user};
                done();
            }).catch(e => {
                done(e);
            });
        }).catch(e => {
            done(e)
        })

    });

    it('should find verify record url by user id', done => {

        findVerify(userPayload.id).then(res => {
            verify = res;

            expect(verify.id).to.equal(userPayload.id);
            expect(res).to.have.all.keys('id', 'createdAt', 'updatedAt');

            done();

        }).catch(e => {
            done(e);
        });


    });

    it('should delete verify record when url record is found', done => {
        deleteVerify(verify.id).then(res => {
            verify = res;

            expect(verify).to.equal(1);
            expect(verify).to.be.a('number');

            done()
        }).catch(e => {
            done(e);
        })
    })

});


// Profile
// [1]. build a profile object
// [2]. save a profile object
// [3]. update a profile object
// [4]. delete a profile object
describe('CRUD Profile', () => {

    let db = null;
    let userPayload = null;
    let ProfileModel = null;

    let profile = null;
    let foundProfile = null;
    let originProfile = null;
    let response = null;


    before((done) => {
        db = require('../../../db/db.connection');
        ProfileModel = db.sequelize.models.Profile;

        userPayload = buildUser({
            username: 'profileUsername',
            firstName: 'profileName',
            lastName: 'lastname',
            email: 'first@profile.com',
            password: 'profile-password-test'
        });

        saveUser(userPayload).then(res => {
            userPayload = res;
            done();
        });

    });

    beforeEach(done => {
        foundProfile = null;
        done();
    });

    after(done => {
        // deleteProfile(profile.id);
        deleteUser(userPayload.id);
        done();
    });

    it('should build a Profile using an existing user id', done => {

        profile = buildProfile(userPayload); // send user payload

        expect(profile.id).to.be.a('string');
        expect(profile.userId).to.equal(userPayload.id);
        expect(profile.dataValues).to.contain.all.keys('id', 'userId', 'domainName', 'isActive');
        expect(profile).to.be.instanceof(ProfileModel);

        done();

    });

    it('should save profile; precondition is that user exists', done => {

        saveProfile(profile).then(res => {
            response = res;

            expect(response.id).to.be.a('string');
            expect(response.userId).to.equal(userPayload.id);
            expect(response).to.contain.all.keys('id', 'userId', 'domainName', 'isActive', 'updatedAt', 'createdAt');


            profile = {...response};
            done();

        }).catch(e => {
            if (response.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', response.original.sqlMessage);
            }
            done(e);
        });

    });

    // it('should find profile by user id', done => {
    //
    //     findProfile(userPayload.id).then(res => {
    //         profile = res;
    //
    //         expect(profile.id).to.be.a('string');
    //         expect(profile.id).to.equal(userPayload.id);
    //         expect(profile).to.contain.all.keys('id', 'isActive', 'updatedAt', 'createdAt');
    //
    //         done();
    //
    //     }).catch(e => {
    //         console.log(e);
    //         done(e);
    //     });
    //
    // });
    //
    // it('should update profile isActive by user id', done => {
    //
    //     profile.isActive = false;
    //
    //     updateProfile(profile).then(res => {
    //
    //         expect(res.id).to.equal(profile.id);
    //         expect(res.isActive).to.equal(false);
    //         expect(res.isActive).to.not.equal(originProfile.isActive);
    //         expect(res).to.contain.all.keys('id', 'isActive', 'updatedAt', 'createdAt');
    //
    //         profile = {...res};
    //         done();
    //
    //     }).catch(e => {
    //         console.log(e);
    //         done(e);
    //     });
    //
    // });
    //
    // it('should delete profile by user id', done => {
    //
    //     deleteProfile(userPayload.id).then(res => {
    //         profile = res;
    //
    //         expect(profile).to.equal(1);
    //         expect(profile).to.be.a('number');
    //
    //         done()
    //     }).catch(e => {
    //         done(e);
    //     })
    // })

});


// Education: precondition - requires user + profile
// [1]. build an education object
// [2]. save an education object
// [3]. update an education object
// [4]. delete an education object
// describe('CRUD Education', () => {
//
//     let db = null;
//     let userPayload = null;
//     let profilePayload = null;
//     let EducationModel = null;
//
//     let education = null;
//     let foundEducation = null;
//     let originEducation = null;
//
//
//     before((done) => {
//         db = require('../../../db/db.connection');
//         EducationModel = db.sequelize.models.Education;
//
//         userPayload = buildUser({
//             username: 'profileUsername',
//             firstName: 'profileName',
//             lastName: 'lastname',
//             email: 'first@profile.com',
//             password: 'profile-password-test'
//         });
//
//         saveUser(userPayload).then(res => {
//             userPayload = res;
//             saveProfile(userPayload).then(res => {
//                 profilePayload = res;
//                 done();
//             })
//         });
//
//     });
//
//     beforeEach(done => {
//         foundEducation = null;
//         done();
//     });
//
//     after(done => {
//         deleteEducation(education.id);
//         done();
//     });
//
//     it('should build a Education using an existing user id', done => {
//
//         education = buildEducation();
//
//         expect(education.id).to.be.a('string');
//         expect(education.id).to.equal(userPayload.id);
//         expect(education.dataValues).to.contain.all.keys('id', 'industry', 'specialty', 'createdAt', 'updatedAt');
//         expect(education).to.be.instanceof(EducationModel);
//
//         done();
//     });
//
//     // it('should save profile; precondition is that user exists', done => {
//     //
//     //     saveUser(userPayload).then(user => {
//     //
//     //         saveProfile(profile).then(res => {
//     //             profile = res;
//     //
//     //             expect(profile.id).to.be.a('string');
//     //             expect(profile.id).to.equal(userPayload.id);
//     //             expect(profile).to.contain.all.keys('id', 'isActive', 'updatedAt', 'createdAt');
//     //
//     //             originProfile = {...profile};
//     //             done();
//     //         }).catch(e => {
//     //             done(e);
//     //         });
//     //     }).catch(e => {
//     //         done(e)
//     //     });
//     //
//     // });
//     //
//     // it('should find profile by user id', done => {
//     //
//     //     findProfile(userPayload.id).then(res => {
//     //         profile = res;
//     //
//     //         expect(profile.id).to.be.a('string');
//     //         expect(profile.id).to.equal(userPayload.id);
//     //         expect(profile).to.contain.all.keys('id', 'isActive', 'updatedAt', 'createdAt');
//     //
//     //         done();
//     //
//     //     }).catch(e => {
//     //         console.log(e);
//     //         done(e);
//     //     });
//     //
//     // });
//     //
//     // it('should update profile isActive by user id', done => {
//     //
//     //     profile.isActive = false;
//     //
//     //     updateProfile(profile).then(res => {
//     //
//     //         expect(res.id).to.equal(profile.id);
//     //         expect(res.isActive).to.equal(false);
//     //         expect(res.isActive).to.not.equal(originProfile.isActive);
//     //         expect(res).to.contain.all.keys('id', 'isActive', 'updatedAt', 'createdAt');
//     //
//     //         profile = {...res};
//     //         done();
//     //
//     //     }).catch(e => {
//     //         console.log(e);
//     //         done(e);
//     //     });
//     //
//     // });
//     //
//     // it('should delete profile by user id', done => {
//     //
//     //     deleteProfile(userPayload.id).then(res => {
//     //         profile = res;
//     //
//     //         expect(profile).to.equal(1);
//     //         expect(profile).to.be.a('number');
//     //
//     //         done()
//     //     }).catch(e => {
//     //         done(e);
//     //     })
//     // })
//
// });


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









