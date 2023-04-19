import fs from 'node:fs'
import path from 'node:path'
import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'

import { sequelize, PostModel, UserModel, PostCommentModel } from 'models'
import { MIN_LIMIT, MAX_LIMIT, ORDER_TYPE, ID, LIMIT, OFFSET } from 'shared/consts'

/**
 * @swagger
 * /posts:
 *   get:
 *     description: Get a list of posts
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: query
 *       - name: user_id
 *         in: query
 *       - name: name
 *         in: query
 *       - name: description
 *         in: query
 *       - name: created_from
 *         in: query
 *       - name: created_to
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
export async function getPosts({ query }: Request, res: Response, next: NextFunction) {
  try {
    const {
      id = ID,
      user_id = ID,
      name = '',
      description = '',
      created_from = MIN_LIMIT,
      created_to = MAX_LIMIT,
      limit = LIMIT,
      offset = OFFSET,
      order_by = 'created_at',
      order_type = ORDER_TYPE,
    } = query

    let result: any = await sequelize.query(
      `SELECT 
        posts.*,
        genres.name as genre,
        users.name as user_name, 
        users.surname  as user_surname, 
        users.middle_name  as user_middle_name,
        users.email  as user_email,
        users.avatar,
        COUNT(m2m_users_posts_likes.post_id) as likes_count,
        JSON_ARRAYAGG(m2m_users_posts_likes.user_id) as liked_users
      FROM posts 
        JOIN users ON posts.user_id = users.id 
        LEFT JOIN m2m_users_posts_likes ON posts.id = m2m_users_posts_likes.post_id 
        JOIN genres ON posts.genre_id = genres.id 
          
        WHERE posts.id LIKE '%${id}%'
        AND posts.user_id LIKE '%${user_id}%'
        AND posts.name LIKE '%${name}%'
        AND posts.description LIKE '%${description}%'
        AND posts.created_at >= ${created_from}
        AND posts.created_at <= ${created_to}
          
        GROUP BY posts.id
        ORDER BY ${order_by} ${order_type}
        LIMIT ${limit} OFFSET ${offset};`,
      {
        type: QueryTypes.SELECT,
      }
    )

    result = await Promise.all(
      result.map(async (item: any) => {
        const comments: any = await sequelize.query(
          `SELECT 
            post_comments.*, 
            users.avatar as user_avatar, 
            users.name as user_name, 
            users.surname  as user_surname, 
            users.middle_name  as user_middle_name 
          FROM post_comments 
            JOIN users ON post_comments.user_id = users.id 
    
            WHERE post_comments.post_id=${item.id}
    
            GROUP BY post_comments.id
            `,
          {
            type: QueryTypes.SELECT,
          }
        )

        return { ...item, comments }
      })
    )

    result = result.map((item: any) => ({
      ...item,
      is_liked: item.liked_users.includes(res.locals.authorization_id),
      first_liked_users: item.liked_users.slice(0, 3),
    }))

    const count = await PostModel.count()

    res.status(200).json({ posts: result, count })
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /posts/{post_id}:
 *   get:
 *     description: Get post
 *     tags: [Posts]
 *     parameters:
 *       - name: post_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function getPost({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { id } = params

    let [post]: any = await sequelize.query(
      `SELECT 
        posts.*, 
        genres.name as genre,
        COUNT(m2m_users_posts_likes.post_id) as likes_count, 
        JSON_ARRAYAGG(m2m_users_posts_likes.user_id)  as liked_users   
      FROM posts 
       LEFT JOIN m2m_users_posts_likes ON posts.id = m2m_users_posts_likes.post_id 
        JOIN genres ON posts.genre_id = genres.id 
        
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
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /posts:
 *   post:
 *     description: Create post
 *     tags: [Posts]
 *     requestBody:
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: About AI
 *              description:
 *                type: string
 *                example: Some long description...
 *              short_description:
 *                type: string
 *                example: Some short description...
 *              genre_id:
 *                type: integer
 *                example: 1
 *              reading_time:
 *                type: integer
 *                example: 15
 *              post:
 *                 type: string
 *                 format: binary
 */
export async function createPost({ body, file }: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    const newFileName = `${Date.now()}.jpg`

    fs.renameSync(`./uploads/post/${file?.filename}`, `./uploads/post/${newFileName}`)

    await PostModel.create({
      ...body,
      image: newFileName,
      user_id: authorization_id,
      created_at: Date.now(),
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /posts/{post_id}/likes:
 *   put:
 *     description: Toggle post like
 *     tags: [Posts]
 *     parameters:
 *       - name: post_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function togglePostLikes({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { post_id } = params
    const authorization_id = res.locals.authorization_id

    const [result]: { post_id: number; user_id: number }[] = await sequelize.query(
      `SELECT  
        post_id, 
        user_id  
      FROM m2m_users_posts_likes

        WHERE m2m_users_posts_likes.post_id=${post_id} 
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
  
          WHERE m2m_users_posts_likes.post_id=${post_id} 
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
        VALUES (${post_id}, ${authorization_id})
          `,
        {
          type: QueryTypes.INSERT,
        }
      )
    }

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /posts/{post_id}:
 *   delete:
 *     description: Delete post
 *     tags: [Posts]
 *     parameters:
 *       - name: post_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function deletePostById({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { id } = params
    const data = await PostModel.findByPk(id)

    if (data?.dataValues.image) {
      const filePath = path.join(
        path.dirname(require?.main?.path || ''),
        '/uploads',
        '/post',
        data?.dataValues.image
      )
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (error) => {
          if (error) throw error
        })
      }
    }

    await PostModel.destroy({
      where: {
        id,
      },
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /posts/{post_id}/comments:
 *   post:
 *     description: Create post comment
 *     tags: [Posts]
 *     parameters:
 *       - name: post_id
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
 *              message:
 *                type: string
 *                example: Some post comment...
 */
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
      created_at: Date.now(),
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /posts/{post_id}/comments/{comment_id}:
 *   delete:
 *     description: Delete post comment
 *     tags: [Posts]
 *     parameters:
 *       - name: post_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: comment_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
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
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /posts/{post_id}/comments/{comment_id}:
 *   put:
 *     description: Update post comment
 *     tags: [Posts]
 *     parameters:
 *       - name: post_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: comment_id
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
 *              message:
 *                type: string
 *                example: Some post comment...
 */
export async function updatePostComment(
  { params, body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { post_id, comment_id } = params
    const authorization_id = res.locals.authorization_id

    await PostCommentModel.update(
      {
        ...body,
        created_at: Date.now(),
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
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
