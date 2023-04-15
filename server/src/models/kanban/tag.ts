import { DataTypes, Model, Optional } from 'sequelize'
import { TABLE } from 'shared/consts'

import sequelize from '../init'

interface Tag {
  id: number
  name: string

  board_id: number
}

interface ModelCreation extends Optional<Tag, 'id'> {}

class KanbanTagModel extends Model<Tag, ModelCreation> {}

KanbanTagModel.init(
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
    tableName: TABLE.kanban_task_tags,
  }
)

export default KanbanTagModel
