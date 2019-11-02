const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  // data.username = !isEmpty(data.username) ? data.username : '';
  data.batch = !isEmpty(data.batch) ? data.batch : '';
  data.semester = !isEmpty(data.semester) ? data.semester : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  // if (!Validator.isLength(data.username, { min: 2, max: 40 })) {
  //   errors.username = 'Username needs to between 2 and 4 characters';
  // }

  // if (Validator.isEmpty(data.username)) {
  //   errors.username = 'Profile username is required';
  // }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }
  if (Validator.isEmpty(data.mail)) {
    errors.mail = 'Email field is required';
  }
  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = 'Phone Number is required';
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Bio is required';
  }

  if (Validator.isEmpty(data.batch)) {
    errors.batch = 'Batch is required';
  }
  if (Validator.isEmpty(data.semester)) {
    errors.semester = 'Semester is required';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills are required';
  }
  if (Validator.isEmpty(data.interests)) {
    errors.interests = 'Interests are required';
  }

  // if (!isEmpty(data.youtube)) {
  //   if (!Validator.isURL(data.youtube)) {
  //     errors.youtube = 'Not a valid URL';
  //   }
  // }

  // if (!isEmpty(data.twitter)) {
  //   if (!Validator.isURL(data.twitter)) {
  //     errors.twitter = 'Not a valid URL';
  //   }
  // }

  // if (!isEmpty(data.facebook)) {
  //   if (!Validator.isURL(data.facebook)) {
  //     errors.facebook = 'Not a valid URL';
  //   }
  // }

  // if (!isEmpty(data.linkedin)) {
  //   if (!Validator.isURL(data.linkedin)) {
  //     errors.linkedin = 'Not a valid URL';
  //   }
  // }

  // if (!isEmpty(data.instagram)) {
  //   if (!Validator.isURL(data.instagram)) {
  //     errors.instagram = 'Not a valid URL';
  //   }
  // }
  // if (!isEmpty(data.github)) {
  //   if (!Validator.isURL(data.github)) {
  //     errors.github = 'Not a valid URL';
  //   }
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
