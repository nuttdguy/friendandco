const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
const nodemailer = require('nodemailer');


// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');


// Load User model
const User = require('../models/profile/User.schema');


// TODO send validation email after registration
// Create transporter object using default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: keys.gmail,
        pass: keys.gmailPassword
    },
    ttl: {
        rejectUnauthorized: false
    }
});
let message = {
    from: 'enrollmii@gmail.com',
    to: 'enrollmii@gmail.com',
    subject: 'test node mailer',
    text: 'Plaintext version of the message',
    html: '<p> HTML version of message</p>'
};


router.post('/register', (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {

            if (user) {
                // user exist, return message
                errors.email = 'Email already exists';
                res.status(400).json(errors);

            } else {
                // create an avatar
                const avatar = gravatar.url(req.body.email, {
                    s: 200, // Size
                    r: 'pg', // Rating
                    d: 'm', // Default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {

                        if (err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.json(user);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                })
            }
        })

});

router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {

            if (!user) {
                errors.email = 'User not found';
                res.status(400).json(errors);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {

                    // User matched, create jwt payload
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
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

