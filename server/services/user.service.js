// LOAD MODULES
const {
    generateUUID4,
    bcryptPassword,
    sendMail,
} = require('./utils/common.service');


// LOAD REPOSITORY
const { UserRepository } = require('../repository/__index.repository');



// LOAD VALIDATORS
///////////////////////////////

const validateRegisterInput = require('../validation/register.validate');
const validateLoginInput = require('../validation/login');
const shapeInput = require('../utils/shapeInput.utils');



// UTILS
const SUCCESS = require('../utils/SUCCESS.message');
const ERROR = require('../utils/ERRORS.message');
const message = require('../utils/message.utils');


// register => sendmail => verify user
// login => verify sendmail => redirect OR login if valid


// FUNCTIONAL FEATURES
///////////////////////////////


// registers a new user
const registerUser = async (payload) => {

    // trim, lowercase, validate data
    const { errors, isValid } = await validateRegisterInput(shapeInput(payload));

    // return error if input values are invalid
    if (!isValid) return errors;


    // find user by email; returns [] if not found
    let user = await findUserByEmail(payload.email);
    if (user.length === 0) {

        // create user
        payload = await saveUser(payload);

        // save verify email url
        payload = await saveVerifyEmail(payload);

        return payload;
    }


    payload.existError = ERROR.EXISTS_EMAIL;
    return payload;
};




// QUERIES :: FIND
///////////////////////////////

// find a single user by the user email
const findUserByEmail = async (email, next) => {
    return await UserRepository.findUserByEmail({email: email});
};





// MANIPULATION :: SAVE
///////////////////////////////


// save a single user record
const saveUser = async (payload) => {

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

// save single verify email record
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
    registerUser
};
