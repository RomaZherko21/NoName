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

  booksTakenPercentage: number = 0

  remainsCounter: number = 0

  subscriptionsCounter: number = 0

  popularityPercentage: number = 0

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  getBookReadibilityStatus(): 'neutral' | 'success' | 'warning' {
    if (this.popularityPercentage < 5) {
      return 'warning'
    } else if (this.popularityPercentage < 25) {
      return 'neutral'
    } else {
      return 'success'
    }
  }

  async fetch(id: number) {
    try {
      this.loading.begin()

      const data = await GO_API.books.get(id)

      this.fromJSON(data.book)

      await this.fetchStats()

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }

  async fetchStats() {
    try {
      if (this.id === undefined) {
        throw new Error('Dont have id')
      }

      this.loading.begin()

      const { bookStats } = await GO_API.books.getStats(this.id)

      this.booksTakenPercentage = bookStats.books_taken_percentage
      this.remainsCounter = bookStats.remains_counter
      this.subscriptionsCounter = bookStats.subscriptions_counter
      this.popularityPercentage = bookStats.popularity_percentage

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
