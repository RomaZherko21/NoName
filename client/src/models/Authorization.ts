import { makeAutoObservable } from 'mobx'

import api from 'services/api'
import { RootStore } from 'stores/Root'
import { User } from 'types/user'

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

  init() {
    this._accessToken = this.getAccessToken()
  }

  get accessToken() {
    return this._accessToken
  }

  get isAuthorized() {
    return this._isAuthorized
  }

  set isAuthorized(data: boolean) {
    this._isAuthorized = data
  }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN) || ''
  }

  setAccessToken(value: string) {
    this._accessToken = value
    localStorage.setItem(ACCESS_TOKEN, value)
  }

  async signIn(value: User) {
    const data = await api.auth.signIn(value.email, value.password)

    this.setAccessToken(data.accessToken)
    this.isAuthorized = true
    // this.rootStore.user.init()
  }

  unauthorize() {
    this.isAuthorized = false
  }
}

export default AuthorizationModel
