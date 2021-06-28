import { Notifications } from '~/database/models/notifications'

const event = 'test event'

describe('Notifications Model', () => {
  it('should add Notifications', async () => {
    const model = new Notifications()
    model.event = event
    await model.save()

    const notification = await Notifications.createQueryBuilder()
      .select()
      .where({ event })
      .getOne()

    expect(notification).not.toBeUndefined()
    expect(notification.event).toBe(event)
  })
})
