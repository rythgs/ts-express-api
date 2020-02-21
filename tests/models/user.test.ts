import database, { closeDatabaseConn } from '~/config/database'
import { User } from '~/models'

beforeAll(async () => await database())
afterAll(async () => await closeDatabaseConn())

describe('User Model', () => {
  afterAll(async () => {
    await User.delete({ email: 'user.model.test@example.com' })
  })

  test('トークン、パワードの生成確認', async () => {
    const email = 'user.model.test@example.com'
    const model = new User()
    model.firstName = 'test'
    model.email = email
    model.password = 'test'
    await model.save()
    const user = await User.createQueryBuilder('users')
      .select('users.id')
      .addSelect('users.password')
      .where({ email })
      .getOne()

    expect(user).not.toBeUndefined()
    expect(user?.validatePassword('test')).resolves.toEqual(true)
    expect(user?.token().length).toBeGreaterThan(0)
  })
})
