import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'

import { KanbanColumnModel, sequelize } from 'models'

/**
 * @swagger
 * /kanban/boards/{board_id}/columns:
 *   get:
 *     description: Get a list of kanban columns
 *     tags: [Kanban]
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

    let columns: { id: number; name: string; position: number; board_id: number }[] =
      await sequelize.query(
        `SELECT
        kc.id,
        kc.name,
        kc.position
    from
        kanban_columns as kc
        JOIN kanban_tasks as kt on kc.id = kt.column_id
    WHERE
        kc.board_id = ${board_id}
GROUP BY
kc.id;
        `,
        {
          type: QueryTypes.SELECT,
        }
      )

    await Promise.all(
      columns.map(async (column) => {
        const tasks = await sequelize.query(
          `SELECT
kt.id,
kt.name,
kta.attachments,
JSON_ARRAYAGG(ktt.tag_name) as tags,
users.name as created_by,
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
kt.column_id = ${column.id}
GROUP BY
kt.name,
kt.id;
        `,
          {
            type: QueryTypes.SELECT,
          }
        )

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
