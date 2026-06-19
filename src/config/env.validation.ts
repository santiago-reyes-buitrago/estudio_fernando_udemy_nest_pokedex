import * as Joi from 'joi';


export const envValidation = Joi.object({
  MONGODB: Joi.string().required(),
  PORT: Joi.number().default(3000),
  MONGO_HOST: Joi.string().required(),
  MONGO_PORT: Joi.number().default(27012).required()
});