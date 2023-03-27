import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { ConnectionStatus, sequelize, UserConnectionModel } from 'models'
import { QueryTypes } from 'sequelize'

/**
 * @swagger
 * /connections:
 *   get:
 *     description: Get a list of connections
 *     tags: [Connections]
 *     parameters:
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - decline
 *             - accept
 *           default: pending
 *       - name: isReceived
 *         in: query
 *         schema:
 *           type: boolean
 *           default: true
 *       - name: isSent
 *         in: query
 *         schema:
 *           type: boolean
 *           default: true
 *       - name: name
 *         in: query
 *       - name: surname
 *         in: query
 *       - name: user_id
 *         in: query
 */
export async function getConnections({ query }: Request, res: Response, next: NextFunction) {
  try {
    const { status, isReceived, isSent, name = '', surname = '', user_id } = query

    let connections: any = []

    if (isReceived) {
      const result = await sequelize.query(
        `SELECT user_connections.status,
            users.id as user_id, 
            users.name, 
            users.surname, 
            users.middle_name, 
            users.avatar, 
            users.email, 
            users.tel_number
        FROM user_connections 
        JOIN users ON (user_connections.sender_id = users.id)

        WHERE user_connections.recipient_id=${user_id} 
        AND user_connections.status='${status}' 
        AND users.name LIKE '%${name}%'
        AND users.surname LIKE '%${surname}%'
          `,
        {
          type: QueryTypes.SELECT,
        }
      )

      connections = [...connections, ...result]
    }

    if (isSent) {
      const result = await sequelize.query(
        `SELECT user_connections.status,
            users.id as user_id,
            users.name, 
            users.surname, 
            users.middle_name, 
            users.avatar, 
            users.email, 
            users.tel_number  
          FROM user_connections 
          JOIN users ON (user_connections.recipient_id = users.id)

          WHERE user_connections.sender_id=${user_id} 
          AND user_connections.status='${status}'
          AND users.name LIKE '%${name}%'
          AND users.surname LIKE '%${surname}%'
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

/**
 * @swagger
 * /connections/{connection_id}:
 *   delete:
 *     description: Delete connection
 *     tags: [Connections]
 *     parameters:
 *       - name: connection_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
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

/**
 * @swagger
 * /connections/{connection_id}:
 *   put:
 *     description: Update connection status
 *     tags: [Connections]
 *     parameters:
 *       - name: connection_id
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
 *              status:
 *                type: string
 *                enum:
 *                - pending
 *                - decline
 *                - accept
 *                example: pending
 */
export async function updateConnectionStatusById(
  { params, body }: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = params
    const { status }: { status: ConnectionStatus } = body
    const authorization_id = res.locals.authorization_id

    if (status === ConnectionStatus.pending) {
      await UserConnectionModel.create({
        sender_id: authorization_id,
        recipient_id: Number(id),
        status,
      })
    } else {
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
    }

    return res.status(204).send()
  } catch (err: any) {
    next(createError(500, err.message))
  }
}
