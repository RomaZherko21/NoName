export interface Column {
  id: string
  title: string
  tasks: Task[]
}

export interface Task {
  task_id: string
  content: string
}
