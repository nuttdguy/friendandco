// import services
const { userService } = require('../services/index.service');


// activate user account
async function activate(req, res, next) {
    const value = req.params.userId;
    let modelName = 'Verify';
    let field = 'id';

    try {
        let result = await userService.verifyRecord(modelName, field, value);

        // TODO move into service layer, write tests
        if (result === 1) {
            result = await userService.findModelBy('User', field, value);

            // set user account to active
            result.isActive = true;
            await userService.updateOne('User', result);

            res.status(200).json(result);
            next();
        } else {
            res.status(200).json(result);
            next();
        }

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

// login user
async function login(req, res, next) {
    let data = req.body;

    try {
        const result = await userService.login(data);
        res.status(200).json(result);
        next();
    } catch (e) {
        next(e);
    }
}

// signup new user
async function signup(req, res, next) {
    let data = req.body;

    try {
        const result = await userService.signup(data);
        res.status(200).json(result);
        next();
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
