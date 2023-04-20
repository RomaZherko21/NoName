import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'

import { FolderModel, sequelize } from 'models'
import { TABLE } from 'shared/consts'
import { getTimestamp } from 'shared/helpers'

/**
 * @swagger
 * /folders:
 *   get:
 *     description: Get a list of folders
 *     tags: [FileManager-folders]
 */
export async function getFolders(req: Request, res: Response, next: NextFunction) {
  try {
    let result = await sequelize.query(
      `SELECT
      fo.name,
      fo.created_at,
      COUNT(fi.id) as files_count,
      SUM(fi.size) as memory_used,
      u.assignee_to
  FROM
      ${TABLE.folders} as fo
      LEFT JOIN ${TABLE.files} as fi on fi.folder_id = fo.id
      LEFT JOIN (
          SELECT
              JSON_ARRAYAGG(users.avatar) as assignee_to,
              m2m_u_fo.folder_id
          from
              users
              JOIN ${TABLE.m2m_users_folders} as m2m_u_fo on m2m_u_fo.user_id = users.id
          GROUP BY
              m2m_u_fo.folder_id
      ) as u on u.folder_id = fo.id
  GROUP BY
      fo.id;`,
      {
        type: QueryTypes.SELECT,
      }
    )

    res.status(200).json(result)
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /folders/{folder_id}:
 *   get:
 *     description: Get folder
 *     tags: [FileManager-folders]
 *     parameters:
 *       - name: folder_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function getFolder({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { folder_id } = params

    const result: any = await sequelize.query(
      `SELECT
      fo.name,
      fo.created_at,
      fo.updated_at,
      COUNT(fi.id) as files_count,
      SUM(fi.size) as memory_used,
      ft.tags,
      u.assignee_to
  FROM
      ${TABLE.folders} as fo
      LEFT JOIN ${TABLE.files} as fi on fi.folder_id = fo.id
      LEFT JOIN (
          SELECT
              JSON_ARRAYAGG(users.avatar) as assignee_to,
              m2m_u_fo.folder_id
          from
          ${TABLE.users}
              JOIN ${TABLE.m2m_users_folders} as m2m_u_fo on m2m_u_fo.user_id = users.id
          GROUP BY
              m2m_u_fo.folder_id
      ) as u on u.folder_id = fo.id
      LEFT JOIN (
          SELECT
              JSON_ARRAYAGG(folder_tags.name) as tags,
              m2m_fo_t.folder_id
          from
          ${TABLE.folder_tags}
              JOIN ${TABLE.m2m_folders_tags} as m2m_fo_t on m2m_fo_t.tag_id = folder_tags.id
          GROUP BY
              m2m_fo_t.folder_id
      ) as ft on ft.folder_id = fo.id
  WHERE
      fo.id = ${folder_id}
  GROUP BY
      fo.id;
  ;`,
      {
        type: QueryTypes.SELECT,
      }
    )

    res.status(200).json(result[0])
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /folders:
 *   post:
 *     description: Create folder
 *     tags: [FileManager-folders]
 *     requestBody:
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Some folder
 */
export async function createFolder({ body }: Request, res: Response, next: NextFunction) {
  try {
    await FolderModel.create({
      ...body,
      created_at: getTimestamp(),
      updated_at: getTimestamp(),
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /folders/{folder_id}:
 *   put:
 *     description: Update kanban board
 *     tags: [FileManager-folders]
 *     parameters:
 *       - name: folder_id
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
 *                example: New folder name
 */
export async function updateFolder({ params, body }: Request, res: Response, next: NextFunction) {
  try {
    const { folder_id } = params

    await FolderModel.update(
      {
        ...body,
        updated_at: getTimestamp(),
      },
      {
        where: {
          id: folder_id,
        },
      }
    )

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /folders/{folder_id}:
 *   delete:
 *     description: Delete folder
 *     tags: [FileManager-folders]
 *     parameters:
 *       - name: folder_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function removeFolder({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { folder_id } = params

    await FolderModel.destroy({
      where: {
        id: folder_id,
      },
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
