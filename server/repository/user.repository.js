// LOAD MODULES
const {
    generateUUID4,
    bcryptPassword
} = require('../services/common/common.service');


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
    Work,
    genUUID4,
} = require('../dto/index.dto');


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
    console.log('finding verify email url by user id  ...', payload);
    return await VerifyEmail.findOne(
        {where: { userId: payload.userId}});
};

// MANIPULATION :: SAVE
///////////////////////////////


// save user record
const saveUser = async (payload) => {

    // generate & assign token as password
    payload.password = await bcryptPassword(payload);

    try {
        // save user
        let user = await buildUser(payload);

        // save verify email url
        let email = await buildVerifyEmail(user);
        // console.log(payload);

        // SET FOREIGN KEY VALUE
        email.set({fkUserId: user.id});

        // PERSIST OBJECTS
        user.save();
        email.save();

        return {user: user, email: email};
    } catch (e) {
        return e;
    }

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

const deleteRecord = (payload) => {
    console.log('destroying entity ...');
    if (payload !== null) {
        return payload.destroy();
    }
    return {error: 'nothing to delete, payload is null ...'}
};




// ENTITIES :: BUILD ; CREATE NEW
///////////////////////////////


// builds new user object
const buildUser = function(payload) {
    console.log('building user ...');
    return User.build({
        id: genUUID4(),
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
        email: payload.email,
    })
};

// build new verify email object
const buildVerifyEmail = function(payload) {
    console.log('building verify email ...', payload.email);
    return VerifyEmail.build({
        id: genUUID4(),
        email: payload.email,
        username: payload.username,
        password: payload.password,
        userId: payload.id
    })
};


const buildUserProfile = function(payload) {
    console.log('creating user profile');
    const education = buildEducation(),
        history = buildHistory(),
        persona = buildPersona(),
        photo = buildPhoto(),
        work = buildWork();

    return Profile.build({
        id: this.genUUID4,
    });
};

const buildEducation = function(){
    return Education.build({
        id: this.genUUID4,

    })
};

const buildHistory = function() {
    return History.build({
        id: this.genUUID4,
    })
};

const buildPersona = function() {
    return Persona.build({
        id: this.genUUID4,
    })
};

const buildPhoto = function() {
    return Photo.build({
        id: this.genUUID4,
    })
};

const buildWork = function() {
    return Work.build({
        id: this.genUUID4,
    })
};


module.exports = {

    // deleteVerifyEmailUrlBy,
    activateUserAccount,
    buildUser,
    buildVerifyEmail,
    buildUserProfile,
    findUserByEmail,
    findUserByUsername,
    findVerifyEmailUrl,
    // findUserById,
    // activateUserAccount,
    // findVerifyUrlBy,
    saveUser,
    // saveProfile,
    // signJwt,
    // sendMail,

};
