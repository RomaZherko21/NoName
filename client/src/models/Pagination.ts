import { makeAutoObservable } from 'mobx'

class PaginationModel {
  private _totalCount: number = 0

  private _limit: number = 10

  private _page: number = 0

  private _offset: number = 0

  perPageArr: number[] = [2, 10, 15, 20]

  constructor() {
    makeAutoObservable(this)
  }

  get totalCount() {
    return this._totalCount
  }

  set totalCount(data: number) {
    this._totalCount = data
  }

  get page() {
    return this._page
  }

  set page(page: number) {
    this._page = page || 0
  }

  get limit() {
    return this._limit
  }

  set limit(perPage: number) {
    this._limit = perPage || 10
  }

  get offset() {
    return this._limit * this._page
  }
}

export default PaginationModel
