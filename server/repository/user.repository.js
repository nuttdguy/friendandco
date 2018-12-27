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


// activate user account
async function activateAccount(userId) {

    try {
        console.log('activating user account ... ', userId);

        // update field of user record
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
async function findByEmail(email) {
    console.log('finding user by email ... ', email);
    return await User.findOne({where: {email: email}})
}

// find user by id
async function findById(userId) {
    console.log('finding user by id ... ', userId);
    return await User.findByPk(userId)
}

// find user by username
async function findByUsername(username) {
    console.log('finding user by username ... ', username);
    return await User.findOne({where: {username: username}})
}

// find user by id
async function findVerifyEmail(userId) {
    console.log('finding verify email url by user id  ...', userId);
    return await VerifyEmail.findOne(
        {where: { userId: userId}});
}

// save user
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
        console.log('saving user ... ', user.userId);
        user.save();

        console.log('saving verify email ... ', email.userId);
        email.save();

        return {user: user, email: email};
    } catch (e) {
        return e;
    }

}

// update user
async function updateUser(dataToUpdate) {
    try {
        const user = await User.findByPk(dataToUpdate.id);

        if (user !== null) {

            console.log('updating user ... ', dataToUpdate.id);
            return user.update(
                {
                    username: dataToUpdate.username,
                    firstName: dataToUpdate.firstName,
                    lastName: dataToUpdate.lastName,
                    email: dataToUpdate.email
                },
                {where: {userId: dataToUpdate.id}})
        }
        return 'user was not found ... ' + dataToUpdate.id;
    } catch (e) {
        return e;
    }
}


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

    activateAccount,
    deleteUser,
    deleteVerifyEmail,
    findByEmail,
    findById,
    findByUsername,
    findVerifyEmail,
    saveUser,
    updateUser
};
