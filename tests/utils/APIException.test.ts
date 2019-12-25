import * as httpStatus from 'http-status'

import { messages } from '../../src/constants'
import {
  APIException,
  APIExceptionForbidden,
  APIExceptionInvalidParameter,
  APIExceptionNotFound,
  APIExceptionUnauthorized,
} from '../../src/utils/APIException'

describe('APIException:', () => {
  let error: any
  beforeAll(() => {
    error = new APIException('test')
  })

  test('継承先の確認', () => {
    expect(error).toBeInstanceOf(Error)
  })

  test('プロパティの確認', () => {
    expect(error).toHaveProperty('name')
    expect(error).toHaveProperty('message')
    expect(error).toHaveProperty('errors')
    expect(error).toHaveProperty('status')
  })

  test('値の確認', () => {
    expect(error.name).toBe('APIException')
    expect(error.message).toBe('test')
    expect(error.errors).toMatchObject({})
    expect(error.status).toBe(httpStatus.INTERNAL_SERVER_ERROR)
  })
})

describe('APIExceptionForbidden:', () => {
  let error: any

  beforeAll(() => {
    error = new APIExceptionForbidden()
  })

  test('継承先の確認', () => {
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(APIException)
  })

  test('値の確認', () => {
    expect(error.name).toBe('APIExceptionForbidden')
    expect(error.message).toBe(messages.EXCEPTION_NOT_AUTHORIZED)
    expect(error.errors).toMatchObject({})
    expect(error.status).toBe(httpStatus.FORBIDDEN)
  })
})

describe('APIExceptionInvalidParameter:', () => {
  let error: any

  beforeAll(() => {
    error = new APIExceptionInvalidParameter()
  })

  test('継承先の確認', () => {
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(APIException)
  })

  test('値の確認', () => {
    expect(error.name).toBe('APIExceptionInvalidParameter')
    expect(error.message).toBe(messages.EXCEPTION_INVALID_PARAMETER)
    expect(error.errors).toMatchObject({})
    expect(error.status).toBe(httpStatus.BAD_REQUEST)
  })
})

describe('APIExceptionNotFound:', () => {
  let error: any

  beforeAll(() => {
    error = new APIExceptionNotFound()
  })

  test('継承先の確認', () => {
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(APIException)
  })

  test('値の確認', () => {
    expect(error.name).toBe('APIExceptionNotFound')
    expect(error.message).toBe(messages.EXCEPTION_NOT_FOUND)
    expect(error.errors).toMatchObject({})
    expect(error.status).toBe(httpStatus.NOT_FOUND)
  })
})

describe('APIExceptionUnauthorized:', () => {
  let error: any

  beforeAll(() => {
    error = new APIExceptionUnauthorized()
  })

  test('継承先の確認', () => {
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(APIException)
  })

  test('値の確認', () => {
    expect(error.name).toBe('APIExceptionUnauthorized')
    expect(error.message).toBe(messages.EXCEPTION_NEED_LOGIN)
    expect(error.errors).toMatchObject({})
    expect(error.status).toBe(httpStatus.UNAUTHORIZED)
  })
})
