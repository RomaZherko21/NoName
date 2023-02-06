import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { API } from 'services'
import { RootStore } from 'stores/Root'

const ACCESS_TOKEN = 'ACCESS_TOKEN'

class AuthorizationModel {
  readonly rootStore: RootStore

  isAuthorized: boolean = true

  accessToken: string | null = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    this.init()
  }

  init() {
    this.accessToken = this.getAccessToken()
  }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN) || ''
  }

  setAccessToken(value: string) {
    this.accessToken = value
    localStorage.setItem(ACCESS_TOKEN, value)
  }

  unauthorize() {
    this.isAuthorized = false
    localStorage.removeItem(ACCESS_TOKEN)
  }

  async signIn(value: { email: string; password: string }) {
    try {
      this.rootStore.loading.begin()

      const data = await API.auth.signIn(value.email, value.password)
      this.rootStore.user.init()

      this.setAccessToken(data.accessToken)
      this.isAuthorized = true
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.rootStore.loading.end()
    }
  }
}

export default AuthorizationModel
