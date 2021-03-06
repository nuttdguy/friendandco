const Validator = require('validator');
const isEmpty = require('./is-empty');
const shape = require('./shape.input');

const validateLoginInput = (data) => {
    let errors = {};

    data = shape(data);

    if (data.username === undefined) {
        data.username = data.email;
        data.email = data.username;
    }

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

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