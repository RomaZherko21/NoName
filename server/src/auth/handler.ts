import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { UserModel } from 'models'

// eslint-disable-next-line class-methods-use-this
export async function signIn({ body }: Request, res: Response, next: NextFunction) {
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
      const token = jwt.sign({ id: data.id }, String(process.env.TOKEN_SECRET), {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRED_TIME,
      })

      return res.status(200).json({ accessToken: token })
    }

    return next(createError(401, 'Wrong password'))
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}
