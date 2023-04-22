import { DataTypes, literal, Model, Optional } from 'sequelize'

import sequelize from '../init'

interface ChatMessage {
  id: number
  text: string
  created_at: string

  user_id: number
  chat_id: number
}

interface ModelCreation extends Optional<ChatMessage, 'id'> {}

class ChatMessageModel extends Model<ChatMessage, ModelCreation> {}

ChatMessageModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chats',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'chat_messages',
  }
)

export default ChatMessageModel
