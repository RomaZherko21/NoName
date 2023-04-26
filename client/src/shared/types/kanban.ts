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
  created_at: string
  message: string
}

// export interface KanbanCommentCreator {
//   user_id: number
//   user_name: string
//   user_surname: string

//   user_avatar: string
// }
export interface KanbanBoard {
  id: number
  name: string
  description: string
  created_at: number
  updated_at: string
}

export interface KanbanColumnItem {
  id: number
  name: string
  position: number
  board_id: number
}