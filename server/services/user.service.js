// LOAD MODULES
// const { sendMail } = require('./mail/mail.service');
// const { bcryptCompare, signJwt, bcryptPassword } = require('./crypt/crypt.service');


// LOAD REPOSITORY
const { userRepository } = require('../repository/index.repository');


// LOAD VALIDATORS
///////////////////////////////

const validateRegisterInput = require('../validation/register.validate');
const validateLoginInput = require('../validation/login');
const shapeInput = require('../validation/shapeInput.utils');



// activate user account
// async function activateUser(userId) {
//     try {
//         // find record in verify email
//         const hasVerified = await userRepository.findBy(userId);
//
//
//         if (hasVerified !== null) {
//
//             // activate profile account
//             const user =  await userRepository.activateAccount(userId);
//
//             // delete verify record
//             userRepository.deleteVerify(userId);
//             return user;
//         }
//
//         return 'Your email has already been verified';
//     } catch (e) {
//         return e;
//     }
// }

// delete profile
// async function deleteUser(userId) {
//     try {
//         return await userRepository.deleteUser(userId);
//     } catch (e) {
//
//     }
// }

// get user
async function getModelBy(model, field, value) {
    try {
        return await userRepository.findBy(model, field, value)
    } catch (e) {
        return e;
    }
}

// // login profile
async function login(modelName = 'User', field = 'username', value, payload) {
    let userAccount, isMatch = null;

    // validate login input; // return if errors
    // let {errors, isValid} = validateLoginInput(user);
    // if (!isValid) return errors;

    // check that profile exists; // return error if profile was not found
    userAccount = await userRepository.findBy(modelName, field, value);
    if (userAccount === null) return null; // TODO this should return or redirect to signup view

    try {

        // payload should have original password, userAccount hashed version
        isMatch = await isPasswordMatch(payload, userAccount);

        // console.log(isMatch, payload.password, userAccount.password, ' =========>> PP001');
        // // handle correct response when match
        // if (isMatch && userAccount.isActive) {
        //     // user is registered and active; sign token
        //     return {token: 'Bearer ' + await signJwt(userAccount)}
        // } else if (isMatch && !userAccount.isActive) {
        //
        //     // send user account data back
        //     return userAccount;
        // }


        // if (isMatch && account.isActive) {
        //
        //     // profile is registered and active; sign token
        //     return {token: 'Bearer ' + await signJwt(foundUser) };
        //
        // } else if (isMatch && !account.isActive) {
        //
        //     // email has not been verified, send error
        //     errors.error = 'Your email has not been verified. Please verify by clicking the link in verify email and then try logging in again';
        //     return errors;
        // } else {
        //
        //     // password is incorrect, send error
        //     errors.error = 'Password or username is incorrect';
        //     return errors;
        // }
        return userAccount;
    } catch (e) {
        return e;
    }

    // compare entered password with users existing password token
    // function isPasswordMatch(user, foundUser) {
    //     return bcryptCompare(user, foundUser);
    // }

}

// TODO CONTROLLER :: ADD LOGIC TO HANDLE USERNAME EXIST && REDIRECT TO VERIFY EMAIL
// register / sign-up new user
async function signup(data = null, modelName, field, value) {
    let user = null;

    // trim, lowercase, validate data; // return if errors
    // let { errors, isValid } = await validateRegisterInput(shapeInput(user));
    // if (!isValid) return errors;

    try {
        // find profile by field; return null to controller to handle redirect
        user = await userRepository.findBy(modelName, field, value);

        if (user === null) {

            // build and save user
            return _buildAndSave(modelName, data);
        }
        return user;

    } catch (e) {
        return e;
    }

}


// create a temp record to associate
async function createTempRecord(modelName, data, type = 'verify') {
    let model = null;

    switch (type) {
        case 'verify':

            // build and save verify record
            return await _buildAndSave(modelName, data);
        case 'password':

            // TODO create password reset
            return model;
        default:
            return model;
    }

}


// compare password with inputted password
async function isPasswordMatch(payload, userAccount) {
    const { bcryptCompare } = require('./crypt/crypt.service');

    return await bcryptCompare(payload, userAccount);
}


// build and save user
async function _buildAndSave(modelName, data) {
    const { bcryptPassword } = require('./crypt/crypt.service');
    let model = null;

    if (modelName === 'User') {

        // build model
        model = await userRepository.buildModel(modelName, data);

        // generate & assign token as password
        await bcryptPassword(model).then(hash => {
            model.password = hash;
        });
    }

    if (modelName === 'Verify') {

        // build model
        model = await userRepository.buildModelWithAssociatedId(modelName, 'id', data.id, data);
        // console.log(' ===========>>> ', model.id, ' ======= ', data.id);
    }

    // save user
    model = await userRepository.save(modelName, model);

    return model;
}


// create and send a verification email
async function sendVerificationMail(userId, userEmail) {
    const Mail = require('../services/mail/mail.service');
    const KEYS = require('../config/keys');
    const mail = new Mail();

    // create transporter
    await mail.createTransporter(
        KEYS.EMAIL_HOST,
        KEYS.PORT,
        KEYS.SECURE,
        KEYS.AUTH_USER_GMAIL,
        KEYS.AUTH_USER_PASS,
        KEYS.REJECT_UNAUTHORIZED);

    // set html
    await mail.setHtml(userId);

    // set email options
    await mail.setEmailOptions(
        'friendandcompany1@gmail.com',
        userEmail,
        'Please confirm your account');

    return await mail.sendEmail();

}



// TODO move this function into service layer
// activate user account
// async function activateAccount(userId) {
//
//     try {
//         console.log('activating user account ... ', userId);
//
//         // update field of profile record
//         return await User.update(
//             {isActive: true},
//             {where: {id: userId}});
//
//     } catch (e) {
//         return e;
//     }
//
// }


// EXPORT REFERENCES
///////////////////////////////


module.exports = {
    // activateUser,
    // deleteUser,
    createTempRecord,
    // buildAndSave,
    getModelBy,
    isPasswordMatch,
    login,
    sendVerificationMail,
    signup,
    // resetPassword,
    // updateUser
};
