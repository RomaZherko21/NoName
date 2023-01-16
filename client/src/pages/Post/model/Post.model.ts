import { makeAutoObservable } from 'mobx'

import { NODE_API } from 'services'
import LoadingModel from 'models/Loading'
import { Post, User } from 'shared/types'

class PostsModel {
  id: number = 0
  user_id: number = 0
  name: string = ''
  description: string = ''
  created_at: number = 0
  image: string = ''
  likes_count: number = 0
  is_liked: boolean = false

  user_name: string = ''
  user_surname: string = ''
  user_avatar: string | undefined = ''

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async toggleLike() {
    await NODE_API.post.like(this.id)

    this.fetch({ id: this.id, hidden: true })
  }

  async fetch({ id, hidden = false }: { id: number; hidden?: boolean }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await NODE_API.post.get(id)

      this.fromJSON(data)

      this.loading.reset()
    } catch {
      this.loading.reset()
    }
  }

  private fromJSON(post: Post & { user: User }) {
    this.id = post.id
    this.user_id = post.user_id
    this.name = post.name
    this.description = post.description
    this.created_at = post.created_at
    this.image = post.image
    this.likes_count = post.likes_count
    this.is_liked = post.is_liked

    this.user_avatar = post.user.avatar
    this.user_name = post.user.name
    this.user_surname = post.user.surname
  }
}

export default new PostsModel()
