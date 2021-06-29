// import bcrypt from 'bcrypt';
// import { PrismaClient, Endpoints } from '@prisma/client';
// import { CreateEndpointsDto } from '@dtos/Endpointss.dto';
// import HttpException from '@exceptions/HttpException';
// import { isEmpty } from '@utils/util';
import { Repository, Connection, getConnection } from 'typeorm'
import { CreateNotificationDto } from '~/dto/CreateNotification.dto'
import { Notifications } from '~/database/models/notifications'
import EndpointsService from '../endpoints/endpoints.service'
import { Endpoints } from '~/database/models/endpoints'
import { TestNotificationDto } from '~/dto/TestNotification.dto'
import { notifyEndpoint } from '~/workers/notify.worker'
import { jobDataDTO } from '~/dto/JobData.dto'
// import { Connection, Repository } from 'typeorm';

class NotificationsService {
  public notificationsModel: Repository<Notifications>

  constructor(connection: Connection) {
    this.notificationsModel = connection.getRepository(Notifications)
  }

  public async findAll(): Promise<Notifications[]> {
    const allEndpoints: Notifications[] = await this.notificationsModel
      .createQueryBuilder('endpoint')
      .take(10)
      .getMany()

    return allEndpoints
  }

  public async findByMerchantID(merchantID: number): Promise<Notifications[]> {
    const merchantEndpoints: Notifications[] = await this.notificationsModel
      .createQueryBuilder('endpoint')
      .where('endpoint.merchantID = :merchantID', { merchantID: merchantID })
      .getMany()

    return merchantEndpoints
  }

  public async publishNotification(notificationData: CreateNotificationDto): Promise<any> {
    // Get endpoints by merchantID
    const endpointService = new EndpointsService(await getConnection())
    const endpoints = await endpointService.findByMerchantIDAndEvent(
      notificationData.merchantID,
      notificationData.event,
    )

    // Create notification in database
    const publishStatuses = endpoints.map(async (endpoint) => {
      const createPayload = {
        endpointId: endpoint.id,
        event: notificationData.event,
        is_test: notificationData.isTest,
        payload: notificationData.payload,
      }
      console.log(createPayload)
      await this.notificationsModel.create(createPayload).save()

      // Notify Listeners
      const publishPayload = {
        url: endpoint.url,
        secret: endpoint.secret,
        payload: notificationData.payload,
      }
      console.log(publishPayload)
      await this._notifySubscribers(notificationData.event, publishPayload)

      return { status: 'ok', event: notificationData.event, endpointId: endpoint.id, ...publishPayload }
    })

    return publishStatuses
  }

  public async testNotification(endpointData: TestNotificationDto): Promise<any> {
    // Get endpoints by merchantID
    const endpointService = new EndpointsService(await getConnection())
    const endpoint = await endpointService.findByID(endpointData.endpointID)

    const createPayload = {
      endpointId: endpointData.endpointID,
      event: endpoint.event,
      is_test: true,
      payload: endpointData.payload,
    }
    const createdNotification = await this.notificationsModel.create(createPayload).save()

    // Notify Listeners
    const publishPayload = {
      url: endpoint.url,
      secret: endpoint.secret,
      payload: endpointData.payload,
    }
    await this._notifySubscribers(endpoint.event, publishPayload)

    // auto trigger the notify worker
    const jobData: jobDataDTO = {
      id: createdNotification.id,
      name: endpoint.event,
      data: publishPayload
    }
    
    const response = await notifyEndpoint(jobData)

    return { status: response['status'], event: endpoint.event, endpointId: endpointData.endpointID, ...publishPayload }
  }

  private async _notifySubscribers(eventName: string, data: Record<string, unknown>) {
    // Stub call to notify Task Queue
    return { status: 'pending', event: eventName, data: data }
  }

  public async update(): Promise<Notifications> {
    return
  }

  public async delete(): Promise<Notifications> {
    return
  }
}

export default NotificationsService
