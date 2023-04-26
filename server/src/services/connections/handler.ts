import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { ConnectionStatus, UserConnectionModel } from 'models'

import repo from './repo'

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
    const { user_id = '', status = '', name = '', surname = '', isReceived, isSent } = query

    const repoParams = {
      name: String(name),
      surname: String(surname),
      status: String(status),
      userId: String(user_id),
    }

    let connections: any = []

    if (isReceived) {
      const result = await repo.getUserConnections({
        ...repoParams,
        isReceivedStatus: true,
      })

      connections = [...connections, ...result]
    }

    if (isSent) {
      const result = await repo.getUserConnections({
        ...repoParams,
        isReceivedStatus: false,
      })

      connections = [...connections, ...result]
    }

    return res.status(200).json(connections)
  } catch (error: any) {
    next(createError(500, error.message))
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
    const authorization_id = res.locals.authorization_id

    const { id } = params

    await repo.deleteUserConnection({ userId: authorization_id, id: Number(id) })

    return res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
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
    const authorization_id = res.locals.authorization_id

    const { id } = params
    const { status }: { status: ConnectionStatus } = body

    if (status === ConnectionStatus.pending) {
      await UserConnectionModel.create({
        sender_id: authorization_id,
        recipient_id: Number(id),
        status,
      })
    } else {
      await repo.updateConnectionStatus({ userId: authorization_id, id: Number(id), status })
    }

    return res.status(204).send()
  } catch (error: any) {
    next(createError(500, error.message))
  }
}
