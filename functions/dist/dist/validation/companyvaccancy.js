const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateCompanyVaccancyInput(data) {
    let errors = {};
    data.position = !isEmpty(data.position) ? data.position : '';
    data.degreerequired = !isEmpty(data.degreerequired) ? data.degreerequired : '';
    data.skillsrequired = !isEmpty(data.skillsrequired) ? data.skillsrequired : '';
    data.jobtype = !isEmpty(data.jobtype) ? data.jobtype : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.contactno = !isEmpty(data.contactno) ? data.contactno : '';
    if (Validator.isEmpty(data.position)) {
        errors.position = 'Position field is required';
    }
    if (Validator.isEmpty(data.degreerequired)) {
        errors.degreerequired = 'Qualification field is required';
    }
    if (Validator.isEmpty(data.skillsrequired)) {
        errors.skillsrequired = 'Skills field is required';
    }
    if (Validator.isEmpty(data.jobtype)) {
        errors.jobtype = 'Job Type is required';
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description field is required';
    }
    if (Validator.isEmpty(data.contactno)) {
        errors.contactno = 'Contact No. field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
//# sourceMappingURL=companyvaccancy.js.map
//# sourceMappingURL=companyvaccancy.js.map