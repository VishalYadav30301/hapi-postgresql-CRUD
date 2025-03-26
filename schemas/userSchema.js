const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Name must be a string',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name should have at least {#limit} characters',
            'string.max': 'Name should have at most {#limit} characters',
            'any.required': 'Name is required'
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .messages({
            'string.email': 'Please enter a valid email address',
            'any.required': 'Email is required'
        }),

    age: Joi.number()
        .integer()
        .min(18)
        .max(120)
        .messages({
            'number.base': 'Age must be a number',
            'number.integer': 'Age must be an integer',
            'number.min': 'Age must be at least {#limit}',
            'number.max': 'Age must be at most {#limit}'
        }),

    phoneNo: Joi.string()
        .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
        .messages({
            'string.pattern.base': 'Please enter a valid phone number'
        })
});

const userIdSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
});

module.exports = {
    userSchema,
    userIdSchema
};