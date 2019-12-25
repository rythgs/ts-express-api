import {
  BaseEntity,
  createConnection,
  getConnection,
  getConnectionOptions,
} from 'typeorm'

export default async () => {
  // connect database
  const connectionOptions = await getConnectionOptions()
  const connection = await createConnection(connectionOptions)
  BaseEntity.useConnection(connection)
}

export const closeDatabaseConn = async () => {
  getConnection().close()
}
