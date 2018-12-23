const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


// LOAD REPOSITORY
const { UserRepository } = require('../repository/__index.repository');


// QUERIES :: FIND
///////////////////////////////

// find a single user by the user email
const findUserByEmail = async (email, next) => {
    return await UserRepository.findUserByEmail({email: email});
};





// MANIPULATION :: SAVE
///////////////////////////////








// MANIPULATION :: UPDATE
///////////////////////////////








// MANIPULATION :: DELETE
///////////////////////////////





// EXPORT REFERENCES
///////////////////////////////


module.exports = {
    // bcryptPassword,
    // bcryptCompare,
    // deleteVerifyEmailUrlBy,
    // activateUserProfile,
    // createUser,
    // findUserBy,
    findUserByEmail,
    // findUserById,
    // activateUserAccount,
    // findVerifyUrlBy,
    // saveUserVerifyEmailUrl,
    // saveUser,
    // saveProfile,
    // signJwt,
    // sendMail,

};
