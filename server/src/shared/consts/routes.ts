export const ROUTES = {
  auth: 'auth',
  user: 'user',
  security: 'security',
  users: 'users',
  posts: 'posts',
  genres: 'genres',
  comments: 'comments',
  connections: 'connections',
  chat: 'chat',
  files: 'files',
  fileManager: { files: 'files', folders: 'folders' },
  kanban: {
    kanban: 'kanban',
    boards: 'boards',
    columns: 'columns',
    tasks: 'tasks',
    subtasks: 'subtasks',
    tags: 'tags',
    attachments: 'attachments',
  },
}

export enum Role {
  admin = 'admin',
  user = 'user',
}

export type Permission = { [key in Role]: { [key: string]: string[] } }

export const permission: Permission = {
  admin: {
    [ROUTES.users]: ['get', 'post', 'put', 'delete'],
    [ROUTES.posts]: ['get', 'post', 'put', 'delete'],
    [ROUTES.chat]: ['get', 'post', 'put', 'delete'],
    [ROUTES.files]: ['get', 'post', 'put', 'delete'],
  },
  user: {
    [ROUTES.users]: ['get'],
    [ROUTES.posts]: ['get', 'post'],
    [ROUTES.chat]: ['get', 'post'],
    [ROUTES.files]: ['get', 'post', 'put'],
  },
}
