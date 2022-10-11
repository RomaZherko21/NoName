import { makeAutoObservable } from 'mobx'

import { GO_API } from 'services'
import { Book } from 'shared/types'
import LoadingModel from 'models/Loading'

class BookModel {
  name: string = ''

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async fetch() {
    try {
      this.loading.begin()

      const data = await GO_API.books.get(6)

      console.log(data.book)

      this.name = data.book.name

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new BookModel()
