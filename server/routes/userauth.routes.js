const express = require('express');
const router = express.Router();
const passport = require('passport');



// IMPORT SERVICES :: URL: API/USER/
const userService = require('../services/userauth.service');


// VALIDATION
const validateRegisterInput = require('../validation/register.validate');
const validateLoginInput = require('../validation/login');


// UTILS
const SUCCESS = require('../utils/SUCCESS.message');
const ERROR = require('../utils/ERRORS.message');
const message = require('../utils/message.utils');
const shapeInput = require('../utils/shapeInput.utils');


// LOAD MODELS
const { User } = require('../models/index.model');


// TEST ROUTES

router.get('/test', (req, res) => {
    console.log(req.body);
    res.send('message');
});

router.post('/test', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});


// GET ROUTES
////////////////////////////////////////////



// POST ROUTES
////////////////////////////////////////////
router.post('/register', async (req, res, next) => {
    let userData, passwordHash = null;
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

        // save user
        userData = await userService.saveUser(userData, passwordHash, next);

        // show & return result
        message.show(SUCCESS.USER_OF_ID_SAVED, userData.id);
        return res.send({result: SUCCESS.USER_OF_ID_SAVED, user: userData.id});
    }

    return res.send({email: payload.email, message: ERROR.EXISTS_EMAIL});
});



// TODO Send verify email, after verify, create profile and associate user to the profile
router.post('/verify/:id', (req, res, next) => {

});



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


    if (isMatch) {
        tokenHash = await userService.signJwt({ id: user.id, username: user.username });
        return res.send({success: true, token: 'Bearer ' + tokenHash });
    } else {
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


module.exports = router;

