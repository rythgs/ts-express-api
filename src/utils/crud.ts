import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { BaseEntity, Like } from 'typeorm'

import { APIExceptionNotFound } from '~/utils/APIException'

type RetrieveRequest = Request & {
  locals?: {
    data: BaseEntity
  }
}

export const parseSort = (sort: string): { [key: string]: string } => {
  const [field, direction] = JSON.parse(sort)
  return { [field]: direction }
}

export const parseFilter = (filter: string): { [key: string]: any } => {
  const filters = JSON.parse(filter)
  return Object.keys(filters)
    .map((key) => {
      if (
        typeof filters[key] === 'string' &&
        filters[key].indexOf('%') !== -1
      ) {
        return {
          [key]: Like(filters[key]),
        }
      }
      return {
        [key]: filters[key],
      }
    })
    .reduce(
      (whereAttributes, whereAttribute) => ({
        ...whereAttributes,
        ...whereAttribute,
      }),
      {},
    )
}

/**
 * 1 件取得しリクエストに格納する
 *
 * @param Model
 */
export const retrieve = <T extends BaseEntity>(
  Model: { new (): T } & typeof BaseEntity,
) => async (
  req: RetrieveRequest,
  res: Response,
  next: NextFunction,
  id: string,
): Promise<void> => {
  try {
    const data = await Model.findOne(id)
    if (!data) {
      throw new APIExceptionNotFound()
    }
    req.locals = { data }
    next()
  } catch (e) {
    next(e)
  }
}

/**
 * 1 件取得して返す
 */
export const get = <T extends BaseEntity>() => async (
  req: RetrieveRequest,
  res: Response,
): Promise<Response> =>
  res.status(httpStatus.OK).json({ data: req.locals?.data })

/**
 * 一覧を取得
 *
 * @param Model
 */
export const list = <T extends BaseEntity>(
  Model: { new (): T } & typeof BaseEntity,
) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { range, sort, filter } = req.query
    const [from, to] = range ? JSON.parse(range as string) : [0, 100]
    const [data, total] = await Model.findAndCount({
      skip: from,
      take: to - from + 1,
      where: filter ? parseFilter(filter as string) : {},
      order: sort ? parseSort(sort as string) : {},
    })
    res.status(httpStatus.OK).json({ data, total })
  } catch (e) {
    next(e)
  }
}

/**
 * 作成
 *
 * @param Model
 */
export const create = <T extends BaseEntity>(
  Model: { new (): T } & typeof BaseEntity,
) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // @see https://github.com/typeorm/typeorm/issues/1583
    const model = Model.create({ ...req.body } as T)
    const data = await model.save()
    res.status(httpStatus.CREATED).json({ data })
  } catch (e) {
    next(e)
  }
}

/**
 * 更新
 *
 * @param Model
 */
export const update = <T extends BaseEntity>(
  Model: { new (): T } & typeof BaseEntity,
) => async (
  req: RetrieveRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = req.locals?.data
    if (data) {
      Model.merge(data, req.body)
      await data.save()
    }
    res.status(httpStatus.OK).json({ data })
  } catch (e) {
    next(e)
  }
}

/**
 * 削除
 *
 * @param Model
 */
export const remove = <T extends BaseEntity>(
  Model: { new (): T } & typeof BaseEntity,
) => async (
  req: RetrieveRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = req.locals?.data
    if (data) {
      await Model.remove(data)
    }
    res.status(httpStatus.NO_CONTENT).end()
  } catch (e) {
    next(e)
  }
}
