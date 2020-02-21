import { NextFunction, Request, Response } from 'express'
import * as httpStatus from 'http-status'

import { User } from '~/models'
import { APIExceptionNotFound } from '~/utils/APIException'

interface UserRequest extends Request {
  locals?: {
    user: User
  }
}

/**
 * ユーザーを 1 件取得しリクエストに格納する
 * @param req
 * @param res
 * @param next
 * @param id
 */
export const retrieve = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
  id: string,
) => {
  const user = await User.findOne(id)
  if (!user) {
    throw new APIExceptionNotFound()
  }
  req['locals'] = { user }
  return next()
}

/**
 * ユーザーを 1 件取得して返す
 * @param req
 * @param res
 */
export const get = (req: UserRequest, res: Response) =>
  res.status(httpStatus.OK).json(req['locals']?.user)

/**
 * ユーザー一覧を取得
 * @param req
 * @param res
 */
export const list = async (req: Request, res: Response) => {
  const users = await User.find()
  return res.status(httpStatus.OK).json(users)
}

/**
 * ユーザー作成
 * @param req
 * @param res
 */
export const create = async (req: Request, res: Response) => {
  const user = User.create(req.body)
  const u = await user.save()
  return res.status(httpStatus.CREATED).json(u)
}

/**
 * 更新
 * @param req
 * @param res
 */
export const update = async (req: UserRequest, res: Response) => {
  const user = req['locals']?.user
  if (user) {
    User.merge(user, req.body)
    await user.save()
  }
  return res.status(httpStatus.OK).json(user)
}

/**
 * 削除
 * @param req
 * @param res
 */
export const remove = async (req: UserRequest, res: Response) => {
  const user = req['locals']?.user
  if (user) {
    await User.remove(user)
  }
  return res.status(httpStatus.NO_CONTENT).end()
}
