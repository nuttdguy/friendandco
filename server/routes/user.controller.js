// import services
const { userService } = require('../services/index.service');

// TODO ... move validators into controller
const shapeInput = require('../validation/shapeInput.utils');

// activate user account
async function activate(req, res, next) {
    const value = req.params.id;

    try {
        let result = await userService.verifyRecord(value);

        res.status(200).json(result);
        next();

    } catch (e) {
        next(e);
    }
}

// delete user
async function deleteBy(req, res, next) {
    const value = req.params.id;

    try {
        const result = await userService.deleteBy(value);
        res.status(200).json(result);
        next();
    } catch (e) {
        next(e);
    }
}

// login user
async function login(req, res, next) {
    const validate = require('../validation/login');
    let data = req.body;
    let isValid = null;

    try {

        isValid = validate(data);
        if (isValid.isValid) {
            const result = await userService.login(data);
            res.status(200).json(result);
            next();
        } else {
            res.status(200).json(isValid.errors);
            next();
        }

    } catch (e) {
        next(e);
    }
}

// signup new user
async function signup(req, res, next) {
    const validate = require('../validation/signup.validate');
    let data = req.body;
    let isValid = null;

    try {

        isValid = validate(data);
        if (isValid) {
            const result = await userService.signup(data);
            res.status(200).json(result);
            next();
        } else {
            res.status(200).json(isValid.errors);
            next();
        }
    } catch (e) {
        next(e);
    }

}

// reset password
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

// get user
// async function getUser(req, res, next) {
//     const userId = req.params.userId;
//
//     try {
//         const result = await userService.getUser(userId);
//
//         if (result !== null) {
//             return res.status(200).json(result);
//         }
//
//         return res.status(200).json({result: 'profile was not found ...'});
//     } catch (e) {
//         next(e);
//     }
// }

console.log('done loading profile routes ...');



// EXPORT REFERENCES
///////////////////////////////

module.exports = {
    activate,
    deleteBy,
    // getUser,
    login,
    signup,
};
