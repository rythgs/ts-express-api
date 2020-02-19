import Router from 'express-promise-router'

import { login } from '~/controllers/auth.controller'
import { isAuthenticated } from '~/middlewares/authenticate'
import { ContainerTypes, isValid } from '~/middlewares/validation'
import validation from '~/validations/auth.validation'

const router = Router()

router
  .route('/login')
  .post(
    isValid(ContainerTypes.Body, validation.login),
    isAuthenticated(),
    login,
  )

export default router
