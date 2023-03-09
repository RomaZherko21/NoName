import { DataTypes, Model, Optional } from 'sequelize'

import sequelize from '../init'

interface Chat {
  id: number
  name: string

  created_at: number
  updated_at: number
}

interface ModelCreation extends Optional<Chat, 'id'> {}

class ChatModel extends Model<Chat, ModelCreation> {}

ChatModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'chats',
  }
)

export default ChatModel
