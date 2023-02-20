import { Server, WebSocket } from 'ws'

import { processMessage as processChatMessage } from './services/chat'

export enum WsMessageCodes {
  chat = 'chat',
}

const wsHandler = (wss: Server<WebSocket>) => {
  wss.on('connection', (ws) => {
    console.log('A user connected.')

    ws.on('message', async (data: string) => {
      try {
        const message = JSON.parse(data)

        switch (message.code) {
          case WsMessageCodes.chat:
            processChatMessage(message, wss)
            break
          default:
            break
        }
      } catch (error) {
        console.error(error)
      }
    })

    ws.on('close', () => {
      console.log('A user disconnected.')
    })
  })
}

export default wsHandler
