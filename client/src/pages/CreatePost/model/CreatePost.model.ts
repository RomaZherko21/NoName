import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import LoadingModel from 'models/Loading'
import { API } from 'services'
import { Genre } from 'shared/types'

class CreatePostModel {
  genres: Genre[] = []

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async fetch() {
    try {
      this.loading.begin()

      const genres = await API.genres.get()

      this.genres = genres
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
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
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.end()
    }
  }
}
export default new CreatePostModel()
