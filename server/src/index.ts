import express from 'express'
import { ValidationErrorItem } from 'sequelize'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'

import { useHttpError, useAuth } from 'middlewares'
import { sequelize } from 'models'
import { log } from 'shared/helpers'

import router from './routes'

const { CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT, SERVER_HOST, SERVER_PORT_INNER } = process.env

const app = express()
const corsOptions = {
  credentials: true,
  origin: `${CLIENT_PROTOCOL}://${CLIENT_HOST}:${CLIENT_PORT}`,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/uploads', express.static(path.join('uploads')))

app.use(useAuth)

app.use('/api', router)

sequelize
  .sync()
  .then(() => {
    app.listen(Number(SERVER_PORT_INNER), String(SERVER_HOST), () => {
      log.positive(`Server has been started: ${SERVER_HOST}:${SERVER_PORT_INNER}`)
    })
  })
  .catch((err: ValidationErrorItem) => log.negative(`Server has not been started: ${err.message}`))

app.use(useHttpError)
