import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'
import fs from 'fs'
import path from 'path'

import { sequelize, PostModel, UserModel, PostCommentModel } from 'models'
import { MIN_LIMIT, MAX_LIMIT, ORDER_TYPE, ID, LIMIT, OFFSET } from 'shared/consts'
import { Post } from 'shared/types'

export async function getPosts({ query }: Request, res: Response, next: NextFunction) {
  try {
    const {
      id = ID,
      name = '',
      description = '',
      created_from = MIN_LIMIT,
      created_to = MAX_LIMIT,
      limit = LIMIT,
      offset = OFFSET,
      order_by = 'created_at',
      order_type = ORDER_TYPE,
    } = query

    let result: (Post & { liked_users: number[]; likes_count: number; avatar: string })[] =
      await sequelize.query(
        `SELECT 
        posts.*,
        users.avatar,
        COUNT(posts.id) as likes_count,
        JSON_ARRAYAGG(m2m_users_posts_likes.user_id) as liked_users
      FROM posts 
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

    result = result.map((item) => ({
      ...item,
      is_liked: item.liked_users.includes(res.locals.authorization_id),
      first_liked_users: item.liked_users.slice(0, 3),
    }))

    const count = await PostModel.count()

    res.status(200).json({ posts: result, count })
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function getPost({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { id } = params

    let [post]: (Post & {
      liked_users: number[]
      likes_count: number
      first_liked_users: number[]
    })[] = await sequelize.query(
      `SELECT 
        posts.*, 
        COUNT(posts.id) as likes_count, 
        JSON_ARRAYAGG(m2m_users_posts_likes.user_id)  as liked_users   
      FROM posts 
        JOIN m2m_users_posts_likes ON posts.id = m2m_users_posts_likes.post_id 
        
        GROUP BY posts.id
        HAVING posts.id=${id}
        `,
      {
        type: QueryTypes.SELECT,
      }
    )

    const comments: any = await sequelize.query(
      `SELECT 
        post_comments.*, 
        users.avatar as user_avatar, 
        users.name as user_name, 
        users.surname  as user_surname, 
        users.middle_name  as user_middle_name 
      FROM post_comments 
        JOIN users ON post_comments.user_id = users.id 

        WHERE post_comments.post_id=${post.id}

        GROUP BY post_comments.id
        `,
      {
        type: QueryTypes.SELECT,
      }
    )

    post = {
      ...post,
      is_liked: post.liked_users.includes(res.locals.authorization_id),
      first_liked_users: post.liked_users.slice(0, 3),
      comments,
    }

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

export async function togglePostLikes({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { id } = params
    const authorization_id = res.locals.authorization_id

    const [result]: { post_id: number; user_id: number }[] = await sequelize.query(
      `SELECT  
        post_id, 
        user_id  
      FROM m2m_users_posts_likes

        WHERE m2m_users_posts_likes.post_id=${id} 
        AND m2m_users_posts_likes.user_id=${authorization_id} 
        `,
      {
        type: QueryTypes.SELECT,
      }
    )

    // there is MySQL toggle query
    if (result) {
      await sequelize.query(
        `DELETE 
        FROM m2m_users_posts_likes
  
          WHERE m2m_users_posts_likes.post_id=${id} 
          AND m2m_users_posts_likes.user_id=${authorization_id} 
          `,
        {
          type: QueryTypes.DELETE,
        }
      )
    } else {
      await sequelize.query(
        `INSERT 
        INTO  m2m_users_posts_likes(post_id, user_id)
        VALUES (${id}, ${authorization_id})
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

export async function createPostComment(
  { body, params }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { post_id } = params
    const authorization_id = res.locals.authorization_id

    await PostCommentModel.create({
      ...body,
      post_id,
      user_id: authorization_id,
    })

    res.status(204).send()
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function deletePostComment({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { post_id, comment_id } = params
    const authorization_id = res.locals.authorization_id

    await PostCommentModel.destroy({
      where: {
        post_id,
        user_id: authorization_id,
        id: comment_id,
      },
    })

    res.status(204).send()
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function updatePostComment(
  { params, body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { post_id, comment_id } = params
    const authorization_id = res.locals.authorization_id

    await PostCommentModel.destroy({})

    await PostCommentModel.update(
      {
        ...body,
      },
      {
        where: {
          post_id,
          user_id: authorization_id,
          id: comment_id,
        },
      }
    )

    res.status(204).send()
  } catch (err: any) {
    next(createError(500, err.message))
  }
}
