import supertest from 'supertest'

import database, { closeDatabaseConn } from '~/config/database'
import app from '~/config/express'
import { User } from '~/models'

const request = supertest(app)

beforeAll(async () => await database())
afterAll(async () => await closeDatabaseConn())

describe('Auth API:', () => {
  const email = 'auth.test@example.com'
  const password = 'test'
  beforeAll(async () => {
    const user = new User()
    user.firstName = 'test'
    user.lastName = 'test'
    user.email = email
    user.password = password

    await user.save()
  })

  afterAll(async () => {
    await User.delete({ email })
  })

  describe('Login:', () => {
    test('入力が不正であれば 403 が返ること（password未入力）', async () => {
      await request
        .post('/rest/v1/auth/login')
        .send({ email, password: '' })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    test('入力が不正であれば 403 が返ること（email未入力）', async () => {
      await request
        .post('/rest/v1/auth/login')
        .send({ email: '', password })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    test('ログインできること', async () => {
      const res = await request
        .post('/rest/v1/auth/login')
        .send({ email, password })
        .expect('Content-Type', /json/)
        .expect(200)

      expect(res.body).toHaveProperty('token')
    })
  })
})
