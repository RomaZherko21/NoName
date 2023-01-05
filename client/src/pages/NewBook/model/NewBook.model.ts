import { makeAutoObservable } from 'mobx'

import { Genre } from 'shared/types'
import LoadingModel from 'models/Loading'
import { GO_API } from 'services'

class NewBookModel {
  description = ''

  genres: Genre[] = []

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  changeDescription(value: string) {
    this.description = value
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

export default new NewBookModel()
