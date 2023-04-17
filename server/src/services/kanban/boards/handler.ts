import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'

import { KanbanBoardModel, sequelize } from 'models'
import { TABLE } from 'shared/consts'
import { getTimestamp } from 'shared/helpers'

/**
 * @swagger
 * /kanban/boards:
 *   get:
 *     description: Get a list of kanban boards
 *     tags: [Kanban]
 */
export async function getBoards(req: Request, res: Response, next: NextFunction) {
  try {
    let result = await sequelize.query(
      `SELECT 
        ${TABLE.kanban_boards}.* FROM ${TABLE.kanban_boards}`,
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
 * /kanban/boards/{board_id}:
 *   get:
 *     description: Get kanban board
 *     tags: [Kanban]
 *     parameters:
 *       - name: board_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function getKanbanBoard({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { board_id } = params

    const result: any = await sequelize.query(
      `SELECT * FROM ${TABLE.kanban_boards} 
        WHERE ${TABLE.kanban_boards}.id=${board_id}`,
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
 * /kanban/boards:
 *   post:
 *     description: Create kanban board
 *     tags: [Kanban]
 *     requestBody:
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Some board
 *              description:
 *                type: string
 *                example: Some description...
 */
export async function createKanbanBoard({ body }: Request, res: Response, next: NextFunction) {
  try {
    await KanbanBoardModel.create({
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
 * /kanban/boards/{board_id}:
 *   put:
 *     description: Update kanban board
 *     tags: [Kanban]
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
 *                example: New board name
 *              description:
 *                type: string
 *                example: Another board description...
 */
export async function updateKanbanBoard(
  { params, body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { board_id } = params

    await KanbanBoardModel.update(
      {
        ...body,
        updated_at: getTimestamp(),
      },
      {
        where: {
          id: board_id,
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
 * /kanban/boards/{board_id}:
 *   delete:
 *     description: Delete kanban board
 *     tags: [Kanban]
 *     parameters:
 *       - name: board_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function removeKanbanBoard({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { board_id } = params

    await KanbanBoardModel.destroy({
      where: {
        id: board_id,
      },
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
