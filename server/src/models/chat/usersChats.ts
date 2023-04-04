import { DataTypes, Model } from 'sequelize'

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
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chats',
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

export default UsersChatsModel
