import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { API } from 'services'
import { RootStore } from 'stores/Root'

const ACCESS_TOKEN = 'ACCESS_TOKEN'

class AuthorizationModel {
  readonly rootStore: RootStore

  accessToken: string | null = null
  isAuthorized: boolean = true

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    this.init()
  }

  init() {
    this.accessToken = this.getAccessToken()
  }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN) ?? ''
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

      this.setAccessToken(data.accessToken)
      this.isAuthorized = true

      await this.rootStore.user.init()
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.rootStore.loading.end()
    }
  }
}

export default AuthorizationModel
