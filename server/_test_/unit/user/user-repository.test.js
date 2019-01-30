const chai = require('chai');
const expect = chai.expect;

// load user repository functions for testing
const {

    buildModel,
    buildJoinType,
    deleteByPk,
    deleteBy,
    findByPk,
    findBy,
    save,
    update,

} = require('../../../repository/user.repository');

// define user object

let userObject = {
    username: 'pygnasak-repo',
    firstName: 'phouthalang-first-repo',
    lastName: 'pygnasak-last-repo',
    email: 'enrollmi@gmail.com',
    password: 'password-test-repo'
};

/*******************************************
 SETUP
 *******************************************/

let instance1 = null;
let instance2 = null;
let instance3 = null;
let instance4 = null;
let randomVal = 0;
let errorMessages = [];


let db = null;
let Model = null;
before(done => {

    db = require('../../../db/db.connection');

    Model = {
        DomainType,
        Education,
        Profile,
        User,
        Verify,
    } = db.sequelize.models;


    db.sequelize.sync().then(res => {
        console.log('done connecting to database ... ', '00003');
        done();

    }).catch(err => {
        console.log('errors trying to connect to db ... ', err);
        done(err);
    })
});


beforeEach(done => {
    randomVal = Math.floor((Math.random() * 1000));

    const user = buildModel('User', userObject);

    expect(user.id).to.be.a('string');
    expect(user).to.have.property('username');
    expect(user).to.have.property('firstName');
    expect(user).to.have.property('lastName');
    expect(user).to.have.property('email');
    expect(user).to.have.property('password');
    expect(user).to.be.instanceof(Model.User);
    instance1 = user;

    const verifyRecord = buildModel('Verify', user);

    expect(verifyRecord.id).to.be.a('string');
    expect(verifyRecord.id).to.equal(user.id);
    expect(verifyRecord).to.have.property('id');
    expect(verifyRecord).to.be.instanceof(Model.Verify);
    instance2 = verifyRecord;


    const domainTypeObject = {
        name: 'Education-' + randomVal,
        desc: 'Identifies the domain type related to education',
        isActive: true
    };

    const domainRecord = buildModel('DomainType', domainTypeObject);

    expect(domainRecord.id).to.be.a('string');
    expect(domainRecord.dataValues).to.have.any.keys(['id', 'name', 'desc']);
    expect(domainRecord).to.be.instanceof(Model.DomainType);
    instance3 = domainRecord;

    const profile = buildJoinType(
        'Profile',
        'userId',
        instance1.id,
        'domainTypeId',
        instance3.id);

    expect(profile.id).to.be.a('string');
    expect(profile.userId).to.equal(user.id);
    expect(profile.dataValues).to.contain.all.keys('id', 'userId', 'domainTypeId', 'isActive');
    expect(profile).to.be.an.instanceof(Model.Profile);
    instance4 = profile;

    done();
});

afterEach(done => {

    deleteByPk('User', instance1.id);
    deleteByPk('Verify', instance2.id);
    deleteByPk('DomainType', instance3.id);
    deleteByPk('Profile', instance4.id);
    done();

    errorMessages = [];
});


function formatSQLErrorMessages(err) {
    if (typeof err.actual === 'object' && err.actual.length > 0) {
        err.actual.forEach((e, i) => {
            message = e.message;
            type = e.type;
            path = e.path;
            value = e.value;
            errorMessage = `${i + 1}: Message = ${message} // type: ${type} // ${path}::${value}`;
            errorMessages.push(errorMessage);
        });
    }
}

async function saveRecordsBeforeTest() {
    await save('User', instance1);
    await save('Verify', instance2);
    await save('DomainType', instance3);
    await save('Profile', instance4);
}

/*******************************************
 TESTS
 *******************************************/


// USER MODEL
describe('saves an instance of a model', () => {

    it('should save a user instance', done => {
        save('User', instance1).then(res => {

            expect(res).to.have.property('username');
            expect(res).to.have.property('email');
            done();

        }).catch(err => {

            formatSQLErrorMessages(err);
            done(new Error(errorMessages));

        });
    })

});

describe('throw unique constraint error if user exists', () => {

    it('should throw unique constraint error for non-unique field', done => {

        save('User', instance1);
        save('User', instance1).then(res => {

            expect(res).to.be.an('Array');
            done();

        }).catch(err => {

            formatSQLErrorMessages(err);
            done(new Error(errorMessages));

        });
    });

});

describe('find an instance of a model by primary key', () => {

    it(`should find user by Pk`, done => {
        save('User', instance1).then(res => {
            findByPk('User', res.id).then(res => {

                expect(res).to.exist;
                expect(res.id).to.equal(instance1.id);
                done();

            }).catch(err => {

                done(err);
            });
        });
    });
});

describe('find an instance of a model by specified field and value', () => {

    it(`should find user by email`, done => {
        save('User', instance1).then(res => {
            findBy('User', 'email', instance1.email).then(res => {

                expect(res.email).to.equal(instance1.email);
                expect(res.id).to.equal(instance1.id);

                done();

            }).catch(e => {

                done(e);
            });
        });
    });
});

describe('update fields of an existing model', () => {

    it(`should update fields with the models id`, done => {

        save('User', instance1).then(res => {
            res.username = 'changing username';
            res.firstName = 'changing firstName';
            res.lastName = 'changing lastName';
            res.email = 'changing@email.com';
            res.password = 'changing password';

            update('User', res).then(res => {

                expect(res).to.eql([1]);
                expect(res).to.be.a('array');
                done();

            }).catch(e => {

                done(e);
            })

        })

    });

});

describe('delete record of an existing model', () => {

    it(`should delete record by the models id`, done => {

        save('User', instance1).then(res => {
            deleteByPk('User', res.id).then(res => {

                expect(res).to.equal(1);
                expect(res).to.be.a('number');
                done();

            }).catch(e => {

                done(e);
            })

        });
    })
});


// VERIFY MODEL
describe('saves an instance of verify model', () => {

    it(`should save a verify record with user-id as primary key`, done => {

        save('User', instance1);
        save('Verify', instance2).then(res => {

            expect(res).to.not.have.property('errors');
            expect(res).to.have.property('id');
            expect(res.id).to.equal(instance1.id);

            done();

        }).catch(err => {

            formatSQLErrorMessages(err);
            done(new Error(errorMessages));

        });

    });
});

describe('finds a verify record', () => {

    it(`finds the verify record with the users id`, done => {

        saveRecordsBeforeTest().then(() => {
            findByPk('Verify', instance1.id).then(res => {

                expect(res).to.exist;
                expect(res.id).to.equal(instance1.id);
                expect(res).to.have.all.keys('id', 'createdAt', 'updatedAt');
                done();

            }).catch(err => {

                done(err);

            });
        });
    });
});


// DOMAIN MODEL
describe('saves an instance of domain type model', () => {

    it(`should save a domain-type record`, done => {

        save('DomainType', instance3).then(res => {

            expect(res).to.not.have.property('errors');
            expect(res).to.have.property('id');

            done();

        }).catch(err => {

            formatSQLErrorMessages(err);
            done(new Error(errorMessages));

        });

    });
});

describe('finds a domain type record', () => {

    it(`finds a domain-type record `, done => {

        saveRecordsBeforeTest().then(() => {
            findByPk('DomainType', instance3.id).then(res => {

                expect(res).to.exist;
                expect(res.id).to.equal(instance3.id);
                expect(res).to.have.all.keys(['id', 'desc', 'name', 'isActive', 'createdAt', 'updatedAt']);
                done();

            }).catch(err => {

                done(err);
            });
        });
    })
});


// PROFILE MODEL
describe('saves an instance of profile model', () => {

    it(`should save a profile record`, done => {

        saveRecordsBeforeTest().then(() => {
            save('Profile', instance4).then(res => {

                expect(res).to.not.have.property('errors');
                expect(res).to.have.property('id');
                expect(res).to.have.property('userId');
                expect(res).to.have.property('domainTypeId');

                done();

            }).catch(err => {

                formatSQLErrorMessages(err);
                done(new Error(errorMessages));

            });
        });
    });

});

describe('finds a profile by a specified field', () => {

    it(`finds a domain-type record by id of user`, done => {

        saveRecordsBeforeTest().then(() => {
            findBy('Profile', 'userId', instance4.userId).then(res => {

                expect(res).to.exist;
                expect(res.userId).to.equal(instance1.id);
                expect(res).to.have.all.keys(['id', 'userId', 'domainTypeId', 'isActive', 'createdAt', 'updatedAt']);
                done();

            }).catch(err => {

                done(err);
            });
        });
    })
});


// EDUCATION MODEL





