import { makeAutoObservable } from 'mobx'

import { API } from 'services'
import { RootStore } from 'stores/Root'
import { User } from 'shared/types'

const ACCESS_TOKEN = 'ACCESS_TOKEN'

class AuthorizationModel {
  readonly rootStore: RootStore

  private _isAuthorized: boolean = false

  private _accessToken: string | null = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    this.init()
  }

  set isAuthorized(data: boolean) {
    this._isAuthorized = data
  }

  get isAuthorized() {
    return this._isAuthorized
  }

  get accessToken() {
    return this._accessToken
  }

  init() {
    this._accessToken = this.getAccessToken()
  }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN) || ''
  }

  setAccessToken(value: string) {
    this._accessToken = value
    localStorage.setItem(ACCESS_TOKEN, value)
  }

  unauthorize() {
    this.isAuthorized = false
    localStorage.removeItem(ACCESS_TOKEN)
  }

  async signIn(value: User) {
    const data = await API.auth.signIn(value.email, value.password)
    this.rootStore.user.init()

    this.setAccessToken(data.accessToken)
    this.isAuthorized = true
    // this.rootStore.user.init()
  }
}

export default AuthorizationModel
