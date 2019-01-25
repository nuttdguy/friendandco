// LOAD MODULES
// const { sendMail } = require('./mail/mail.service');
// const { bcryptCompare, signJwt, bcryptPassword } = require('./crypt/crypt.service');


// LOAD REPOSITORY
const { userRepository } = require('../repository/index.repository');


// LOAD VALIDATORS
///////////////////////////////

// TODO ... move validators into controller
const validateRegisterInput = require('../validation/register.validate');
const validateLoginInput = require('../validation/login');
const shapeInput = require('../validation/shapeInput.utils');


// delete by model-name, field and value
async function deleteBy(modelName, field, value) {
    try {
        return await userRepository.deleteBy(modelName, field, value);
    } catch (e) {

    }
}


// find by model and field
async function findModelBy(model, field, value) {
    try {
        return await userRepository.findBy(model, field, value)
    } catch (e) {
        return e;
    }
}


//  login user
async function login(modelName = 'User', field = 'username', value, payload) {
    let userAccount = null;

    // validate login input; // return if errors
    // let {errors, isValid} = validateLoginInput(user);
    // if (!isValid) return errors;

    try {

        // check that the user exists; // return null if not found
        userAccount = await userRepository.findBy(modelName, field, value);

        if ( userAccount === null )
            return null; // TODO this should return or redirect to signup view
        else if (userAccount.isActive === false)
            return userAccount;
        else if (userAccount.isActive === true )
            userAccount.authToken = await isPasswordMatch(payload, userAccount);

        return userAccount;
    } catch (e) {
        return e;
    }

}


//  sign-up new user
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
        return user; // TODO controller to handle user already exists, login instead

    } catch (e) {
        return e;
    }

}


// create a temp record to associate
async function createTempRecord(modelName, data, type = 'Verify') {
    let model = null;

    switch (type) {
        case 'Verify':
            // build and save verify record
            return await _buildAndSave(modelName, data);
        case 'Password':

            // TODO create password reset
            return model;
        default:
            return model;
    }

}


// compare password with inputted password
async function isPasswordMatch(payload, userAccount) {
    const { bcryptCompare, signJwt } = require('./crypt/crypt.service');
    let token = null;

    // payload should have original password, userAccount hashed version
    const isMatch = await bcryptCompare(payload, userAccount);

    if (isMatch) {
        token = 'Bearer ' + await signJwt(userAccount);
        return token; // password is a match, return token
    }
    return token;

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


// TODO use this function within the controller layer
// activate user account after they click on url
async function verifyRecord(modelName = 'Verify', field = 'id', value) {

    try {
        return userRepository.deleteBy(modelName, field, value)
    } catch (e) {
        return e;
    }

}


// build and save user
async function _buildAndSave(modelName, data) {
    const { bcryptPassword } = require('./crypt/crypt.service');
    let model = null;

    if (modelName === 'User') {

        model = await userRepository.buildModel(modelName, data); // build model

        // generate & assign token as password
        await bcryptPassword(model).then(hash => {
            model.password = hash;
        });
    }

    if (modelName === 'Verify') {

        // build model
        model = await userRepository.buildModelWithAssociatedId(modelName, 'id', data.id, data);
    }

    // save user
    model = await userRepository.save(modelName, model);

    return model;
}


module.exports = {
    createTempRecord,
    deleteBy,
    findModelBy,
    isPasswordMatch,
    login,
    sendVerificationMail,
    signup,
    verifyRecord,
    // resetPassword,
    // updateUser
};
