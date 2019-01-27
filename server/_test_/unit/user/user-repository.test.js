// const chai = require('chai');
// const expect = chai.expect;
//
// // load user repository functions for testing
// const {
//
//     buildModel,
//     buildJoinModel,
//     deleteByPk,
//     deleteBy,
//     findByPk,
//     findBy,
//     save,
//     update,
//
// } = require('../../../repository/user.repository');
//
// // setup db connection and sync
// let db = null;
// before(done => {
//
//     db = require('../../../db/db.connection');
//     db.sequelize.sync().then(res => {
//         console.log('done connecting to database ... ', '00003');
//         done();
//
//     }).catch(err => {
//         console.log('errors trying to connect to db ... ', err);
//         done(err);
//     })
// });
//
//
// // User
// describe('CRUD One User', () => {
//
//     const ModelName = 'User';
//     let Model = null;
//
//     let counter = Math.random();
//     let instance = null;
//     let bcryptPassword = null;
//     let copiedInstance = null;
//     let copiedResponse = null;
//
//
//     before((done) => {
//         Model = db.sequelize.models[ModelName];
//         bcryptPassword = require('../../../services/crypt/crypt.service').bcryptPassword;
//
//         done();
//
//     });
//
//     it(`should build => ${ModelName}`, done => {
//         instance = {
//             username: 'username' + counter,
//             firstName: 'firstname' + counter,
//             lastName: 'lastname' + counter,
//             email: 'first@last.com' + counter,
//             password: 'password-test'
//         };
//
//
//         instance = buildModel(ModelName, instance);
//         expect(instance.id).to.be.a('string');
//         expect(instance).to.have.property('username');
//         expect(instance).to.have.property('firstName');
//         expect(instance).to.have.property('lastName');
//         expect(instance).to.have.property('email');
//         expect(instance).to.have.property('password');
//         expect(instance).to.be.instanceof(Model);
//         done();
//
//     });
//
//     it(`should hash and set user password to hashed password`, done => {
//
//         bcryptPassword(instance).then(res => {
//             copiedResponse = res;
//
//             instance.password = copiedResponse;
//             expect(instance.password).to.equal(copiedResponse);
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//             done();
//         }).catch(e => {
//
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//
//             done(e);
//         });
//
//     });
//
//     it(`should save => ${ModelName} `, done => {
//
//         save(ModelName, instance).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse.username).to.equal(instance.username);
//             expect(copiedResponse).to.have.property('username');
//             expect(copiedResponse).to.have.property('firstName');
//             expect(copiedResponse).to.have.property('lastName');
//             expect(copiedResponse).to.have.property('email');
//             expect(copiedResponse).to.have.property('password');
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//
//             copiedInstance = {...res};
//             done();
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//
//             done(e);
//         });
//
//     });
//
//     it(`should find => ${ModelName} by Pk`, done => {
//
//         findByPk(ModelName, instance.id).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse.id).to.equal(instance.id);
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
//             done(e);
//         });
//
//
//     });
//
//     it(`should find => ${ModelName} email`, done => {
//
//         findBy(ModelName, 'email', instance.email).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse.email).to.equal(instance.email);
//             expect(copiedResponse.id).to.equal(instance.id);
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
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
//     });
//
//     it(`should find => ${ModelName} username`, done => {
//
//         findBy(ModelName, 'username', instance.username).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse.username).to.equal(instance.username);
//             expect(copiedResponse.id).to.equal(instance.id);
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
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
//     });
//
//     it(`should update => ${ModelName} by id`, done => {
//         copiedInstance.username = 'changing username';
//         copiedInstance.firstName = 'changing firstName';
//         copiedInstance.lastName = 'changing lastName';
//         copiedInstance.email = 'changing@email.com';
//         copiedInstance.password = 'changing password';
//
//         update(ModelName, copiedInstance).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse).to.eql([1]);
//             expect(copiedResponse).to.be.a('array');
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//             done();
//
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//
//             console.log(e);
//             done(e);
//         })
//     });
//
//     it(`should delete ${ModelName} id`, done => {
//         deleteByPk(ModelName, instance.id).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse).to.equal(1);
//             expect(copiedResponse).to.be.a('number');
//
//             // check for SQL exceptions
//             expect(res).to.not.have.property('original');
//             done();
//
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//
//             console.log(e);
//             done(e);
//         })
//     })
//
// });
// describe('Enforcing User Constraints', () => {
//     const ModelName = 'User';
//     let Model = null;
//
//     let counter = Math.random();
//     let bcryptPassword = null;
//     let instance1 = null;
//     let instance2 = null;
//     let copiedResponse = null;
//
//     before((done) => {
//         Model = db.sequelize.models[ModelName];
//         bcryptPassword = require('../../../services/crypt/crypt.service').bcryptPassword;
//
//         done();
//
//     });
//
//     afterEach(done => {
//         deleteBy(ModelName, 'id', instance1.id);
//         done();
//     });
//
//     it(`should build => ${ModelName} and make a copy`, done => {
//         const instance = {
//             username: 'username' + counter,
//             firstName: 'firstname' + counter,
//             lastName: 'lastname' + counter,
//             email: 'first@last.com' + counter,
//             password: 'password-test'
//         };
//
//         // build user instance
//         instance1 = buildModel(ModelName, instance);
//         instance2 = buildModel(ModelName, instance);
//
//         expect(instance1).to.be.instanceof(Model);
//         expect(instance2).to.be.instanceof(Model);
//
//         expect(instance1.username).to.equal(instance2.username);
//         expect(instance1.email).to.equal(instance2.email);
//         done();
//
//     });
//
//     it(`should enforce username and email constraint`, done => {
//
//         // save instances
//         save(ModelName, instance1).then(res => {
//             save(ModelName, instance2).then(res => {
//
//                 expect(res['name']).to.equal(
//                     'SequelizeUniqueConstraintError', 'SQL Error: Usernames must be unique');
//
//                 done();
//             }).catch(e => {
//                 done(e);
//             })
//         }).catch(e => {
//             done(e);
//         });
//     });
//
// });
//
// // Verify
// describe('CRUD One Verify', () => {
//
//     let user = null;
//     const User = 'User';
//     const ModelName = 'Verify';
//     let Model = null;
//
//     let counter = Math.random();
//     let instance = null;
//     let copiedResponse = null;
//     let copiedInstance = null;
//
//
//     before((done) => {
//         Model = db.sequelize.models[ModelName];
//
//         user = buildModel(User, {
//             username: 'verifyUsername' + counter,
//             firstName: 'verifyName' + counter,
//             lastName: 'lastname' + counter,
//             email: 'first@verify.com' + counter,
//             password: 'verify-password-test'
//         });
//
//         save(User, user).then(res => {
//             copiedResponse = res;
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//
//             user = {...res};
//             done();
//
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//             console.log(e);
//             done(e);
//         })
//
//     });
//
//     beforeEach(done => {
//         copiedResponse = null;
//         done();
//     });
//
//     after(done => {
//         // should cascade delete
//         deleteByPk(User, user.id);
//         done();
//     });
//
//     it(`should build => ${ModelName} => preconditions: ${User}`, done => {
//
//         instance = buildModel(ModelName, user); // send user payload
//
//         expect(instance.dataValues.id).to.be.a('string');
//         expect(instance.dataValues).to.contain.all.keys('id');
//         expect(instance).to.be.instanceof(Model);
//         done();
//
//     });
//
//     it(`should save and enforce constraint => ${ModelName} => preconditions: ${User}`, done => {
//
//         save(ModelName, instance).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse.id).to.equal(user.id);
//             expect(copiedResponse).to.have.all.keys('id', 'createdAt', 'updatedAt');
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//
//             // copy saved object on success
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
//         })
//
//     });
//
//     it(`should find verify record ${ModelName} by associated user id`, done => {
//
//         findByPk(ModelName, instance.id).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse.id).to.equal(user.id);
//             expect(copiedResponse).to.have.all.keys('id', 'createdAt', 'updatedAt');
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//             done();
//
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//
//             console.log(e);
//             done(e);
//         })
//
//     });
//
//     it(`should delete verify record ${ModelName} by associated user id`, done => {
//         deleteByPk(ModelName, instance.id).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse).to.equal(1);
//             expect(copiedResponse).to.be.a('number');
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//             done();
//
//
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//
//             console.log(e);
//             done(e);
//         })
//     })
//
// });
//
// // Profile
// describe('CRUD One Profile', () => {
//
//     let user = null;
//     let domainType = null;
//     const User = 'User';
//     const DomainType = 'DomainType';
//     const ModelName = 'Profile';
//     let Model = null;
//
//     let counter = Math.random();
//     let instance = null;
//     let copiedResponse = null;
//     let copiedInstance = null;
//
//     before((done) => {
//         // load model to test
//         Model = db.sequelize.models[ModelName];
//
//         // build records to use for test
//         user = buildModel(User, {
//             username: 'profileUsername' + counter,
//             firstName: 'profileName' + counter,
//             lastName: 'lastname' + counter,
//             email: 'first@profile.com' + counter,
//             password: 'profile-password-test'
//         });
//
//         domainType = buildModel(DomainType, {
//             name: 'Education' + counter,
//             desc: 'Identifies the domain type related to education',
//             isActive: true
//         });
//
//         // save records to use for test
//         save(User, user)
//             .then(res => {
//                 copiedResponse = res;
//
//                 // check for SQL exceptions
//                 expect(res).to.not.have.property('original');
//                 user = res;
//
//             })
//             .catch(e => {
//                 if (copiedResponse.original.sqlMessage) {
//                     console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//                 }
//
//                 done(e);
//             });
//
//         save(DomainType, domainType)
//             .then(res => {
//                 copiedResponse = res;
//
//                 // check for SQL exceptions
//                 expect(res).to.not.have.property('original');
//                 domainType = res;
//
//             })
//             .catch(e => {
//                 if (copiedResponse.hasOwnProperty('original')) {
//                     console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//                 }
//
//                 done(e);
//             });
//
//         done();
//     });
//
//     beforeEach(done => {
//         copiedResponse = null;
//         done();
//     });
//
//     after(done => {
//         // delete user record and cascade
//         deleteByPk(User, user.id);
//         deleteByPk(DomainType, domainType.id);
//         done();
//     });
//
//     it(`should build => ${ModelName} => preconditions: ${User} + ${DomainType}`, done => {
//
//         instance = buildJoinModel(ModelName, 'userId', user.id, 'domainTypeId', domainType.id); // send user payload
//
//         expect(instance.id).to.be.a('string');
//         expect(instance.userId).to.equal(user.id);
//         expect(instance.dataValues).to.contain.all.keys('id', 'userId', 'isActive');
//         expect(instance).to.be.an.instanceof(Model);
//
//         done();
//
//     });
//
//     it(`should save => ${ModelName} => preconditions: ${User} + ${DomainType}`, done => {
//
//         save(ModelName, instance).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse.id).to.be.a('string');
//             expect(copiedResponse.userId).to.equal(user.id);
//             expect(copiedResponse.domainTypeId).to.equal(domainType.id);
//             expect(copiedResponse).to.contain.all.keys('id', 'userId', 'isActive', 'updatedAt', 'createdAt');
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//
//             copiedInstance = {...res};
//             done();
//
//
//
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//
//             console.log(e);
//             done(e);
//         })
//
//     });
//
//     it(`should find profile ${ModelName} by user id`, done => {
//
//         findBy(ModelName, 'userId', user.id).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse.id).to.be.a('string');
//             expect(copiedResponse.id).to.equal(instance.id);
//             expect(copiedResponse.userId).to.equal(user.id);
//             expect(copiedResponse.domainTypeId).to.equal(domainType.id);
//             expect(copiedResponse).to.contain.all.keys('id', 'userId', 'domainTypeId', 'isActive', 'updatedAt', 'createdAt');
//
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//             done();
//
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//
//             console.log(e);
//             done(e);
//         })
//
//     });
//
//     it('should update profile isActive by user id', done => {
//
//         copiedInstance.isActive = false;
//
//         update(ModelName, copiedInstance).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse).to.eql([1]);
//             expect(copiedResponse).to.be.a('array');
//
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//             done();
//
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//
//             console.log(e);
//             done(e);
//         })
//
//     });
//
//     it('should delete profile by user id', done => {
//
//         deleteBy(ModelName, 'userId', copiedInstance.userId).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse).to.equal(1);
//             expect(copiedResponse).to.be.a('number');
//
//
//             // check for SQL exceptions
//             expect(copiedResponse).to.not.have.property('original');
//             done();
//
//         }).catch(e => {
//             if (copiedResponse.hasOwnProperty('original')) {
//                 console.log('SQL ERROR: ', copiedResponse.original.sqlMessage);
//             }
//
//             console.log(e);
//             done(e);
//         })
//     })
//
// });
//
// // DomainType
// describe('CRUD One Domain', () => {
//
//     const ModelName = "DomainType";
//     let Model = null;
//
//     let counter = Math.random();
//     let instance = null;
//     let copiedResponse = null;
//     let copiedInstance = null;
//
//     before((done) => {
//
//         Model = db.sequelize.models[ModelName];
//
//         instance = {
//             name: 'Education' + counter,
//             desc: 'Identifies the domain type related to education',
//             isActive: true
//         };
//
//         done();
//     });
//
//     after(done => {
//         deleteByPk(ModelName, instance.id);
//         done();
//     });
//
//     it(`should build => ${ModelName}`, done => {
//
//         instance = buildModel(ModelName, instance);
//
//         expect(instance.id).to.be.a('string');
//         expect(instance.dataValues).to.contain.all.keys('id', 'name', 'desc', 'isActive');
//         expect(instance).to.be.instanceof(Model);
//
//         done();
//     });
//
//     it(`should save => ${ModelName} by id`, done => {
//
//
//         // console.log(instance);
//         save(ModelName, instance).then(res => {
//             copiedResponse = res;
//
//             expect(copiedResponse.id).to.be.a('string');
//             expect(copiedResponse).to.contain.all.keys('id', 'name', 'desc', 'isActive', 'createdAt', 'updatedAt');
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
//             expect(copiedResponse).to.have.all.keys('id', 'name', 'desc', 'isActive', 'createdAt', 'updatedAt');
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
//         copiedInstance.desc = 'Update desc';
//         copiedInstance.name = 'Update Education';
//         copiedInstance.isActive = false;
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
//         deleteByPk(ModelName, instance.id).then(res => {
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
//
// // Education: precondition => none
// describe('CRUD One Education', () => {
//
//     const ModelName = 'Education';
//     let db = null;
//     let Model = null;
//
//     let counter = Math.random();
//     let instance = null;
//     let copiedResponse = null;
//     let copiedInstance = null;
//
//     before((done) => {
//         db = require('../../../db/db.connection');
//         Model = db.sequelize.models[ModelName];
//
//         instance = {
//             industry: 'Education' + counter,
//             specialty: 'Grade School Teacher',
//         };
//
//         done();
//     });
//
//     after(done => {
//         deleteByPk(ModelName, instance.id);
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
//         deleteByPk(ModelName, instance.id).then(res => {
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
//
// // History
//
// // Persona
//
// // Photo
//
// // Work
//
//
//
//
//
//
//
//
