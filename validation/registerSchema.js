const Joi = require('joi');

const registrationSchema = Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).optional(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(128)
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'))
        .message('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
  });
  
  module.exports = registrationSchema;