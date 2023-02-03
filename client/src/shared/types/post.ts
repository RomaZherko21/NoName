export interface Post {
  id: number
  user_id: number
  genre_id: number

  name: string
  description: string
  short_description: string
  genre: string
  image: string
  reading_time: number

  avatar?: string
  likes_count: number
  is_liked: boolean
  first_liked_users: number[]
  comments: Comment[]

  created_at: number
}

export interface Comment {
  id: number
  post_id: number
  user_id: number
  created_at: number
  user_avatar: string
  message: string
  user_name: string
  user_surname: string
  user_middle_name: string
}
