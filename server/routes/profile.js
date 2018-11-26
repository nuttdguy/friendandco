const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation



// Load models
let Profile = require('../models/Profile');
let User = require('../models/User');


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




















