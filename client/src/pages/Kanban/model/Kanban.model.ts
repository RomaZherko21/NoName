import { makeAutoObservable } from 'mobx'
import { DropResult } from 'react-beautiful-dnd'
import { toast } from 'react-toastify'

import LoadingModel from 'models/Loading'
import { KanbanColumn, KanbanColumnItem, KanbanTask } from 'shared/types'
import { API } from 'services'

class KanbanModel {
  columns: KanbanColumn[] = []
  task?: KanbanTask // Я

  commentInputValue: string = ''
  isEditActive: boolean = false
  editCommentId: number = 0

  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
  }

  async fetch({ id, hidden = false }: { id: number, hidden?: boolean }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }
      this.columns = await API.kanban.getColumns(id)
    }
    catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }

  async deleteColumn({ id }: { id: number }) {
    try {
      await API.kanban.deleteColumn(id)

      this.fetch({ id: 1, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async postColumn(KanbanColumnItem: KanbanColumnItem) {
    try {
      await API.kanban.postColumn(KanbanColumnItem)

      this.fetch({ id: 1 })
    } catch (err: any) {
      toast.error(err)
    }
  }
  
  async getTaskById({ id, hidden = false }: { id: number, hidden?: boolean }) {
    try {
      if (!hidden) {
        this.loading.begin()
      }
      this.task = await API.kanban.getTaskById(id)
      console.log('eeeeeeeeeeeeeee')
    }
    catch (err: any) {
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

  async addNewComment({ id }: { id: number }) {
    try {
      await API.posts.createComment(id, {
        created_at: new Date().getTime(),
        message: this.commentInputValue
      })

      this.commentInputValue = ''

      this.fetch({ id, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async editComment(id: number) {
    try {
      await API.posts.editComment({
        postId: id,
        commentId: this.editCommentId,
        comment: {
          message: this.commentInputValue
        }
      })

      this.isEditActive = false
      this.commentInputValue = ''
      this.editCommentId = 0

      this.fetch({ id, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async deleteComment(commentId: number, id: number) {
    try {
      await API.posts.deleteComment(id, commentId)

      this.fetch({ id, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  onDragEnd({ source, destination }: DropResult) {
    if (!destination) return

    if (source.droppableId !== destination.droppableId) {
      const fromColumn = this.columns.find((item) => String(source.droppableId) === String(item.column.position))
      const toColumn = this.columns.find((item) => destination.droppableId === String(item.column.position))

      if (fromColumn && toColumn) {
        const fromTasks = [...fromColumn.tasks]
        const toTasks = [...toColumn.tasks]
        const [removed] = fromTasks.splice(source.index, 1)

        toTasks.splice(destination.index, 0, removed)

        this.columns = this.columns.map((column) => {
          if (String(column.column.position) === source.droppableId) {
            return { ...fromColumn, tasks: fromTasks }
          } else if (String(column.column.position) === destination.droppableId) {
            return { ...toColumn, tasks: toTasks }
          } else {
            return column
          }
        })
      }
    } else {
      const column = this.columns.find((item) => source.droppableId === String(item.column.position))

      if (column) {
        const fromTasks = [...column.tasks]
        const [removed] = fromTasks.splice(source.index, 1)

        fromTasks.splice(destination.index, 0, removed)

        this.columns = this.columns.map((column) => {
          if (String(column.column.position) === source.droppableId) {
            return { ...column, tasks: fromTasks }
          } else {
            return column
          }
        })
      }
    }
  }
}

const model = new KanbanModel()

export default model
