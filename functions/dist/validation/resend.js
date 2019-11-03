const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateResend(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
//# sourceMappingURL=resend.js.map