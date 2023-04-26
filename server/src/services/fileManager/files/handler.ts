import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'

import { FileModel, sequelize } from 'models'
import { getTimestamp } from 'shared/helpers'
import { TABLE } from 'shared/consts'

/**
 * @swagger
 * /files:
 *   get:
 *     description: Get a list all files
 *     tags: [FileManager-files]
 */
export async function getFiles(req: Request, res: Response, next: NextFunction) {
  try {
    let result = await sequelize.query(
      `SELECT f.id, f.name, f.url, f.format, f.size, f.created_at, f.updated_at 
        FROM ${TABLE.files} as f`,
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
 *     tags: [FileManager-files]
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
          FROM ${TABLE.files} as f 
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
 * /folders/{folder_id}/files:
 *   post:
 *     description: Upload new file
 *     tags: [FileManager-files]
 *     parameters:
 *       - name: folder_id
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
 *              file:
 *                 type: string
 *                 format: binary
 */
export async function uploadFile({ file, params }: Request, res: Response, next: NextFunction) {
  try {
    const { folder_id } = params
    const authorization_id = res.locals.authorization_id

    const format = file?.originalname.split('.')[1]

    if (file?.filename && file?.destination && file?.size && format) {
      await FileModel.create({
        name: file.filename,
        url: `${file.destination}/${file.filename}`,
        format,
        size: file.size,
        created_at: getTimestamp(),
        updated_at: getTimestamp(),
        folder_id: Number(folder_id),
        user_id: authorization_id,
      })

      res.status(204).send()
    } else {
      throw new Error('Invalid file data')
    }
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /files/{file_id}:
 *   put:
 *     description: Update file by id
 *     tags: [FileManager-files]
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
 *     tags: [FileManager-files]
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
