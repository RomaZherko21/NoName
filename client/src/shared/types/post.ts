import { User } from './user'

export interface Posts {
  id: number
  user_id?: number
  name: string
  description: string
  created_at: number
  image: string
  avatar?: string
  likes_count: number
  isLiked: boolean
}

export interface Post {
  id: number
  user_id: number
  name: string
  description: string
  created_at: number
  image: string
  likes_count: number
  isLiked: boolean
  user: User
}
