import { makeAutoObservable } from 'mobx'

import { GO_API } from 'services'
import { Book } from 'shared/types'
import PaginationModel from 'models/Pagination'
import LoadingModel from 'models/Loading'

class BooksModel {
  private _books: Book[] = []

  pagination: PaginationModel

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.pagination = new PaginationModel()
    this.loading = new LoadingModel()
  }

  set books(data: Book[]) {
    this._books = data
  }

  get books() {
    return this._books
  }

  async fetch() {
    try {
      this.loading.begin()

      const data = await GO_API.books.list()

      console.log(data.books)

      this.books = data.books

      this.loading.end()
    } catch {
      this.loading.reset()
    }
  }
}

export default new BooksModel()
