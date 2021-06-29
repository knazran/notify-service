import { TaskQueue } from '~/task_queue'
import config from '~/config'
import PgBoss from 'pg-boss'

describe('Initialise TaskQueue', () => {
  let queue
  const connOpts = {
    host: config.DB.HOST,
    port: config.DB.PORT,
    ssl: false,
    database: config.DB.NAME,
    user: config.DB.USER,
    password: config.DB.PASSWORD,
  }

  it('Initialise and Start TaskQueue with Connection Option', async () => {
    queue = new TaskQueue(connOpts)
    const queueInstance = await queue.init()
    // console.log(queueInstance)

    expect(queueInstance).not.toBeUndefined()
  })

  it.todo('Initialise and Start TaskQueue with Connection Options')
})

describe('Publish to TaskQueue', () => {
  let queue
  const connOpts = {
    host: config.DB.HOST,
    port: config.DB.PORT,
    ssl: false,
    database: config.DB.NAME,
    user: config.DB.USER,
    password: config.DB.PASSWORD,
  }
  it('Publish a task and successfully executed', async () => {
    queue = new TaskQueue(connOpts)
    const queueInstance = await queue.init()

    expect(queueInstance).not.toBeUndefined()

    const jobID = await queue.publish('hey-there', {msg: "This is for you"})
    expect(jobID.length > 0).toBeTruthy()

    await queue.queue.cancel(jobID)
  })

  it.todo('Publish a task with Singleton Key')

  it.todo('Publish a task and failed. No retry')

  it.todo('Publish a task and failed. Exponential Backoff')

  it.todo('Initialise TaskQueue with Connection Options')
})

describe('Subscribe to TaskQueue', () => {
    let queue
  const connOpts = {
    host: config.DB.HOST,
    port: config.DB.PORT,
    ssl: false,
    database: config.DB.NAME,
    user: config.DB.USER,
    password: config.DB.PASSWORD,
  }
  it('Publish to a task and successfully handled it', async () => {
    queue = new TaskQueue(connOpts)
    await queue.init()

    async function addHandler(data) {
        return data.a + data.b
    }
    await queue.publish('hey-there', {a: 3, b:2})
    // const additionResult = await queue.subscribe('testing-subscription', {}, job => addHandler(job.data))
    const additionResult = await queue.subscribe('testing-subscription', addHandler)

    expect(additionResult).toEqual(5)
  })

  it.todo('Initialise TaskQueue with Connection Options')
})
