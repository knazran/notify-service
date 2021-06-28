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

export async function clear(): Promise<void> {
  const connection = getConnection()
  const entities = (await connection).entityMetadatas

  entities.forEach(async (entity) => {
    const repository = await getRepository(entity.name)
    await repository.query(`DELETE FROM ${entity.tableName}`)
  })
}