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




// activate user account
async function activateUser(userId) {
    try {
        // find record in verify email
        const hasVerified = await userRepository.findVerifyEmail(userId);


        if (hasVerified !== null) {

            const user =  await userRepository.activateAccount(userId);
            userRepository.deleteVerifyEmail(userId);
            return user;
        }

        return 'Your email has already been verified';
    } catch (e) {
        return e;
    }
}

// delete user
async function deleteUser(userId) {
    try {
        return await userRepository.deleteUser(userId);
    } catch (e) {

    }
}

// get user
async function getUser(userId) {
    try {
        return await userRepository.findById(userId);
    } catch (e) {
        return e;
    }
}

// login user
async function loginUser(user) {

    // validate login input; // return if errors
    let {errors, isValid} = validateLoginInput(user);
    if (!isValid) return errors;

    try {

        // check that user exists; // return error if user was not found
        let foundUser = await userRepository.findByUsername(user.username);
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

// registers new user
async function registerUser(user) {

    // trim, lowercase, validate data; // return if errors
    let { errors, isValid } = await validateRegisterInput(shapeInput(user));
    if (!isValid) return errors;

    try {

        // find user by email; returns null if not found
        const foundUser = await userRepository.findByEmail(user.email);
        if (foundUser === null) {

            // build user + verify email; then save
            user = await userRepository.saveUser(user);

            user = user.user.dataValues;

            return user;
            // send verify email
            // return sendMail(user);

        }
        // if email exists, return error response
        errors.error = 'Email already exists';
        return errors;
    } catch (e) {
        return e;
    }

}

// reset password
async function resetPassword(username) {

    try {
        const user = await userRepository.findByUsername(username);

        if (user !== null) {

            // TODO complete reset password; decide on how to handle it
        }
    } catch (e) {
        return e;
    }
}

// update user
async function updateUser(dataToUpdate) {

    try {
        return await userRepository.updateUser(dataToUpdate);
    } catch (e) {
        return e;
    }
}


// EXPORT REFERENCES
///////////////////////////////


module.exports = {
    activateUser,
    deleteUser,
    getUser,
    loginUser,
    registerUser,
    resetPassword,
    updateUser
};
