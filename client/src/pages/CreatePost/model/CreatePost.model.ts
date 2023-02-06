import { makeAutoObservable } from 'mobx'
import LoadingModel from 'models/Loading'
import { NODE_API } from 'services'
import { Genre } from 'shared/types'

class CreatePostModel {
  loading: LoadingModel

  genres: Genre[] = []

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async fetch() {
    try {
      this.loading.begin()

      const genres = await NODE_API.genres.get()

      this.genres = genres

      this.loading.reset()
    } catch {
      console.log('FUCK')

      this.loading.reset()
    }
  }

  getGenresOptions() {
    return this.genres.reduce((acc, item) => ({ ...acc, [item.id]: item.name }), {})
  }

  async create(post: {
    name: string
    short_description: string
    genre_id: number
    description: string
    post: any
    reading_time: number
  }) {
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
