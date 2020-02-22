import express from 'express'

import authRoute from './auth.route'
import userRoute from './user.route'
import swaggerRoute from './swagger.route'

const router = express.Router()

router.use('/auth', authRoute)
router.use('/users', userRoute)

if (process.env.NODE_ENV === 'development') {
  router.use('/', swaggerRoute)
}

export default router
