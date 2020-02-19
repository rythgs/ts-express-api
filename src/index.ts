import config from '~/config'
import database from '~/config/database'
import app from '~/config/express'
import logger from '~/utils/logger'

const server = async () => {
  // connect database
  await database()
  // start server
  app.listen(config.port, () =>
    logger.info(`server started on port ${config.port} (${config.env})`),
  )
}

server()

export default app
