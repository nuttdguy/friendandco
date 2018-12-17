// LOAD MODULES
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


// LOAD MODEL
///////////////////////////////
const {User, Profile} = require('../models/index.model');


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


// MANIPULATION :: SAVE
///////////////////////////////

// save user to database
const saveUser = async (userData, passwordHash, next) => {

    userData.password.token = passwordHash;
    await userData.save();

    console.log('SAVING NEW USER DONE...');
    return userData;
};



// MANIPULATION :: UPDATE
///////////////////////////////




// MANIPULATION :: DELETE
///////////////////////////////




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


// PRIVATE FUNCTIONS
///////////////////////////////

// create new user
function createNewUser(payload) {
    const user = new User({
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: {token: payload.password, isActive: true}
    });
    user.validationUrl = user.id;
    return user;
}

// create new profile and associate user with it
function createProfileAndAssociate(user) {
    return new Profile({
        user: user._id
    })
}


// EXPORT REFERENCES
///////////////////////////////

module.exports = {
    bcryptPassword: bcryptPassword,
    bcryptCompare: bcryptCompare,
    createProfileAndAssociate: createProfileAndAssociate,
    createUser: createUser,
    findUserBy: findUserBy,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    saveUser: saveUser,
    signJwt: signJwt

};
