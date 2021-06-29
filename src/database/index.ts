import 'reflect-metadata'
import { Connection, createConnection, getRepository } from 'typeorm'

let connection: Connection

export async function getConnection(): Promise<Connection> {
  if (connection) {
    return connection
  }

  connection = await createConnection()

  return connection
}

export async function closeConnection(): Promise<void> {
  if (connection) {
    return connection.close()
  }
}

export async function clearConnectionData(): Promise<void> {
  const connection = await getConnection()
  const entities = connection.entityMetadatas

  entities.forEach(async (entity) => {
    const repository = getRepository(entity.name)
    await repository.query(`DELETE FROM ${entity.tableName}`)
  })
}