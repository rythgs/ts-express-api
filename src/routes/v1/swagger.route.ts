import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const router = express.Router()

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'backend-api',
      version: '1.0.0',
    },
    basePath: '/rest/v1',
    consumes: ['application/json'],
    produces: ['application/json', 'text/plain'],
  },
  apis: ['**/*.ts'],
}

router.use(
  '/help',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(swaggerOptions)),
)

export default router
