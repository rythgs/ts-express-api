import express from 'express'

import * as controller from '~/controllers/user.controller'
import { isLoggedIn } from '~/middlewares/authenticate'

const router = express.Router()

router.param('id', controller.retrieve)

router
  .route('/')
  .all(isLoggedIn())
  .get(controller.list)
  .post(controller.create)

router
  .route('/:id')
  .all(isLoggedIn())
  .get(controller.get)
  .put(controller.update)
  .delete(controller.remove)

export default router
