import fs from 'node:fs'
import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { UserModel, PostModel } from 'models'
import { prettifyUserData } from 'shared/helpers'
import { Role, permission, USER_AVATAR_FOLDER } from 'shared/consts'

/**
 * @swagger
 * /user:
 *   get:
 *     description: Get current user data
 *     tags: [User]
 */
export async function getUserSelf(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await UserModel.findByPk(res.locals.authorization_id)

    if (!data) return next(createError(403))

    return res.status(200).json(prettifyUserData(data))
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /user:
 *   put:
 *     description: Update current user data
 *     tags: [User]
 *     requestBody:
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Alex
 *              surname:
 *                type: string
 *                example: Pitt
 *              middle_name:
 *                type: string
 *                example: Junior
 *              gender:
 *                type: string
 *                example: man
 *              date_of_birth:
 *                type: string
 *                example: 1753-01-01
 *              role:
 *                type: string
 *                example: admin
 */
export async function updateUserSelf({ body }: Request, res: Response, next: NextFunction) {
  try {
    const data = await UserModel.update(body, {
      where: {
        id: res.locals.authorization_id,
      },
    })

    if (!data) return next(createError(400, "User wasn't updated"))

    res.status(204).send()
  } catch (error: any) {
    return next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /user:
 *   delete:
 *     description: Delete current user
 *     tags: [User]
 */
export async function removeUserSelf(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    const fileName = `${authorization_id}.jpg`

    const filePath = `${USER_AVATAR_FOLDER}/${fileName}`
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (error) => {
        if (error) throw error
      })
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
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /user/uploadPhoto:
 *   post:
 *     description: Upload user avatar
 *     tags: [User]
 *     requestBody:
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              avatar:
 *                 type: string
 *                 format: binary
 */
export async function uploadUserAvatar(req: Request, res: Response, next: NextFunction) {
  try {
    const { file } = req
    const authorization_id = res.locals.authorization_id

    const newFileName = `${authorization_id}.jpg`

    if (file && file?.filename) {
      fs.renameSync(
        `${USER_AVATAR_FOLDER}/${file?.filename}`,
        `${USER_AVATAR_FOLDER}/${newFileName}`
      )

      await UserModel.update({ avatar: newFileName }, { where: { id: authorization_id } })

      res.status(200).json({ url: newFileName })
    } else {
      next(createError(400, "Avatar wasn't uploaded"))
    }
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /user/permissions:
 *   get:
 *     description: Get current user permissions
 *     tags: [User]
 */
export async function getUserPermissions(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization_role: Role = res.locals.authorization_role

    return res.status(200).json(permission[authorization_role])
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
