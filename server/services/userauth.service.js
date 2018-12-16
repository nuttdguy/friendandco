// LOAD MODULES
const bcrypt = require('bcryptjs');


// LOAD MODEL
///////////////////////////////
const {User} = require('../models/index.model');


// SERVICE HANDLERS
///////////////////////////////

const FindUserByEmail = async (email, next) => {
    return await User.findOne({email: email});
};

const RegisterUser = (payload, next) => {


    // User.findOne({email: data.email})
    //     .then(user => {
    //
    //         // if (user) {
    //         //     // user exist, return message
    //         //     errors.email = 'Email already exists';
    //         //     res.status(400).json(errors);
    //         //
    //         // } else {
    //
    //         const newUser = new User({
    //             username: data.username,
    //             firstName: data.firstName,
    //             lastName: data.lastName,
    //             email: data.email,
    //             password: {token: data.password, isActive: true}
    //         });
    //
    //         console.log('NEW USER DONE');
    //         bcrypt.genSalt(10, (err, salt) => {
    //             bcrypt.hash(newUser.password.token, salt, (err, hash) => {
    //
    //                 if (err) throw err;
    //
    //                 newUser.password.token = hash;
    //                 newUser.save()
    //                     .then(user => {
    //                         // res.json(user);
    //                         console.log('JUST SAVED NEW USER');
    //                         return newUser;
    //                     })
    //                     .catch(err => {
    //                         console.log(err);
    //                     })
    //             })
    //         });
    //
    //         // console.log('BCRYPT DONE');
    //         // next(newUser);
    //
    //         // }
    //     }).catch(err => {
    //         next(err);
    //     });

    console.log('CREATING NEW USER IS DONE...');
    return createNewUser(payload);
};


const BcryptPassword = async (userData, next) => {

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.password.token, salt);

    console.log(hash, 'HASHING PASSWORD DONE...');
    return hash;
};


const SaveUser = async (userData, passwordHash, next) => {

    userData.password.token = passwordHash;
    await userData.save();

    console.log('SAVING NEW USER DONE...');
    return userData;
};


function createNewUser(payload) {
    return new User({
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: {token: payload.password, isActive: true}
    });
}

// EXPORT REFERENCES
///////////////////////////////

module.exports = {
    findUserByEmail: FindUserByEmail,
    registerUser: RegisterUser,
    bcryptPassword: BcryptPassword,
    saveUser: SaveUser
};
