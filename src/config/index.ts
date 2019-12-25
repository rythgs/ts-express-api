import dotenvSafe from 'dotenv-safe'
import fs from 'fs'
import { join } from 'path'

dotenvSafe.config({
  allowEmptyValues: true,
  path: join(__dirname, '../../.env'),
})

const privateKey: string = fs.readFileSync(
  __dirname + '/../assets/keys/private.key',
  { encoding: 'utf8' },
)

interface Config {
  readonly env: string
  readonly port: number
  readonly logs: string
  readonly jwtSecret: string
  readonly jwtExpirationInterval: string
  readonly db: {
    readonly host: string
    readonly user: string
    readonly password: string
    readonly port: number
    readonly database: string
  }
}

const config: Config = {
  env: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10) || 3000,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  jwtSecret: privateKey ?? '',
  jwtExpirationInterval: '15m',
  db: {
    host: process.env.TYPEORM_HOST || 'localhost',
    user: process.env.TYPEORM_USERNAME || '',
    password: process.env.TYPEORM_PASSWORD || '',
    port: parseInt(process.env.TYPEORM_PORT || '3306', 10),
    database: process.env.TYPEORM_DATABASE || '',
  },
}

export default config
