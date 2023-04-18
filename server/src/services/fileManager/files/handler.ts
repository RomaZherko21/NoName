import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'

import { FileModel, sequelize } from 'models'
import { getTimestamp } from 'shared/helpers'

/**
 * @swagger
 * /files:
 *   get:
 *     description: Get a list all files
 *     tags: [Files]
 */
export async function getFiles(req: Request, res: Response, next: NextFunction) {
  try {
    let result = await sequelize.query(
      `SELECT f.id, f.name, f.url, f.format, f.size, f.created_at, f.updated_at 
        FROM files as f`,
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
 * /files/{file_id}:
 *   get:
 *     description: Get file info
 *     tags: [Files]
 *     parameters:
 *       - name: file_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function getFile({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { file_id } = params

    const result: any = await sequelize.query(
      `SELECT f.id, f.name, f.url, f.format, f.size, f.created_at, f.updated_at 
      FROM files as f 
      WHERE f.id=${file_id};`,
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
 * /files:
 *   post:
 *     description: Upload new file
 *     tags: [Files]
 *     requestBody:
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: example
 *              format:
 *                type: string
 *                example: jpg
 *              size:
 *                type: integer
 *                example: 120000
 *              file:
 *                 type: string
 *                 format: binary
 */
export async function uploadFile({ body }: Request, res: Response, next: NextFunction) {
  try {
    await FileModel.create({
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
 * /files/{file_id}:
 *   put:
 *     description: Update file by id
 *     tags: [Files]
 *     parameters:
 *       - name: file_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 *     requestBody:
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: example
 *              format:
 *                type: string
 *                example: jpg
 *              size:
 *                type: integer
 *                example: 120000
 *              file:
 *                 type: string
 *                 format: binary
 */
export async function updateFile({ params, body }: Request, res: Response, next: NextFunction) {
  try {
    const { file_id } = params

    await FileModel.update(
      {
        ...body,
        updated_at: getTimestamp(),
      },
      {
        where: {
          id: file_id,
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
 * /files/{file_id}:
 *   delete:
 *     description: Delete file
 *     tags: [Files]
 *     parameters:
 *       - name: file_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function removeFile({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { file_id } = params

    await FileModel.destroy({
      where: {
        id: file_id,
      },
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
