const Joi = require('joi');

const categories = require('../utils/constants/categories');

const eventSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title should be a string",
    "string.empty": "Title is required",
  }),
  description: Joi.string().required().messages({
    "string.base": "Description should be a string",
    "string.empty": "Description is required",
  }),
  date: Joi.date().required().messages({
    "date.base": "Date should be a date",
    "date.empty": "Date is required",
  }),
  category: Joi.string().valid(...categories).required().messages({
    "string.base": "Category should be a string",
    "string.empty": "Category is required",
    "any.only": `Category should be one of the predefined categories [${categories}]`,
  }),
});

module.exports = eventSchema;
