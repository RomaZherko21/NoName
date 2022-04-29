import { makeAutoObservable } from 'mobx'

class PaginationModel {
  private _pageCount: number = 1

  private _perPage: number = 10

  private _page: number = 1

  private _offset: number = 0

  private _count: number = 0

  perPageArr: number[] = [2, 10, 15, 20]

  constructor() {
    makeAutoObservable(this)
  }

  get count() {
    return this._count
  }

  set count(data: number) {
    this._count = data
  }

  get page() {
    return this._page
  }

  set page(page: number) {
    this._page = page || 1
  }

  get perPage() {
    return this._perPage
  }

  set perPage(perPage: number) {
    this._perPage = perPage || 1
  }

  get pageCount() {
    return Math.ceil(this._count / this.perPage) || 1
  }

  get offset() {
    return this._perPage * (this._page - 1)
  }
}

export default PaginationModel
