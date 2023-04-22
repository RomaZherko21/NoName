export interface Post extends Creator {
  id: number
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

  created_at: string
}

export interface Comment extends Creator {
  id: number
  post_id: number
  created_at: string
  message: string
}

export interface Creator {
  user_id: number
  user_name: string
  user_surname: string
  user_middle_name: string

  user_avatar: string
  user_email: string
}
