export const ROUTES = {
  AUTH: 'users',
  USER: 'user',
  SECURITY: 'security',
  USERS: 'users',
  POSTS: 'posts',
  GENRES: 'genres',
  COMMENTS: 'comments',
  CONNECTIONS: 'connections',
  CHAT: 'chat',
  FILES: 'files',
}

export enum Role {
  admin = 'admin',
  user = 'user',
}

export type Permission = { [key in Role]: { [key: string]: string[] } }

export const permission: Permission = {
  admin: {
    [ROUTES.USERS]: ['get', 'create', 'update', 'delete'],
    [ROUTES.POSTS]: ['get', 'create', 'update', 'delete'],
    [ROUTES.CHAT]: ['get', 'create', 'update', 'delete'],
    [ROUTES.FILES]: ['get', 'create', 'update', 'delete'],
  },
  user: {
    [ROUTES.USERS]: ['get'],
    [ROUTES.POSTS]: ['get', 'create'],
    [ROUTES.CHAT]: ['get', 'create'],
    [ROUTES.FILES]: ['get', 'create', 'update'],
  },
}
