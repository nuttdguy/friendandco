const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');


// Load input validation
const validateRegisterInput = require('../validation/register');


// Load User model
const User = require('../models/User');


// @route   GET api/user/test
// @desc    Tests user route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'User works'}));

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {

            if (user) {
                // user exist, return message
                errors.email = 'Email already exists';
                return res.status(400).json(errors);

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




module.exports = router;

