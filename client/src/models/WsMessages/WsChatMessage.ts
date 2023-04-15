import { makeAutoObservable } from 'mobx'
import { WsMessageCodes } from 'shared/types'

class WsChatMessage {
  chatId?: number = 0

  private readonly connection?: WebSocket

  constructor(connection?: WebSocket) {
    makeAutoObservable(this)

    this.connection = connection
  }

  sendMessage(data: { text: string; userId: number }) {
    console.log('sdfsdf', data, this.connection)
    this.connection?.send(
      JSON.stringify({
        text: data.text,
        user_id: data.userId,
        chat_id: 1,
        code: WsMessageCodes.chat
      })
    )
  }

  processMessage(msg: any) {
    console.log('hehehe', msg)
  }
}

export default WsChatMessage
