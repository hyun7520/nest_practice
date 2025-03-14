import * as Joi from 'joi';

export const validation: Joi.Schema = Joi.object({
    ENV: Joi.string().valid('development', 'production').required(),
    DB_PASSWORD: Joi.number().required(),
}).options({
    abortEarly: true,
});