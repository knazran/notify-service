import Router from 'express-promise-router'
import { list, login } from '~/api/users/controller'

const router = Router()

router.route('/').get(list)
router.route('/login').get(login)

export default router
