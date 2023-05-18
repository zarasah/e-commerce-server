const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().label('name'),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string(), // Not required
  categoryId: Joi.number().required(),
}).messages({
    'string.empty': '{#label} is required',
    'any.required': '{#label} is required',
    'number.base': '{#label} must be a numeric value',
});

module.exports = productSchema