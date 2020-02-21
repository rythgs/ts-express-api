import supertest from 'supertest'

import database, { closeDatabaseConn } from '~/config/database'
import app from '~/config/express'
import { User } from '~/models'

const request = supertest(app)

beforeAll(async () => await database())
afterAll(async () => await closeDatabaseConn())

describe('Auth API:', () => {
  beforeAll(async () => {
    const user = new User()
    user.firstName = 'test'
    user.lastName = 'test'
    user.email = 'authtest@example.com'
    user.password = 'test'

    await user.save()
  })

  afterAll(async () => {
    await User.delete({ lastName: 'test' })
  })

  describe('Login:', () => {
    test('入力が不正であれば 403 が返ること（password未入力）', async () => {
      await request
        .post('/rest/v1/auth/login')
        .send({ email: 'authtest@example.com', password: '' })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    test('入力が不正であれば 403 が返ること（email未入力）', async () => {
      await request
        .post('/rest/v1/auth/login')
        .send({ email: '', password: 'test' })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    test('ログインできること', async () => {
      const res = await request
        .post('/rest/v1/auth/login')
        .send({ email: 'authtest@example.com', password: 'test' })
        .expect('Content-Type', /json/)
        .expect(200)

      expect(res.body).toHaveProperty('token')
    })
  })
})
