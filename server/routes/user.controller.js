// import services
const { userService } = require('../services/index.service');


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

// delete user
async function deleteBy(req, res, next) {
    const id = req.params.userId;
    let modelName = 'User';
    let field = 'id';

    try {
        const result = await userService.deleteBy(modelName, field, id);
        res.status(200).json(result);
        next();
    } catch (e) {
        next(e);
    }
}

// get user
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
        const result = await userService.registerUser(user, next);
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
    deleteBy,
    getUser,
    loginUser,
    registerUser,
    resetPassword,
    updateUser,
};
