import { DataTypes, literal, Model, Optional } from 'sequelize'

import sequelize from '../init'

interface Chat {
  id: number
  name: string

  created_at: string
  updated_at: string
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
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    tableName: 'chats',
  }
)

export default ChatModel
