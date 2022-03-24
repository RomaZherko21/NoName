import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserModel from '../models/user.model'

class UserController {
  async list({ body }: Request, res: Response, next: NextFunction) {
    try {
      const { offset, limit } = body
      const { rows, count } = await UserModel.findAndCountAll({
        offset: offset || 0,
        limit: limit || 2,
      })

      res.status(200).json({ users: rows, count })
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

  async update({ body }: Request, res: Response, next: NextFunction) {
    try {
      const hash = await bcrypt.hash(body.password, 10)

      const data = await UserModel.update(
        {
          ...body,
          password: hash,
        },
        {
          where: {
            email: body.email,
          },
        }
      )

      if (!data) return next(createError(400, 'User wasnt updated'))

      res.status(200).json(data)
    } catch (err) {
      next(createError(500))
    }
  }

  async self(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]

      jwt.verify(
        token,
        process.env.TOKEN_SECRET as string,
        async (err: any, user: any) => {
          if (err) return next(createError(403))

          const data = await UserModel.findOne({
            where: {
              email: user.email,
            },
          })

          if (!data) return next(createError(400, 'User wasnt deleted'))

          res.status(200).json(data)
        }
      )
    } catch (err) {
      next(createError(500))
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body
      const data = await UserModel.destroy({
        where: {
          id,
        },
      })

      if (!data) return next(createError(403, 'Unauthorized'))

      res.status(200).json(data)
    } catch (err) {
      next(createError(500))
    }
  }
}

export default new UserController()
