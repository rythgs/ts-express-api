import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

import { APIException, APIExceptionForbidden } from '~/utils/APIException'

export const authenticateCallback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => (err: any, user: any) => {
  if (err) {
    return next(new APIException(err.message, err))
  }

  if (!user) {
    return next(new APIExceptionForbidden())
  }

  req.user = user
  return next()
}

/**
 * email, password でログインできるか判定
 */
export const isAuthenticated = () => (
  req: Request,
  res: Response,
  next: NextFunction,
) =>
  passport.authenticate(
    'local',
    { session: false },
    authenticateCallback(req, res, next),
  )(req, res, next)

/**
 * JWT でユーザー認証
 */
export const isLoggedIn = () => (
  req: Request,
  res: Response,
  next: NextFunction,
) =>
  passport.authenticate(
    'jwt',
    { session: false },
    authenticateCallback(req, res, next),
  )(req, res, next)
