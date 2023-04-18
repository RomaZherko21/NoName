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
 *     tags: [Folders]
 */
export async function getFolders(req: Request, res: Response, next: NextFunction) {
  try {
    let result = await sequelize.query(
      `SELECT 
        ${TABLE.folders}.* FROM ${TABLE.folders}`,
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
 *     tags: [Folders]
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
      `SELECT * FROM ${TABLE.folders} 
        WHERE ${TABLE.folders}.id=${folder_id}`,
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
 *     tags: [Folders]
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
 *     tags: [Folders]
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
 *     tags: [Folders]
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
