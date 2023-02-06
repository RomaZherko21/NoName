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

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
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

      this.fetch({ isSent: false, isReceived: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async removeConnectionRequest(id: number) {
    try {
      await API.connections.remove(id)

      this.fetch({ isSent: true, isReceived: false })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async addNewComment({ post_id, filters }: { post_id: number; filters?: PostsFilters }) {
    try {
      await API.posts.createComment(post_id, {
        created_at: new Date().getTime(),
        message: this.comment,
      })

      this.comment = ''

      this.fetchPosts({ filters })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async editComment({ post_id, filters }: { post_id: number; filters?: PostsFilters }) {
    try {
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
    } catch (err: any) {
      toast.error(err)
    }
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
    try {
      await API.posts.deleteComment(post_id, comment_id)

      this.fetchPosts({ filters })
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
