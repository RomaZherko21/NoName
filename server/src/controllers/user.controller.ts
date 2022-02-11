import User from '../models/user.model'

class UserController {
  async get(req: any, res: any) {
    try {
      const { id } = req.body
      const data = await User.findByPk(id)

      res.status(200).json(data)
    } catch (err) {
      res.status().json()
    }
  }

  async create(req: any, res: any) {
    try {
      const { name, surname, email, password, role_id } = req.body
      await User.create({ name, surname, email, password, role_id })
    } catch (err) {
      res.status().json()
    }
  }

  async list(req: any, res: any) {
    try {
      const data = await User.findAll()
      console.log('hehehe', data)
      res.status(200).json(data)
    } catch (err) {
      res.status().json()
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
