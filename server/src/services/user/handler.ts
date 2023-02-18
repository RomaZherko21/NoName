import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import fs from 'fs'
import path from 'path'

import { UserModel, PostModel } from 'models'
import { prettifyUserData } from 'shared/helpers'
import { Role, permission } from 'shared/consts'

export async function getUserSelf(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await UserModel.findByPk(res.locals.authorization_id)

    if (!data) return next(createError(403))

    return res.status(200).json(prettifyUserData(data))
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function updateUserSelf({ body }: Request, res: Response, next: NextFunction) {
  try {
    const data = await UserModel.update(body, {
      where: {
        id: res.locals.authorization_id,
      },
    })

    if (!data) return next(createError(400, "User wasn't updated"))

    res.status(204).send()
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}

export async function removeUserSelf(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    const data = await UserModel.findByPk(authorization_id)

    if (data?.dataValues.avatar) {
      const filePath = path.join(
        path.dirname(require?.main?.path || ''),
        '/uploads',
        '/avatar',
        data?.dataValues.avatar
      )
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) throw err
        })
      }
    }

    await PostModel.destroy({
      where: {
        user_id: authorization_id,
      },
    })

    await UserModel.destroy({
      where: {
        id: authorization_id,
      },
    })

    res.status(204).send()
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function uploadUserAvatar(req: Request, res: Response, next: NextFunction) {
  try {
    const { file } = req

    if (file) {
      const data: any = await UserModel.findByPk(res.locals.authorization_id)

      if (data.avatar) {
        const filePath = path.join(
          path.dirname(require?.main?.path || ''),
          '/uploads',
          '/avatar',
          data.avatar
        )
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) throw err
          })
        }
      }

      await UserModel.update(
        { avatar: file.filename },
        { where: { id: res.locals.authorization_id } }
      )

      res.status(200).json({ url: file.filename })
    } else {
      next(createError(400, 'Avatar wasnt uploaded'))
    }
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function getUserPermissions(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization_role: Role = res.locals.authorization_role

    return res.status(200).json(permission[authorization_role])
  } catch (err: any) {
    next(createError(500, err.message))
  }
}
