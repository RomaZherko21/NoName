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
}
