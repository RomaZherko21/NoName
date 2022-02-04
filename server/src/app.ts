require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import router from './routes'
import sequelize from './models'
import log from './helpers/logs'

const { CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT, SERVER_HOST, SERVER_PORT } =
  process.env

const app = express()
const corsOptions = {
  credentials: true,
  origin: `${CLIENT_PROTOCOL}://${CLIENT_HOST}:${CLIENT_PORT}`,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use('/', router)

sequelize
  .sync()
  .then(() => {
    app.listen(Number(SERVER_PORT), SERVER_HOST, () => {
      log.positive(`Server has been started: ${SERVER_HOST}:${SERVER_PORT}`)
    })
  })
  .catch((err: any) =>
    log.negative(`Server has not been started: ${err.message}`)
  )
