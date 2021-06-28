import { closeConnection, getConnection } from '~/database'

beforeAll(() => getConnection())
afterAll(() => closeConnection())
