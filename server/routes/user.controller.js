// import services
const { userService } = require('../services/index.service');


// activate profile account
async function activateUser(req, res, next) {
    const userId = req.params.userId;

    try {
        const result = await userService.activateUser(userId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// delete profile
async function deleteUser(req, res, next) {
    const userId = req.params.userId;

    try {
        const result = await userService.deleteUser(userId);
        res.status(200).json(result);
    } catch (e) {
        return e;
    }
}

// get profile
async function getUser(req, res, next) {
    const userId = req.params.userId;

    try {
        const result = await userService.getUser(userId);

        if (result !== null) {
            return res.status(200).json(result);
        }

        return res.status(200).json({result: 'profile was not found ...'});
    } catch (e) {
        next(e);
    }
}

// login profile
async function loginUser(req, res, next) {
    let user = req.body;

    try {
        const result = await userService.loginUser(user);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// register new profile
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

// update profile
async function updateUser(req, res, next) {
    const dataToUpdate = req.body;

    try {
        const result = await userService.updateUser(dataToUpdate);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}


console.log('done loading profile routes ...');



// EXPORT REFERENCES
///////////////////////////////

module.exports = {
    activateUser,
    deleteUser,
    getUser,
    loginUser,
    registerUser,
    resetPassword,
    updateUser,
};
