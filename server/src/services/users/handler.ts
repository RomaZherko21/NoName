import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { QueryTypes } from 'sequelize'

import { sequelize, UserModel } from 'models'
import { ID, LIMIT, OFFSET, ORDER_TYPE } from 'shared/consts'
import { prettifyUserData } from 'shared/helpers'

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
    const {
      id = ID,
      name = '',
      surname = '',
      middle_name = '',
      email = '',
      role = '',
      gender = '',
      connection_status = '',
      limit = LIMIT,
      offset = OFFSET,
      order_by = 'email',
      order_type = ORDER_TYPE,
    } = query
    const authorization_id = res.locals.authorization_id

    const users: any = await sequelize.query(
      `SELECT users.*,
        user_connections.status as connection_status
      FROM users 
      LEFT JOIN user_connections ON (${authorization_id} = user_connections.sender_id AND users.id= user_connections.recipient_id
        OR ${authorization_id} = user_connections.recipient_id AND users.id = user_connections.sender_id)

        WHERE users.id LIKE '%${id}%'
        AND users.name LIKE '%${name}%'
        AND users.surname LIKE '%${surname}%'
        AND users.middle_name LIKE '%${middle_name}%'
        AND users.email LIKE '%${email}%'
        AND users.role LIKE '%${role}%'
        AND users.gender LIKE '%${gender}%'
        AND (user_connections.status LIKE '%${connection_status}%' OR user_connections.status IS NULL)

        ORDER BY ${order_by} ${order_type}
        LIMIT ${limit} OFFSET ${offset};`,
      {
        type: QueryTypes.SELECT,
      }
    )

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
      `SELECT *  FROM users 
        WHERE users.id=${id}`,
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

    await UserModel.create({
      ...body,
      password: hash,
      avatar: file?.filename,
    })

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
