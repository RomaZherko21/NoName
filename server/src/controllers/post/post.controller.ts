import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import fs from 'fs'
import path from 'path'

import PostModel from 'models/post.model'
import sequelize from 'models'

import { getPostListQuery } from './queries'

class PostController {
  async list({ body }: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset } = body

      const [results] = await sequelize.query(getPostListQuery(), {
        replacements: { limit, offset },
      })

      const count = await PostModel.count()

      res.status(200).json({ posts: results, count })
    } catch {
      next(createError(500))
    }
  }

  async create({ body, file }: Request, res: Response, next: NextFunction) {
    try {
      const data = await PostModel.create({
        ...body,
        image: file?.filename,
      })

      res.status(200).json(data)
    } catch (err) {
      next(createError(500))
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body
      const { image }: any = await PostModel.findByPk(id)

      if (image) {
        const filePath = path.join(
          path.dirname(require?.main?.path || ''),
          '/uploads',
          '/post',
          image
        )
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) throw err
          })
        }
      }

      const data = await PostModel.destroy({
        where: {
          id,
        },
      })

      res.status(200).json(data)
    } catch (err) {
      next(createError(500))
    }
  }
}

export default new PostController()
