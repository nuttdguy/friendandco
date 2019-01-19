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


// activate user account
async function activateAccount(userId) {

    try {
        console.log('activating user account ... ', userId);

        // update field of profile record
        return await User.update(
            {isActive: true},
            {where: {id: userId}});

    } catch (e) {
        return e;
    }

}

// delete verify record
function deleteVerify(userId) {
    console.log('deleting verify record ...', userId);
    return Verify.destroy({
        where: {userId: userId}
    })
}

// delete user
async function deleteUser(userId) {
    try {
        console.log('deleting the user...', userId);
        return await User.destroy({where: {id: userId}})
    } catch (e) {
        return e;
    }
}

// find user by email
function findByEmail(email) {
    console.log('finding user by email ... ', email);
    return User.findOne({where: {email: email}});
}

// find user by id
function findById(userId) {
    console.log('finding user by id ... ', userId);
    const id = userId;
    return User.findByPk(id);
}

// find user by username
function findByUsername(username) {
    console.log('finding user by username ... ', username);
    return User.findOne({where: {username: username}});
}

// find user by id
function findVerify(userId) {
    console.log('finding verify url by user id  ...', userId);
    return Verify.findOne(
        {where: {userId: userId}});
}

// save user
function saveUser(user) {

    try {
        console.log('saving user ... ', user.id);
        user.save(user);
        return user;
    } catch (e) {
        return e
    }

}

// save verify record
function saveVerify(email) {

    try {
        console.log('saving verify record... ', email.id);
        email.save();
        return email;
    } catch (e) {
        return e
    }

}

// update profile
function updateUser(dataToUpdate) {
    try {
        const user = User.findByPk(dataToUpdate.id);

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
const buildUser = function (payload) {
    console.log('building user ...');

    return User.build({
        id: genUUID4(),
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
        email: payload.email,
    });
};

// build new verify object
const buildVerify = function (payload) {
    console.log('building verify ...', payload.email);

    return Verify.build({
        id: genUUID4(),
        email: payload.email,
        username: payload.username,
        password: payload.password,
        userId: payload.id,
    })
};


const buildProfile = function (payload) {
    console.log('building profile ... ');
    return Profile.build({
        id: genUUID4(),
        type: payload.id,
        fkUserId: payload.id
    });
};

const buildEducation = function () {
    return Education.build({
        id: genUUID4,

    })
};

const buildHistory = function () {
    return History.build({
        id: genUUID4,
    })
};

const buildPersona = function () {
    return Persona.build({
        id: genUUID4,
    })
};

const buildPhoto = function () {
    return Photo.build({
        id: genUUID4,
    })
};

const buildWork = function () {
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

    activateAccount,
    deleteUser,
    deleteVerify,
    findByEmail,
    findById,
    findByUsername,
    findVerify,
    saveUser,
    saveVerify,
    updateUser
};
