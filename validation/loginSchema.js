const Joi = require('joi');

const loginMessages = {
    'string.email': 'Please provide a valid email address',
    'any.required': 'This field is required',
    'string.min': 'Password should be at least 8 characters long',
  };

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).messages(loginMessages);

module.exports = loginSchema