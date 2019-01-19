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
    let result = null;

    try {
        console.log('deleting the user...', userId);
        result = await User.destroy({where: {id: userId}})

        return result;
    } catch (e) {
        return e;
    }
}

// find user by email
async function findByEmail(email) {
    let user = null;

    try {
        console.log('finding user by email ... ', email);
        user = await User.findOne({where: {email: email}});

        return user.dataValues;
    } catch (e) {
        return e;
    }
}

// find user by id
async function findById(userId) {
    let user = null;

    try {
        console.log('finding user by id ... ', userId);
        user = await User.findByPk(userId);

        return user.dataValues;
    } catch (e) {
        return e;
    }

}

// find user by username
async function findByUsername(username) {
    let user = null;

    try {
        console.log('finding user by username ... ', username);
        user = await User.findOne({where: {username: username}});

        return user.dataValues;
    } catch (e) {
        return e;
    }

}

// find user by id
async function findVerify(userId) {
    let verify = null;

    try {
        console.log('finding verify url by user id  ...', userId);
        verify = await Verify.findOne({where: {userId: userId}});

        return verify.dataValues;
    } catch (e) {
        return e;
    }

}

// save user
async function saveUser(user) {

    try {
        console.log('saving user ... ', user.id);
        user = await user.save();

        return user.dataValues;
    } catch (e) {
        return e
    }

}

// save verify record
async function saveVerify(email) {
    let verify = null;

    try {
        console.log('saving verify record... ', email.id);
        verify = await email.save();

        return verify.dataValues;
    } catch (e) {
        return e
    }

}

// update profile
async function updateUser(data) {
    let user = null;

    try {

        user = await User.findByPk(data.id);
        if (user !== null) {

            console.log('updating user ... ', data.id);
            user = await user.update(
                {
                    username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email
                },
                {where: {userId: data.id}});
            return user.dataValues;
        }

    } catch (e) {
        return e;
    }

    return 'profile was not found ... ' + dataToUpdate.id;
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
