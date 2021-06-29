import { NextFunction, Request, Response } from 'express'
// import { CreateUserDto } from '@dtos/Endpoints.dto';
import { getConnection } from '~/database'
import { Notifications } from '~/database/models/notifications'
import { CreateNotificationDto } from '~/dto/CreateNotification.dto'
import { validation } from '~/middlewares/validation'
import EndpointsService from '../endpoints/endpoints.service'
import NotificationsService from './notifications.service'

export class NotificationsController {
  // public endpointService = new EndpointsService(this.connection)

  public getEndpoints = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notificationService = new NotificationsService(await getConnection())
      const findAllEndpointsData: Notifications[] = await notificationService.findAll()

      res.status(200).json({ data: findAllEndpointsData, message: 'findAll' })
    } catch (error) {
      next(error)
    }
  }

  public getEndpointById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const merchantID = Number(req.params.id)
      const notificationService = new NotificationsService(await getConnection())
      const endpointData: Notifications[] = await notificationService.findByMerchantID(merchantID)

      res.status(200).json({ data: endpointData, message: 'findOne' })
    } catch (error) {
      next(error)
    }
  }

  public createNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createNotificationData: CreateNotificationDto = req.body
      const notificationService = new NotificationsService(await getConnection())

      // Get endpoints belonging to merchant
      const endpointService = new EndpointsService(await getConnection())
      const endpoints = await endpointService.findByMerchantIDAndEvent(createNotificationData.merchantID, createNotificationData.event)
      console.log(endpoints)

      const createEndpoint: Notifications = await notificationService.publishNotification(createNotificationData)



      res.status(201).json({ data: createEndpoint, message: 'created' })
    } catch (error) {
      next(error)
    }
  }
}
