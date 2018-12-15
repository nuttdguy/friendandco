const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// Load validation


// Load activity model


////==== GET: ROUTES
////////////////////////////////////////

router.get('/', (req, res) => {
   res.send({message: 'get activity '})
});


router.get('/category', (req, res) => {
    res.send({message: 'get activity category'})
});


router.get('/category', (req, res) => {
    res.send({message: 'get activity mob'})
});


router.get('/user', (req,res) => {
    res.send({message: 'get activity user'})
});


router.get('/user/new', (req, res) => {
    res.send({message: 'get activity user new'})
});


router.get('/user/list', (req, res) => {
    res.send({message: 'get activity user list'})
});


router.get('/user/lead', (req, res) => {
    res.send({message: 'get activity user lead'})
});


router.get('/user/participate', (req, res) => {
    res.send({message: 'get activity user participate'})
});





////==== POST: ROUTES
////////////////////////////////////////













module.exports = router;













