export interface KanbanColumn {
  id: string
  title: string
  tasks: KanbanTask[]
}
export interface KanbanTask {
  id: string
  content: string
  KanbanComment: KanbanComment[]
}

export interface KanbanComment {
  id: number
  task_id: number
  created_at: number
  message: string
}

// export interface KanbanCommentCreator {
//   user_id: number
//   user_name: string
//   user_surname: string

//   user_avatar: string
// }
export interface KanbanBoard {
  created_at: number
  description: string
  id: number
  name: string
  updated_at: string
}

export interface KanbanBoardColumn {
  board_id: number
  id: number
  name: string
  position: number
}