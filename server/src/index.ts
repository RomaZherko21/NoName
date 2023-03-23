import express from 'express'
import { createServer } from 'http'
import { Server as WsServer } from 'ws'
import { ValidationErrorItem } from 'sequelize'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { useHttpError, useAuth } from 'middlewares'
import { sequelize } from 'models'
import { log } from 'shared/helpers'

import router from './routes'
import wsHandler from 'wsHandler'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'NoName API',
    version: '1.0.0',
    description: 'NoName API made with NodeJs/Express and documented with Swagger',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./**/*.ts'],
}

const specs = swaggerJsdoc(options)

const { CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT, SERVER_HOST, SERVER_PORT_INNER } = process.env

const app = express()
const httpServer = createServer(app)
const wss = new WsServer({ server: httpServer })

const corsOptions = {
  credentials: true,
  origin: `${CLIENT_PROTOCOL}://${CLIENT_HOST}:${CLIENT_PORT}`,
}

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join('uploads')))

app.use(useAuth)

wsHandler(wss)

app.use('/', router)

sequelize
  .sync()
  .then(() => {
    httpServer.listen(Number(SERVER_PORT_INNER), String(SERVER_HOST), () => {
      log.positive(`Server has been started: ${SERVER_HOST}:${SERVER_PORT_INNER}`)
    })
  })
  .catch((err: ValidationErrorItem) => log.negative(`Server has not been started: ${err.message}`))

app.use(useHttpError)
