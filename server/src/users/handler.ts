import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import { QueryTypes } from 'sequelize'

import { sequelize, UserModel } from 'models'

export async function getUsers({ query }: Request, res: Response, next: NextFunction) {
  try {
    const {
      offset,
      limit,
      id = '',
      name = '',
      surname = '',
      middle_name = '',
      email = '',
      role = '',
      gender = '',
    } = query

    const users = await sequelize.query(
      `SELECT *  FROM users

        WHERE id LIKE '%${id}%'
        AND name LIKE '%${name}%'
        AND surname LIKE '%${surname}%'
        AND middle_name LIKE '%${middle_name}%'
        AND email LIKE '%${email}%'
        AND role LIKE '%${role}%'
        AND gender LIKE '%${gender}%'

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

    const result = await sequelize.query(
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

    const data = await UserModel.update(
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

    if (!data) return next(createError(400, 'User wasnt updated'))

    res.status(204).send()
  } catch (err: any) {
    return next(createError(500, err.message))
  }
}
