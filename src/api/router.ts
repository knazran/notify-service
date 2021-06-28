import * as express from 'express'
import { EndpointsController } from '~/controllers/endpoints.controller'
// import userRouter from '~/packages/api/resources/users/index'

const router = express.Router()
const endpointController: EndpointsController = new EndpointsController()

// router.use('/endpoints', EndpointsController)
router.route('/endpoint').get(endpointController.getEndpoints)
// router.post('/endpoints', endpointController.createEndpoint)
router.route('/endpoint').post(endpointController.createEndpoint)
router.route('/endpoint/:id').get(endpointController.getEndpointById)


export default router
