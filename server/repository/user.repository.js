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

// find one user by the user email
async function findUserByEmail(email) {
    console.log('finding user by email ...');
    return await User.findOne({where: {email: email}})
}

// find user by username
async function findUserByUsername(username) {
    console.log('finding user by username ...');
    return await User.findOne({where: {username: username}})
}

// find user by id
async function findVerifyEmail(userId) {
    console.log('finding verify email url by user id  ...', userId);
    return await VerifyEmail.findOne(
        {where: { userId: userId}});
}

async function findUserById(userId) {
    console.log('finding user by id ...');
    return await User.findById(userId)
}

// MANIPULATION :: SAVE
///////////////////////////////


// save user record
async function saveUser(user) {

    // generate & assign token as password
    user.password = await bcryptPassword(user);

    try {
        // save user
        user = await buildUser(user);

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

}


// MANIPULATION :: UPDATE

// activate user account
async function activateUserAccount(userId) {

    try {
        console.log('activating user account ...');

        // update field of user record
        return await User.update(
            {isActive: true},
            {where: { id: userId }});

    } catch (e) {
        return e;
    }

}




// MANIPULATION :: DELETE
///////////////////////////////

function destroyVerifyEmail(userId) {
    console.log('deleting verify email record ...');
    return VerifyEmail.destroy({
        where: {userId: userId}
    })
}


function deleteRecord(payload) {
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
        userId: payload.id,
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
    destroyVerifyEmail,
    findUserByEmail,
    findUserById,
    findUserByUsername,
    findVerifyEmail,
    // findUserById,
    // activateUserAccount,
    // findVerifyUrlBy,
    saveUser,
    // saveProfile,
    // signJwt,
    // sendMail,

};
