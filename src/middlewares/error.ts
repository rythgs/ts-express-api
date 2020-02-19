import { NextFunction, Request, Response } from 'express'

import config from '~/config'
import { messages } from '~/constants'
import {
  APIException,
  APIExceptionInvalidParameter,
} from '~/utils/APIException'
import logger from '~/utils/logger'

import httpStatus = require('http-status')

interface ErrorResponse {
  code: number
  message: string
  errors?: object
  stack?: string
}

export const convertToException = (err: any): APIException => {
  if (err && err.error && err.error.isJoi) {
    return new APIExceptionInvalidParameter(undefined, err.error.toString())
  }

  if (!(err instanceof APIException)) {
    return new APIException(undefined, err, httpStatus.INTERNAL_SERVER_ERROR)
  }

  return err
}

export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  let response: ErrorResponse = {
    code: httpStatus.INTERNAL_SERVER_ERROR,
    message: messages.EXCEPTION_INTERNAL_SERVER_ERROR,
  }
  const errorException = convertToException(err)
  const { status, errors, stack, message } = errorException
  response = {
    ...response,
    code: status,
    message,
    errors,
    stack,
  }

  if (config.env !== 'development') {
    delete response.stack
  }

  logger.error(response.message, { url: req.originalUrl })

  return res
    .status(response.code)
    .json(response)
    .end()
}
