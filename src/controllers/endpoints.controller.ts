import { NextFunction, Request, Response } from 'express'
// import { CreateUserDto } from '@dtos/Endpoints.dto';
import { getConnection } from '~/database'
import { Endpoints } from '~/database/models/endpoints'
import EndpointsService from '~/services/endpoints.service'
import { CreateEndpointDto } from '~/dto/CreateEndpoint.dto'
import { validation } from '~/middlewares/validation'

export class EndpointsController {
  // public endpointService = new EndpointsService(this.connection)

  public getEndpoints = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const endpointService = new EndpointsService(await getConnection())
      const findAllEndpointsData: Endpoints[] = await endpointService.findAll()

      res.status(200).json({ data: findAllEndpointsData, message: 'findAll' })
    } catch (error) {
      next(error)
    }
  }

  public getEndpointById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const merchantID = Number(req.params.id)
      const endpointService = new EndpointsService(await getConnection())
      const endpointData: Endpoints[] = await endpointService.findByMerchantID(merchantID)

      res.status(200).json({ data: endpointData, message: 'findOne' })
    } catch (error) {
      next(error)
    }
  }

  public createEndpoint = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const endpointData: CreateEndpointDto = req.body
      const createdEndpoint = await validation(endpointData)
      const endpointService = new EndpointsService(await getConnection())
      const createEndpoint: Endpoints = await endpointService.create(createdEndpoint)

      res.status(201).json({ data: createEndpoint, message: 'created' })
    } catch (error) {
      next(error)
    }
  }
}
