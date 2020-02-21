import supertest from 'supertest'

import database, { closeDatabaseConn } from '~/config/database'
import app from '~/config/express'
import { User } from '~/models'

const request = supertest(app)

beforeAll(async () => await database())
afterAll(async () => await closeDatabaseConn())

describe('User API:', () => {
  const email = 'user.api.test@example.com'
  let token: string

  beforeAll(async () => {
    const user = new User()
    user.firstName = 'test'
    user.lastName = 'test'
    user.email = email
    user.password = 'test'

    await user.save()
    const res = await request
      .post('/rest/v1/auth/login')
      .send({ email, password: 'test' })

    token = res.body.token
  })

  afterAll(async () => {
    await User.delete({ email })
  })

  describe('ユーザー一覧', () => {
    test('ユーザー一覧の取得', async () => {
      const res = await request
        .get('/rest/v1/users')
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(res.body.length).toBeGreaterThan(0)
    })
  })
})
