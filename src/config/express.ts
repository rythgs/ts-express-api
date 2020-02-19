import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import httpStatus from 'http-status'
import methodOverride from 'method-override'
import morgan from 'morgan'
import passport from 'passport'

import { jwtStrategy, localStrategy } from '../config/passport'
import { handleErrors } from '../middlewares/error'
import routes from '../routes/v1'
import config from '.'

const app = express()

app.use(
  morgan(config.logger.logs, {
    skip: (req: Request, res: Response) =>
      res.statusCode < httpStatus.BAD_REQUEST,
    stream: process.stderr,
  }),
)
app.use(
  morgan(config.logger.logs, {
    skip: (req: Request, res: Response) =>
      res.statusCode >= httpStatus.BAD_REQUEST,
    stream: process.stdout,
  }),
)

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())
app.use(methodOverride())
app.use(cors())

// passport
app.use(passport.initialize())
passport.use(jwtStrategy)
passport.use(localStrategy)

// API
app.use('/rest/v1', routes)

// error handling
app.use(handleErrors)

export default app
