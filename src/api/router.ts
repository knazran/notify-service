import * as express from 'express'
import endpointRoutes from '~/api/endpoints/endpoints.router'

const router = express.Router()

router.use('/endpoint', endpointRoutes)

export default router
