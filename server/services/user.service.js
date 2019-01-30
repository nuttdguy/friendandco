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
async function deleteBy(value, field = 'id', modelName = 'User') {

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


// delete by model-name, field and value
async function updateOne(modelName, data) {
    try {
        return await userRepository.update(modelName, data);
    } catch (e) {

    }
}


//  login user
async function login(data) {
    const modelName = 'User';
    const field = 'username';
    let value = data.username;

    // if no username is specified, username is email
    if (data.username === undefined) {
        data.username = data.email;
        value = data.username;
    }

    try {

        // check that the user exists; // return null if not found
        const userAccount = await userRepository.findBy(modelName, field, value);

        // if no user is found,
        if ( userAccount === null )
            return {...userAccount, message: `account with ${field} ${value} not found`};

        // else if, user found but is not verified
        else if (userAccount.isActive === false)
            return {...userAccount, message: `please verify your email to activate your account`};

        // account is active, sign auth token
        else if (userAccount.isActive === true )
            userAccount.authToken = await isPasswordMatch(data, userAccount);

        return userAccount;

    } catch (e) {
        return e;
    }

}


//  sign-up new user
async function signup(data) {
    const modelName = 'User';
    const field = 'username';
    let value = data.username;

    // if no username is specified, username is email
    if (data.username === undefined) {
        data.username = data.email;
        value = data.username;
    }


    try {
        // find the user
        const user = await userRepository.findBy(modelName, field, value);

        // if found, add message that user exists
        if (user !== null )
            return {...user, message: 'username exists'};

        // if not found, create and save the new user
        else if (user === null)
            return buildAndSave(modelName, data);

    } catch (e) {
        return e;
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


// activate user account when url is clicked by user
async function verifyRecord(value) {
    let modelName = 'Verify';
    let field = 'id';

    try {
        let result = await userRepository.deleteBy(modelName, field, value);

        if (result === 1) {
            result = await userRepository.findBy('User', field, value);

            // set user account to active
            result.isActive = true;
            result = await userRepository.update('User', result);

        }

        return result;

    } catch (e) {
        return e;
    }

}


// build and save user
async function buildAndSave(modelName, data) {
    const { bcryptPassword } = require('./crypt/crypt.service');

    try {

        // build and save user
        let model = await userRepository.buildModel(modelName, data); // build model

        // generate & assign token as password
        await bcryptPassword(model).then(hash => {
            model.password = hash;
        });
        model = await userRepository.save(modelName, model);

        // build and save verify record
        let model2 = await userRepository.buildRelationType('Verify', 'id', model.id, model);
        await userRepository.save('Verify', model2);

        return model;

    } catch (e) {
        return e;
    }

}


// create a temp record to associate
async function createTempRecord(modelName, data, type = 'Verify') {
    let model = null;

    switch (type) {
        case 'Verify':
            model = await userRepository.buildRelationType(modelName, 'id', data.id, data);
            model = await userRepository.save(modelName, model);
            return model;

        default:
            return model;
    }

}



module.exports = {
    buildAndSave,
    createTempRecord,
    deleteBy,
    findModelBy,
    isPasswordMatch,
    login,
    sendVerificationMail,
    signup,
    verifyRecord
};
