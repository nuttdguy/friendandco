const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation



// Load models
const Profile = require('../models/profile/Profile.schema');
const User = require('../models/profile/User.schema');
const Interest = require('../models/profile/Interest.schema');
const Hobby = require('../models/profile/Hobby.schema');
const Location = require('../models/location/Location.schema');
const City = require('../models/location/City.schema');
const State = require('../models/location/State.schema');


////==== GET: TEST
////////////////////////////////////////

router.get('/testmodels', (req, res) => {
    let userObject = new User({firstName: 'Sara', lastName: 'Flakes'});
    const interestOne = new Interest({desc: 'swimming'});
    const interestTwo = new Interest({desc: 'walking'});
    const hobby1 = new Hobby({desc: 'learning'});
    const city = new City({desc: 'Oakland'});
    const state = new State({desc: 'CA', });
    const location = new Location(
        {
            address1: '1111 some street',
            address2: 'apt 210',
            city: city,
            state: state
        });

    let profileObject = new Profile(
        {
            user: userObject,
            interests: [
                interestOne,
                interestTwo],
            hobbies: [
                hobby1
            ],
            locations: [location]
        }
    );

    return res.send(profileObject);
});



////==== GET: ROUTES
////////////////////////////////////////



// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);

        })
        .catch(err => res.status(404).json(err));

});


// @route   GET api/profile/identity/:user_id
// @desc    Get current user identity details
// @access  Private
router.get('/identity/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json({profile: 'There is no profile for this user'}));
});


// @route   GET api/profile/match
// @desc    Get current user matching preferences
// @access  Private
router.get('/match', (req, res) => {
    res.send({message: 'get profile match'})
});


// @route   GET api/profile/social
// @desc    Get current user communication & social preferences
// @access  Private
router.get('/social', (req, res) => {
    res.send({message: 'get profile social'})
});


// @route   GET api/profile/personal-tags
// @desc    Get current user self identified personal tags
// @access  Private
router.get('/personal-tags', (req, res) => {
    res.send({message: 'get profile personal tags'})
});


// @route   GET api/profile/activity-tags
// @desc    Get current user interested activity tags
// @access  Private
router.get('/activity-tags', (req, res) => {
    res.send({message: 'get profile activity tags'})
});


// @route   GET api/profile/value-tags
// @desc    Get current user self identified value tags
// @access  Private
router.get('/value-tags', (req, res) => {
    res.send({ message: 'get profile value tags'})
});


// @route   GET api/profile/peer-tags
// @desc    Get current user peer identified tags
// @access  Private
router.get('/peer-tags', (req, res) => {
    res.send({message: 'get profile peer tags'})
});


////==== POST: ROUTES
////////////////////////////////////////





module.exports = router;



















