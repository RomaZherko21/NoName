import { emailTransporter } from 'config'
import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'

import { CodeManager } from 'localDB'
import { sequelize, UserModel } from 'models'
import { generateRandomCode } from 'shared/helpers'

const { SERVER_EMAIL_LOGIN } = process.env

const emailCodes = new CodeManager()

const smsCodes = new CodeManager()

/**
 * @swagger
 * /security/email:
 *   put:
 *     description: Send verification code to current user email
 *     tags: [Security]
 */
export async function sendEmailVerificationCode(_: Request, res: Response, next: NextFunction) {
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

/**
 * @swagger
 * /security/email:
 *   post:
 *     description: Verify current user email
 *     tags: [Security]
 *     requestBody:
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *                example: 111111
 */
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

/**
 * @swagger
 * /security/email/alerts:
 *   put:
 *     description: Toggle (on/off) email notifiation's
 *     tags: [Security]
 */
export async function toggleEmailAlerts(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    await UserModel.update(
      { is_email_alerts_active: sequelize.literal('NOT is_email_alerts_active') },
      {
        where: {
          id: authorization_id,
        },
      }
    )

    res.status(204).send()
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}

/**
 * @swagger
 * /security/phone:
 *   put:
 *     description: Send verification code to current user phone number
 *     tags: [Security]
 */
export async function sendPhoneVerificationCode(_: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    smsCodes.addCode(authorization_id, '111111')

    res.status(204).send()
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}

/**
 * @swagger
 * /security/phone:
 *   post:
 *     description: Verify current user phone number
 *     tags: [Security]
 *     requestBody:
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *                example: 111111
 */
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

/**
 * @swagger
 * /security/phone/alerts:
 *   put:
 *     description: Toggle (on/off) phone sms notifiation's
 *     tags: [Security]
 */
export async function toggleSmsAlerts(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    await UserModel.update(
      { is_sms_alerts_active: sequelize.literal('NOT is_sms_alerts_active') },
      {
        where: {
          id: authorization_id,
        },
      }
    )

    res.status(204).send()
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}

let a = ''

export async function getQrCode(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    const secret = speakeasy.generateSecret()

    a = secret.base32

    const otpAuthUrl = `otpauth://totp/someSecretText:${authorization_id}?secret=${secret.base32}&issuer=someSecretText`

    qrcode.toDataURL(otpAuthUrl, (err, imageUrl) => {
      if (err) {
        throw new Error('Error generating QR code')
      }

      res.status(200).json({ secret: secret.base32, qrCodeUrl: imageUrl })
    })
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}

export async function verifyQrCode({ body }: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    const verified = speakeasy.totp.verify({
      secret: a,
      encoding: 'base32',
      token: body.token,
    })

    if (!verified) {
      throw new Error('Invalid code')
    }

    await UserModel.update(
      { is_two_factor_auth_active: true },
      {
        where: {
          id: authorization_id,
        },
      }
    )

    res.status(204).send()
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}
