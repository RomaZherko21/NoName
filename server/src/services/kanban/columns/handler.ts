import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { KanbanColumnModel } from 'models'
import repo from './repo'

/**
 * @swagger
 * /kanban/boards/{board_id}/columns:
 *   get:
 *     description: Get a list of kanban columns
 *     tags: [Kanban-columns]
 *     parameters:
 *       - name: board_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function getKanbanColumns({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { board_id } = params

    const result: any = []

    let columns: any = await repo.getKanbanColumns({ board_id })

    await Promise.all(
      columns.map(async (column: any) => {
        const tasks = await repo.getKanbanTasksByColumnId({ column_id: column.id })

        result.push({ column: { position: column.position, name: column.name }, tasks: tasks })
      })
    )

    const sortedByPositionResult = result.sort(
      (a: any, b: any) => a.column.position - b.column.position
    )

    res.status(200).json(sortedByPositionResult)
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /kanban/boards/{board_id}/columns:
 *   post:
 *     description: Create kanban column in board
 *     tags: [Kanban-columns]
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
 *                example: ToDo
 *              position:
 *                type: integer
 *                example: 0
 */
export async function createKanbanColumn(
  { body, params }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { board_id } = params

    await KanbanColumnModel.create({
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
 * /kanban/boards/{board_id}/columns/{column_id}:
 *   put:
 *     description: Update kanban column in board
 *     tags: [Kanban-columns]
 *     parameters:
 *       - name: board_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: column_id
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
 *                example: ToDo2
 *              position:
 *                type: integer
 *                example: 0
 */
export async function updateKanbanColumn(
  { params, body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { board_id, column_id } = params

    await KanbanColumnModel.update(
      {
        ...body,
        board_id,
      },
      {
        where: {
          id: column_id,
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
 * /kanban/columns/{column_id}:
 *   delete:
 *     description: Delete kanban column
 *     tags: [Kanban-columns]
 *     parameters:
 *       - name: column_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function removeKanbanColumn({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { column_id } = params

    await KanbanColumnModel.destroy({
      where: {
        id: column_id,
      },
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
