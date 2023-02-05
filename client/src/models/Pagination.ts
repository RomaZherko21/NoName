import { makeAutoObservable } from 'mobx'

class PaginationModel {
  private _totalCount: number = 0

  private _limit: number = 10

  private _currentPage: number = 0

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

  get currentPage() {
    return this._currentPage
  }

  set currentPage(page: number) {
    this._currentPage = page || 0
  }

  get limit() {
    return this._limit
  }

  set limit(perPage: number) {
    this._limit = perPage || 10
  }

  get offset() {
    return this._limit * this._currentPage
  }
}

export default PaginationModel
