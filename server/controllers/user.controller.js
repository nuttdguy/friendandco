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


// get user
async function getUser(req, res, next) {
    const userId = req.params.userId;

    try {
        const result = await userService.getUser(userId);
        console.log(result);

        if (result !== null) {
            return res.status(200).json(result);
        }

        return res.status(200).json({result: 'user was not found ...'});
    } catch (e) {
        next(e);
    }
}



// login user
async function loginUser(req, res, next) {
    let user = req.body;

    try {
        const result = await userService.loginUser(user);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}


// register new user
async function registerUser(req, res, next) {
    let user = req.body;

    try {
        const result = await userService.registerUser(user);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }

}


// TODO forget password recovery
// //=====|| forget password route
async function resetPassword(req, res, next) {
    const username = req.body.username;


    res.status(200).json(username);
    next();
}



console.log('Done loading user controllers ...');



// EXPORT REFERENCES
///////////////////////////////

module.exports = {
    activateUser,
    getUser,
    loginUser,
    registerUser,
    resetPassword,

};
