import { Request, Response } from 'express'
import httpStatus from 'http-status'

import { User } from '~/models/User'

export const login = async (req: Request, res: Response) => {
  const user = req.user as User
  const token = user.token()
  res.status(httpStatus.OK).json({ token })
}
