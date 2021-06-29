import { notifyEndpoint } from '~/workers/notify.worker'
import * as nock from 'nock'
import { jobDataDTO } from '~/dto/JobData.dto'

describe('Testing notify Endpoint callback function', () => {
  const testJobData: jobDataDTO = {
    id: '123313iii-dsdw-2323',
    name: 'invoice',
    data: {
      url: 'http://www.knazran.dev/webhook',
      secret: 'iWannaWorkAtXendit',
      payload: {
        message: 'Invoice paid',
        amount: 100000,
        status: 'completed',
      },
    },
  }

  it('should able to succeesfully notify. Return 200', async () => {
    nock('http://www.knazran.dev').post(`/webhook`).reply(200)

    const results = await notifyEndpoint(testJobData)

    expect(results['status']).toBe('ok')
  })

  it('should able to succeesfully notify. Return 201', async () => {
    nock('http://www.knazran.dev').post(`/webhook`).reply(201)

    const results = await notifyEndpoint(testJobData)

    expect(results['status']).toBe('ok')
  })

  it('Test presence of x-xendit-notify header. Header exists with correct secret', async () => {
    nock('http://www.knazran.dev', {
      reqheaders: {
        'x-xendit-notify': (headerValue) => headerValue === testJobData.data.secret,
      }
    }).post(`/webhook`).reply(201)

    const results = await notifyEndpoint(testJobData)

    expect(results['status']).toBe('ok')
  })

  it('Error in calling. Url not found', async () => {

    nock('http://www.knazran.dev').post(`/webhook`).reply(404)

    const results = await notifyEndpoint(testJobData)

    expect(results['status']).toBe('error')
    expect(results['message']).toBe('Endpoint not found')
  })

  it('Error in calling. Request Timeout.', async () => {

    nock('http://www.knazran.dev').post(`/webhook`).reply(408)

    const results = await notifyEndpoint(testJobData)

    expect(results['status']).toBe('error')
    expect(results['message']).toBe('Request Timeout')
  })

  // it('Error in calling. Request Timeout from client', async () => {

  //   nock('http://www.knazran.dev').post(`/webhook`).delayConnection(11000).reply(200)

  //   const results = await notifyEndpoint(testJobData)

  //   expect(results['status']).toBe('error')
  //   expect(results['message']).toBe('Request Timeout')
  // })

  it('Error in calling. Server Unavailable', async () => {

    nock('http://www.knazran.dev').post(`/webhook`).reply(500)

    const results = await notifyEndpoint(testJobData)

    expect(results['status']).toBe('error')
    expect(results['message']).toBe('Server unavailable')
  })
})
