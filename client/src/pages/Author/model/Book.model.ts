import { makeAutoObservable } from 'mobx'

import { GO_API } from 'services'
import LoadingModel from 'models/Loading'
import { Book } from 'shared/types'

class BookModel {
  name: string = ''

  authors: string[] = []

  genres: string = ''

  publisher: string = ''

  description: string = ''

  quantity: number = 0

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async fetch(id: number) {
    try {
      this.loading.begin()

      const data = await GO_API.books.get(id)

      this.fromJSON(data.book)

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  private fromJSON(book: Book) {
    this.name = book.name
    this.description = book.description
    this.authors = book.authors
    this.genres = book.genres
    this.publisher = book.publisher
    this.quantity = book.quantity
  }
}

export default new BookModel()
