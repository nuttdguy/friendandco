
// LOAD ENTITIES
///////////////////////////////
const { Entity, UUID4 } = require('../models/__index.mysql.entity');


// QUERIES :: FIND
///////////////////////////////

// find a single user by the user email
const findUserByEmail = async (email, next) => {
    return await Entity.User.findAll({where: email});
};





// MANIPULATION :: SAVE
///////////////////////////////








// MANIPULATION :: UPDATE
///////////////////////////////




// MANIPULATION :: DELETE
///////////////////////////////





// ENTITIES :: CREATE NEW
///////////////////////////////

const createUser = function(userData) {
    return new Entity.User(userData);
};





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
