import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { QueryTypes } from 'sequelize'

import { sequelize, UserModel } from 'models'

import { getUserListQuery } from './queries'

class UsersController {
  async get({ body }: Request, res: Response, next: NextFunction) {
    try {
      const { offset, limit, filters = {} } = body

      const users = await sequelize.query(getUserListQuery({ limit, offset, filters }), {
        type: QueryTypes.SELECT,
      })
      const count = await UserModel.count()

      res.status(200).json({ users, count })
    } catch {
      next(createError(500))
    }
  }

  async create({ body }: Request, res: Response, next: NextFunction) {
    try {
      const hash = await bcrypt.hash(body.password, 10)

      const data = await UserModel.create({
        ...body,
        password: hash,
      })

      res.status(200).json(data)
    } catch (err) {
      next(createError(500))
    }
  }

  async update({ body, params }: Request, res: Response, next: NextFunction) {
    try {
      const { id } = params

      const hash = await bcrypt.hash(body.password, 10)

      const data = await UserModel.update(
        {
          ...body,
          password: hash,
        },
        {
          where: {
            id,
          },
        }
      )

      if (!data) return next(createError(400, 'User wasnt updated'))

      return res.status(200).json(data)
    } catch (err) {
      return next(createError(500))
    }
  }

  async remove({ params }: Request, res: Response, next: NextFunction) {
    try {
      const { id } = params
      const data = await UserModel.destroy({
        where: {
          id,
        },
      })

      if (!data) return next(createError(403, 'Unauthorized'))

      return res.status(200).json(data)
    } catch (err) {
      return next(createError(500))
    }
  }
}

export default new UsersController()
