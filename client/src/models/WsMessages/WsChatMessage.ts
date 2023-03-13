import { makeAutoObservable } from 'mobx'

class WsChatMessage {
  chatId?: number = 0

  private connection?: WebSocket

  constructor(connection?: WebSocket) {
    makeAutoObservable(this)

    this.connection = connection
  }

  sendMessage(data: { text: string; createdAt: number; recipientId: number }) {
    console.log('sdfsdf', data, this.connection)
    this.connection?.send(
      JSON.stringify({
        text: data.text,
        created_at: data.createdAt,
        recipient_id: data.recipientId,
        chat_id: this.chatId,
      })
    )
  }

  processMessage(msg: any) {
    console.log('hehehe', msg)
  }
}

export default WsChatMessage
