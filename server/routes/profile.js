const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation



// Load Profile model


////==== GET: ROUTES
////////////////////////////////////////

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', (req, res) => {
    res.send({message: 'get profile root'});
});


// @route   GET api/profile/identity
// @desc    Get current user identity details
// @access  Private
router.get('/identity', (req, res) => {
    res.send({message: 'get profile identity'})
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




















