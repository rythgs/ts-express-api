import Joi from '@hapi/joi'

export default {
  login: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}
