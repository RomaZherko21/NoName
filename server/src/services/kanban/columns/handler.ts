import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'

import { KanbanColumnModel, sequelize } from 'models'
import { TABLE } from 'shared/consts'

/**
 * @swagger
 * /kanban/boards/{board_id}/columns:
 *   get:
 *     description: Get a list of kanban columns
 *     tags: [Kanban]
 */
export async function getKanbanColumns({ params }: Request, res: Response, next: NextFunction) {
  // TODO
  try {
    const { board_id } = params

    const result: any = []

    let columns: { id: number; name: string; position: number; board_id: number }[] =
      await sequelize.query(
        `SELECT
        ${TABLE.kanban_columns}.*,
        kt.name as task_name
    from
        kanban_columns as kc
        JOIN kanban_tasks as kt on kc.id = kt.column_id
    WHERE
        kc.board_id = ${board_id};
        `,
        {
          type: QueryTypes.SELECT,
        }
      )

    columns.forEach(async (item) => {
      await sequelize.query(
        `SELECT
        ${TABLE.kanban_columns}.*,
        kt.name as task_name
    from
        kanban_columns as kc
        JOIN kanban_tasks as kt on kc.id = kt.column_id
    WHERE
        kc.board_id = ${board_id};
        `,
        {
          type: QueryTypes.SELECT,
        }
      )

      result.push({ column: { position: item.position, name: item.name }, tasks: [] })
    })

    res.status(200).json(result)
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /kanban/boards/{board_id}/columns:
 *   post:
 *     description: Create kanban column in board
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
 *     tags: [Kanban]
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
 *     tags: [Kanban]
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
