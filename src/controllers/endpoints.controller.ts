import { NextFunction, Request, Response } from 'express'
// import { CreateUserDto } from '@dtos/Endpoints.dto';
import { getConnection } from '~/database'
import { Endpoints } from '~/database/models/endpoints'
import EndpointsService from '~/services/endpoints.service'
import { CreateEndpointDto } from '~/dto/CreateEndpoint.dto'

export class EndpointsController {
  // public endpointService = new EndpointsService(this.connection)

  public getEndpoints = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const endpointService = new EndpointsService(await getConnection())
      const findAllEndpointsData: Endpoints[] = await endpointService.findAll(req.user.id)

      res.status(200).json({ data: findAllEndpointsData, message: 'findAll' })
    } catch (error) {
      next(error)
    }
  }

  public getEndpointById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const merchantID = Number(req.params.id)
      const endpointService = new EndpointsService(await getConnection())
      const endpointData: Endpoints = await endpointService.findByMerchantID(merchantID)

      res.status(200).json({ data: endpointData, message: 'findOne' })
    } catch (error) {
      next(error)
    }
  }

  public createEndpoint = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const endpointData: CreateEndpointDto = req.body
      const endpointService = new EndpointsService(await getConnection())
      const createUserData: Endpoints = await endpointService.create(endpointData)

      res.status(201).json({ data: createUserData, message: 'created' })
    } catch (error) {
      next(error)
    }
  }

  // public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userId = Number(req.params.id)
  //     const userData: CreateEndpointDto = req.body
  //     const updateUserData: Endpoints = await this.endpointService.update(userId, userData)

  //     res.status(200).json({ data: updateUserData, message: 'updated' })
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userId = Number(req.params.id)
  //     const deleteUserData: Endpoints = await this.endpointService.delete(userId)

  //     res.status(200).json({ data: deleteUserData, message: 'deleted' })
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
