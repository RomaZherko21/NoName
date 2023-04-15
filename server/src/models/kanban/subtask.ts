import { DataTypes, Model, Optional } from 'sequelize'
import { TABLE } from 'shared/consts'

import sequelize from '../init'

interface Subtask {
  id: number
  name: string
  is_completed: boolean

  task_id: number
}

interface ModelCreation extends Optional<Subtask, 'id'> {}

class KanbanSubtaskModel extends Model<Subtask, ModelCreation> {}

KanbanSubtaskModel.init(
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
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: TABLE.kanban_tasks,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: TABLE.kanban_subtasks,
  }
)

export default KanbanSubtaskModel
