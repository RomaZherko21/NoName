export interface KanbanBoard {
  id: number
  name: string
  description: string
  created_at: number
  updated_at: string
}
export interface KanbanColumn {
  column: KanbanColumnItem
  tasks: KanbanTask[]
}
export interface KanbanColumnItem {
  id: number
  name: string
  position: number
}
export interface KanbanTask {
  id: number
  name: string
  assigne_to: string[]
  attachments: string[]
  created_by: string
  tags: string[]
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


export interface KanbanSubtask {
  id: number
  name: string
  is_completed: boolean
  task_id: number
}
