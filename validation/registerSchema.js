const Joi = require('joi');

const registrationSchema = Joi.object({
    firstname: Joi.string()
        .min(3)
        .required()
        .messages({
            'string.base': 'First name should be a string',
            'string.min': 'First name should have a minimum length of {#limit}',
            'any.required': 'First name is required',
        }),
    lastname: Joi.string()
        .min(3)
        .optional()
        .messages({
            'string.base': 'Last name should be a string',
            'string.min': 'Last name should have a minimum length of {#limit}',
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email should be a valid string',
            'string.email': 'Email should be a valid email address',
            'any.required': 'Email is required',
        }),
    password: Joi.string()
        .min(8)
        .max(128)
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'))
        .messages({
            'string.base': 'Password should be a string',
            'string.min': 'Password should have a minimum length of {#limit}',
            'string.max': 'Password should have a maximum length of {#limit}',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            'any.required': 'Password is required',
        }),
  });
  
  module.exports = registrationSchema;