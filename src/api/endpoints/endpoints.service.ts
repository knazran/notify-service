// import bcrypt from 'bcrypt';
// import { PrismaClient, Endpoints } from '@prisma/client';
// import { CreateEndpointsDto } from '@dtos/Endpointss.dto';
// import HttpException from '@exceptions/HttpException';
// import { isEmpty } from '@utils/util';
import { Endpoints } from '~/database/models/endpoints'
import { Repository, Connection } from 'typeorm'
import { CreateEndpointDto } from '~/dto/CreateEndpoint.dto'
// import { Connection, Repository } from 'typeorm';

class EndpointsService {
  public endpointsModel: Repository<Endpoints>

  constructor(connection: Connection) {
    this.endpointsModel = connection.getRepository(Endpoints)
  }

  public async findAll(): Promise<Endpoints[]> {
    const allEndpoints: Endpoints[] = await this.endpointsModel.createQueryBuilder('endpoint').take(10).getMany()

    return allEndpoints
  }

  public async findByID(endpointID: string): Promise<Endpoints> {
    const endpoint: Endpoints = await this.endpointsModel
      .createQueryBuilder('endpoint')
      .where('endpoint.id = :endpointID', { endpointID: endpointID })
      .getOne()

    return endpoint
  }

  public async findByMerchantID(merchantID: number): Promise<Endpoints[]> {
    const merchantEndpoints: Endpoints[] = await this.endpointsModel
      .createQueryBuilder('endpoint')
      .where('endpoint.merchantID = :merchantID', { merchantID: merchantID })
      .getMany()

    return merchantEndpoints
  }

  public async findByMerchantIDAndEvent(merchantID: number, eventType: string): Promise<Endpoints[]> {
    const merchantEndpoints: Endpoints[] = await this.endpointsModel
      .createQueryBuilder('endpoint')
      .where('endpoint.merchantID = :merchantID', { merchantID: merchantID })
      .andWhere('endpoint.event = :eventType', { eventType: eventType })
      .getMany()

    return merchantEndpoints
  }

  public async create(endpointData: CreateEndpointDto): Promise<Endpoints> {
    const createdEndpoint: Endpoints = await this.endpointsModel.create(endpointData).save()
    return createdEndpoint
  }

  public async update(): Promise<Endpoints> {
    return
  }

  public async delete(): Promise<Endpoints> {
    return
  }
}

export default EndpointsService
