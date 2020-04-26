import { NextFunction, Request, Response } from 'express'
import { QueryFailedError } from 'typeorm'

import config from '~/config'
import { messages } from '~/constants'
import {
  APIException,
  APIExceptionConflict,
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

type TypeOrmError = QueryFailedError & { code: string }

const queryFailedGuard = (err: TypeOrmError) => err instanceof QueryFailedError
const handleTypeOrmErrors = (err: TypeOrmError) => {
  switch (err.code) {
    case 'ER_DUP_ENTRY':
      return new APIExceptionConflict(undefined, err.code)
    default:
      return new APIExceptionInvalidParameter(undefined, err.code)
  }
}

export const convertToException = (err: any): APIException => {
  if (queryFailedGuard(err)) {
    return handleTypeOrmErrors(err)
  }

  if (err && err.error && err.error.isJoi) {
    return new APIExceptionInvalidParameter(undefined, err.error.toString())
  }

  if (!(err instanceof APIException)) {
    return new APIException(undefined, err.toString())
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

  logger.error(response.message, {
    url: req.originalUrl,
    status,
    errors,
    stack,
  })

  return res.status(response.code).json(response).end()
}
