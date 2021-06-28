import { Router } from 'express'
import { CreateUserDto } from '@dtos/users.dto'
import Route from '~/interfaces/routes.interface'
import validationMiddleware from '@middlewares/validation.middleware'
import EndpointsController from '~/controllers/endpoints.controller'

class EndpointsRoute implements Route {
  public path = '/endpoint'
  public router = Router()
  public usersController = new UsersController()
  public endpointController: EndpointsController = new EndpointsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers)
    this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById)
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser)
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(CreateUserDto, 'body', true),
      this.usersController.updateUser,
    )
    this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser)
  }
}

export default EndpointsRoute
