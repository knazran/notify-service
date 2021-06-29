// import EndpointsService from '~/services/endpoints.service'
import { CreateEndpointDto } from '~/dto/CreateEndpoint.dto'
import { Endpoints } from '~/database/models/endpoints'
import { getConnection, clearConnectionData } from '~/database'
import EndpointsService from '~/api/endpoints/endpoints.service'

import { testCreateEndpointDto } from '../../fixtures/endpoints.fixtures'

beforeEach(async () => {
  await clearConnectionData()
})

describe('Endpoint Service - findAll', () => {
  it('Return all endpoints, limited to first 10', async () => {
    const endpointService = new EndpointsService(await getConnection())
    const findAllEndpointsData: Endpoints[] = await endpointService.findAll()

    expect(findAllEndpointsData.length).toBeLessThanOrEqual(10)
  })
})

describe('Endpoint Service - findByMerchantIDAndEvent', () => {
  it('Find endpoint by merchant ID and Event', async () => {
    const endpointService = new EndpointsService(await getConnection())
    const createdEndpoint = await endpointService.create(testCreateEndpointDto)
    const endpoint = await endpointService.findByMerchantIDAndEvent(
      testCreateEndpointDto.merchantID,
      testCreateEndpointDto.event,
    )
    console.log(createdEndpoint)
    console.log(endpoint)
    expect(endpoint.length).toBeLessThanOrEqual(10)
  })
})

describe('Endpoint Service - findAll', () => {
  it('Return all endpoints, limited to first 10', async () => {
    const endpointService = new EndpointsService(await getConnection())
    const findAllEndpointsData: Endpoints[] = await endpointService.findAll()

    expect(findAllEndpointsData.length).toBeLessThanOrEqual(10)
  })
})
