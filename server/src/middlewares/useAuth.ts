import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'

const useAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/node-api/auth/signIn') return next()

  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return next(createError(403))

  return jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any) => {
    if (err) return next(createError(403))

    return next()
  })
}

export default useAuth
