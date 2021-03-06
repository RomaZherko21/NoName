import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import UserModel from 'models/user.model'

class AuthController {
  // eslint-disable-next-line class-methods-use-this
  public async signIn({ body }: Request, res: Response, next: NextFunction) {
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
        const token = jwt.sign({ email }, String(process.env.TOKEN_SECRET), {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRED_TIME,
        })
        return res.status(200).json({ accessToken: token })
      }

      return next(createError(401, 'Wrong password'))
    } catch {
      return next(createError(500))
    }
  }
}

export default new AuthController()
