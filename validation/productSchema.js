const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string()
  .required()
  .messages({
    'any.required': 'Product name is required',
    'string.empty': 'Product name cannot be empty',
  }),
  price: Joi.number()
  .required()
  .messages({
    'number.base': 'Price must be a numeric value',
    'any.required': 'Price is required',
  }),
  quantity: Joi.number()
  .required()
  .messages({
    'number.base': 'Quantity must be a numeric value',
    'any.required': 'Quantity is required',
  }),
  description: Joi.string()
  .required()
  .messages({
    'string.empty': 'Product description is required',
    'any.required': 'Product description is required',
  }),
  image: Joi.string(), // Not required
  categoryId: Joi.number()
  .required()
  .messages({
    'number.base': 'Category ID must be a numeric value',
    'any.required': 'Category ID is required',
  }),
});

module.exports = productSchema