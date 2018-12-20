// LOAD MODULES
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { mailService } = require('./__index.service');


// LOAD MODEL
///////////////////////////////
const {User, Profile, Verify} = require('../models/__index.model');


// QUERY OPTIONS
///////////////////////////////
const userFieldOptions = {
    'username': true,
    'firstName': true,
    'lastName': true,
    'email': true,
    'password.token': true,
    'photos': true,
    'isValidated': true,
    'isActive': true,
    'googleAuth.token': true,
    'facebookAuth.token': true,
    'verificationUrl': true
};



// QUERIES :: GET
///////////////////////////////

// find a single user by the user email
const findUserByEmail = async (email, next) => {
    return await User.findOne({email: email});
};

// find a single user by the user id
const findUserById = async (id, next) => {
    return await User.findById(id);
};

// find a single user by field name
const findUserBy = async (fieldName, value, next) => {

    if (User.schema.tree.hasOwnProperty(fieldName)) {
        return await User.findOne({[fieldName]: value}, userFieldOptions);
    }

    return {error: 'Invalid field name: is not valid for User Schema'};
};

// finds userId in Verify doc
const findVerifyUrlBy = async (userId, next) => {
    return await Verify.findOne({userId: userId});
};


// MANIPULATION :: SAVE
///////////////////////////////

// save user to database
const saveUser = async (userData, passwordHash, next) => {

    userData.password.token = passwordHash;
    await userData.save();

    console.log('SAVING NEW USER DONE...');
    return userData;
};

// save userId and email in Verify doc
const saveUserVerifyEmailUrl = async (userId, userEmail) => {
    // create
    const verifyUrlObj = createNewVerifyUrl(userId, userEmail);

    // save
    console.log('SAVING VERIFY URL OBJECT PROCESSING...');
    return await verifyUrlObj.save();
};

// save profile to database
const saveProfile = async (profile) => {
    return await profile.save();
};


// MANIPULATION :: UPDATE
///////////////////////////////

// activate the user account
const activateUserAccount = async (userId) => {

    return await
        User.findOneAndUpdate(
            {_id: userId},
            {$set: {
                isActive: true,
                isValidated: true}},
            {new: true});
};


// MANIPULATION :: DELETE
///////////////////////////////

// delete userId from Verify doc; user has been verified
const deleteVerifyEmailUrlBy = async (verifyObj) => {
    return await Verify.deleteOne({userId: verifyObj.userId});
};


// SERVICES :: MISC
///////////////////////////////

// create a new user object
const createUser = (payload, next) => {

    console.log('CREATING NEW USER IS DONE...');
    return createNewUser(payload);
};


// SERVICES :: USING EXTERNAL LIBRARIES
///////////////////////////////

// encrypt password using an available bcrypt library function
const bcryptPassword = async (userData, next) => {

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.password.token, salt);

    console.log(hash, 'HASHING PASSWORD DONE...');
    return hash;
};


// compare password with existing using an available bcrypt library function
const bcryptCompare = async (password, userToken) => {
    return await bcrypt.compare(password, userToken);
};


// sign payload using an available jwt library function
const signJwt = async (payload) => {
    return await jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600});
};


// send verify email
const sendMail = async (userData, verifyUrl) => {
    const transporter = mailService.createTransporter();
    const mailOptions = mailService.setMailOptions(userData, verifyUrl);

    return await transporter.sendMail(mailOptions);
};


// PRIVATE FUNCTIONS
///////////////////////////////

// new user
function createNewUser(payload) {
    return new User({
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: {token: payload.password, isActive: true}
    });
}

// new verify email url doc
function createNewVerifyUrl(userId, userEmail) {
    return new Verify({
        userId: userId,
        userEmail: userEmail,
        isVerifyEmail: true,
        isRecoverPassword: false
    });
}

// associate user to new profile
function activateUserProfile(updatedUser) {
    return new Profile({
        user: updatedUser
    })
}


// EXPORT REFERENCES
///////////////////////////////


module.exports = {
    bcryptPassword,
    bcryptCompare,
    deleteVerifyEmailUrlBy,
    activateUserProfile,
    createUser,
    findUserBy,
    findUserByEmail,
    findUserById,
    activateUserAccount,
    findVerifyUrlBy,
    saveUserVerifyEmailUrl,
    saveUser,
    saveProfile,
    signJwt,
    sendMail,

};
