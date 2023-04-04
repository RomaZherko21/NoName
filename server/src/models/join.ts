import { ChatMessageModel, ChatModel, UsersChatsModel } from './chat'
import { GenreModel, PostCommentModel, UsersPostsLikesModel, PostModel } from './post2'
import UserModel from './user'
import UserConnectionModel from './userConnection'

PostModel.belongsTo(GenreModel, { foreignKey: 'genre_id' })

UserModel.hasMany(PostModel, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

UserConnectionModel.belongsTo(UserModel, {
  foreignKey: 'sender_id',
})

UserConnectionModel.belongsTo(UserModel, {
  foreignKey: 'recipient_id',
})

PostCommentModel.belongsTo(UserModel, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

PostCommentModel.belongsTo(PostModel, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
})

UserModel.belongsToMany(PostModel, {
  through: UsersPostsLikesModel,
  foreignKey: 'user_id',
  as: 'posts',
})
PostModel.belongsToMany(UserModel, {
  through: UsersPostsLikesModel,
  foreignKey: 'post_id',
  as: 'users',
})

ChatMessageModel.belongsTo(UserModel, {
  foreignKey: 'user_id',
  as: 'user',
})

ChatMessageModel.belongsTo(ChatModel, {
  foreignKey: 'chat_id',
})

UserModel.belongsToMany(ChatModel, { through: UsersChatsModel, foreignKey: 'user_id', as: 'chats' })
ChatModel.belongsToMany(UserModel, { through: UsersChatsModel, foreignKey: 'chat_id', as: 'users' })
