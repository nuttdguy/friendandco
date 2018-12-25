// LOAD MODULES
const {
    generateUUID4,
    bcryptPassword,
    bcryptCompare,
    sendMail,
    signJwt
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
    let { errors, isValid } = await validateRegisterInput(shapeInput(payload));

    // return error if input values are invalid
    if (!isValid) return errors;

    // find user by email; returns null if not found
    let user = await findUserByEmail(payload);
    if (user === null) {

        // save user
        const user = await saveUser(payload);

        // save verify email url
        const email = await saveVerifyEmail(payload);
        // console.log(payload);

        // SET FOREIGN KEY VALUE
        email.set({fkUserId: user.id});

        // PERSIST OBJECTS
        user.save();
        email.save();

        // console.log({user:user, email: email});

        // VALIDATE INVALID CONSTRAINT; DEL USER THEN EMAIL
        const userDel = await UserRepository.deleteEntity(user);
        const emailDel = await UserRepository.deleteEntity(email);

        // VALIDATE VALID CONSTRAINT IS VALID; DEL EMAIL THEN USER
        // const emailDel = await UserRepository.deleteEntity(email);
        // const userDel = await UserRepository.deleteEntity(user);


        return {user:userDel, email: emailDel};
        return {user: userDel};

        // return {user:user, email: email};
        //
        // // TESTING OUTPUT AND RELATIONSHIPS
        // payload = await UserRepository.findVerifyEmailUrl(payload);
        // console.log('Done sending email verification ...');
        //
        // return payload.dataValues;
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
        payload = await createUserProfile(payload);
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


// save a single user record
const saveUser = async (payload) => {


    // GENERATE & ASSIGN UUID
    payload.id = await generateUUID4();

    // GENERATE & ASSIGN TOKENIZED PASSWORD
    payload.password = await bcryptPassword(payload);

    // CREATE USER
    payload = await buildUser(payload);

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
    return payload;
    return await sendMail(payload);

};


// update isActive of user account
const activateUserAccount = async (payload) => {
    return UserRepository.activateUserAccount(payload);
};


//  UPDATE
///////////////////////////////








// DELETE
///////////////////////////////






// CREATE NEW
///////////////////////////////

const buildUser = function(payload) {
    return UserRepository.buildUser(payload);
};


const createVerifyEmail = function(payload) {
    return UserRepository.createVerifyEmail(payload);
};


const createUserProfile = function(payload) {
    return UserRepository.createUserProfile(payload);
}


// EXPORT REFERENCES
///////////////////////////////


module.exports = {
    // bcryptPassword,
    // bcryptCompare,
    // deleteVerifyEmailUrlBy,
    // activateUserProfile,
    buildUser: buildUser,
    createUserProfile,
    createVerifyEmail,
    // findUserBy,
    findUserByEmail,
    // findUserById,
    // activateUserAccount,
    // findVerifyUrlBy,
    loginUser,
    saveVerifyEmail,
    saveUser,
    // saveProfile,
    // signJwt,
    // sendMail,
    verifyEmail,
    registerUser
};
