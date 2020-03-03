import Joi from '@hapi/joi'

export const update = Joi.object({
  firstName: Joi.string().max(255),
  lastName: Joi.string().max(255),
  email: Joi.string()
    .email()
    .required(),
})
