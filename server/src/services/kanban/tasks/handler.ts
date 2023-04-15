import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'

import { KanbanTaskModel, sequelize } from 'models'
import { TABLE } from 'shared/consts'
import { getTimestamp } from 'shared/helpers'

/**
 * @swagger
 * /kanban/tasks:
 *   get:
 *     description: Get a list of kanban tasks
 *     tags: [Kanban]
 */
export async function getKanbanTasks(req: Request, res: Response, next: NextFunction) {
  try {
    let result = await sequelize.query(
      `SELECT 
        ${TABLE.kanban_tasks}.* FROM ${TABLE.kanban_tasks}`,
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
 * /kanban/tasks/{task_id}:
 *   get:
 *     description: Get kanban task
 *     tags: [Kanban]
 *     parameters:
 *       - name: task_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function getKanbanTask({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { task_id } = params

    const result: any = await sequelize.query(
      `SELECT * FROM ${TABLE.kanban_tasks} 
        WHERE ${TABLE.kanban_tasks}.id=${task_id}`,
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
 * /kanban/columns/{column_id}/tasks:
 *   post:
 *     description: Create kanban task
 *     tags: [Kanban]
 *     parameters:
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
 *                example: New task name
 *              description:
 *                type: string
 *                example: Another task description...
 *              priority:
 *                type: string
 *                enum:
 *                 - 1
 *                 - 2
 *                 - 3
 *                 - 4
 *                 - 5
 *                example: 1
 *              due_date:
 *                type: string
 *                example: 2025-04-04 12:04:01
 */
export async function createKanbanTask(
  { body, params }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization_id = res.locals.authorization_id

    const { column_id } = params

    await KanbanTaskModel.create({
      ...body,
      created_at: getTimestamp(),
      updated_at: getTimestamp(),
      created_by: authorization_id,
      column_id,
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /kanban/columns/{column_id}/tasks/{task_id}:
 *   put:
 *     description: Update kanban task
 *     tags: [Kanban]
 *     parameters:
 *       - name: column_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: task_id
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
 *                example: New task name
 *              description:
 *                type: string
 *                example: Another task description...
 *              priority:
 *                type: string
 *                enum:
 *                 - 1
 *                 - 2
 *                 - 3
 *                 - 4
 *                 - 5
 *                example: 1
 *              due_date:
 *                type: string
 *                example: 2025-04-04 12:04:01
 */
export async function updateKanbanTask(
  { params, body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization_id = res.locals.authorization_id

    const { task_id, column_id } = params

    await KanbanTaskModel.update(
      {
        ...body,
        updated_at: getTimestamp(),
        created_by: authorization_id,
        column_id,
      },
      {
        where: {
          id: task_id,
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
 * /kanban/tasks/{task_id}:
 *   delete:
 *     description: Delete kanban task
 *     tags: [Kanban]
 *     parameters:
 *       - name: task_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function removeKanbanTask({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { task_id } = params

    await KanbanTaskModel.destroy({
      where: {
        id: task_id,
      },
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
