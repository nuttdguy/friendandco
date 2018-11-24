const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// Load validation


// Load social model


////==== GET: ROUTES
////////////////////////////////////////

// @route   GET api/social
// @desc    Get social .. TODO what will this view display ??
// @access  Private
router.get('/', (req, res) => {
    res.send({message: 'get social'})
});


// @route   GET api/social/match
// @desc    Get current user matched, permission of match required
// @access  Private
router.get('/match', (req, res) => {
    res.send({message: 'get social match'})
});


// @route   GET api/social/friends
// @desc    Get current user friends list
// @access  Private
router.get('/friend', (req, res) => {
    res.send({message: 'get social friend'})
});


// @route   GET api/social/message
// @desc    Get current user social messages
// @access  Private
router.get('/message', (req, res) => {
    res.send({message: 'get social message'})
});




////==== POST: ROUTES
////////////////////////////////////////







module.exports = router;

