import express from 'express'

import { isLoggedIn } from '~/middlewares/authenticate'
import { ContainerTypes, isValid } from '~/middlewares/validation'
import { User } from '~/models'
import { create, get, list, remove, retrieve, update } from '~/utils/crud'
import * as validation from '~/validations/user.validation'

const router = express.Router()

router.param('id', retrieve(User))

router.route('/').all(isLoggedIn()).get(list(User)).post(create(User))

router
  .route('/:id')
  .all(isLoggedIn())
  .get(get())
  .put(isValid(ContainerTypes.Body, validation.update), update(User))
  .delete(remove(User))

export default router
