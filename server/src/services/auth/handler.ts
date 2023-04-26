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
 *                 description: The user's email address.
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: qwerqwer
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The authentication token for the logged-in user.
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
export async function signIn({ body }: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = body

    const user: any = await UserModel.findOne({
      where: {
        email,
      },
    })

    if (!user) return next(createError(401, 'Wrong email'))

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) return next(createError(401, 'Wrong password'))

    const token = jwt.sign({ id: user.id, role: user.role }, String(process.env.TOKEN_SECRET), {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRED_TIME,
    })

    return res.status(200).json({ accessToken: token })
  } catch (error: any) {
    return next(createError(500, error.message))
  }
}
