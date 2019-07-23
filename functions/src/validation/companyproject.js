const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCompanyProjectInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.client = !isEmpty(data.client) ? data.client : '';
  data.clientlocation = !isEmpty(data.clientlocation) ? data.clientlocation : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.client)) {
    errors.client = 'Client Name is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills filed is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
