
// LOAD MODEL
///////////////////////////////
const { User } = require('../models/__index.mysql.entity');


// QUERIES :: FIND
///////////////////////////////

// find a single user by the user email
const findUserByEmail = async (email, next) => {
    return await User.findAll({where: email});
};





// MANIPULATION :: SAVE
///////////////////////////////








// MANIPULATION :: UPDATE
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
