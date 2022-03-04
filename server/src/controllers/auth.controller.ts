import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import User from '../models/user.model'

class AuthController {
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const data = await User.findOne({
        where: {
          email,
          password,
        },
      })
      if (!data) return next(createError(401, 'Wrong email or password'))
      res.status(200).json()
    } catch {
      next(createError(500))
    }
  }
}

export default new AuthController()
