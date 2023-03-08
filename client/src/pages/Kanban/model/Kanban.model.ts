import { makeAutoObservable } from 'mobx'
import { DropResult } from 'react-beautiful-dnd'
import { toast } from 'react-toastify'

import LoadingModel from 'models/Loading'
import { KanbanColumn } from 'shared/types'
import { API } from 'services'

class KanbanModel {
  columnsFromBackend: KanbanColumn[] = [
    {
      id: '1',
      title: 'Todo',
      tasks: [
        {
          id: '1',
          content: 'First task',
          KanbanComment: [{ id: 1, created_at: 1231234521, task_id: 1, message: 'Yes' }],
        },
        {
          id: '2',
          content: 'Second task',
          KanbanComment: [{ id: 2, created_at: 1331234521, task_id: 1, message: 'no' }],
        },
      ],
    },
    {
      id: '2',
      title: 'In progress',
      tasks: [
        {
          id: '3',
          content: 'Three task',
          KanbanComment: [{ id: 3, created_at: 1341234521, task_id: 2, message: 'nooOooOoO' }],
        },
        {
          id: '4',
          content: 'Four task',
          KanbanComment: [{ id: 4, created_at: 133221234521, task_id: 2, message: 'Yeeesese' }],
        },
      ],
    },
    {
      id: '3',
      title: 'Done',
      tasks: [],
    },
  ]

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

  async addNewComment({ id }: { id: number }) {
    try {
      await API.posts.createComment(id, {
        created_at: new Date().getTime(),
        message: this.commentInputValue,
      })

      this.commentInputValue = ''

      this.fetch({ id: id, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async editComment(id: number) {
    try {
      await API.posts.editComment({
        post_id: id,
        comment_id: this.editCommentId,
        comment: {
          created_at: new Date().getTime(),
          message: this.commentInputValue,
        },
      })

      this.isEditActive = false
      this.commentInputValue = ''
      this.editCommentId = 0

      this.fetch({ id: id, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  async deleteComment(comment_id: number, id: number) {
    try {
      await API.posts.deleteComment(id, comment_id)

      this.fetch({ id: id, hidden: true })
    } catch (err: any) {
      toast.error(err)
    }
  }

  onDragEnd({ source, destination }: DropResult) {
    if (!destination) return

    if (source.droppableId !== destination.droppableId) {
      const fromColumn = this.columnsFromBackend.find((item) => source.droppableId === item.id)
      const toColumn = this.columnsFromBackend.find((item) => destination.droppableId === item.id)

      if (fromColumn && toColumn) {
        const fromTasks = [...fromColumn.tasks]
        const toTasks = [...toColumn.tasks]
        const [removed] = fromTasks.splice(source.index, 1)

        toTasks.splice(destination.index, 0, removed)

        this.columnsFromBackend = this.columnsFromBackend.map((column) => {
          if (column.id === source.droppableId) {
            return { ...fromColumn, tasks: fromTasks }
          } else if (column.id === destination.droppableId) {
            return { ...toColumn, tasks: toTasks }
          } else {
            return column
          }
        })
      }
    } else {
      const column = this.columnsFromBackend.find((item) => source.droppableId === item.id)

      if (column) {
        const fromTasks = [...column.tasks]
        const [removed] = fromTasks.splice(source.index, 1)

        fromTasks.splice(destination.index, 0, removed)

        this.columnsFromBackend = this.columnsFromBackend.map((column) => {
          if (column.id === source.droppableId) {
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
