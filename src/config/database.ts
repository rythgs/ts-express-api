import {
  BaseEntity,
  createConnection,
  getConnection,
  getConnectionOptions,
} from 'typeorm'

export default async (): Promise<void> => {
  // connect database
  const connectionOptions = await getConnectionOptions()
  const connection = await createConnection(connectionOptions)
  BaseEntity.useConnection(connection)
}

export const closeDatabaseConn = async (): Promise<void> => {
  getConnection().close()
}
