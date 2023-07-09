import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { FolderModel, FolderTagModel, sequelize } from 'models'
import { QueryTypes } from 'sequelize'
import { TABLE } from 'shared/consts'
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

    const tags: any = await sequelize.query(
      `
      SELECT
  ft.id as id,
      ft.name as name
  from
      folder_tags as ft
      JOIN m2m_folders_tags as m2m_fo_t on m2m_fo_t.folder_id = ${folder_id} AND m2m_fo_t.tag_id = ft.id;
  `,
      {
        type: QueryTypes.SELECT,
      }
    )

    console.log(tags)

    result[0].tags = tags

    console.log(result[0])
    
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

/**
 * @swagger
 * /file-manager/tags:
 *   get:
 *     description: Get file manager tags
 *     tags: [FileManager-folders-tags]
 */
export async function getFileManagerTags(req: Request, res: Response, next: NextFunction) {
  try {
    let result = await FolderTagModel.findAll()

    res.status(200).json(result)
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /file-manager/tags:
 *   post:
 *     description: Create folder tag
 *     tags: [FileManager-folders-tags]
 *     requestBody:
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Some folder tag
 */
export async function createFileManagerTag({ body }: Request, res: Response, next: NextFunction) {
  try {
    await FolderTagModel.create({
      ...body,
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /folders/{folder_id}/tags/{tag_id}:
 *   delete:
 *     description: Delete folder tag
 *     tags: [FileManager-folders-tags]
 *     parameters:
 *       - name: folder_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: tag_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function removeFolderTag({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { folder_id, tag_id } = params

    await sequelize.query(
      `
      DELETE FROM ${TABLE.m2m_folders_tags} WHERE tag_id=${tag_id} AND folder_id=${folder_id};
  `,
      {
        type: QueryTypes.DELETE,
      }
    )

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /folders/{folder_id}/tags/{tag_id}:
 *   post:
 *     description: Add tag to folder
 *     tags: [FileManager-folders-tags]
 *     parameters:
 *       - name: folder_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: tag_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function addTagToFolder({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { folder_id, tag_id } = params

    await sequelize.query(
      `
      INSERT INTO ${TABLE.m2m_folders_tags} (folder_id, tag_id)
VALUES (${folder_id}, ${tag_id});
  `,
      {
        type: QueryTypes.INSERT,
      }
    )

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
