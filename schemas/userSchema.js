const Joi = require('joi');

const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])(?=.{8,})');

const signupSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string",
    "string.empty": "Email is required",
    "string.email": "Email should be a valid email",
  }),
  password: Joi.string()
    .min(6)
    .max(10)
    .required()
    .pattern(pattern)
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot be longer than 30 characters',
      'string.pattern.base': 'Password must include at least one lowercase' +
        ' letter, one uppercase letter, one number, and one special' +
        ' character (!@#$%^&*)',
      'string.empty': 'Password is required'
    })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string",
    "string.empty": "Email is required",
    "string.email": "Email should be a valid email",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password should be a string",
    "string.empty": "Password is required",
  }),
});



module.exports = {
  loginSchema,
  signupSchema,
};
