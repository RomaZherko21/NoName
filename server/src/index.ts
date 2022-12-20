import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ValidationErrorItem } from 'sequelize/dist'
import path from 'path'

import { useHttpError, useAuth } from 'middlewares'
import { sequelize } from 'models'
import { log } from 'shared/helpers'

import router from './routes'

const { CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT, NODE_API_HOST, NODE_API_PORT } = process.env

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
app.use('/node-api/uploads', express.static(path.join('uploads')))

app.use(useAuth)

app.use('/node-api', router)

sequelize
  .sync()
  .then(() => {
    app.listen(Number(NODE_API_PORT), String(NODE_API_HOST), () => {
      log.positive(`Server has been started: ${NODE_API_HOST}:${NODE_API_PORT}`)
    })
  })
  .catch((err: ValidationErrorItem) => log.negative(`Server has not been started: ${err.message}`))

app.use(useHttpError)
