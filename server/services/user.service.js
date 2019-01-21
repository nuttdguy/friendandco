// LOAD MODULES
const { bcryptCompare, signJwt, bcryptPassword } = require('./common/common.service');
const { sendMail } = require('./mail/mail.service');


// LOAD REPOSITORY
const { userRepository } = require('../repository/index.repository');



// LOAD VALIDATORS
///////////////////////////////

const validateRegisterInput = require('../validation/register.validate');
const validateLoginInput = require('../validation/login');
const shapeInput = require('../validation/shapeInput.utils');




// activate profile account
async function activateUser(userId) {
    try {
        // find record in verify email
        const hasVerified = await userRepository.findVerify(userId);


        if (hasVerified !== null) {

            // activate profile account
            const user =  await userRepository.activateAccount(userId);

            // delete verify record
            userRepository.deleteVerify(userId);
            return user;
        }

        return 'Your email has already been verified';
    } catch (e) {
        return e;
    }
}

// delete profile
async function deleteUser(userId) {
    try {
        return await userRepository.deleteUser(userId);
    } catch (e) {

    }
}

// get profile
async function getUser(userId) {
    try {
        return await userRepository.findById(userId);
    } catch (e) {
        return e;
    }
}

// login profile
async function loginUser(user) {

    // validate login input; // return if errors
    let {errors, isValid} = validateLoginInput(user);
    if (!isValid) return errors;

    try {

        // check that profile exists; // return error if profile was not found
        let foundUser = await userRepository.findByUsername(user.username);
        if (foundUser === null) return errors.error = 'Username does not exist ...';


        const isMatch = await isPasswordMatch(user, foundUser);
        if (isMatch && foundUser.isActive) {

            // profile is registered and active; sign token
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

// registers new profile
async function registerUser(user) {

    // trim, lowercase, validate data; // return if errors
    let { errors, isValid } = await validateRegisterInput(shapeInput(user));
    if (!isValid) return errors;

    try {

        // find profile by email; returns null if not found
        const foundUser = await userRepository.findByEmail(user.email);

        if (foundUser === null) {

            // build user
            user = await userRepository.buildUser(user);

            // generate & assign token as password
            await bcryptPassword(user).then(hash => {
                user.password = hash;
            });

            // build verify record
            let email = await userRepository.buildVerify(user);

            // set foreign key
            await email.set({fkUserId: user.id});

            // save user
            user = await userRepository.saveUser(user);

            // save verify record
            email = await userRepository.email.save(email);


            return {user: user, email: email};

            // send verify email
            // return sendMail(profile);

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

// update profile
async function updateUser(dataToUpdate) {

    try {
        return await userRepository.updateUser(dataToUpdate);
    } catch (e) {
        return e;
    }
}

// TODO move this function into service layer
// activate user account
async function activateAccount(userId) {

    try {
        console.log('activating user account ... ', userId);

        // update field of profile record
        return await User.update(
            {isActive: true},
            {where: {id: userId}});

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
