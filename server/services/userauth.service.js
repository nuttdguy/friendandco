// LOAD MODULES
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const mailService = require('./mail/mail.service');


// LOAD MODEL
///////////////////////////////
const {User, Profile, Verify} = require('../models/index.model');


// QUERY OPTIONS
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

// queries for a single user by the users email
const findUserByEmail = async (email, next) => {
    return await User.findOne({email: email});
};

// queries for a single user by the user id
const findUserById = async (id, next) => {
    return await User.findById(id);
};

// queries for a single user by field name
const findUserBy = async (fieldName, value, next) => {

    if (User.schema.tree.hasOwnProperty(fieldName)) {
        return await User.findOne({[fieldName]: value}, userFieldOptions);
    }

    return {error: 'Invalid field name: is not valid for User Schema'};
};

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

// save userId and email in verify email document
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


const findUserByIdAndUpdate = async (userId) => {

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

// delete the document entry of user id after being verified
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


const sendMail = async (userData, verifyUrl) => {
    const transporter = mailService.createTransporter();
    const mailOptions = mailService.setMailOptions(userData, verifyUrl);

    return await transporter.sendMail(mailOptions);
};


// PRIVATE FUNCTIONS
///////////////////////////////

// create new user
function createNewUser(payload) {
    return new User({
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: {token: payload.password, isActive: true}
    });
}

function createNewVerifyUrl(userId, userEmail) {
    return new Verify({
        userId: userId,
        userEmail: userEmail,
        isVerifyEmail: true,
        isRecoverPassword: false
    });
}

// create new profile and associate user with it
function createProfileAndAssociate(updatedUser) {
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
    createProfileAndAssociate,
    createUser,
    findUserBy,
    findUserByEmail,
    findUserById,
    findUserByIdAndUpdate,
    findVerifyUrlBy,
    saveUserVerifyEmailUrl,
    saveUser,
    saveProfile,
    signJwt,
    sendMail,

};
