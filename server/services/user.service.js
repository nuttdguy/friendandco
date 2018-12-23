// LOAD MODULES
const {
    generateUUID4,
    bcryptPassword,
    sendMail,
} = require('./utils/common.service');


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


// save a single user
const saveUser = async (payload, next) => {

    // TODO add service method, check that payload has all required fields
    // TODO add validators

    // GENERATE & ASSIGN UUID
    payload.id = await generateUUID4();

    // GENERATE & ASSIGN TOKENIZED PASSWORD
    payload.password = await bcryptPassword(payload);

    // CREATE USER
    payload = await createUser(payload);

    // SAVE THE USER - IF DONE
    return await UserRepository.saveUser(payload);

};

const saveVerifyEmail = async (payload) => {


    // ADD TO VERIFY EMAIL DB
    payload = await createVerifyEmail(payload);

    // GENERATE & ASSIGN UUID
    payload.id = await generateUUID4();

    // SAVE VERIFY EMAIL - IF DONE
    payload = await UserRepository.saveVerifyEmail(payload);

    // SEND VERIFY ACCOUNT EMAIL :: IF ALL OPS ARE SUCCESSFUL
    return await sendMail(payload);

};



// MANIPULATION :: UPDATE
///////////////////////////////








// MANIPULATION :: DELETE
///////////////////////////////






// ENTITIES :: CREATE NEW
///////////////////////////////

const createUser = function(payload) {
    return UserRepository.createUser(payload);
};


const createVerifyEmail = function(payload) {
    return UserRepository.createVerifyEmail(payload);
};


// EXPORT REFERENCES
///////////////////////////////


module.exports = {
    // bcryptPassword,
    // bcryptCompare,
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
