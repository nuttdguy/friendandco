const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');


// Load input validation


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

    const user = new User(req.body);

    user.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));

    // const {errors, isValid} = validateRegisterInput(req.body);
    //
    // if(!isValid) {
    //     return res.status(400).json(errors);
    // }
    //
    // User.findOne({email: req.body.email})
    //     .then(user => {
    //         if(user) {
    //             errors.email = 'Email already exists';
    //         } else {
    //
    //             const avatar = gravatar.url(req.body.email, {
    //                 s: 200, // Size
    //                 r: 'pg', // Rating
    //                 d: 'm', // Default
    //             });
    //
    //         }
    //     })

});


module.exports = router;

