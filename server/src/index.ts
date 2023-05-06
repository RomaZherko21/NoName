import { createServer } from 'node:http'
import path from 'node:path'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { Server as WsServer } from 'ws'
import { ValidationErrorItem } from 'sequelize'
import bodyParser from 'body-parser'
import cors from 'cors'

import { createConnection } from 'mysql2'

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
})

import { useHttpError, useAuth } from 'middlewares'
import { sequelize } from 'models'
import { log } from 'shared/helpers'
import { initEmptyFolders, specs } from 'config'
import wsHandler from 'wsHandler'

import router from './routes'
import { ROOT_UPLOADS_FOLDER } from 'shared/consts'

const { CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT, SERVER_HOST, SERVER_PORT_INNER } = process.env

const app = express()
const httpServer = createServer(app)
const wss = new WsServer({ server: httpServer })

const corsOptions = {
  credentials: true,
  origin: `${CLIENT_PROTOCOL}://${CLIENT_HOST}:${CLIENT_PORT}`,
}

initEmptyFolders()

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/uploads', express.static(path.join(ROOT_UPLOADS_FOLDER)))

app.use(useAuth)

wsHandler(wss)

app.use('/', router)

sequelize
  .sync()
  .then(() => {
    return httpServer.listen(Number(SERVER_PORT_INNER), String(SERVER_HOST), () => {
      log.positive(`Server has been started: ${SERVER_HOST}:${SERVER_PORT_INNER}`)
    })
  })
  .catch((error: ValidationErrorItem) =>
    log.negative(`Server has not been started: ${error.message}`)
  )

app.use(useHttpError)
