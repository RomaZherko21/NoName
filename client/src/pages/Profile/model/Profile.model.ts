import { makeAutoObservable } from 'mobx'

import { Connection, ConnectionStatus } from 'shared/types'
import LoadingModel from 'models/Loading'
import { NODE_API } from 'services'

class ProfileModel {
  private _connections: Connection[] = []

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  set connections(data: Connection[]) {
    this._connections = data
  }

  get connections() {
    return this._connections
  }

  async sentRequestsFetch() {
    try {
      this.loading.begin()

      const data = await NODE_API.connection.get({
        status: ConnectionStatus.pending,
        isReceived: false,
      })

      this.connections = data

      this.loading.reset()
    } catch {
      this.loading.reset()
    }
  }

  async removeRequest(id: number) {
    await NODE_API.connection.remove(id)

    this.sentRequestsFetch()
  }
}

export default new ProfileModel()
