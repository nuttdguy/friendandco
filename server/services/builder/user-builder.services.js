// Require db connection
const db = require('../db/db.connection');
const genUUID4 = db.genUUID4;

// Load models
const {
    User,
    Verify,
    Profile,
    Education,
    History,
    Persona,
    Photo,
    Work,
} = db.sequelize.models;

// ENTITIES :: BUILD ; CREATE NEW


// builds new profile object
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

// build new verify object
const buildVerify = function(payload) {
    console.log('building verify ...', payload.email);

    return Verify.build({
        id: genUUID4(),
        email: payload.email,
        username: payload.username,
        password: payload.password,
        userId: payload.id,
    })
};


const buildProfile = function(payload) {
    console.log('building profile ... ');
    return Profile.build({
        id: genUUID4(),
        type: payload.id,
        fkUserId: payload.id
    });
};

const buildEducation = function(){
    return Education.build({
        id: genUUID4,

    })
};

const buildHistory = function() {
    return History.build({
        id: genUUID4,
    })
};

const buildPersona = function() {
    return Persona.build({
        id: genUUID4,
    })
};

const buildPhoto = function() {
    return Photo.build({
        id: genUUID4,
    })
};

const buildWork = function() {
    return Work.build({
        id: genUUID4,
    })
};


module.exports = {

    buildEducation,
    buildHistory,
    buildPersona,
    buildPhoto,
    buildProfile,
    buildUser,
    buildVerify,
    buildWork,

};
