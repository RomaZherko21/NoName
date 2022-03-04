import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import User from '../models/user.model'

class UserController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await User.findAll()

      res.status(200).json(data)
    } catch {
      next(createError(500))
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, surname, email, password, role_id } = req.body
      await User.create({ name, surname, email, password, role_id })
    } catch (err) {
      res.status(400).json({ message: err.errors[0].message })
    }
  }

  async self(req: Request, res: Response) {
    try {
      const { id } = req.body
      const data = await User.findByPk(id)

      res.status(200).json(data)
    } catch (err) {
      res.status(401).json()
    }
  }
}

export default new UserController()
