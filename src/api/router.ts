import * as express from 'express'
import endpointRoutes from '~/api/endpoints/endpoints.router'
import notificationRoutes from '~/api/notifications/notifications.router'

const router = express.Router()

router.use('/endpoint', endpointRoutes)
router.use('/notification', notificationRoutes)

export default router
