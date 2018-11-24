const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// Load validation


// Load Activity model


////==== GET: ROUTES
////////////////////////////////////////

// @route   GET api/activity
// @desc    Get all activities
// @access  Public
router.get('/', (req, res) => {
   res.send({message: 'get activity '})
});


// @route   GET api/activity/category
// @desc    Get all activities by category
// @access  Public
router.get('/category', (req, res) => {
    res.send({message: 'get activity category'})
});


// @route   GET api/activity/mob
// @desc    Get all activities by size of mob
// @access  Public
router.get('/category', (req, res) => {
    res.send({message: 'get activity mob'})
});


// @route   GET api/activity/user
// @desc    Get all user activities, e.g. saved, matched
// @access  Private
router.get('/user', (req,res) => {
    res.send({message: 'get activity user'})
});


// @route   GET api/activity/user/new
// @desc    Get form for creating new activity
// @access  Private
router.get('/user/new', (req, res) => {
    res.send({message: 'get activity user new'})
});


// @route   GET api/activity/user/list
// @desc    Get all activities user listed, i.e. created
// @access  Private
router.get('/user/list', (req, res) => {
    res.send({message: 'get activity user list'})
});


// @route   GET api/activity/user/lead
// @desc    Get all activities user leads
// @access  Private
router.get('/user/lead', (req, res) => {
    res.send({message: 'get activity user lead'})
});


// @route   GET api/activity/user/participate
// @desc    Get all activities user participates in
// @access  Private
router.get('/user/participate', (req, res) => {
    res.send({message: 'get activity user participate'})
});





////==== POST: ROUTES
////////////////////////////////////////













module.exports = router;













