import { makeAutoObservable } from 'mobx'
import LoadingModel from 'models/Loading'
import { API } from 'services'
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

      const genres = await API.genres.get()

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

      await API.posts.create({ ...post, created_at })

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}
export default new CreatePostModel()
