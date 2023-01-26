export interface Post {
  id: number
  user_id: number
  name: string
  description: string
  created_at: number
  image: string
  likes_count: number
  is_liked: boolean
  avatar?: string
  comments: Comment[]
}

export interface Comment {
  id: number
  post_id: number
  user_id: number
  created_at: number
  user_avatar: string
  message: string
}
