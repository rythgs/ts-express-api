/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import httpStatus from 'http-status'

import { messages } from '~/constants'

export class APIException extends Error {
  constructor(
    public message: string = messages.EXCEPTION_INTERNAL_SERVER_ERROR,
    public errors: any = {},
    public status: number = httpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class APIExceptionInvalidParameter extends APIException {
  constructor(message?: string, errors?: any) {
    super(
      message || messages.EXCEPTION_INVALID_PARAMETER,
      errors,
      httpStatus.BAD_REQUEST,
    )
  }
}

export class APIExceptionUnauthorized extends APIException {
  constructor(message?: string, errors?: any) {
    super(
      message || messages.EXCEPTION_NEED_LOGIN,
      errors,
      httpStatus.UNAUTHORIZED,
    )
  }
}

export class APIExceptionForbidden extends APIException {
  constructor(message?: string, errors?: any) {
    super(
      message || messages.EXCEPTION_NOT_AUTHORIZED,
      errors,
      httpStatus.FORBIDDEN,
    )
  }
}

export class APIExceptionNotFound extends APIException {
  constructor(message?: string, errors?: any) {
    super(message || messages.EXCEPTION_NOT_FOUND, errors, httpStatus.NOT_FOUND)
  }
}

export class APIExceptionConflict extends APIException {
  constructor(message?: string, errors?: any) {
    super(message || messages.EXCEPTION_CONFLICT, errors, httpStatus.CONFLICT)
  }
}
