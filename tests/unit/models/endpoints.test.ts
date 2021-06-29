import * as faker from 'faker'

import { Endpoints } from '~/database/models/endpoints'

const url = faker.internet.url()

describe('Endpoints Model', () => {
  it('should add Endpoint', async () => {
    const model = new Endpoints()
    model.url = url
    model.merchantID = 1
    model.event = 'invoice'
    model.secret = 'iWannaWorkAtXendit'
    await model.save()

    const endpoint = await Endpoints.createQueryBuilder()
      .select()
      .where({ url })
      .getOne()

    expect(endpoint).not.toBeUndefined()
    expect(endpoint.url).toBe(url)
  })
})
