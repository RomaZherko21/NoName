import { makeAutoObservable } from 'mobx'

import { GO_API } from 'services'
import LoadingModel from 'models/Loading'
import { Author, Book, Genre } from 'shared/types'

class BookModel {
  id?: number

  name: string = ''

  authors: Author[] = []

  genres: Genre[] = []

  publisher: string = ''

  description: string = ''

  quantity: number = 0

  year?: number

  similarBooks: Book[] = []

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

  async fetchStats() {
    try {
      this.loading.begin()

      if (this.id !== undefined) {
        const data = await GO_API.books.getStats(this.id)

        console.log(data.stats)
      }

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async fetchAuthorBooks(id: number) {
    try {
      this.loading.begin()

      const data = await GO_API.authors.getAuthorBooks(id)

      this.similarBooks = data.books

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  private fromJSON(book: Book) {
    this.id = book.id
    this.name = book.name
    this.description = book.description
    this.authors = book.authors
    this.genres = book.genres
    this.publisher = book.publisher
    this.quantity = book.quantity
    this.year = book.year
  }
}

export default new BookModel()
