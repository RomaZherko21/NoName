import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { FolderModel } from 'models'
import { getTimestamp } from 'shared/helpers'

import repo from './repo'

/**
 * @swagger
 * /folders:
 *   get:
 *     description: Get a list of folders
 *     tags: [FileManager-folders]
 */
export async function getFolders(req: Request, res: Response, next: NextFunction) {
  try {
    let result = await repo.getFolders()

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

    const result: any = await repo.getFolderById({ folderId: Number(folder_id) })

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
