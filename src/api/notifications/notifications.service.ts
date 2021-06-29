// import bcrypt from 'bcrypt';
// import { PrismaClient, Endpoints } from '@prisma/client';
// import { CreateEndpointsDto } from '@dtos/Endpointss.dto';
// import HttpException from '@exceptions/HttpException';
// import { isEmpty } from '@utils/util';
import { Repository, Connection, getConnection } from 'typeorm'
import { CreateNotificationDto } from '~/dto/CreateNotification.dto'
import { Notifications } from '~/database/models/notifications'
import EndpointsService from '../endpoints/endpoints.service'
// import { Connection, Repository } from 'typeorm';

class NotificationsService {
  public notificationsModel: Repository<Notifications>

  constructor(connection: Connection) {
    this.notificationsModel = connection.getRepository(Notifications)
  }

  public async findAll(): Promise<Notifications[]> {
    const allEndpoints: Notifications[] = await this.notificationsModel.createQueryBuilder('endpoint').take(10).getMany()

    return allEndpoints
  }

  public async findByMerchantID(merchantID: number): Promise<Notifications[]> {
    const merchantEndpoints: Notifications[] = await this.notificationsModel
      .createQueryBuilder('endpoint')
      .where('endpoint.merchantID = :merchantID', { merchantID: merchantID })
      .getMany()

    return merchantEndpoints
  }

  public async publishNotification(notificationData: CreateNotificationDto): Promise<Notifications> {
    // Get endpoints by merchantID
    const endpointService = new EndpointsService(await getConnection())
    const endpoints = await endpointService.findByMerchantIDAndEvent(notificationData.merchantID, notificationData.event)

    // Create notification in database 
    const createdEndpoint: Notifications = await this.notificationsModel.save(notificationData)
    return createdEndpoint
  }

  public async update(): Promise<Notifications> {
    return
  }

  public async delete(): Promise<Notifications> {
    return
  }
}

export default NotificationsService
