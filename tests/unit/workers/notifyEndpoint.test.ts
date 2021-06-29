import { notifyEndpoint } from '~/workers/notify.worker'
import * as nock from 'nock'

describe('Testing notify Endpoint callback function', () => {
  it('should able to notify', async () => {
    const testJobData = {
      data: {
        url: 'http://www.knazran.dev/webhook',
        payload: {
          message: 'Invoice paid',
          amount: 100000,
          status: 'completed',
        },
      },
    }

    nock('http://www.knazran.dev').post(`/webhook`).reply(200)

    const results = await notifyEndpoint(testJobData)
    console.log(results)

    expect(results['status']).toBe('ok')
  })
})
