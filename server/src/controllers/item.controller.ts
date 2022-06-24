import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import fs from 'fs'
import path from 'path'
import { QueryTypes } from 'sequelize'

import sequelize from '../models'

import UserModel from '../models/user.model'
import ItemModel from '../models/item.model'

class ItemController {
  async list({ body }: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset } = body

      const [results] = await sequelize.query(
        `SELECT items.*, users.avatar  FROM items JOIN users 
        ON items.userId = users.id 
        ORDER BY items.createdAt ASC 
        LIMIT :limit OFFSET :offset; `,
        {
          replacements: { limit, offset },
        }
      )

      const count = await ItemModel.count()

      res.status(200).json({ items: results, count })
    } catch {
      next(createError(500))
    }
  }

  async create({ body, file }: Request, res: Response, next: NextFunction) {
    try {
      const data = await ItemModel.create({
        ...body,
        image: file.filename,
      })

      res.status(200).json(data)
    } catch (err) {
      next(createError(500))
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body
      const { image }: any = await ItemModel.findByPk(id)

      if (image) {
        const filePath = path.join(
          path.dirname(require.main.path),
          '/uploads',
          '/item',
          image
        )
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) throw err
          })
        }
      }

      const data = await ItemModel.destroy({
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

export default new ItemController()
