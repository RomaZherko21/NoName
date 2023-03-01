import { createContext, useContext } from 'react'

import AuthorizationModel from 'models/Authorization'
import LoadingModel from 'models/Loading'
import WebSocketModel from 'models/WebSocket'
import UserModel from 'models/User'

import AppConfig from './AppConfig'

export class RootStore {
  readonly authorization: AuthorizationModel

  readonly user: UserModel

  readonly ws: WebSocketModel

  readonly loading: LoadingModel

  constructor() {
    this.loading = new LoadingModel()

    this.init()

    this.authorization = new AuthorizationModel(this)
    this.user = new UserModel(this)
    this.ws = new WebSocketModel(this)
  }

  async init() {
    AppConfig.init()
  }
}

const rootStore = new RootStore()

const rootStoreContext = createContext<RootStore>(rootStore)

export const RootStoreProvider = ({ children }: { children: JSX.Element }) => (
  <rootStoreContext.Provider value={rootStore}>{children}</rootStoreContext.Provider>
)
export const useRootStore = () => useContext(rootStoreContext)

export default rootStore
