import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'
import fs from 'fs'
import path from 'path'

import { sequelize, PostModel } from 'models'
import { MIN_LIMIT, MAX_LIMIT, ORDER_TYPE } from 'shared/consts'

export async function getPosts({ query }: Request, res: Response, next: NextFunction) {
  try {
    const {
      id = '',
      name = '',
      description = '',
      created_from = MIN_LIMIT,
      created_to = MAX_LIMIT,
      limit,
      offset,
      order_by = 'created_at',
      order_type = ORDER_TYPE,
    } = query

    const result = await sequelize.query(
      `SELECT posts.*, users.avatar  FROM posts JOIN users 
        ON posts.user_id = users.id 

        WHERE posts.id LIKE '%${id}%'
        AND posts.name LIKE '%${name}%'
        AND posts.description LIKE '%${description}%'
        AND posts.created_at >= ${created_from}
        AND posts.created_at <= ${created_to}

        ORDER BY posts.${order_by} ${order_type}
        LIMIT ${limit} OFFSET ${offset};`,
      {
        type: QueryTypes.SELECT,
      }
    )

    const count = await PostModel.count()

    res.status(200).json({ posts: result, count })
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function getPost({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { id } = params

    const result = await sequelize.query(
      `SELECT posts.*, users.avatar  FROM posts JOIN users 
        ON posts.user_id = users.id 

        WHERE posts.id=${id}`,
      {
        type: QueryTypes.SELECT,
      }
    )

    res.status(200).json(result[0])
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function createPost({ body, file }: Request, res: Response, next: NextFunction) {
  try {
    const data = await PostModel.create({
      ...body,
      image: file?.filename,
    })

    res.status(200).json(data)
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function deletePostById({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { id } = params
    const { image }: any = await PostModel.findByPk(id)

    if (image) {
      const filePath = path.join(
        path.dirname(require?.main?.path || ''),
        '/uploads',
        '/post',
        image
      )
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) throw err
        })
      }
    }

    const data = await PostModel.destroy({
      where: {
        id,
      },
    })

    res.status(200).json(data)
  } catch (err: any) {
    next(createError(500, err.message))
  }
}
