export interface File {
  id: number
  name: string
  type: string
  size: string
  count?: number
  created_at: string
  is_favourite: boolean
  tags: string[]
}

export interface Folder {
  id: number
  name: string
  created_at: string
  updated_at: string
  files_count: number
  memory_used: string
  assignee_to: string[]
  tags: string[]
}

export interface Tag {
  id: number
  name: string
}
