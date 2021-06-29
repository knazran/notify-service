// import EndpointsService from '~/services/endpoints.service'
import { server } from '../config/helpers'
import { CreateEndpointDto } from '~/dto/CreateEndpoint.dto'
import { Endpoints } from '~/database/models/endpoints'


describe('GET /endpoint/:merchantID/notifications', () => {
  it.todo('Return notifications tied to this merchant, paginated by 10')

  it.todo('Return notifications tied to this merchant, get page 2 of results if exists')
})

describe('GET /notifications/:notificationID', () => {
  it.todo('Return information related to this Notification, limited to first 10')
})

describe('POST /notifications', () => {
  it.todo('Create a Test Notification and push it into the Job Queue')

  it.todo('Create a Live Notification and push it into the Job Queue')
})

describe('POST /notifications/:notificationID', () => {
  it.todo('Manually retry the Notification on Test')

  it.todo('Manually retry the Notification on Live')

  it.todo('Attempt to manually retry, but Notification is not in Failure state')
})


