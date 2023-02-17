import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { API } from 'services'
import LoadingModel from 'models/Loading'
import { Comment, Post, UserBasic, UserMeta } from 'shared/types'

class PostModel {
  id: number = 0
  user_id: number = 0
  genre_id: number = 0

  name: string = ''
  description: string = ''
  short_description: string = ''
  genre: string = ''
  image: string = ''
  reading_time: number = 0

  likes_count: number = 0
  is_liked: boolean = false
  first_liked_users: number[] = []
  comments: Comment[] = []

  user_name: string = ''
  user_surname: string = ''
  user_avatar: string | undefined = ''

  created_at: number = 0

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

      const data = await API.posts.get(id)

      this.fromJSON(data)
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  onEditComment({ value, id }: { value: string; id: number }) {
    this.isEditActive = true
    this.commentInputValue = value
    this.editCommentId = id
  }

  async toggleLike() {
    try {
      await API.posts.like(this.id)

      this.fetch({ id: this.id, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async addNewComment() {
    try {
      await API.posts.createComment(this.id, {
        created_at: new Date().getTime(),
        message: this.commentInputValue,
      })

      this.commentInputValue = ''

      this.fetch({ id: this.id, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async editComment() {
    try {
      await API.posts.editComment({
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

      this.fetch({ id: this.id, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async deleteComment(comment_id: number) {
    try {
      await API.posts.deleteComment(this.id, comment_id)

      this.fetch({ id: this.id, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  private fromJSON(post: Post & { user: UserBasic & UserMeta }) {
    this.id = post.id
    this.user_id = post.user_id
    this.genre_id = post.genre_id

    this.name = post.name
    this.description = post.description
    this.short_description = post.short_description
    this.genre = post.genre
    this.image = post.image
    this.reading_time = post.reading_time

    this.likes_count = post.likes_count
    this.is_liked = post.is_liked
    this.first_liked_users = post.first_liked_users
    this.comments = post.comments

    this.user_avatar = post.user.avatar
    this.user_name = post.user.name
    this.user_surname = post.user.surname

    this.created_at = post.created_at
  }
}

export default new PostModel()
