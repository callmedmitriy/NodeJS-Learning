import Joi from '@hapi/joi';
// import PasswordComplexity from 'joi-password-complexity';

export const getUserByIdSchema = Joi.object({
    id: Joi.string().required()
});

export const getUsersByLoginSchema = Joi.object({
    login: Joi.string()
        .alphanum()
        .max(20)
        .required(),

    limit: Joi.string()
});

// const PASSWORD_OPTIONS = {
//     min: 6,
//     max: 30,
//     lowerCase: 1,
//     upperCase: 1,
//     numeric: 1,
//     symbol: 1,
//     requirementCount: 2
// };

export const postUserSchema = Joi.object({
    login: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

    // password: new PasswordComplexity(PASSWORD_OPTIONS),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(20)
        .required(),

    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required()
});

export const deleteUserSchema = Joi.object({
    id: Joi.string().required()
});

export const putUserBodySchema = postUserSchema;

export const putUserParamsSchema = Joi.object({
    id: Joi.string().required()
});
