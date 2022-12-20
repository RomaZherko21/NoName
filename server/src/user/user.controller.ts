import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

import UserModel from 'models/user.model'
import PostModel from 'models/post.model'

class UserController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]

      jwt.verify(token || '', process.env.TOKEN_SECRET as string, async (err: any, user: any) => {
        if (err) return next(createError(403))

        const data = await UserModel.findOne({
          where: {
            email: user.email,
          },
        })

        if (!data) return next(createError(400, 'User wasnt deleted'))

        return res.status(200).json(data)
      })
    } catch (err) {
      next(createError(500))
    }
  }

  async update({ body }: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserModel.update(body, {
        where: {
          email: body.email,
        },
      })

      if (!data) return next(createError(400, 'User wasnt updated'))

      return res.status(200).json(data)
    } catch (err) {
      return next(createError(500))
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { avatar }: any = await UserModel.findByPk(id)

      if (avatar) {
        const filePath = path.join(
          path.dirname(require?.main?.path || ''),
          '/uploads',
          '/avatar',
          avatar
        )
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) throw err
          })
        }
      }

      await PostModel.destroy({
        where: {
          user_id: id,
        },
      })

      const data = await UserModel.destroy({
        where: {
          id,
        },
      })

      res.status(200).json(data)
    } catch (err) {
      next(createError(500))
    }
  }

  async uploadPhoto(req: any, res: Response, next: NextFunction) {
    try {
      const { file } = req
      const { id } = req.body

      if (file && id) {
        const data: any = await UserModel.findByPk(id)

        if (data.avatar) {
          const filePath = path.join(
            path.dirname(require?.main?.path || ''),
            '/uploads',
            '/avatar',
            data.avatar
          )
          if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
              if (err) throw err
            })
          }
        }

        await UserModel.update({ avatar: file.filename }, { where: { id } })

        res.status(200).json({ url: file.filename })
      } else {
        next(createError(400, 'Avatar wasnt uploaded'))
      }
    } catch (err) {
      next(createError(500))
    }
  }
}

export default new UserController()
