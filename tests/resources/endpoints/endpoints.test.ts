// import EndpointsService from '~/services/endpoints.service'
import { server } from '../../config/helpers'
import { CreateEndpointDto } from '~/dto/CreateEndpoint.dto'
import { Endpoints } from '~/database/models/endpoints'

describe('GET /endpoint/merchantID', () => {
  it('Return no endpoints, no endpoint created yet', async () => {
    const merchantID = 1
    const res = await server.get(`/endpoint/${merchantID}`)
    const { status, body } = res

    expect(status).toBe(200)
    // Check if it returns array
    expect(body.length == 0).toBeTruthy()
  })

  it('Return Endpoints belonging to the user', async () => {
    const merchantID = 1
    // Create
    const model: Endpoints = new Endpoints()
    model.url = 'www.knazran.dev/webhooks/payments'
    model.merchantID = merchantID
    model.event = 'invoice'
    model.secret = 'iWannaWorkAtXendit'
    await model.save()

    const res = await server.get(`/endpoint/${merchantID}`)
    const { status, body } = res

    expect(status).toBe(200)
    // Check if it returns array
    expect(body.length == 0).toBeTruthy()
  })

  //   it('Return Endpoints belonging to the user', async () => {
  //     const merchantID: number = testMerchant.id
  //     const res = await server.get(`/endpoint/${merchantID}`)
  //     const { status, body } = res

  //     expect(status).toBe(200)
  //     expect(body.length >= 0).toBeTruthy()
  //   })
})

describe('POST /endpoint', () => {
  it('Create a valid Endpoint', async () => {
    const payload: CreateEndpointDto = {
      merchantID: 10,
      secret: 'iWannaWorkInXendit',
      url: 'www.knazran.dev/webhooks/payments',
    }

    const res = await server.post('/endpoint').send(payload)
    const { status, body } = res

    expect(status).toBe(201)
    expect(body.length >= 0).toBeTruthy()
  })

  it('Invalid paylod: URL', async () => {
    const payload: CreateEndpointDto = {
      merchantID: 10,
      secret: 'iWannaWorkInXendit',
      url: 'asdadadadasdw1231312',
    }

    const res = await server.post('/endpoint').send(payload)
    const { status, body } = res

    expect(status).toBe(400)
    expect(body.length >= 0).toBeTruthy()
  })
})
