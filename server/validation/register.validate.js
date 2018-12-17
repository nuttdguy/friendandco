const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateRegisterInput(data) {
    let errors = {};
    const min = 2, max = 30, passMin = 6, passMax = 30;


    data.username = !isEmpty(data.username) ? data.username : '';
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';


    if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
        errors.username = `Username must be between ${min} and ${max} characters`;
    }

    if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = `First name must be between ${min} and ${max} characters`;
    }

    if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = `LastName must be between ${min} and ${max} characters`;
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = `Password must be at least ${passMin} and no more than ${passMax} characters`;
    }

    if (Validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = 'Confirm Password field is required';
    } else {
        if (!Validator.equals(data.password, data.passwordConfirm)) {
            errors.passwordConfirm = 'Passwords must match';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};