import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import UserModel from '../models/user.model'

class AuthController {
  async signIn({ body }: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = body
      const data: any = await UserModel.findOne({
        where: {
          email,
        },
      })
      if (!data) return next(createError(401, 'Wrong email'))

      const compare = await bcrypt.compare(password, data.password)

      if (compare) {
        const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
          expiresIn: '1800s',
        })
        res.status(200).json({ accessToken: token })
      } else {
        return next(createError(401, 'Wrong password'))
      }
    } catch {
      next(createError(500))
    }
  }
}

export default new AuthController()
