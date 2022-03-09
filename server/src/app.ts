require('dotenv').config()
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'

import router from './routes'
import sequelize from './models'
import log from './helpers/logs'
import { HttpException } from './types/common'
import { ValidationErrorItem } from 'sequelize/dist'

const { CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT, SERVER_HOST, SERVER_PORT } =
  process.env

const app = express()
const corsOptions = {
  credentials: true,
  origin: `${CLIENT_PROTOCOL}://${CLIENT_HOST}:${CLIENT_PORT}`,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/auth/signIn') return next()

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  console.log('token', token)

  if (!token) return next(createError(403))

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log(user)

      if (err) return next(createError(403))

      // req.user = user

      next()
    }
  )
})

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

app.use(
  (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    log.negative(`${error.status}: ${error.message}`)
    res.status(error.status || 500)
    res.json({
      status: error.status,
      message: error.message,
    })
  }
)
