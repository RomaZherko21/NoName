import { ChatMessageModel, ChatModel, UsersChatsModel } from './chat'
import {
  KanbanAttachmentsModel,
  KanbanBoardModel,
  KanbanColumnModel,
  KanbanSubtaskModel,
  KanbanTagModel,
  KanbanTaskModel,
} from './kanban'
import { GenreModel, PostCommentModel, UsersPostsLikesModel, PostModel } from './post'
import { UserConnectionModel, UserModel } from './user'

UserModel.hasMany(PostModel, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

GenreModel.hasMany(PostModel, { foreignKey: 'genre_id' })

UserConnectionModel.belongsTo(UserModel, {
  foreignKey: 'sender_id',
})
UserConnectionModel.belongsTo(UserModel, {
  foreignKey: 'recipient_id',
})

UserModel.belongsToMany(PostModel, {
  through: PostCommentModel,
  foreignKey: 'user_id',
})
PostModel.belongsToMany(UserModel, {
  through: PostCommentModel,
  foreignKey: 'post_id',
})

UserModel.belongsToMany(PostModel, {
  through: UsersPostsLikesModel,
  foreignKey: 'user_id',
})
PostModel.belongsToMany(UserModel, {
  through: UsersPostsLikesModel,
  foreignKey: 'post_id',
})

ChatMessageModel.belongsTo(UserModel, {
  foreignKey: 'user_id',
  as: 'user',
})
ChatMessageModel.belongsTo(ChatModel, {
  foreignKey: 'chat_id',
})

UserModel.belongsToMany(ChatModel, { through: UsersChatsModel, foreignKey: 'user_id' })
ChatModel.belongsToMany(UserModel, { through: UsersChatsModel, foreignKey: 'chat_id' })

UserModel.hasMany(KanbanTaskModel, {
  foreignKey: 'created_by',
  onDelete: 'CASCADE',
})

UserModel.belongsToMany(KanbanTaskModel, {
  through: 'm2m_kanban_users_tasks',
  foreignKey: 'user_id',
})
KanbanTaskModel.belongsToMany(UserModel, {
  through: 'm2m_kanban_users_tasks',
  foreignKey: 'chat_id',
})

KanbanTaskModel.hasMany(KanbanSubtaskModel, {
  foreignKey: 'task_id',
  onDelete: 'CASCADE',
})

KanbanTaskModel.hasMany(KanbanAttachmentsModel, {
  foreignKey: 'task_id',
  onDelete: 'CASCADE',
})

KanbanBoardModel.hasMany(KanbanTagModel, {
  foreignKey: 'board_id',
  onDelete: 'CASCADE',
})

KanbanBoardModel.hasMany(KanbanColumnModel, {
  foreignKey: 'board_id',
  onDelete: 'CASCADE',
})

KanbanTaskModel.belongsToMany(KanbanTagModel, {
  through: 'm2m_kanban_users_tasks',
  foreignKey: 'task_id',
})
KanbanTagModel.belongsToMany(KanbanTaskModel, {
  through: 'm2m_kanban_users_tasks',
  foreignKey: 'tag_id',
})

KanbanColumnModel.hasMany(KanbanTaskModel, {
  foreignKey: 'column_id',
  onDelete: 'CASCADE',
})
