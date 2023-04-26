import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'

import { sequelize } from 'models'
import { TABLE } from 'shared/consts'

/**
 * @swagger
 * /genres:
 *   get:
 *     description: Get a list of genres
 *     tags: [Genres]
 */
export async function getGenres(req: Request, res: Response, next: NextFunction) {
  try {
    let result = await sequelize.query(`SELECT g.* FROM ${TABLE.genres} as g`, {
      type: QueryTypes.SELECT,
    })

    res.status(200).json(result)
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
