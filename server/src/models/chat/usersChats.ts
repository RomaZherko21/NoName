import { DataTypes, Model } from 'sequelize'

import { ChatModel } from '.'
import UserModel from '../user'
import sequelize from '../init'

interface UserConnection {
  user_id: number
  chat_id: number
}

class UsersChatsModel extends Model<UserConnection> {}

UsersChatsModel.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ChatModel,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'm2m_users_chats',
    timestamps: false,
  }
)

UserModel.belongsToMany(ChatModel, { through: UsersChatsModel, foreignKey: 'user_id', as: 'chats' })
ChatModel.belongsToMany(UserModel, { through: UsersChatsModel, foreignKey: 'chat_id', as: 'users' })

export default UsersChatsModel
