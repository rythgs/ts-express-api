import { ConnectionOptions } from 'typeorm'

import config from './src/config'
import TypeOrmNamingStrategy from './src/config/TypeOrmNamingStrategy'

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  synchronize: config.env === 'production' ? false : true,
  logging: false,
  entities: ['src/models/index.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
  namingStrategy: new TypeOrmNamingStrategy(),
}

// eslint-disable-next-line import/no-commonjs
module.exports = connectionOptions
