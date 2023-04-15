import { DataTypes, Model, Optional } from 'sequelize'
import { TABLE } from 'shared/consts'

import sequelize from '../init'

interface Column {
  id: number
  name: string
  position: number

  board_id: number
}

interface ModelCreation extends Optional<Column, 'id'> {}

class KanbanColumnModel extends Model<Column, ModelCreation> {}

KanbanColumnModel.init(
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
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    board_id: {
      type: DataTypes.INTEGER,
      references: {
        model: TABLE.kanban_boards,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: TABLE.kanban_columns,
  }
)

export default KanbanColumnModel
