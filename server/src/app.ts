require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ValidationErrorItem } from 'sequelize/dist'
import path from 'path'

import router from './ROUTES'
import sequelize from './models'
import { log } from './shared/helpers'
import { useHttpError, useAuth } from './middlewares'

const { CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT, SERVER_HOST, SERVER_PORT } =
  process.env

const app = express()
const corsOptions = {
  credentials: true,
  origin: `${CLIENT_PROTOCOL}://${CLIENT_HOST}:${CLIENT_PORT}`,
}

app.use(cors(corsOptions))
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
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
