import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'

import { KanbanSubtaskModel, sequelize } from 'models'
import { TABLE } from 'shared/consts'

/**
 * @swagger
 * /kanban/tasks/{task_id}/subtasks:
 *   get:
 *     description: Get all subtasks of one kanban task
 *     tags: [Kanban]
 *     parameters:
 *       - name: task_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function getKanbanSubtasks({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { task_id } = params

    let result = await sequelize.query(
      `SELECT 
      ${TABLE.kanban_subtasks}.id, ${TABLE.kanban_subtasks}.name, ${TABLE.kanban_subtasks}.is_completed 
      FROM ${TABLE.kanban_subtasks}
        WHERE ${TABLE.kanban_subtasks}.task_id = ${task_id}`,
      {
        type: QueryTypes.SELECT,
      }
    )

    result = result.map((item: any) => ({ ...item, is_completed: Boolean(item.is_completed) }))

    res.status(200).json(result)
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /kanban/tasks/{task_id}/subtasks:
 *   post:
 *     description: Create kanban subtask
 *     tags: [Kanban]
 *     parameters:
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
 *                example: Some task
 *              is_completed:
 *                type: boolean
 *                example: false
 */
export async function createKanbanSubtask(
  { body, params }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { task_id } = params

    await KanbanSubtaskModel.create({
      ...body,
      task_id,
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /kanban/tasks/{task_id}/subtasks/{subtask_id}:
 *   put:
 *     description: Update kanban subtask
 *     tags: [Kanban]
 *     parameters:
 *       - name: task_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: subtask_id
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
 *                example: New subtask name
 *              is_completed:
 *                type: boolean
 *                example: true
 */
export async function updateKanbanSubtask(
  { params, body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { task_id, subtask_id } = params

    await KanbanSubtaskModel.update(
      {
        ...body,
      },
      {
        where: {
          id: subtask_id,
          task_id,
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
 * /kanban/subtasks/{subtask_id}:
 *   delete:
 *     description: Delete kanban subtask
 *     tags: [Kanban]
 *     parameters:
 *       - name: subtask_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function removeKanbanSubtask({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { subtask_id } = params

    await KanbanSubtaskModel.destroy({
      where: {
        id: subtask_id,
      },
    })

    res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
