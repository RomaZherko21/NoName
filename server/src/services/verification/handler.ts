import { emailTransporter } from 'config'
import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { CodeManager } from 'localDB'
import { UserModel } from 'models'
import { generateRandomCode } from 'shared/helpers'

const { SERVER_EMAIL_LOGIN } = process.env

const emailCodes = new CodeManager()

const smsCodes = new CodeManager()

export async function sendEmailVerificationCode(
  { body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization_id = res.locals.authorization_id

    const user = await UserModel.findOne({
      where: {
        id: authorization_id,
      },
      attributes: ['email'],
    })

    emailCodes.addCode(authorization_id, '111111')

    emailCodes.addCode(authorization_id, generateRandomCode())

    emailTransporter.sendMail({
      from: SERVER_EMAIL_LOGIN,
      to: user?.dataValues.email,
      subject: 'Email Verification Code',
      text: `Your email verification code is ${emailCodes.getCode(authorization_id)}`,
    })

    res.status(204).send()
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}

export async function verifyUserEmailByCode({ body }: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id
    const { code } = body

    if (code === emailCodes.getCode(authorization_id)) {
      await UserModel.update(
        { is_email_verified: true },
        {
          where: {
            id: authorization_id,
          },
        }
      )

      res.status(204).send()
    } else {
      throw new Error('Wrong email verification code')
    }
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}

export async function sendPhoneVerificationCode(
  { body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization_id = res.locals.authorization_id

    smsCodes.addCode(authorization_id, '111111')

    res.status(204).send()
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}

export async function verifyUserPhoneByCode({ body }: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id
    const { code } = body

    if (code === smsCodes.getCode(authorization_id)) {
      await UserModel.update(
        { is_phone_verified: true },
        {
          where: {
            id: authorization_id,
          },
        }
      )

      res.status(204).send()
    } else {
      throw new Error('Wrong phone verification code')
    }
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}
