import { makeAutoObservable } from 'mobx'

import { Connection, ConnectionStatus } from 'shared/types'
import LoadingModel from 'models/Loading'
import { API } from 'services'
import { PostsFilters } from 'pages/Posts/model'
import { Post } from 'shared/types'

class ProfileModel {
  private _connections: Connection[] = []
  private _posts: Post[] = []

  isEditActive: boolean = false
  editCommentId: number = 0

  comment: string = ''

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

  set posts(data: Post[]) {
    this._posts = data
  }

  get posts() {
    return this._posts
  }

  async updateConnectionStatus({ id, status }: { id: number; status: ConnectionStatus }) {
    await API.connections.update(id, status)

    this.fetch({ isSent: false, isReceived: true })
  }

  async fetch({
    isSent,
    isReceived,
    status = ConnectionStatus.pending,
  }: {
    isSent: boolean
    isReceived: boolean
    status?: ConnectionStatus
  }) {
    try {
      this.loading.begin()

      const data = await API.connections.get({
        status: status,
        isReceived: isReceived,
        isSent: isSent,
      })

      this.connections = data

      this.loading.reset()
    } catch {
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

      this.loading.reset()
    } catch {
      this.loading.reset()
    }
  }

  async removeConnectionRequest(id: number) {
    await API.connections.remove(id)

    this.fetch({ isSent: true, isReceived: false })
  }

  async addNewComment({ post_id, filters }: { post_id: number; filters?: PostsFilters }) {
    await API.posts.createComment(post_id, {
      created_at: new Date().getTime(),
      message: this.comment,
    })

    this.comment = ''

    this.fetchPosts({ filters })
  }

  async editComment({ post_id, filters }: { post_id: number; filters?: PostsFilters }) {
    await API.posts.editComment({
      post_id: post_id,
      comment_id: this.editCommentId,
      comment: {
        created_at: new Date().getTime(),
        message: this.comment,
      },
    })

    this.isEditActive = false
    this.comment = ''
    this.editCommentId = 0

    this.fetchPosts({ filters })
  }

  async deleteComment({
    comment_id,
    post_id,
    filters,
  }: {
    comment_id: number
    post_id: number
    filters: PostsFilters
  }) {
    await API.posts.deleteComment(post_id, comment_id)

    this.fetchPosts({ filters })
  }

  async toggleLike({ post_id, filters }: { post_id: number; filters?: PostsFilters }) {
    await API.posts.like(post_id)

    this.fetchPosts({ filters: filters, hidden: true })
  }
}

export default new ProfileModel()
