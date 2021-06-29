import PgBoss = require('pg-boss');

class SubscribeToQueueOpts {
  public eventName: string

  public payload: Record<string, unknown>

  public opts?: PgBoss.SubscribeOptions

}

class PublishToQueueOpts {
  public eventName: string

  public opts?: PgBoss.SubscribeOptions

  public handler?: Promise<any>

}

export class TaskQueue {

    public queue: PgBoss;

    constructor(connOpts: PgBoss.DatabaseOptions) {
      this.queue = new PgBoss(connOpts)

      // To change into a proper logger
      this.queue.on('error', error => console.error(error))
    }

    public async init(): Promise<PgBoss>  {
      return await this.queue.start()
    }

    public async stop(): Promise<void>  {
      return await this.queue.stop()
    }

    public async subscribe(eventName: string, handler: any, opts?: Record<string, unknown>): Promise<string>  {
      return await this.queue.subscribe(eventName, opts || {}, handler)
    }

    // public async unsubscribe(subscribeOpts: SubscribeToQueueOpts): Promise<void>  {
    //   this.queue.subscribe(subscribeOpts.eventName, subscribeOpts.payload, subscribeOpts.opts || {})
    // }

    public async publish(eventName: string, data: Record<string, unknown>, opts?: Record<string, unknown>): Promise<string>  {
      return await this.queue.publish(eventName, data, opts || {})
    }

    public async fetch(eventName: string, batchSize?: number, opts?: Record<string, unknown>): Promise<any>  {
      return await this.queue.fetch(eventName, batchSize || 20, opts || {})
    }
}