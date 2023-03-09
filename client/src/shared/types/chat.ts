export interface Message {
  id: number
  text: string
  created_at: number

  user: {
    id: number
    name: string
    surname: string
    avatar: string
  }
}
