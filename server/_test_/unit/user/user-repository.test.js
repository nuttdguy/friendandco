const chai = require('chai');
const expect = chai.expect;

// load user repository functions for testing
const {

    buildModel,
    buildJoinModel,

    deleteOne,
    deleteBy,
    findByPk,
    findBy,
    save,
    update,

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
    const ModelName = 'User';
    let Model = null;

    let instance = null;
    let bcryptPassword = null;
    let copiedInstance = null;
    let copiedResponse = null;


    before((done) => {
        db = require('../../../db/db.connection'); // get db connection
        Model = db.sequelize.models[ModelName];
        bcryptPassword = require('../../../services/common/common.service').bcryptPassword;
        done();
    });

    after(done => {
        deleteOne(ModelName, instance.id);
        done()
    });

    it(`should build => ${ModelName}` , done => {
        instance = {
            username: 'username',
            firstName: 'firstname',
            lastName: 'lastname',
            email: 'first@last.com',
            password: 'password-test'
        };


        instance = buildModel(ModelName, instance);
        expect(instance.id).to.be.a('string');
        expect(instance).to.have.property('username');
        expect(instance).to.have.property('firstName');
        expect(instance).to.have.property('lastName');
        expect(instance).to.have.property('email');
        expect(instance).to.have.property('password');
        // expect(User.password).to.equal('wrong');
        expect(instance).to.be.instanceof(Model);
        done();

    });

    it(`should hash and set user password to hashed password`, done => {

        bcryptPassword(instance).then(res => {
            copiedResponse = res;

            instance.password = copiedResponse;
            expect(instance.password).to.equal(copiedResponse);

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');
            done();
        }).catch(e => {

            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        });

    });

    it(`should save and enforce constraint => ${ModelName} `, done => {

        save(ModelName, instance).then(res => {
            copiedResponse = res;

            expect(copiedResponse.username).to.equal(instance.username);
            expect(copiedResponse).to.have.property('username');
            expect(copiedResponse).to.have.property('firstName');
            expect(copiedResponse).to.have.property('lastName');
            expect(copiedResponse).to.have.property('email');
            expect(copiedResponse).to.have.property('password');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');

            copiedInstance = {...res};
            done();
        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        });

    });

    it(`should find ${ModelName} by Pk`, done => {

        findByPk(ModelName, instance.id).then(res => {
            copiedResponse = res;

            expect(copiedResponse.id).to.equal(instance.id);

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');

            done();
        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        });


    });

    it(`should find ${ModelName} email`, done => {

        findBy(ModelName, 'email', instance.email).then(res => {
            copiedResponse = res;

            expect(copiedResponse.email).to.equal(instance.email);
            expect(copiedResponse.id).to.equal(instance.id);

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        });
    });

    it(`should find ${ModelName} username`, done => {

        findBy(ModelName, 'username', instance.username).then(res => {
            copiedResponse = res;

            expect(copiedResponse.username).to.equal(instance.username);
            expect(copiedResponse.id).to.equal(instance.id);

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        });
    });

    it(`should update ${ModelName} by id`, done => {
        copiedInstance.username = 'changing username';
        copiedInstance.firstName = 'changing firstName';
        copiedInstance.lastName = 'changing lastName';
        copiedInstance.email = 'changing email';
        copiedInstance.password = 'changing password';

        update(ModelName, copiedInstance).then(res => {
            copiedResponse = res;

            expect(copiedResponse).to.eql([1]);
            expect(copiedResponse).to.be.a('array');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        })
    });

    it(`should delete ${ModelName} id`, done => {
        deleteOne(ModelName, instance.id).then(res => {
            copiedResponse = res;

            expect(copiedResponse).to.equal(1);
            expect(copiedResponse).to.be.a('number');

            // check for SQL exceptions
            expect(res).to.not.have.property('original');
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
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
    let user = null;
    const User = 'User';
    const ModelName = 'Verify';
    let Model = null;

    let instance = null;
    let copiedResponse = null;
    let copiedInstance = null;


    before((done) => {
        db = require('../../../db/db.connection');
        Model = db.sequelize.models[ModelName];

        user = buildModel(User, {
            username: 'verifyUsername',
            firstName: 'verifyName',
            lastName: 'lastname',
            email: 'first@verify.com',
            password: 'verify-password-test'
        });

        save(User, user).then(res => {
            copiedResponse = res;

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');

            user = {...res};
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }
            console.log(e);
            done(e);
        })

    });

    beforeEach(done => {
        copiedResponse = null;
        done();
    });

    after(done => {
        deleteOne(User, user.id);
        done();
    });

    it(`should build => ${ModelName} => preconditions: ${User}`, done => {

        instance = buildModel(ModelName, user); // send user payload

        expect(instance.dataValues.id).to.be.a('string');
        expect(instance.dataValues).to.contain.all.keys('id');
        expect(instance).to.be.instanceof(Model);
        done();

    });

    it(`should save and enforce constraint => ${ModelName} => preconditions: ${User}`, done => {

        save(ModelName, instance).then(res => {
            copiedResponse = res;

            expect(copiedResponse.id).to.equal(user.id);
            expect(copiedResponse).to.have.all.keys('id', 'createdAt', 'updatedAt');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');

            // copy saved object on success
            copiedInstance = {...res};
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        })


    });

    it(`should find verify record ${ModelName} by associated user id`, done => {

        findByPk(ModelName, instance.id).then(res => {
            copiedResponse = res;

            expect(copiedResponse.id).to.equal(user.id);
            expect(copiedResponse).to.have.all.keys('id', 'createdAt', 'updatedAt');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        })

    });

    it(`should delete verify record ${ModelName} by associated user id`, done => {
        deleteOne(ModelName, instance.id).then(res => {
            copiedResponse = res;

            expect(copiedResponse).to.equal(1);
            expect(copiedResponse).to.be.a('number');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
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
    let user = null;
    let domainType = null;
    const User = 'User';
    const DomainType = 'DomainType';
    const ModelName = 'Profile';
    let Model = null;

    let instance = null;
    let copiedResponse = null;
    let copiedInstance = null;

    before((done) => {
        db = require('../../../db/db.connection');
        Model = db.sequelize.models[ModelName];

        user = buildModel(User, {
            username: 'profileUsername',
            firstName: 'profileName',
            lastName: 'lastname',
            email: 'first@profile.com',
            password: 'profile-password-test'
        });

        domainType = buildModel(DomainType, {
            name: 'Education',
            desc: 'Identifies the domain type related to education',
            isActive: true
        });

        save(User, user)
            .then(res => {
                // check for SQL exceptions
                expect(res).to.not.have.property('original');

                user = res;
            })
            .catch(e => {
                if (copiedResponse.hasOwnProperty('original')) {
                    console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
                }

                console.log(e);
            });

        save(DomainType, domainType)
            .then(res => {
                // check for SQL exceptions
                expect(res).to.not.have.property('original');
                domainType = res;
            })
            .catch(e => {
                if (copiedResponse.hasOwnProperty('original')) {
                    console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
                }

                console.log(e);
            });

        done();
    });

    beforeEach(done => {
        copiedResponse = null;
        done();
    });

    after(done => {
        deleteOne(User, user.id);
        done();
    });

    it(`should build => ${ModelName} => preconditions: ${User} + ${DomainType}`, done => {

        instance = buildJoinModel(ModelName, user.id, domainType.id, 'userId', 'domainTypeId'); // send user payload

        expect(instance.id).to.be.a('string');
        expect(instance.userId).to.equal(user.id);
        expect(instance.domainTypeId).to.equal(domainType.id);
        expect(instance.dataValues).to.contain.all.keys('id', 'userId', 'domainTypeId', 'isActive');
        expect(instance).to.be.instanceof(Model);

        done();

    });

    it(`should save => ${ModelName} => preconditions: ${User} + ${DomainType}`, done => {

        save(ModelName, instance).then(res => {
            copiedResponse = res;

            expect(copiedResponse.id).to.be.a('string');
            expect(copiedResponse.userId).to.equal(user.id);
            expect(copiedResponse.domainTypeId).to.equal(domainType.id);
            expect(copiedResponse).to.contain.all.keys('id', 'userId', 'domainTypeId', 'isActive', 'updatedAt', 'createdAt');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');

            copiedInstance = {...res};
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        })

    });

    it(`should find profile ${ModelName} by user id`, done => {

        findBy(ModelName, 'userId', user.id).then(res => {
            copiedResponse = res;

            expect(copiedResponse.id).to.be.a('string');
            expect(copiedResponse.id).to.equal(instance.id);
            expect(copiedResponse.userId).to.equal(user.id);
            expect(copiedResponse.domainTypeId).to.equal(domainType.id);
            expect(copiedResponse).to.contain.all.keys('id', 'userId', 'domainTypeId', 'isActive', 'updatedAt', 'createdAt');


            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        })

    });

    it('should update profile isActive by user id', done => {

        copiedInstance.isActive = false;

        update(ModelName, copiedInstance).then(res => {
            copiedResponse = res;

            expect(copiedResponse).to.eql([1]);
            expect(copiedResponse).to.be.a('array');


            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        })

    });

    it('should delete profile by user id', done => {

        deleteBy(ModelName, 'userId', copiedInstance.userId).then(res => {
            copiedResponse = res;

            expect(copiedResponse).to.equal(1);
            expect(copiedResponse).to.be.a('number');


            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        })
    })

});

// DomainType
// [1]. build a domainType object
// [2]. save a domainType object
// [3]. update a domainType object
// [4]. delete a domainType object
describe('CRUD Domain', () => {

    const ModelName = "DomainType";
    let db = null;
    let Model = null;

    let instance = null;
    let copiedResponse = null;
    let copiedInstance = null;

    before((done) => {
        db = require('../../../db/db.connection');
        Model = db.sequelize.models[ModelName];

        instance = {
            name: 'Education',
            desc: 'Identifies the domain type related to education',
            isActive: true
        };

        done();
    });

    after(done => {
        deleteOne(ModelName, instance.id);
        done();
    });

    it(`should build => ${ModelName}`, done => {

        instance = buildModel(ModelName, instance);

        expect(instance.id).to.be.a('string');
        expect(instance.dataValues).to.contain.all.keys('id', 'name', 'desc', 'isActive');
        expect(instance).to.be.instanceof(Model);

        done();
    });

    it(`should save => ${ModelName} by id`, done => {

        // console.log(instance);
        save(ModelName, instance).then(res => {
            copiedResponse = res;

            expect(copiedResponse.id).to.be.a('string');
            expect(copiedResponse).to.contain.all.keys('id', 'name', 'desc', 'isActive', 'createdAt', 'updatedAt');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');

            copiedInstance = {...res};
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        });

    });

    it(`should find => ${ModelName} by id`, done => {

        findByPk(ModelName, instance.id).then(res => {
            copiedResponse = res;

            expect(copiedResponse.id).to.be.a('string');
            expect(copiedResponse).to.have.all.keys('id', 'name', 'desc', 'isActive', 'createdAt', 'updatedAt');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');

            done();
        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        });

    });

    it(`should update => ${ModelName} by id`, done => {

        copiedInstance.desc = 'Update desc';
        copiedInstance.name = 'Update Education';
        copiedInstance.isActive = false;

        update(ModelName, copiedInstance).then(res => {
            copiedResponse = res;

            expect(copiedResponse).to.eql([1]);
            expect(copiedResponse).to.be.a('array');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');

            done();
        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }
            console.log(e);
            done(e);
        });

    });

    it(`should delete => ${ModelName} by id`, done => {

        deleteOne(ModelName, instance.id).then(res => {
            copiedResponse = res;

            expect(copiedResponse).to.equal(1);
            expect(copiedResponse).to.be.a('number');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');
            done()
        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }
            console.log(e);
            done(e);
        })
    })

});

// Education: precondition => none
// [1]. build an education object
// [2]. save an education object
// [3]. update an education object
// [4]. delete an education object
describe('CRUD Education', () => {

    const ModelName = 'Education';
    let db = null;
    let Model = null;

    let instance = null;
    let copiedResponse = null;
    let copiedInstance = null;

    before((done) => {
        db = require('../../../db/db.connection');
        Model = db.sequelize.models[ModelName];

        instance = {
            industry: 'Education',
            specialty: 'Grade School Teacher',
        };

        done();
    });

    after(done => {
        deleteOne(ModelName, instance.id);
        done();
    });

    it(`should build => ${ModelName}`, done => {

        instance = buildModel(ModelName, instance);

        expect(instance.id).to.be.a('string');
        expect(instance.dataValues).to.contain.all.keys('id', 'industry', 'specialty');
        expect(instance).to.be.instanceof(Model);

        done();
    });

    it(`should save => ${ModelName}`, done => {

        save(ModelName, instance).then(res => {
            copiedResponse = res;

            expect(copiedResponse.id).to.be.a('string');
            expect(copiedResponse).to.contain.all.keys('id', 'industry', 'specialty','createdAt', 'updatedAt');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');

            copiedInstance = {...res};
            done();

        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        });

    });

    it(`should find => ${ModelName} by id`, done => {

        findByPk(ModelName, instance.id).then(res => {
            copiedResponse = res;

            expect(copiedResponse.id).to.be.a('string');
            expect(copiedResponse).to.contain.all.keys('id', 'industry', 'specialty','createdAt', 'updatedAt');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');

            done();
        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }

            console.log(e);
            done(e);
        });

    });

    it(`should update => ${ModelName} by id`, done => {

        copiedInstance.industry = 'Update education';
        copiedInstance.specialty = 'Update specialty';

        update(ModelName, copiedInstance).then(res => {
            copiedResponse = res;

            expect(copiedResponse).to.eql([1]);
            expect(copiedResponse).to.be.a('array');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');

            done();
        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }
            console.log(e);
            done(e);
        });

    });

    it(`should delete => ${ModelName} by id`, done => {

        deleteOne(ModelName, instance.id).then(res => {
            copiedResponse = res;

            expect(copiedResponse).to.equal(1);
            expect(copiedResponse).to.be.a('number');

            // check for SQL exceptions
            expect(copiedResponse).to.not.have.property('original');
            done()
        }).catch(e => {
            if (copiedResponse.hasOwnProperty('original')) {
                console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
            }
            console.log(e);
            done(e);
        })
    })

});

// History
// [1]. build a history object
// [2]. save a history object
// [3]. update a history object
// [4]. delete a history object
// describe('CRUD History', () => {
//
//     // TODO START HERE ...
//     const ModelName = 'History';
//     let db = null;
//     let Model = null;
//
//     let instance = null;
//     let copiedResponse = null;
//     let copiedInstance = null;
//
//     before((done) => {
//         db = require('../../../db/db.connection');
//         Model = db.sequelize.models[ModelName];
//
//         instance = {
//             industry: 'Education',
//             specialty: 'Grade School Teacher',
//         };
//
//         done();
//     });
//
//     after(done => {
//         deleteOne(ModelName, instance.id);
//         done();
//     });
//
//     it(`should build => ${ModelName}`, done => {
//
//         instance = buildModel(ModelName, instance);
//
//         expect(instance.id).to.be.a('string');
//         expect(instance.dataValues).to.contain.all.keys('id', 'industry', 'specialty');
//         expect(instance).to.be.instanceof(Model);
//
//         done();
//     });
//
//     it(`should save => ${ModelName}`, done => {
//
//         save(ModelName, instance).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse.id).to.be.a('string');
//             expect(copiedResponse).to.contain.all.keys('id', 'industry', 'specialty','createdAt', 'updatedAt');
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//
//             copiedInstance = {...res};
//             done();
//
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//
//             console.log(e);
//             done(e);
//         });
//
//     });
//
//     it(`should find => ${ModelName} by id`, done => {
//
//         findByPk(ModelName, instance.id).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse.id).to.be.a('string');
//             expect(copiedResponse).to.contain.all.keys('id', 'industry', 'specialty','createdAt', 'updatedAt');
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//
//             done();
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//
//             console.log(e);
//             done(e);
//         });
//
//     });
//
//     it(`should update => ${ModelName} by id`, done => {
//
//         copiedInstance.industry = 'Update education';
//         copiedInstance.specialty = 'Update specialty';
//
//         update(ModelName, copiedInstance).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse).to.eql([1]);
//             expect(copiedResponse).to.be.a('array');
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//
//             done();
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//             console.log(e);
//             done(e);
//         });
//
//     });
//
//     it(`should delete => ${ModelName} by id`, done => {
//
//         deleteOne(ModelName, instance.id).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse).to.equal(1);
//             expect(copiedResponse).to.be.a('number');
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//             done()
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//             console.log(e);
//             done(e);
//         })
//     })
//
// });




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









