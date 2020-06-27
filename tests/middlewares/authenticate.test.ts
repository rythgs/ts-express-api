import { Request, Response } from 'express'

import { authenticateCallback } from '~/middlewares/authenticate'
import { User } from '~/models'
import { APIException, APIExceptionForbidden } from '~/utils/APIException'

describe('Authenticate Middleware:', () => {
  test('passport で予期せぬエラーが発生したパターン', () => {
    const next = jest.fn()
    const err = new Error()
    authenticateCallback({} as Request, {} as Response, next)(err, undefined)

    expect(next).toHaveBeenCalledWith(new APIException(err.message, err))
  })

  test('ユーザー特定できなかったパターン', () => {
    const next = jest.fn()
    authenticateCallback({} as Request, {} as Response, next)(null, undefined)

    expect(next).toHaveBeenCalledWith(new APIExceptionForbidden())
  })

  test('認証・認可OKパターン', () => {
    const next = jest.fn()
    const request = {} as Request
    const user = new User()
    user.email = 'test@test.com'
    authenticateCallback(request, {} as Response, next)(null, user)

    expect(next).toHaveBeenCalledTimes(1)
    expect(request).toHaveProperty('user')
  })
})
