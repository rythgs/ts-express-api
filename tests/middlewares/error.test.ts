import Joi from '@hapi/joi'

import { convertToException } from '../../src/middlewares/error'
import {
  APIException,
  APIExceptionForbidden,
  APIExceptionInvalidParameter,
} from '../../src/utils/APIException'

describe('Error middleware', () => {
  test('Joiで弾かれたエラーは APIExceptionInvalidParameter として返す', () => {
    const error = { isJoi: true } as Joi.ValidationError
    const e = convertToException({ error })
    expect(e).toBeInstanceOf(APIExceptionInvalidParameter)
  })

  test('未定義のエラーは APIException として返す', () => {
    const e = convertToException('ヤバいエラー')
    expect(e).toBeInstanceOf(APIException)
    expect(e.errors).toBe('ヤバいエラー')
  })

  test('APIException 系はそのまま返す', () => {
    const e = convertToException(new APIExceptionForbidden())
    expect(e).toBeInstanceOf(APIExceptionForbidden)
    expect(e.status).toBe(403)
  })
})
