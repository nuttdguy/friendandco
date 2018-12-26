const express = require('express');
const router = express.Router();
const passport = require('passport');


// IMPORT SERVICES :: URL: API/AUTH/USER/
const { userService } = require('../services/index.service');



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
router.get('/verify/:userId', async (req, res, next) => {
    let payload = {};
    payload.userId = req.params.userId;

    payload = await userService.verifyEmail(payload);
    res.status(200).send(payload);
    next();
});


// TODO forget password recovery
// //=====|| forget password route
router.get('/recover/password ', async (req, res, next) => {

});



// POST ROUTES
////////////////////////////////////////////

//=====|| register the user
router.post('/register', async (req, res, next) => {
    let payload = req.body;

    payload = await userService.registerUser(payload);
    res.status(200).send(payload);
    next();
});


//=====|| login the user

router.post('/login', async (req, res, next) => {
    let payload = req.body;

    payload = await userService.loginUser(payload);
    res.status(200).send(payload);
    next();
});


console.log('Done loading user controllers ... ');

//=====|| EXPORT ROUTER

module.exports = router;
