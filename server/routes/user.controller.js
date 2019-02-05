// import services
const { userService } = require('../services/index.service');

// activate user account
async function activate(req, res, next) {
    const value = req.params.id;
    // console.log(req);
    console.log(req.headers.host);

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
    const validate = require('../validation/login.validate');
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
            console.log(result);

            if (result !== null) {
                try {
                    await userService.sendVerificationMail(result.id, result.email, req.headers.host)
                } catch (e) {
                    console.log(e);
                }
            }
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


// EXPORT REFERENCES
///////////////////////////////

module.exports = {
    activate,
    deleteBy,
    login,
    signup,
};
