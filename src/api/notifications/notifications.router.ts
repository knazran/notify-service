import * as express from 'express'
import { NotificationsController } from './notifications.controller'

const router = express.Router()
const controller: NotificationsController = new NotificationsController()

router.route('/').post(controller.publishNotification)
router.route('/test').post(controller.testNotification)

export default router
