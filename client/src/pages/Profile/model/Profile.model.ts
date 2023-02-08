import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { Connection, ConnectionStatus } from 'shared/types'
import LoadingModel from 'models/Loading'
import { API } from 'services'
import { PostsFilters } from 'pages/Posts/model'
import { Post } from 'shared/types'

class ProfileModel {
  connections: Connection[] = []
  posts: Post[] = []

  comment: string = ''
  editCommentId: number = 0
  isEditActive: boolean = false

  connectionStatus: string = 'connections'

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  onConnectionStatusChange(status: string) {
    if (status === 'connections') {
      this.connectionStatus = 'connections'
      this.fetchConnections({
        isSent: true,
        isReceived: true,
        status: ConnectionStatus.accept,
        hidden: true,
      })
    }
    if (status === 'sentConnections') {
      this.connectionStatus = 'sentConnections'
      this.fetchConnections({ isSent: true, isReceived: false, hidden: true })
    }
    if (status === 'receivedConnections') {
      this.connectionStatus = 'receivedConnections'
      this.fetchConnections({ isSent: false, isReceived: true, hidden: true })
    }
  }

  async fetchConnections({
    isSent,
    isReceived,
    status = ConnectionStatus.pending,
    hidden = false,
  }: {
    isSent: boolean
    isReceived: boolean
    status?: ConnectionStatus
    hidden?: boolean
  }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await API.connections.get({
        status: status,
        isReceived: isReceived,
        isSent: isSent,
      })

      this.connections = data
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  async fetchPosts({
    filters: searchParams,
    hidden = false,
  }: {
    filters?: PostsFilters
    hidden?: boolean
  }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await API.posts.list({
        searchParams,
      })

      this.posts = data.posts
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  async updateConnectionStatus({ id, status }: { id: number; status: ConnectionStatus }) {
    try {
      await API.connections.update(id, status)

      this.fetchConnections({ isSent: false, isReceived: true, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async removeConnectionRequest(id: number) {
    try {
      await API.connections.remove(id)

      this.fetchConnections({ isSent: true, isReceived: false, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async toggleLike({ post_id, filters }: { post_id: number; filters?: PostsFilters }) {
    try {
      await API.posts.like(post_id)

      this.fetchPosts({ filters: filters, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }
}

export default new ProfileModel()
