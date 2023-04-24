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
 *     tags: [Kanban-tasks]
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
 *     tags: [Kanban-tasks]
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

    const result = await sequelize.query(
      `SELECT
kt.id,
kt.name,
kt.description,
kt.priority,
kt.due_date,
kt.created_at,
kt.updated_at,
kta.attachments,
JSON_ARRAYAGG(ktt.tag_name) as tags,
users.name as user_name,
users.surname as user_surname,
users.middle_name as user_middle_name,
users.email as user_email,
users.tel_number as user_tel_number,
users.role as user_role,
JSON_ARRAYAGG(u.assigne_to) as assigne_to
from
kanban_tasks as kt
LEFT JOIN (
SELECT
    kanban_task_attachments.task_id as task_id,
    JSON_ARRAYAGG(kanban_task_attachments.url) as attachments
from
    kanban_task_attachments
GROUP BY
    task_id
) as kta on kt.id = kta.task_id
LEFT JOIN (
SELECT
    kanban_task_tags.name as tag_name,
    m2m_kanban_tasks_tags.task_id as task_id
from
    kanban_task_tags
    JOIN m2m_kanban_tasks_tags on m2m_kanban_tasks_tags.tag_id = kanban_task_tags.id
GROUP BY
    tag_name,
    task_id
) as ktt on kt.id = ktt.task_id
LEFT JOIN (
SELECT
    users.avatar as assigne_to,
    m2m_kanban_users_tasks.task_id as task_id
from
    users
    JOIN m2m_kanban_users_tasks on m2m_kanban_users_tasks.user_id = users.id
) as u on kt.id = u.task_id
JOIN users on users.id = kt.created_by
WHERE
kt.id = ${task_id}
GROUP BY
kt.name,
kt.id;
    `,
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
 *     tags: [Kanban-tasks]
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
 *     tags: [Kanban-tasks]
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
 *     tags: [Kanban-tasks]
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
