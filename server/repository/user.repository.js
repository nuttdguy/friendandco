
// LOAD ENTITIES
///////////////////////////////
const { User, VerifyEmail } = require('../models/__index.mysql.entity');


// QUERIES :: FIND
///////////////////////////////

// find a single user by the user email
const findUserByEmail = async (email, next) => {
    return await User.findAll({where: email});
};





// MANIPULATION :: SAVE
///////////////////////////////


// save user record
const saveUser = async (entity) => {
    return await entity.save();
};


// save verify email record
const saveVerifyEmail = async (entity) => {
    return await entity.save();
};



// MANIPULATION :: UPDATE
///////////////////////////////





// MANIPULATION :: DELETE
///////////////////////////////






// ENTITIES :: BUILD ; CREATE NEW
///////////////////////////////


// builds new user object
const createUser = function(payload) {
    console.log('creating user ...', payload);
    return User.build({
        id: payload.id,
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: payload.password,
        email: payload.email
    });
};


// create new verify email object
const createVerifyEmail = function(payload) {
    console.log('creating verify email ...', payload.email);
    return VerifyEmail.build({
        email: payload.email,
        username: payload.username,
        password: payload.password,
        userId: payload.id
    })
};


module.exports = {

    // deleteVerifyEmailUrlBy,
    // activateUserProfile,
    createUser,
    createVerifyEmail,
    // findUserBy,
    findUserByEmail,
    // findUserById,
    // activateUserAccount,
    // findVerifyUrlBy,
    saveVerifyEmail,
    saveUser,
    // saveProfile,
    // signJwt,
    // sendMail,

};
