import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ValidationErrorItem } from 'sequelize/dist'
import path from 'path'

require('dotenv').config()

/* eslint-disable import/first */
import { log } from 'shared/helpers'
import router from 'routes'
import { useHttpError, useAuth } from 'middlewares'
import sequelize from 'models'
/* eslint-enable */

const { CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT, SERVER_HOST, SERVER_PORT } = process.env

const app = express()
const corsOptions = {
  credentials: true,
  origin: `${CLIENT_PROTOCOL}://${CLIENT_HOST}:${CLIENT_PORT}`,
}

app.use(cors(corsOptions))
app.use(cors())
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
    app.listen(Number(SERVER_PORT), String(SERVER_HOST), () => {
      log.positive(`Server has been started: ${SERVER_HOST}:${SERVER_PORT}`)
    })
  })
  .catch((err: ValidationErrorItem) => log.negative(`Server has not been started: ${err.message}`))

app.use(useHttpError)
