require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ValidationErrorItem } from 'sequelize/dist'
import path from 'path'

import router from './routes'
import sequelize from './models'
import log from './helpers/logs'
import useHttpError from './middlewares/useHttpError'
import useAuth from './middlewares/useAuth'

const { CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT, SERVER_HOST, SERVER_PORT } =
  process.env

const app = express()
const corsOptions = {
  credentials: true,
  origin: `${CLIENT_PROTOCOL}://${CLIENT_HOST}:${CLIENT_PORT}`,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join('uploads')))

app.use(useAuth)

app.use('/', router)

sequelize
  .sync()
  .then(() => {
    app.listen(Number(SERVER_PORT), SERVER_HOST, () => {
      log.positive(`Server has been started: ${SERVER_HOST}:${SERVER_PORT}`)
    })
  })
  .catch((err: ValidationErrorItem) =>
    log.negative(`Server has not been started: ${err.message}`)
  )

app.use(useHttpError)
