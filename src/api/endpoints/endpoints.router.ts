import * as express from 'express'
import { EndpointsController } from '~/api/endpoints/endpoints.controller'

const router = express.Router()
const endpointController: EndpointsController = new EndpointsController()

router.route('/').get(endpointController.getEndpoints)
router.route('/:id').get(endpointController.getEndpointById)
router.route('/').post(endpointController.createEndpoint)

export default router
