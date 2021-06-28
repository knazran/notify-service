import * as faker from 'faker'
import { Merchants } from '~/database/models/merchants'

const email = faker.internet.email()

describe('Merchants Model', () => {
  it('should add Merchant', async () => {
    const model = new Merchants()
    model.email = email
    await model.save()

    const merchant = await Merchants.createQueryBuilder()
      .select()
      .where({ email })
      .getOne()

    expect(merchant).not.toBeUndefined()
    expect(merchant.email).toBe(email)
  })
})
