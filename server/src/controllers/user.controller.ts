import createError from 'http-errors'

import User from '../models/user.model'

class UserController {
  async list(req: any, res: any, next: any) {
    try {
      const data = await User.findAll()

      res.status(200).json(data)
    } catch {
      next(createError(500))
    }
  }

  async create(req: any, res: any) {
    try {
      const { name, surname, email, password, role_id } = req.body
      await User.create({ name, surname, email, password, role_id })
    } catch (err) {
      res.status(400).json({ message: err.errors[0].message })
    }
  }

  async self(req: any, res: any) {
    try {
      const { id } = req.body
      const data = await User.findByPk(id)

      res.status(200).json(data)
    } catch (err) {
      res.status().json()
    }
  }
}

export default new UserController()
