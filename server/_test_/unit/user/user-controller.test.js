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
    username: 'pygnasak-service',
    firstName: 'phouthalang-service',
    lastName: 'phouthalang-service',
    email: 'pygnasak@yahoo.com',
    password: 'password-test--service',
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


/*******************************************
 TESTS
 *******************************************/



describe('Route: /api/users/signup ', () => {

    it('should register the user', done => {

        chai.request(server)
            .post('/api/users/signup')
            .send(userData)
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/signup ', err)
                }
                console.log(res.body );
                expect(res.status).to.equal(200);
                expect(res.body.firstName).to.equal(userData.firstName);
                expect(res.body.lastName).to.equal(userData.lastName);

                responseData = res.body;
                done();
            });
    });

    it('should register the user', done => {

        chai.request(server)
            .post('/api/users/signup')
            .send(userData)
            .end( (err, res) => {
                if (err) {
                    console.log('/api/users/signup ', err)
                }
                console.log(res.body );
                expect(res.status).to.equal(200);
                expect(res.body.firstName).to.equal(userData.firstName);
                expect(res.body.lastName).to.equal(userData.lastName);

                responseData = res.body;
                done();
            });
    });


    it('should delete the registered user', done => {
        chai.request(server)
            .delete('/api/users/'+responseData.id)
            .end((err, res) => {
                if (err) {
                    console.log('/api/users/:id  => Delete =>  ', err)
                }

                expect(res.status).to.equal(200);
                expect(res.body).to.equal(1);

                done();
            })
    })

});


