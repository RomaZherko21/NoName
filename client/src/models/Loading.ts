import { makeAutoObservable } from 'mobx'

class LoadingModel {
  private _state: number = 0

  constructor() {
    makeAutoObservable(this)
  }

  get has() {
    return this._state > 0
  }

  begin() {
    this._state += 1
  }

  end() {
    this._state -= 1
  }

  reset() {
    this._state = 0
  }
}

export default LoadingModel
