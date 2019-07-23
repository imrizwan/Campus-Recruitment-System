const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateCompanyProfileInput(data) {
    let errors = {};
    // data.username = !isEmpty(data.username) ? data.username : '';
    data.industrytype = !isEmpty(data.industrytype) ? data.industrytype : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.location = !isEmpty(data.location) ? data.location : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    // if (!Validator.isLength(data.username, { min: 2, max: 40 })) {
    //   errors.username = 'Username needs to between 2 and 4 characters';
    // }
    // if (Validator.isEmpty(data.username)) {
    //   errors.username = 'Profile username is required';
    // }
    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }
    if (Validator.isEmpty(data.location)) {
        errors.location = 'Location field is required';
    }
    if (Validator.isEmpty(data.industrytype)) {
        errors.industrytype = 'Industry type is required';
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description field is required';
    }
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }
    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL';
        }
    }
    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL';
        }
    }
    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }
    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL';
        }
    }
    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
//# sourceMappingURL=companyprofile.js.map