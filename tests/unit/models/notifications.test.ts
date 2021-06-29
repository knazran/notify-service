import { Notifications } from '~/database/models/notifications'
import { Endpoints } from '~/database/models/endpoints'

const event = 'invoice'

describe('Notifications Model', () => {
  it('should add Notifications', async () => {
    const endpoint = new Endpoints()
    endpoint.url = 'www.knazran.dev/webhook/invoice'
    endpoint.merchantID = 1
    endpoint.event = 'invoice'
    endpoint.secret = 'iWannaWorkAtXendit'
    await endpoint.save()


    const model = new Notifications()
    model.event = event
    model.payload = {someColumn1: 1, someColumn2:'invoice'}

    await model.save()

    const notification = await Notifications.createQueryBuilder()
      .select()
      .where({ event })
      .getOne()

    expect(notification).not.toBeUndefined()
    expect(notification.event).toBe(event)
  })
})
