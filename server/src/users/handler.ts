import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { QueryTypes } from 'sequelize'

import { sequelize, UserModel } from 'models'
import { ID, LIMIT, OFFSET } from 'shared/consts'
import { User } from 'shared/types'

export async function getUsers({ query }: Request, res: Response, next: NextFunction) {
  try {
    const {
      offset = OFFSET,
      limit = LIMIT,
      id = ID,
      name = '',
      surname = '',
      middle_name = '',
      email = '',
      role = '',
      gender = '',
      connection_status = '',
    } = query
    const authorization_id = res.locals.authorization_id

    const users: User[] = await sequelize.query(
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

        LIMIT ${limit} OFFSET ${offset};`,
      {
        type: QueryTypes.SELECT,
      }
    )

    const count = await UserModel.count()

    res.status(200).json({ users, count })
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function getUser({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { id } = params

    const result: User[] = await sequelize.query(
      `SELECT *  FROM users 
        WHERE users.id=${id}`,
      {
        type: QueryTypes.SELECT,
      }
    )

    res.status(200).json(result[0])
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function createUser({ body }: Request, res: Response, next: NextFunction) {
  try {
    const hash = await bcrypt.hash(body.password, 10)

    await UserModel.create({
      ...body,
      password: hash,
    })

    res.status(204).send()
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

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
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}
