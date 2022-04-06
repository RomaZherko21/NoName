import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import ItemModel from '../models/item.model'

class ItemController {
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
