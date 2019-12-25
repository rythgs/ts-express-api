import validation from '../../src/validations/auth.validation'

describe('auth.validation', () => {
  test('has login validation defs', () => {
    expect(validation).toHaveProperty('login')
  })
})
