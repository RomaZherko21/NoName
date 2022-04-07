import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import ItemModel from '../models/item.model'

class ItemController {
  async list({ body }: Request, res: Response, next: NextFunction) {
    try {
      const { offset, limit, userId } = body
      const { rows, count } = await ItemModel.findAndCountAll({
        where: {
          userId,
        },
        offset,
        limit,
      })

      res.status(200).json({ items: rows, count })
    } catch {
      next(createError(500))
    }
  }

  async create({ body }: Request, res: Response, next: NextFunction) {
    try {
      console.log(body)

      const data = await ItemModel.create({
        ...body,
      })

      res.status(200).json(data)
    } catch (err) {
      next(createError(500))
    }
  }
}

export default new ItemController()
