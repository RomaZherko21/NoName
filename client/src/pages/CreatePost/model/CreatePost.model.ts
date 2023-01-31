import { makeAutoObservable } from 'mobx'
import LoadingModel from 'models/Loading'
import { NODE_API } from 'services'

class CreatePostModel {
  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async create(post: { name: string; description: string; post: File | ''; user_id: number }) {
    try {
      this.loading.begin()

      const created_at = Date.now()

      await NODE_API.post.create({ ...post, created_at })

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}
export default new CreatePostModel()
