import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { sequelize } from 'models'
import { QueryTypes } from 'sequelize'
import { TABLE } from 'shared/consts'

/**
 * @swagger
 * /meta:
 *   get:
 *     description: Get meta data
 *     tags: [Meta]
 */
export async function getMetaData(req: Request, res: Response, next: NextFunction) {
  try {
    let result: any = {}

    let kanbanBoards = await sequelize.query(
      `SELECT 
        kb.id, kb.name FROM ${TABLE.kanban_boards} as kb`,
      {
        type: QueryTypes.SELECT,
      }
    )

    result.kanban_boards = kanbanBoards

    return res.status(200).json(result)
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
