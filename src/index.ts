import config from '~/config'
import { getConnection } from './database'
import * as bodyParser from 'body-parser'
// import * as compression from 'compression'
import * as cors from 'cors'
import * as express from 'express'
// import { Request, Response } from 'express'
import * as helmet from 'helmet'
// import * as httpStatus from 'http-status'
// import * as morgan from 'morgan'

// import config from '~/config'

import { handleErrors } from '~/middlewares/error'
import router from '~/api/router'

async function onStart(): Promise<any> {
  try {
    await getConnection()
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err)
    throw err
  }
}

const PORT = config.SERVER_PORT || '3000'
const app = express()

app.use(helmet())
app.use(cors())
// app.use(compression())
app.use(bodyParser.json())

app.use(router)

app.use(handleErrors)

app.listen(PORT, onStart)

// tslint:disable-next-line:no-console
console.log(`=================================`)
console.log(`🚀 App listening on the port ${PORT}`)
console.log(`=================================`)
