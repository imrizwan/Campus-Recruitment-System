const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectStu(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.list = !isEmpty(data.list) ? data.list : [];

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if (isEmpty(data.list)) {
    errors.list = 'Project list is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
