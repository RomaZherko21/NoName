import { ChatMessageModel, ChatModel, UsersChatsModel } from './chat'
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
