import { Server, WebSocket } from 'ws'

import { log } from 'shared/helpers'

import { processMessage as processChatMessage } from './services/chat'

export enum WsMessageCodes {
  chat = 'chat',
}

const wsHandler = (wss: Server<WebSocket>) => {
  wss.on('connection', (ws) => {
    log.positive('A user connected.')

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

  // // Check for died connections at regular intervals.
  // setInterval(function () {
  //   wss.clients.forEach(function (connection: any) {
  //     if (connection.isAlive === false) {
  //       console.log('Connection died', connection.id)
  //       return connection.terminate()
  //     }

  //     // Request the client to respond with pong. Client does this automatically.
  //     connection.isAlive = false
  //     connection.ping(function () {})
  //   })
  // }, 30_000)
}

export default wsHandler
