import { makeAutoObservable } from 'mobx'

import { NODE_API } from 'services'
import { RootStore } from 'stores/Root'

const ACCESS_TOKEN = 'ACCESS_TOKEN'

class AuthorizationModel {
  readonly rootStore: RootStore

  private _isAuthorized: boolean = true

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

  async signIn(value: { email: string; password: string }) {
    const data = await NODE_API.auth.signIn(value.email, value.password)
    this.rootStore.user.init()

    this.setAccessToken(data.accessToken)
    this.isAuthorized = true
    // this.rootStore.user.init()
  }
}

export default AuthorizationModel
