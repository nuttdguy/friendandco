// LOAD MODULES
const { bcryptCompare, signJwt } = require('./common/common.service');
const { sendMail } = require('./mail/mail.service');


// LOAD REPOSITORY
const { userRepository } = require('../repository/index.repository');



// LOAD VALIDATORS
///////////////////////////////

const validateRegisterInput = require('../validation/register.validate');
const validateLoginInput = require('../validation/login');
const shapeInput = require('../validation/shapeInput.utils');



// register => sendmail => verify user
// login => verify sendmail => redirect OR login if valid


// FUNCTIONAL FEATURES
///////////////////////////////


// registers new user
async function registerUser(payload) {

    // trim, lowercase, validate data
    let { errors, isValid } = await validateRegisterInput(shapeInput(payload));

    // return error if input values are invalid
    if (!isValid) return errors;

    // find user by email; returns null if not found
    let user = await userRepository.findUserByEmail(payload);
    if (user === null) {

        // build user + verify email; then save
        payload = await userRepository.saveUser(payload);

        payload = payload.user.dataValues;

        return payload;
        // send verify email
        // return sendMail(payload);

    }

    // if email exists, return error response
    errors.error = 'Email already exists';
    return errors;
}


// login user
// TODO Refactor Login
async function loginUser(user) {

    // validate login input; // return if errors
    let {errors, isValid} = validateLoginInput(user);
    if (!isValid) return errors;

    try {

        // check that user exists; // return error if user was not found
        let foundUser = await userRepository.findUserByUsername(user);
        if (foundUser === null) return errors.error = 'Username does not exist ...';


        const isMatch = await isPasswordMatch(user, foundUser);
        if (isMatch && foundUser.isActive) {

            // user is registered and active; sign token
            return {token: 'Bearer ' + await signJwt(foundUser) };

        } else if (isMatch && !foundUser.isActive) {

            // email has not been verified, send error
            errors.error = 'Your email has not been verified. Please verify by clicking the link in verify email and then try logging in again';
            return errors;
        } else {

            // password is incorrect, send error
            errors.error = 'Password or username is incorrect';
            return errors;
        }
    } catch (e) {
        return e;
    }

    // compare entered password with users existing password token
    function isPasswordMatch(user, foundUser) {
        return bcryptCompare(user, foundUser);
    }

}


// activate user account
async function activateUser(userId) {
    try {
        return await userRepository.activateUserAccount(userId);
    } catch (e) {
        return e;
    }
}

async function verify(user) {
    return await userRepository.verify(user);
}


// verify email
const verifyEmail = async (payload) => {

    // find userid in verify url document, return verify obj
    // payload = findVerifyEmailUrl(payload);

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
// function findUserByEmail(email) {
//     return userRepository.findUserByEmail({email: email});
// }


// const findUserByUsername = async (payload) => {
//     return await userRepository.findUserByUsername(payload);
// };


// finds userId in Verify doc
// const findVerifyEmailUrl = async (payload) => {
//     return await userRepository.findVerifyEmailUrl(payload);
// };


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
    // payload = await userRepository.saveVerifyEmail(payload);
    //
    // // SEND VERIFY ACCOUNT EMAIL :: IF ALL OPS ARE SUCCESSFUL
    // return payload;
    // return await sendMail(payload);

// };


// update isActive of user account
// const activateUserAccount = async (payload) => {
//     return userRepository.activateUserAccount(payload);
// };


//  UPDATE
///////////////////////////////




// DELETE
///////////////////////////////




// EXPORT REFERENCES
///////////////////////////////


module.exports = {
    loginUser,
    verifyEmail,
    registerUser,
    activateUser
};
