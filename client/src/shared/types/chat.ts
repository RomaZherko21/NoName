export interface Message {
  id: number
  text: string
  created_at: string

  user: {
    id: number
    name: string
    surname: string
    avatar: string
  }
}

export enum WsMessageCodes {
  chat = 'chat'
}
