import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { ChatMessageModel, ChatModel, UserModel, UsersChatsModel } from 'models'
import { WebSocket, Server } from 'ws'
import { WsMessageCodes } from 'wsHandler'
import { getTimestamp } from 'shared/helpers'

import repo from './repo'

/**
 * @swagger
 * /chat:
 *   get:
 *     description: Get current user chats
 *     tags: [Chat]
 */
export async function getUserChats(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    const chats: any = await repo.getUserChats({ userId: Number(authorization_id) })

    return res.status(200).json(chats)
  } catch (error: any) {
    return next(createError(500, error.message))
  }
}

export async function createUserChat({ body }: Request, res: Response, next: NextFunction) {
  try {
    const authorization_id = res.locals.authorization_id

    const { recipient_id, chat_name } = body

    const { dataValues } = await ChatModel.create({
      name: chat_name || '',
      created_at: getTimestamp(),
      updated_at: getTimestamp(),
    })

    await UsersChatsModel.bulkCreate([
      {
        chat_id: dataValues.id,
        user_id: authorization_id,
      },
      {
        chat_id: dataValues.id,
        user_id: recipient_id,
      },
    ])

    return res.status(204).send()
  } catch (error: any) {
    return next(createError(500, error.message))
  }
}

/**
 * @swagger
 * /chat/{chat_id}/messages:
 *   get:
 *     description: Get chat messages
 *     tags: [Chat]
 *     parameters:
 *       - name: chat_id
 *         in: path
 *         schema:
 *           type: integer
 *           default: 1
 */
export async function getChatMessages({ params }: Request, res: Response, next: NextFunction) {
  try {
    const { chat_id } = params

    const messages = await ChatMessageModel.findAll({
      where: {
        chat_id: Number(chat_id),
      },
      order: [['created_at', 'ASC']],
      include: [
        {
          model: UserModel,
          attributes: ['id', 'avatar', 'name', 'surname'],
          as: 'user',
        },
      ],
      attributes: { exclude: ['user_id'] },
    })

    return res.status(200).json(messages)
  } catch (error: any) {
    return next(createError(500, error.message))
  }
}

export async function processMessage(msg: any, wss: Server<WebSocket>) {
  try {
    await ChatMessageModel.create({
      text: msg.text,
      created_at: getTimestamp(),
      chat_id: msg.chat_id,
      user_id: msg.user_id,
    })

    const chats = await UsersChatsModel.findAll({
      where: {
        chat_id: Number(msg.chat_id),
      },
    })

    const clientsToSend = chats.map((item) => item.dataValues.user_id)

    console.log(clientsToSend)
    wss.clients.forEach((client: any) => {
      console.log(client.id)
      client.send(JSON.stringify({ code: WsMessageCodes.chat, ...msg }), (error: any) => {
        client.send(error)
      })
    })
  } catch (error: any) {
    console.log(error)
  }
}
