const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);


/*******************************************
 SETUP
 *******************************************/

const UserModelName = 'User';
const VerifyModelName = 'Verify';
let responseData = null;

const userData = {
    username: 'pygnasak-controller',
    firstName: 'phouthalang-controller',
    lastName: 'phouthalang-controller',
    email: 'pygnasak@yahoo.com',
    password: 'password-test--controller',
    passwordConfirm: 'password-test--controller',
    isActive: false
};


let db = null;
let server = null;

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


beforeEach(done => {
    server = require('../../../server');
    done();
});


afterEach(done => {
    server.close();
    done();
});


async function signupUser() {
    const {signup} = require('../../../services/user.service');
    return await signup(userData, UserModelName, 'username', userData.username);
}

async function deleteBy() {
    const {deleteBy} = require('../../../services/user.service');
    return await deleteBy(UserModelName, 'username', userData.username);
}


/*******************************************
 TESTS
 *******************************************/



describe('Route: /api/users/signup by username', () => {

    it('should signup the user', done => {

        chai.request(server)
            .post('/api/users/signup')
            .send(userData)
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/signup ', err);
                    done();
                }

                expect(res.status).to.equal(200);
                expect(res.body.firstName).to.equal(userData.firstName);
                expect(res.body.lastName).to.equal(userData.lastName);
                expect(res.body.username).to.equal(userData.username);

                responseData = res.body;
                done();
            });
    });

    it('should return user and message if user has already signed up', done => {

        chai.request(server)
            .post('/api/users/signup')
            .send(userData)
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/signup ', err);
                    done();
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message');
                expect(res.body.username).to.equal(userData.username);

                done();
            });
    });


    it('should delete a user', done => {
        chai.request(server)
            .delete('/api/users/'+responseData.id)
            .end((err, res) => {
                if (err) {
                    console.log('/api/users/:id  => Delete =>  ', err);
                    done();
                }

                expect(res.status).to.equal(200);
                expect(res.body).to.equal(1);

                done();
            })
    })

});

describe('Route: /api/users/login should not find by username', () => {

    it('should not find a user', done => {

        chai.request(server)
            .post('/api/users/login')
            .send({
                username: userData.username,
                password: userData.password,
                passwordConfirm: userData.passwordConfirm
            })
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/login =>  ', err);
                    done();
                }

                console.log(res.body);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message');
                expect(res.body).to.not.have.property('username');

                done();

            })
    });

});

describe('Route: /api/users/login find by username', () => {

    before(done => {
        signupUser().then(res => {
            done();
        });
    });

    it('should find a user having an active account', done => {

        chai.request(server)
            .post('/api/users/login')
            .send({
                username: userData.username,
                password: userData.password,
                passwordConfirm: userData.passwordConfirm
            })
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/login =>  ', err);
                    done();
                }

                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message');
                expect(res.body.isActive).to.equal(false);

                responseData = res.body;
                done();

            })


    });

});

// TODO activate account, then login when account is active
// describe('Route: /api/users/login find by username and return', () => {
//
//     before(done => {
//         signupUser().then(res => {
//             done();
//         });
//     });
//
//     it('should find a user having an active account', done => {
//
//         chai.request(server)
//             .post('/api/users/login')
//             .send({
//                 username: userData.username,
//                 password: userData.password,
//                 passwordConfirm: userData.passwordConfirm
//             })
//             .end( (err, res) => {
//                 if (err) {
//                     console.log('/api/users/login =>  ', err);
//                     done();
//                 }
//
//                 expect(res.status).to.equal(200);
//                 expect(res.body).to.have.property('message');
//                 expect(res.body.isActive).to.equal(false);
//
//                 responseData = res.body;
//                 done();
//
//             })
//
//
//     });
//
// });