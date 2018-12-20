const express = require('express');
const router = express.Router();
const passport = require('passport');


// IMPORT SERVICES :: URL: API/AUTH/USER/
const { userService } = require('../services/__index.service');


// VALIDATION
const validateRegisterInput = require('../validation/register.validate');
const validateLoginInput = require('../validation/login');


// UTILS
const SUCCESS = require('../utils/SUCCESS.message');
const ERROR = require('../utils/ERRORS.message');
const message = require('../utils/message.utils');
const shapeInput = require('../utils/shapeInput.utils');



// MODEL for testing
const {User} = require('../models/__index.model');

// TEST ROUTES

router.get('/test', async (req, res) => {

    const user = new User();

    const result = await userService.activateUserProfile(user);

    console.log(result);
    return res.send('message');
});

router.post('/test', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});


// GET ROUTES
////////////////////////////////////////////

//=====|| verify the email url
router.get('/verify/:id', async (req, res, next) => {
    const userId = req.params.id;

    // find userid in verify url document
    const verified = await userService.findVerifyUrlBy(req.params.id, next);

    if (verified !== null) {
        console.log(verified, ' user is valid, verifying user now ...');

        // find user by id and then update
        const updatedUser = await userService.activateUserAccount(userId);

        // user has been verified, create profile and associate user to the profile
        const profile = await userService.activateUserProfile(updatedUser);

        // save the profile
        await userService.saveProfile(profile);

        // delete verify url document; after updating user
        await userService.deleteVerifyEmailUrlBy(verified);

        if (updatedUser !== null) {

            // TODO send redirect url when working on front-end
            return res.send('User has been activated');
        }
    }


    return res.send(`Link ${req.protocol}://${req.host}${req.originalUrl} has already been verified.`);
});

// TODO forget password recovery
//=====|| forget password route
router.get('/recover/password ', async (req, res, next) => {

});

// POST ROUTES
////////////////////////////////////////////

//=====|| register the user
router.post('/register', async (req, res, next) => {
    let userData, passwordHash, verifyUrl = null;
    const payload = req.body;


    // trim, lowercase, validate data
    const { errors, isValid } = validateRegisterInput(shapeInput(payload));


    // return error if input values are invalid
    if (!isValid) return res.send(errors);


    // find user by email; returns null if not found
    let user = await userService.findUserByEmail(payload.email, next);
    if (user === null) {

        // create user
        userData = userService.createUser(payload, next);
        passwordHash = await userService.bcryptPassword(userData, next);


        // save verify email url
        verifyUrl = await userService.saveUserVerifyEmailUrl(userData.id, userData.email, userData.createDate);
        console.log(verifyUrl);


        // save user
        userData = await userService.saveUser(userData, passwordHash, next);


        // send verification email
        const sentResult = await userService.sendMail(userData, verifyUrl);
        console.log(sentResult);

        // show & return result
        message.show(SUCCESS.USER_OF_ID_SAVED, userData.id);
        return res.send({result: SUCCESS.USER_OF_ID_SAVED, user: userData.id});
    }

    return res.send({email: payload.email, message: ERROR.EXISTS_EMAIL});
});


//=====|| login the user
router.post('/login', async (req, res, next) => {
    const {errors, isValid} = validateLoginInput(req.body);
    const {username, password } = req.body;

    // check that user exists
    const user = await userService.findUserBy('username', username, next);

    // return error if user was not found
    if (user.error) return res.send(user);


    // compare entered password with users existing password token
    let tokenHash = null;
    const isMatch = await userService.bcryptCompare(password, user.password.token);


    if (isMatch && user.isActive) {

        // user is registered and active
        tokenHash = await userService.signJwt({ id: user.id, username: user.username });
        return res.send({success: true, token: 'Bearer ' + tokenHash });

    } else if (isMatch && !user.isActive) {

        // email has not been verified, send error
        errors.verify = 'Your email has not been verified. Please verify by clicking the link and then try logging in again';
        return res.send(errors);
    } else {

        // password is incorrect, send error
        errors.password = 'Password or username is incorrect';
        return res.send(errors);
    }

});



router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
   res.json({
       id: req.user.id,
       name: req.user.name,
       email: req.user.email
   })
});


//=====|| EXPORT ROUTER

module.exports = router;

