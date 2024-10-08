import { makeAutoObservable } from 'mobx'

import { API_WS_URL } from 'shared/consts'
import { WsMessageCodes } from 'shared/types'
import { RootStore } from 'stores/Root'

import { WsChatMessage } from './WsMessages'

class WebSocketModel {
  private readonly rootStore: RootStore

  private connection?: WebSocket

  chatMessages: WsChatMessage

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    this.init()

    this.chatMessages = new WsChatMessage(this.connection)
  }

  async init() {
    if (this.rootStore.authorization.isAuthorized) {
      this.connection = new WebSocket(API_WS_URL)

      this.connection.onopen = () => {
        console.log('Ws onopen...')
      }

      this.connection.onclose = () => {
        console.log('Ws closed...')
      }

      this.connection.onmessage = (evt) => {
        this.processMessage(JSON.parse(evt.data))
      }

      this.connection.onerror = () => {
        console.log('Ws onerror...')
      }
    } else {
      console.warn('Ws connection: user not authorized')
    }
  }

  close() {
    this.connection?.close()
    this.connection = undefined
  }

  private processMessage(msg: any) {
    switch (msg.code) {
      case WsMessageCodes.chat:
        this.chatMessages.processMessage(msg)
        break
      default:
        break
    }
  }
}

export default WebSocketModel
