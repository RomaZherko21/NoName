import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { ChatMessageModel, ChatModel, sequelize, UserModel, UsersChatsModel } from 'models'
import { QueryTypes } from 'sequelize'
import { WebSocket, Server } from 'ws'
import { WsMessageCodes } from 'wsHandler'

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

    let chats: any = await sequelize.query(
      `
    SELECT
      u.name,
      u.name as user_name,
      u.surname as user_surname,
      u.avatar as user_avatar,
      cm.created_at as updated_at,
      cm.text as last_message,
      c.name,
      c.id
        FROM users as u JOIN chat_messages as cm on u.id=cm.user_id 
        JOIN chats as c on c.id=cm.chat_id
        JOIN(
          SELECT max(cm.id) as id FROM chat_messages as cm
            join chat_messages as cm1 on cm.chat_id=cm1.chat_id and cm1.user_id=${authorization_id}
              group by cm.chat_id) 
              as lattest_msg_id on cm.id=lattest_msg_id.id
          order by cm.created_at ;
      `,
      {
        type: QueryTypes.SELECT,
      }
    )

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
      created_at: Date.now(),
      updated_at: Date.now(),
    })

    UsersChatsModel.create({
      chat_id: dataValues.id,
      user_id: authorization_id,
    })

    UsersChatsModel.create({
      chat_id: dataValues.id,
      user_id: recipient_id,
    })

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
  console.log('HEHEH', msg)
  try {
    ChatMessageModel.create({
      text: msg.text,
      created_at: Date.now(),
      chat_id: msg.chat_id,
      user_id: msg.user_id,
    })

    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ code: WsMessageCodes.chat, ...msg }))
    })
  } catch (error: any) {
    console.log(error)
  }
}
