const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAcitivties(data) {
  let errors = {};

  data.title = !isEmpty(data.name) ? data.title : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
