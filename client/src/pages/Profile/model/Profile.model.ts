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

  async updateConnectionStatus({ id, status }: { id: number; status: ConnectionStatus }) {
    await NODE_API.connection.update(id, status)

    this.fetch({ isSent: false, isReceived: true })
  }

  async fetch({ isSent, isReceived }: { isSent: boolean; isReceived: boolean }) {
    try {
      this.loading.begin()

      const data = await NODE_API.connection.get({
        status: ConnectionStatus.pending,
        isReceived: isReceived,
        isSent: isSent,
      })

      this.connections = data

      this.loading.reset()
    } catch {
      this.loading.reset()
    }
  }

  async removeConnectionRequest(id: number) {
    await NODE_API.connection.remove(id)

    this.fetch({ isSent: true, isReceived: false })
  }
}

export default new ProfileModel()
