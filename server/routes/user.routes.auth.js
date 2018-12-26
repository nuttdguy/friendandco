const express = require('express');
const router = express.Router();
const passport = require('passport');


// IMPORT SERVICES :: URL: API/AUTH/USER/
const { userService } = require('../services/__index.service');



// UTILS
const SUCCESS = require('../utils/SUCCESS.message');
const ERROR = require('../utils/ERRORS.message');
const message = require('../utils/message.utils');




// TEST ROUTES
let counter = 0;
router.get('/test', async (req, res) => {

    return res.send('message: ' + counter++);
});


router.post('/test', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});



// GET ROUTES
////////////////////////////////////////////

//=====|| verify the email url
router.get('/verify/:id', async (req, res, next) => {
    let payload = {};
    payload.id = req.params.id;

    payload = await userService.verifyEmail(payload);
    return res.status(200).send(payload);
});


// TODO forget password recovery
//=====|| forget password route
router.get('/recover/password ', async (req, res, next) => {

});



// POST ROUTES
////////////////////////////////////////////

//=====|| register the user
router.post('/register', async (req, res, next) => {
    let payload = req.body;

    payload = await userService.registerUser(payload);
    return res.status(200).send(payload);
});


//=====|| login the user
router.post('/login', async (req, res, next) => {
    let payload = req.body;

    payload = await userService.loginUser(payload);
    return res.status(200).send(payload);
});



router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
   res.json({
       id: req.user.id,
       name: req.user.name,
       email: req.user.email
   })
});


console.log('Done loading user routes ... ');

//=====|| EXPORT ROUTER

module.exports = router;

