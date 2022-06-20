import { createContext, useContext } from 'react'

import AuthorizationModel from 'models/Authorization'
import LoadingModel from 'models/Loading'
import UserModel from 'models/User'
import { fetch } from 'services'

import AppConfig from './AppConfig'

export class RootStore {
  readonly authorization: AuthorizationModel

  readonly user: UserModel

  readonly loading: LoadingModel

  constructor() {
    this.init()

    this.authorization = new AuthorizationModel(this)
    this.user = new UserModel(this)

    this.loading = new LoadingModel()
  }

  async init() {
    AppConfig.init()
    fetch.init()
  }
}

const rootStore = new RootStore()

const rootStoreContext = createContext<RootStore>(rootStore)

export const RootStoreProvider = ({ children }: { children: JSX.Element }) => (
  <rootStoreContext.Provider value={rootStore}>
    {children}
  </rootStoreContext.Provider>
)
export const useRootStore = () => useContext(rootStoreContext)

export default rootStore
