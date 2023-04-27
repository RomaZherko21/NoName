import { emailTransporter, redis } from 'config'
import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'

import { sequelize, UserModel } from 'models'
import { generateRandomCode } from 'shared/helpers'
import { DICTIONARIES } from 'config/redis'

const { SERVER_EMAIL_LOGIN } = process.env

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

    const code = generateRandomCode()

    await redis.set(`${DICTIONARIES.emailCode}:${authorization_id}`, code, 'EX', 720)

    emailTransporter.sendMail({
      from: SERVER_EMAIL_LOGIN,
      to: user?.dataValues.email,
      subject: 'Email Verification Code',
      text: `Your email verification code is ${code}`,
    })

    res.status(204).send()
  } catch (error: any) {
    return next(createError(500, error.message))
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

    const storedCode = await redis.get(`${DICTIONARIES.emailCode}:${authorization_id}`)

    if (code === storedCode) {
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
  } catch (error: any) {
    return next(createError(500, error.message))
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
  } catch (error: any) {
    return next(createError(500, error.message))
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

    await redis.set(`${DICTIONARIES.phoneCode}:${authorization_id}`, '111111', 'EX', 60)

    res.status(204).send()
  } catch (error: any) {
    return next(createError(500, error.message))
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

    const storedCode = await redis.get(`${DICTIONARIES.phoneCode}:${authorization_id}`)

    if (code === storedCode) {
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
  } catch (error: any) {
    return next(createError(500, error.message))
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
  } catch (error: any) {
    return next(createError(500, error.message))
  }
}

export async function getQrCode(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    const secret = speakeasy.generateSecret()

    const base32 = secret.base32

    await redis.set(`${DICTIONARIES.qrSecret}:${authorization_id}`, base32)

    const otpAuthUrl = `otpauth://totp/someSecretText:${authorization_id}?secret=${base32}&issuer=someSecretText`

    qrcode.toDataURL(otpAuthUrl, (error, imageUrl) => {
      if (error) {
        throw new Error('Error generating QR code')
      }

      res.status(200).json({ secret: base32, qrCodeUrl: imageUrl })
    })
  } catch (error: any) {
    return next(createError(500, error.message))
  }
}

export async function verifyQrCode({ body }: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    const base32 = await redis.get(`${DICTIONARIES.qrSecret}:${authorization_id}`)

    if (!base32) {
      return next(createError(401, 'QR code has been expired'))
    }

    const isVerified = speakeasy.totp.verify({
      secret: base32,
      encoding: 'base32',
      token: body.token,
    })

    if (!isVerified) {
      return next(createError(401, 'Invalid QR code'))
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
  } catch (error: any) {
    return next(createError(500, error.message))
  }
}
