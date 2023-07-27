import * as auth from './auth'
import * as users from './users'
import * as user from './user'
import * as posts from './posts'
import * as connections from './connections'
import * as genres from './genres'
import * as security from './security'
import * as kanban from './kanban'
import * as chat from './chat'
import * as fileManagerFolder from './fileManager/folder'
import * as fileManagerTags from './fileManager/tags'
import * as meta from './meta'

const API = {
  auth,
  user,
  users,
  posts,
  connections,
  genres,
  security,
  kanban,
  chat,
  fileManagerFolder,
  fileManagerTags,
  meta
}

export default API
