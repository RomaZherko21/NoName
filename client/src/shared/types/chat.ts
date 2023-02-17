export interface Message {
  message_id: number
  isCurrentUser: boolean
  message: string
  received_at: number
  user_name: string
  user_surname: string
}
