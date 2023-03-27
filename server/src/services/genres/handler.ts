import { NextFunction, Request, Response } from 'express'
import { QueryTypes } from 'sequelize'
import createError from 'http-errors'

import { sequelize } from 'models'

/**
 * @swagger
 * /genres:
 *   get:
 *     description: Get a list of genres
 *     tags: [Genres]
 */
export async function getGenres(req: Request, res: Response, next: NextFunction) {
  try {
    let result = await sequelize.query(
      `SELECT 
        genres.* FROM genres`,
      {
        type: QueryTypes.SELECT,
      }
    )

    res.status(200).json(result)
  } catch (err: any) {
    next(createError(500, err.message))
  }
}
