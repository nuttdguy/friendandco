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

async function deleteProfile(id) {
    let deleteQty = 0;

    try {
        console.log('deleting profile by user id ...  ', id);
        deleteQty = Profile.destroy({where: {id: id}});

        return deleteQty;
    } catch (e) {
        return e;
    }
}

// delete verify record
function deleteVerify(userId) {
    console.log('deleting verify record ...', userId);
    return Verify.destroy({
        where: {id: userId}
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

// find user profile
async function findProfile(userId) {
    let profile = null;

    try {
        console.log('finding profile by user id ... ', userId);
        profile = await Profile.findOne({where: {id: userId}});

        return profile.dataValues;
    } catch(e) {
        return e;
    }
}

// find user by id
async function findVerify(userId) {
    let verify = null;

    try {
        console.log('finding verify url by user id  ...', userId);
        verify = await Verify.findByPk(userId);

        return verify.dataValues;
    } catch (e) {
        return e;
    }

}

// save user
async function saveProfile(profile) {

    try {
        console.log('saving profile with user id ... ', profile.id);
        profile = await profile.save();

        return profile.dataValues;
    } catch (e) {
        return e
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
async function saveVerify(verifyRecord) {
    let verify = null;

    try {
        console.log('saving verify record... ', verifyRecord.id);
        verify = await verifyRecord.save();

        return verify.dataValues;
    } catch (e) {
        return e
    }

}

// update user
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

// update profile
async function updateProfile(data) {
    let profile = null;

    try {

        profile = await Profile.findByPk(data.id);
        if (profile !== null) {

            console.log('updating profile ... ', data.id);
            profile = await profile.update(
                {
                    isActive: data.isActive,
                },
                {where: {id: data.id}});
            return profile.dataValues;
        }

    } catch (e) {
        return e;
    }

    return 'profile was not found ... ' + profile;
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
    console.log('building verify ...', payload.id);

    return Verify.build({
        id: payload.id,
    })
};

// build new profile object
const buildProfile = function (payload) {
    console.log('building profile using existing user id ... ', payload.id);
    return Profile.build({
        id: payload.id,
        isActive: true
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
    deleteProfile,
    deleteUser,
    deleteVerify,
    findByEmail,
    findById,
    findByUsername,
    findProfile,
    findVerify,
    saveProfile,
    saveUser,
    saveVerify,
    updateProfile,
    updateUser
};
