// Require db connection
const db = require('../db/db.connection');
const genUUID4 = db.sequelize.genUUID4;

const {
    bcryptPassword
} = require('../services/common/common.service');


// Load models
const {
    User,
    VerifyEmail,
    Profile,
    Education,
    History,
    Persona,
    Photo,
    Work,
} = db.sequelize.models;


// activate profile account
async function activateAccount(userId) {

    try {
        console.log('activating profile account ... ', userId);

        // update field of profile record
        return await User.update(
            {isActive: true},
            {where: { id: userId }});

    } catch (e) {
        return e;
    }

}

// delete verify email
function deleteVerifyEmail(userId) {
    console.log('deleting verify email record ...', userId);
    return VerifyEmail.destroy({
        where: {userId: userId}
    })
}

// delete profile
async function deleteUser(userId) {
    try {
        console.log('deleting the profile...', userId);
        return await User.destroy({where: {id: userId}})
    } catch (e) {
        return e;
    }
}

// find profile by email
async function findByEmail(email) {
    console.log('finding profile by email ... ', email);
    return await User.findOne({where: {email: email}})
}

// find profile by id
async function findById(userId) {
    console.log('finding profile by id ... ', userId);
    return await User.findByPk(userId)
}

// find profile by username
async function findByUsername(username) {
    console.log('finding profile by username ... ', username);
    return await User.findOne({where: {username: username}})
}

// find profile by id
async function findVerifyEmail(userId) {
    console.log('finding verify email url by profile id  ...', userId);
    return await VerifyEmail.findOne(
        {where: { userId: userId}});
}

// save profile
async function saveUser(user) {

    // generate & assign token as password
    user.password = await bcryptPassword(user);

    try {
        // save user
        user = await buildUser(user);

        // save verify email url
        let email = await buildVerifyEmail(user);

        // set foreign key
        email.set({fkUserId: user.id});

        // persist objects
        console.log('saving user ... ', user.userId);
        user.save();

        console.log('saving verify email ... ', email.userId);
        email.save();

        return {user: user, email: email};
    } catch (e) {
        return e;
    }

}

// update profile
async function updateUser(dataToUpdate) {
    try {
        const user = await User.findByPk(dataToUpdate.id);

        if (user !== null) {

            console.log('updating profile ... ', dataToUpdate.id);
            return user.update(
                {
                    username: dataToUpdate.username,
                    firstName: dataToUpdate.firstName,
                    lastName: dataToUpdate.lastName,
                    email: dataToUpdate.email
                },
                {where: {userId: dataToUpdate.id}})
        }
        return 'profile was not found ... ' + dataToUpdate.id;
    } catch (e) {
        return e;
    }
}


// ENTITIES :: BUILD ; CREATE NEW
///////////////////////////////


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

// build new verify email object
const buildVerifyEmail = function(payload) {
    console.log('building verify email ...', payload.email);

    return VerifyEmail.build({
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

    activateAccount,
    buildProfile,
    deleteUser,
    deleteVerifyEmail,
    findByEmail,
    findById,
    findByUsername,
    findVerifyEmail,
    saveUser,
    updateUser
};
