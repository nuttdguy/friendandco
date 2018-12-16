const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
const nodemailer = require('nodemailer');

// IMPORT SERVICES
const userService = require('../services/userauth.service');


// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');


// Load User model
const {User} = require('../models/index.model');

router.post('/test', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});



router.post('/register', async (req, res, next) => {
    let userData, passwordHash = null;
    const payload = req.body;

    let user = await userService.findUserByEmail(payload.email, next);

    if (user === null) {
        // TODO ADD FORM VALIDATION HELPER
        userData = userService.registerUser(payload, next);
        passwordHash = await userService.bcryptPassword(userData, next);
        userData = await userService.saveUser(userData, passwordHash, next);
        console.log(userData.id, "USER OF ID HAS BEEN SAVED...");
        return res.send(userData);
    }

    return res.status(404).send({message: 'Email already exists'});

});




router.post('/login', (req, res) => {
    // const {errors, isValid} = validateLoginInput(req.body);
    //
    // // Check validation
    // if (!isValid) {
    //     res.status(400).json(errors)
    // }
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username})
        .then(user => {

            // if (!user) {
            //     errors.email = 'User not found';
            //     res.status(400).json(errors);
            // }

            bcrypt.compare(password, user.password.token)
                .then(isMatch => {

                    // User matched, create jwt payload
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            username: user.username,
                        };

                        // Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token,
                                });
                            }
                        )
                    } else {
                        errors.password = 'Password or username is incorrect';
                        res.status(400).json(errors);
                    }
                });
        });
});

router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
   res.json({
       id: req.user.id,
       name: req.user.name,
       email: req.user.email
   })
});


module.exports = router;

