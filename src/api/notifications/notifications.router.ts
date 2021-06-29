import * as express from 'express'
import { EndpointsController } from '~/api/endpoints/endpoints.controller'

const router = express.Router()
const endpointController: EndpointsController = new EndpointsController()

router.route('/').get(endpointController.getEndpoints)
router.route('/').post(endpointController.createEndpoint)
router.route('/:id').get(endpointController.getEndpointById)


export default router
