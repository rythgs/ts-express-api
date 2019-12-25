import supertest from 'supertest'

import database, { closeDatabaseConn } from '../../src/config/database'
import app from '../../src/config/express'

const request = supertest(app)

beforeAll(async () => await database())
afterAll(async () => await closeDatabaseConn())

describe('Test auth API:', () => {
  describe('Login:', () => {
    test('入力が不正であれば 403 が返ること（password未入力）', async () => {
      const res = await request
        .post('/rest/v1/auth/login')
        .send({ email: 'text@example.com' })
        .expect('Content-Type', /json/)

      expect(res.status).toBe(400)
    })

    test('入力が不正であれば 403 が返ること（email未入力）', async () => {
      const res2 = await request
        .post('/rest/v1/auth/login')
        .send({ password: 'test' })
        .expect('Content-Type', /json/)

      expect(res2.status).toBe(400)
    })
  })
})
