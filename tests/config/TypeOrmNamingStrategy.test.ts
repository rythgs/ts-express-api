import TypeOrmNamingStrategy from '~/config/TypeOrmNamingStrategy'

test('TypeOrmNamingStrategy', () => {
  const strategy = new TypeOrmNamingStrategy()
  // tableName
  expect(strategy.tableName('TestTable', null)).toBe('test_tables')
  expect(strategy.tableName('TestTable', 'custom_tables')).toBe('custom_tables')
  // columnName
  expect(strategy.columnName('lastName', null, [])).toBe('last_name')
  expect(strategy.columnName('lastName', 'last_name_a', [])).toBe('last_name_a')
  // relationName
  expect(strategy.relationName('TestTable')).toBe('test_table')
  // joinColumnName
  expect(strategy.joinColumnName('users', 'id')).toBe('user_id')
  //joinTableName
  expect(strategy.joinTableName('FirstTable', 'SecondTable')).toBe(
    'first_table__second_table',
  )
  // joinTableColumnName
  expect(strategy.joinTableColumnName('Users', null, 'lastName')).toBe(
    'user_last_name',
  )
  expect(strategy.joinTableColumnName('Users', 'lastName', null)).toBe(
    'user_last_name',
  )
  // classTableInheritanceParentColumnName
  expect(strategy.classTableInheritanceParentColumnName('users', 'id')).toBe(
    'user_id',
  )
})
