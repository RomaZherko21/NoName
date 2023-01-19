import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { sequelize } from 'models'
import { QueryTypes } from 'sequelize'

export async function getConnections({ query }: Request, res: Response, next: NextFunction) {
  try {
    const { status, isReceived, isSent } = query
    const authorization_id = res.locals.authorization_id

    let connections: any = []

    if (isReceived) {
      const result: any = await sequelize.query(
        `SELECT user_connections.status ,users.id as user_id, users.name, users.surname, users.middle_name, users.avatar, users.email, users.tel_number  
            FROM user_connections 
              JOIN users ON (user_connections.sender_id = users.id)
  
          WHERE user_connections.recipient_id=${authorization_id} AND user_connections.status='${status}'
          `,
        {
          type: QueryTypes.SELECT,
        }
      )

      connections = [...connections, ...result]
    }

    if (isSent) {
      const result: any = await sequelize.query(
        `SELECT user_connections.status ,users.id as user_id, users.name, users.surname, users.middle_name, users.avatar, users.email, users.tel_number  
            FROM user_connections 
              JOIN users ON (user_connections.recipient_id = users.id)
  
          WHERE user_connections.sender_id=${authorization_id} AND user_connections.status='${status}'
          `,
        {
          type: QueryTypes.SELECT,
        }
      )

      connections = [...connections, ...result]
    }

    return res.status(200).json(connections)
  } catch (err: any) {
    next(createError(500, err.message))
  }
}

export async function deleteConnectionById({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { id } = params
    const authorization_id = res.locals.authorization_id

    await sequelize.query(
      `DELETE FROM user_connections
      
        WHERE user_connections.sender_id=${authorization_id} AND user_connections.recipient_id=${id}
        OR user_connections.sender_id=${id} AND user_connections.recipient_id=${authorization_id}
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

export async function updateConnectionStatusById(
  { params, body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = params
    const { status } = body
    const authorization_id = res.locals.authorization_id

    await sequelize.query(
      `UPDATE user_connections
        SET user_connections.status = '${status}'
      
        WHERE user_connections.sender_id=${authorization_id} AND user_connections.recipient_id=${id}
        OR user_connections.sender_id=${id} AND user_connections.recipient_id=${authorization_id}
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
