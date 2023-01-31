import { makeAutoObservable } from 'mobx'

import { NODE_API } from 'services'
import LoadingModel from 'models/Loading'
import { Comment, Post, User } from 'shared/types'

class PostModel {
  id: number = 0
  user_id: number = 0
  name: string = ''
  description: string = ''
  created_at: number = 0
  image: string = ''
  likes_count: number = 0
  is_liked: boolean = false
  comments: Comment[] = []

  user_name: string = ''
  user_surname: string = ''
  user_avatar: string | undefined = ''

  commentInputValue: string = ''
  isEditActive: boolean = false
  editCommentId: number = 0

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async fetch({ id, hidden = false }: { id: number; hidden?: boolean }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }

      const data = await NODE_API.post.get(id)

      this.fromJSON(data)

      this.loading.reset()
    } catch {
      this.loading.reset()
    }
  }

  onEditComment({ value, id }: { value: string; id: number }) {
    this.isEditActive = true
    this.commentInputValue = value
    this.editCommentId = id
  }

  async toggleLike() {
    await NODE_API.post.like(this.id)

    this.fetch({ id: this.id, hidden: true })
  }

  async addNewComment() {
    await NODE_API.post.createComment(this.id, {
      created_at: new Date().getTime(),
      message: this.commentInputValue,
    })

    this.commentInputValue = ''

    this.fetch({ id: this.id })
  }

  async editComment() {
    await NODE_API.post.editComment({
      post_id: this.id,
      comment_id: this.editCommentId,
      comment: {
        created_at: new Date().getTime(),
        message: this.commentInputValue,
      },
    })

    this.isEditActive = false
    this.commentInputValue = ''
    this.editCommentId = 0

    this.fetch({ id: this.id })
  }

  async deleteComment(comment_id: number) {
    await NODE_API.post.deleteComment(this.id, comment_id)

    this.fetch({ id: this.id })
  }

  private fromJSON(post: Post & { user: User }) {
    this.id = post.id
    this.user_id = post.user_id
    this.name = post.name
    this.description = post.description
    this.created_at = post.created_at
    this.image = post.image
    this.likes_count = post.likes_count
    this.is_liked = post.is_liked
    this.comments = post.comments

    this.user_avatar = post.user.avatar
    this.user_name = post.user.name
    this.user_surname = post.user.surname
  }
}

export default new PostModel()
