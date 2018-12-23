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



// TEST ROUTES
let counter = 0;
router.get('/test', async (req, res) => {

    return res.send('message:: ' + counter++);
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
    let payload = req.body;


    // trim, lowercase, validate data
    const { errors, isValid } = validateRegisterInput(shapeInput(payload));

    // return error if input values are invalid
    if (!isValid) return res.send(errors);


    // find user by email; returns [] if not found
    let user = await userService.findUserByEmail(payload.email, next);
    if (user.length === 0) {

        // create user
        payload = await userService.saveUser(payload);

        // save verify email url
        payload = await userService.saveVerifyEmail(payload);

        return res.status(200).send(payload);
    }

    return res.status(200).send({email: payload.email, message: ERROR.EXISTS_EMAIL});
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


console.log('Done loading user routes ... ');

//=====|| EXPORT ROUTER

module.exports = router;

