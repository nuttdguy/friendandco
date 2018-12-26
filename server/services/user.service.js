// LOAD MODULES
const { bcryptCompare, signJwt } = require('./utils/common.service');
const { sendMail } = require('./mail/mail.service');


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
    let { errors, isValid } = await validateRegisterInput(shapeInput(payload));

    // return error if input values are invalid
    if (!isValid) return errors;

    // find user by email; returns null if not found
    let user = await findUserByEmail(payload);
    if (user === null) {

        // build user + verify email; then save
        payload = await UserRepository.saveUser(payload);

        payload = payload.user.dataValues;

        return payload;
        // send verify email
        // return sendMail(payload);

    }

    // if email exists, return error response
    errors = ERROR.EXISTS_EMAIL;
    return errors;
};


// login user
// TODO Refactor Login
const loginUser = async (payload) => {

    // validate login input
    const {errors, isValid} = validateLoginInput(payload);

    // return if errors
    if (!isValid) return errors;

    // check that user exists
    let foundUser = await findUserByUsername(payload);

    // return error if user was not found
    if (foundUser === null) return errors.error = 'Username does not exist ...';

    // compare entered password with users existing password token
    let tokenHash = null;
    const isMatch = await bcryptCompare(payload, foundUser);


    if (isMatch && foundUser.isActive) {

        // user is registered and active; sign token
        tokenHash = await signJwt(foundUser);
        return payload.success = {token: 'Bearer ' + tokenHash };

    } else if (isMatch && !foundUser.isActive) {

        // email has not been verified, send error
        errors.error = 'Your email has not been verified. Please verify by clicking the link in verify email and then try logging in again';
        return errors;
    } else {

        // password is incorrect, send error
        errors.error = 'Password or username is incorrect';
        return errors;
    }

};


// verify email
const verifyEmail = async (payload) => {

    // find userid in verify url document, return verify obj
    payload = await findVerifyEmailUrl(payload);

    // if (payload !== null) {

        // generate UUID for new Profile
        // payload.profileId = generateUUID4();

        // verified user, create profile and associate user to the profile
        // payload = await createUserProfile(payload);
        // console.log(payload, ' done building user profile');

        // // save the profile
        // await userService.saveProfile(profile);
        //
        // // delete verify url document; after updating user
        // await userService.deleteVerifyEmailUrlBy(verified);

        // activate user account by userId; return updated rows
        // payload = await activateUserAccount(payload);

        //
        // if (updatedUser !== null) {
        //
        //     // TODO send redirect url when working on front-end
        //     return res.send('User has been activated');
        // }
    // }


    // return res.send(`Link ${req.protocol}://${req.host}${req.originalUrl} has already been verified.`);
    return payload;
};



// FIND
///////////////////////////////

// find a single user by the user email
const findUserByEmail = async (email) => {
    return await UserRepository.findUserByEmail({email: email});
};


const findUserByUsername = async (payload) => {
    return await UserRepository.findUserByUsername(payload);
};


// finds userId in Verify doc
const findVerifyEmailUrl = async (payload) => {
    return await UserRepository.findVerifyEmailUrl(payload);
};


// SAVE
///////////////////////////////



// save single verify email record
// const buildVerifyEmail = async (payload) => {


    // // ADD TO VERIFY EMAIL DB
    // payload = await createVerifyEmail(payload);
    //
    // // GENERATE & ASSIGN UUID
    // payload.id = await generateUUID4();
    //
    // return payload;

    // // SAVE VERIFY EMAIL - IF DONE
    // payload = await UserRepository.saveVerifyEmail(payload);
    //
    // // SEND VERIFY ACCOUNT EMAIL :: IF ALL OPS ARE SUCCESSFUL
    // return payload;
    // return await sendMail(payload);

// };


// update isActive of user account
const activateUserAccount = async (payload) => {
    return UserRepository.activateUserAccount(payload);
};


//  UPDATE
///////////////////////////////




// DELETE
///////////////////////////////




// EXPORT REFERENCES
///////////////////////////////


module.exports = {
    // deleteVerifyEmailUrlBy,
    // activateUserProfile,
    // findUserBy,
    findUserByEmail,
    // findUserById,
    // activateUserAccount,
    // findVerifyUrlBy,
    loginUser,
    // saveProfile,
    // signJwt,
    // sendMail,
    verifyEmail,
    registerUser
};
