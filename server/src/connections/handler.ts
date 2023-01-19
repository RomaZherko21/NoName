import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { sequelize } from 'models'
import { QueryTypes } from 'sequelize'

export async function getConnections(req: Request, res: Response, next: NextFunction) {
  try {
    const connections: any = await sequelize.query(
      `SELECT users.id as user_id, users.name,users.surname, users.middle_name, users.avatar, users.email, users.tel_number  
          FROM user_connections 
            JOIN users ON (user_connections.first_user_id = users.id 
            OR user_connections.second_user_id = users.id)

        WHERE user_connections.first_user_id=${res.locals.authorization_id} 
        OR user_connections.second_user_id=${res.locals.authorization_id}

        HAVING user_id!=${res.locals.authorization_id}
        `,
      {
        type: QueryTypes.SELECT,
      }
    )

    return res.status(200).json(connections)
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function deleteConnectionById({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { id } = params

    await sequelize.query(
      `DELETE FROM user_connections
      
        WHERE user_connections.first_user_id=${res.locals.authorization_id} AND user_connections.second_user_id=${id}
        OR user_connections.first_user_id=${id} AND user_connections.second_user_id=${res.locals.authorization_id}
        `,
      {
        type: QueryTypes.DELETE,
      }
    )

    return res.status(204).send()
  } catch (err: any) {
    next(createError(500, err.message))
  }
}
