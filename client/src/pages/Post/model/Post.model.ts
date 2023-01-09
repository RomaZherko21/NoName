import { makeAutoObservable } from 'mobx'

import { NODE_API } from 'services'
import LoadingModel from 'models/Loading'
import { Post } from 'shared/types'

class PostsModel {
  id?: number = 0
  user_id?: number = 0
  name: string = ''
  description: string = ''
  created_at: number = 0
  image: string = ''
  avatar: string = ''

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async fetchPost(id: any) {
    try {
      this.loading.begin()

      const data = await NODE_API.post.get(id)

      this.fromJSON(data)

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  private fromJSON(post: Post) {
    this.id = post.id
    this.user_id = post.user_id
    this.name = post.name
    this.description = post.description
    this.created_at = post.created_at
    this.image = post.image
    this.avatar = post.avatar
  }
}

export default new PostsModel()
