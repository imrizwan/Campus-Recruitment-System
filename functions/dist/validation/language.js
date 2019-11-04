const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateLanguageInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.level = !isEmpty(data.level) ? data.level : '';
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }
    if (Validator.isEmpty(data.level)) {
        errors.level = 'Level is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
//# sourceMappingURL=language.js.map