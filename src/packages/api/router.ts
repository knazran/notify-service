import * as express from 'express'
import { EndpointsController } from '~/controllers/endpoints.controller'
// import userRouter from '~/packages/api/resources/users/index'

const router = express.Router()
const endpointController: EndpointsController = new EndpointsController()

// router.use('/endpoints', EndpointsController)
router.get('/endpoints', endpointController.getEndpoints)
// router.post('/endpoints', endpointController.createEndpoint)
router.get('/endpoints/:id', endpointController.getEndpointById)


export default router
