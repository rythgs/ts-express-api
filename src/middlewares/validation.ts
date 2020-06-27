import Joi from '@hapi/joi'
import { RequestHandler } from 'express'
import { createValidator } from 'express-joi-validation'

const validator = createValidator({ passError: true })

export const enum ContainerTypes {
  Body = 'body',
  Query = 'query',
  Headers = 'headers',
  Fields = 'fields',
  Params = 'params',
}

export const isValid = (
  type: ContainerTypes,
  schema: Joi.Schema,
): RequestHandler => validator[type](schema)
