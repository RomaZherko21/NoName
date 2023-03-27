import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { UserModel } from 'models'

/**
 * @swagger
 * /auth/signIn:
 *   post:
 *     description: Login to the application
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's name.
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's name.
 *                 example: qwerqwer
 */
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
      const token = jwt.sign({ id: data.id, role: data.role }, String(process.env.TOKEN_SECRET), {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRED_TIME,
      })

      return res.status(200).json({ accessToken: token })
    }

    return next(createError(401, 'Wrong password'))
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}
