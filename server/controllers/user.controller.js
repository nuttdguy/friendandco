const express = require('express');


// IMPORT SERVICES :: URL: API/AUTH/USER/
const { userService } = require('../services/index.service');



// TEST ROUTES
let counter = 0;
// router.get('/test', async (req, res) => {
//
//     return res.send('message: ' + counter++);
// });
//
//
// router.post('/test', (req, res) => {
//     console.log(req.body);
//     res.send(req.body);
// });



// GET ROUTES
////////////////////////////////////////////


// TODO forget password recovery
// //=====|| forget password route
// router.get('/recover/password ', async (req, res, next) => {
//
// });

// activate user account
async function activateUser(req, res, next) {
    const userId = req.params.userId;

    try {
        const result = await userService.activateUser(userId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// POST ROUTES
////////////////////////////////////////////

// register new user
async function registerUser(req, res, next) {
    let payload = req.body;

    try {
        const result = await userService.registerUser(payload);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }

}

// login the user
async function loginUser(req, res, next) {
    let user = req.body;

    try {
        const result = await userService.loginUser(user);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}


console.log('Done loading user controllers ... ');


//=====|| EXPORT ROUTER

module.exports = {
    registerUser,
    loginUser,
    activateUser
};
