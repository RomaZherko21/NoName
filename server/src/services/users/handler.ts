import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { QueryTypes } from 'sequelize'

import { sequelize, UserModel } from 'models'
import { TABLE, USER_AVATAR_FOLDER } from 'shared/consts'
import { prettifyUserData } from 'shared/helpers'
import repo from './repo'

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get a list of users
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: query
 *       - name: name
 *         in: query
 *       - name: surname
 *         in: query
 *       - name: middle_name
 *         in: query
 *       - name: email
 *         in: query
 *       - name: role
 *         in: query
 *       - name: gender
 *         in: query
 *       - name: connection_status
 *         in: query
 *       - name: order_by
 *         in: query
 *       - name: order_type
 *         in: query
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: offset
 *         in: query
 *         schema:
 *           type: integer
 *           default: 0
 */
export async function getUsers({ query }: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    const users: any = await repo.getUsers({ ...query, authorization_id })

    const count = await UserModel.count()

    res.status(200).json({ users, count })
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     description: Get user
 *     tags: [Users]
 *     parameters:
 *       - name: user_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function getUser({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { id } = params

    const result: any = await sequelize.query(
      `SELECT * FROM ${TABLE.users} as u
        WHERE u.id=${id}`,
      {
        type: QueryTypes.SELECT,
      }
    )

    res.status(200).json(prettifyUserData(result[0]))
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create user
 *     tags: [Users]
 *     requestBody:
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Alex
 *              surname:
 *                type: string
 *                example: House
 *              middle_name:
 *                type: string
 *                example: Junior
 *              gender:
 *                type: string
 *                example: man
 *              date_of_birth:
 *                type: string
 *                example: 2000-01-01
 *              email:
 *                type: string
 *                example: AlexHouse@gmail.com
 *              tel_number:
 *                type: string
 *                example: +375257777777
 *              password:
 *                type: string
 *                example: qwerqwer
 *              role:
 *                type: string
 *                example: admin
 *              avatar:
 *                 type: string
 *                 format: binary
 */
export async function createUser({ body, file }: Request, res: Response, next: NextFunction) {
  try {
    const hash = await bcrypt.hash(body.password, 10)

    const user = await UserModel.create({
      ...body,
      password: hash,
    })

    const newFileName = `${user.dataValues.id}.jpg`
    fs.renameSync(`${USER_AVATAR_FOLDER}/${file?.filename}`, `${USER_AVATAR_FOLDER}/${newFileName}`)

    await UserModel.update({ avatar: newFileName }, { where: { id: user.dataValues.id } })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /users/{user_id}:
 *   post:
 *     description: Create user
 *     tags: [Users]
 *     parameters:
 *       - name: user_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
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
 *                example: House
 *              middle_name:
 *                type: string
 *                example: Junior
 *              gender:
 *                type: string
 *                example: man
 *              date_of_birth:
 *                type: string
 *                example: 2000-01-01
 *              email:
 *                type: string
 *                example: AlexHouse@gmail.com
 *              tel_number:
 *                type: string
 *                example: +375257777777
 *              password:
 *                type: string
 *                example: qwerqwer
 *              role:
 *                type: string
 *                example: admin
 *              avatar:
 *                 type: string
 *                 format: binary
 */
export async function updateUserById({ body, params }: Request, res: Response, next: NextFunction) {
  try {
    const { id } = params

    const hash = await bcrypt.hash(body.password, 10)

    await UserModel.update(
      {
        ...body,
        password: hash,
      },
      {
        where: {
          id,
        },
      }
    )

    res.status(204).send()
  } catch (error: any) {
    return next(createError(500, error.message))
  }
}
