import { Request, Response } from 'express'
import httpStatus from 'http-status'

import { User } from '~/models'

export const login = async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User
  const token = user.token()
  res.status(httpStatus.OK).json({ token })
}
