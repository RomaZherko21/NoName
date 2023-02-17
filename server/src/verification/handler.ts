import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

export async function sendEmailVerificationCode(
  { body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // send code to email

    res.status(204).send()
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}

export async function verifyUserEmailByCode({ body }: Request, res: Response, next: NextFunction) {
  try {
    const { code } = body

    if (code === '111111') {
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
    // send code to phone number

    res.status(204).send()
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}

export async function verifyUserPhoneByCode({ body }: Request, res: Response, next: NextFunction) {
  try {
    const { code } = body

    if (code === '111111') {
      res.status(204).send()
    } else {
      throw new Error('Wrong phone verification code')
    }
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}
