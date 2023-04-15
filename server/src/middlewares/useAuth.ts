import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'

const useAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/auth/signIn') return next()

  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return next(createError(403))

  return jwt.verify(token, process.env.TOKEN_SECRET as string, (error: any, decoded: any) => {
    if (error) return next(createError(403))

    res.locals.authorization_id = decoded.id
    res.locals.authorization_role = decoded.role

    return next()
  })
}

export default useAuth
