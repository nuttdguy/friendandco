
// LOAD ENTITIES
///////////////////////////////
const {
    User,
    Secret,
    VerifyEmail,
    Profile,
    Education,
    History,
    Persona,
    Photo,
    Work
} = require('../models/__index.mysql.entity');


// QUERIES :: FIND
///////////////////////////////

// find a single user by the user email
const findUserByEmail = (payload) => {
    console.log('finding user by email ...');
    return User.findOne({}, {where: {email: payload.email}})
};

// find a single user by username
const findUserByUsername = (payload) => {
    console.log('finding user by username ...');
    return User.findOne({}, {where: {username: payload.username}})
};

const findVerifyEmailUrl = async (payload) => {
    const test = await User.findOne(
        {include: [
                {model: VerifyEmail},
                {model: Secret}
                ]},
        {where: { email: payload.email}});


    // console.log(test);
    console.log('finding verify email by user id ...');
    // console.log(payload);
    return VerifyEmail.findOne({}, {where: {userId: payload.userId}})
};

// MANIPULATION :: SAVE
///////////////////////////////


// save user record
const saveUser = (entity) => {
    return entity.save()
};


// save verify email record
const saveVerifyEmail = (entity) => {
    return entity.save()
};



// MANIPULATION :: UPDATE
///////////////////////////////

// activate user isActive field
const activateUserAccount = (payload) => {
    console.log('activating user account ... ');
    return User.update(
        { isActive: true },
        { where: {
            id: payload.userId}
        })
};




// MANIPULATION :: DELETE
///////////////////////////////

const deleteEntity = async (payload) => {
    console.log('destroying entity ...');

    return payload.destroy();
    
};




// ENTITIES :: BUILD ; CREATE NEW
///////////////////////////////


// builds new user object
const buildUser = function(payload) {
    console.log('building user ...');
    return User.build({
        id: payload.id,
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
        email: payload.email
    })
};


// build new verify email object
const createVerifyEmail = function(payload) {
    console.log('creating verify email ...', payload.email);
    return VerifyEmail.build({
        email: payload.email,
        username: payload.username,
        password: payload.password,
        userId: payload.id
    },
        {
            include: [{ model: User } ]
        })
};


const createUserProfile = function(payload) {
    console.log('creating user profile');
    const education = createEducation(),
        history = createHistory(),
        persona = createPersona(),
        photo = createPhoto(),
        work = createWork();

    return Profile.build({
        id: this.genUUID4,
    });
};

const createEducation = function(){
    return Education.build({
        id: this.genUUID4,

    })
};

const createHistory = function() {
    return History.build({
        id: this.genUUID4,
    })
};

const createPersona = function() {
    return Persona.build({
        id: this.genUUID4,
    })
};

const createPhoto = function() {
    return Photo.build({
        id: this.genUUID4,
    })
};

const createWork = function() {
    return Work.build({
        id: this.genUUID4,
    })
};


module.exports = {

    // deleteVerifyEmailUrlBy,
    activateUserAccount,
    buildUser,
    createVerifyEmail,
    createUserProfile,
    deleteEntity,
    findUserByEmail,
    findUserByUsername,
    findVerifyEmailUrl,
    // findUserById,
    // activateUserAccount,
    // findVerifyUrlBy,
    saveVerifyEmail,
    saveUser,
    // saveProfile,
    // signJwt,
    // sendMail,

};
