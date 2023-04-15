import { DataTypes, literal, Model, Optional } from 'sequelize'
import { TABLE } from 'shared/consts'

import sequelize from '../init'

interface Board {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

interface ModelCreation extends Optional<Board, 'id'> {}

class KanbanBoardModel extends Model<Board, ModelCreation> {}

KanbanBoardModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: TABLE.kanban_boards,
  }
)

export default KanbanBoardModel
