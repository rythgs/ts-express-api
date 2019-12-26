import { Request, Response } from 'express'

import { authenticateCallback } from '../../src/middlewares/authenticate'
import {
  APIException,
  APIExceptionForbidden,
} from '../../src/utils/APIException'

describe('Authenticate Middleware:', () => {
  test('passport で予期せぬエラーが発生したパターン', () => {
    const next = jest.fn()
    const err = new Error()
    authenticateCallback({} as Request, {} as Response, next)(err, false)

    expect(next).toHaveBeenCalledWith(new APIException(err.message, err))
  })

  test('ユーザー特定できなかったパターン', () => {
    const next = jest.fn()
    authenticateCallback({} as Request, {} as Response, next)(null, false)

    expect(next).toHaveBeenCalledWith(new APIExceptionForbidden())
  })

  test('認証・認可OKパターン', () => {
    const next = jest.fn()
    const request = {} as Request
    authenticateCallback(
      request,
      {} as Response,
      next,
    )(null, { email: 'test@test.com' })

    expect(next).toHaveBeenCalledTimes(1)
    expect(request).toHaveProperty('user')
  })
})
