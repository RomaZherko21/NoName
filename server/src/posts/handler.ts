import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'
import fs from 'fs'
import path from 'path'

import { sequelize, PostModel, UserModel } from 'models'
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

    console.log('FUCK YOUSADIOASUIODU', res.locals.authorization_id)

    const result = await sequelize.query(
      `SELECT posts.*, users.avatar, COUNT(posts.id) as likes  FROM posts 
          JOIN users ON posts.user_id = users.id 
          JOIN m2m_users_posts_likes ON posts.id = m2m_users_posts_likes.post_id 
          
          WHERE posts.id LIKE '%${id}%'
          AND posts.name LIKE '%${name}%'
          AND posts.description LIKE '%${description}%'
          AND posts.created_at >= ${created_from}
          AND posts.created_at <= ${created_to}
          
        GROUP BY posts.id
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

    const [post]: any = await sequelize.query(
      `SELECT posts.*, COUNT(posts.id) as likes  FROM posts 
        JOIN m2m_users_posts_likes ON posts.id = m2m_users_posts_likes.post_id 

        WHERE posts.id=${id}
        GROUP BY posts.id
        `,
      {
        type: QueryTypes.SELECT,
      }
    )

    const user = await UserModel.findByPk(post.user_id, {
      attributes: { exclude: ['password'] },
    })

    res.status(200).json({ ...post, user })
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function createPost({ body, file }: Request, res: Response, next: NextFunction) {
  try {
    await PostModel.create({
      ...body,
      image: file?.filename,
    })

    res.status(204).send()
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function togglePostLikes(
  { body, params }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = params
    const { user_id } = body

    const [result]: any = await sequelize.query(
      `SELECT  post_id, user_id  from m2m_users_posts_likes

        WHERE m2m_users_posts_likes.post_id=${id} AND m2m_users_posts_likes.user_id=${user_id} 
        `,
      {
        type: QueryTypes.SELECT,
      }
    )

    if (result) {
      await sequelize.query(
        `DELETE  from m2m_users_posts_likes
  
          WHERE m2m_users_posts_likes.post_id=${id} AND m2m_users_posts_likes.user_id=${user_id} 
          `,
        {
          type: QueryTypes.DELETE,
        }
      )
    } else {
      await sequelize.query(
        `INSERT INTO  m2m_users_posts_likes(post_id, user_id)
        VALUES (${id}, ${user_id})
          `,
        {
          type: QueryTypes.INSERT,
        }
      )
    }

    res.status(204).send()
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

    await PostModel.destroy({
      where: {
        id,
      },
    })

    res.status(204).send()
  } catch (err: any) {
    next(createError(500, err.message))
  }
}
