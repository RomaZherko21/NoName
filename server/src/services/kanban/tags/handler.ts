import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'

import { KanbanTagModel, sequelize } from 'models'
import { TABLE } from 'shared/consts'

/**
 * @swagger
 * /kanban/boards/{board_id}/tags:
 *   get:
 *     description: Get all board tags
 *     tags: [Kanban-tags]
 *     parameters:
 *       - name: board_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function getKanbanBoardTags({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { board_id } = params

    let result = await sequelize.query(
      `SELECT 
        ktt.id, ktt.name 
      FROM ${TABLE.kanban_task_tags} as ktt
        WHERE ktt.board_id = ${board_id}`,
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
 * /kanban/boards/{board_id}/tags:
 *   post:
 *     description: Create kanban tag
 *     tags: [Kanban-tags]
 *     parameters:
 *       - name: board_id
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
 *                example: Some task
 */
export async function createKanbanBoardTag(
  { body, params }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { board_id } = params

    await KanbanTagModel.create({
      ...body,
      board_id,
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /kanban/boards/{board_id}/tags/{tag_id}:
 *   put:
 *     description: Update kanban tag
 *     tags: [Kanban-tags]
 *     parameters:
 *       - name: board_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: tag_id
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
 *                example: New tag name
 */
export async function updateKanbanBoardTag(
  { params, body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { board_id, tag_id } = params

    await KanbanTagModel.update(
      {
        ...body,
      },
      {
        where: {
          id: tag_id,
          board_id,
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
 * /kanban/tags/{tag_id}:
 *   delete:
 *     description: Delete kanban tag
 *     tags: [Kanban-tags]
 *     parameters:
 *       - name: tag_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function removeKanbanBoardTag({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { tag_id } = params

    await KanbanTagModel.destroy({
      where: {
        id: tag_id,
      },
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
