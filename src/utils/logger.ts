// eslint-disable-next-line import/no-extraneous-dependencies
import { TransformableInfo } from 'logform'
import { createLogger, format, transports } from 'winston'

import config from '../config'

const formatParams = (info: TransformableInfo) => {
  const { timestamp, level, message, ...args } = info
  const ts = timestamp.slice(0, 19).replace('T', ' ')
  const more = Object.keys(args).length ? JSON.stringify(args) : ''
  return `${ts} ${level}: ${message} ${more}`
}

const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams),
)

const productionFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams),
)

let loggerOptions
if (process.env.NODE_ENV === 'production') {
  loggerOptions = {
    level: config.logger.level,
    format: productionFormat,
    transports: [
      new transports.File({ filename: config.logger.errorLog, level: 'error' }),
      new transports.File({ filename: config.logger.combinedLog }),
    ],
  }
} else {
  loggerOptions = {
    level: config.logger.level,
    format: developmentFormat,
    transports: [new transports.Console()],
  }
}

export default createLogger(loggerOptions)
