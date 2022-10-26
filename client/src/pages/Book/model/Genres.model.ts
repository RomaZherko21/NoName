import { makeAutoObservable } from 'mobx'

import { GO_API } from 'services'
import LoadingModel from 'models/Loading'
import { Genre } from 'shared/types'

class GenresModel {
  genres?: Genre[]

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async fetchGenres() {
    try {
      this.loading.begin()

      const data = await GO_API.genres.list()

      this.genres = data.genres

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new GenresModel()
