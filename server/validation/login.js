const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateLoginInput = (data) => {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // if (!Validator.isEmail(data.username)) {
    //     errors.email = 'Email is invalid';
    // }

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};

module.exports = validateLoginInput;