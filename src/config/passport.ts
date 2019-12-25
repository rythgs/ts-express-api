import {
  ExtractJwt,
  Strategy as JwtStrategy,
  VerifiedCallback,
} from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'

import config from '../config'
import { User } from '../models/User'

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: any, done: VerifiedCallback) => {
    const user = await User.findOne({ id: payload.sub })
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  },
)

export const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
  async (username: string, password: string, done: VerifiedCallback) => {
    const user = await User.createQueryBuilder('users')
      .select('users.id')
      .addSelect('users.password')
      .where({ email: username })
      .getOne()

    if (!user) {
      return done(null, false)
    }

    const isValid = await user.validatePassword(password)
    if (!isValid) {
      return done(null, false)
    }

    return done(null, user)
  },
)
