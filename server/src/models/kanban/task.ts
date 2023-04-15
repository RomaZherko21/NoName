import { DataTypes, literal, Model, Optional } from 'sequelize'
import { TABLE } from 'shared/consts'

import sequelize from '../init'

enum Priority {
  lowest = '1',
  low = '2',
  medium = '3',
  high = '4',
  highest = '5',
}

interface Task {
  id: number
  name: string
  description: string
  priority: Priority

  due_date: string
  created_at: string
  updated_at: string

  column_id: number
  created_by: number
}

interface ModelCreation extends Optional<Task, 'id'> {}

class KanbanTaskModel extends Model<Task, ModelCreation> {}

KanbanTaskModel.init(
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
    },
    priority: {
      type: DataTypes.ENUM(
        Priority.lowest,
        Priority.low,
        Priority.medium,
        Priority.high,
        Priority.highest
      ),
    },
    due_date: {
      type: 'TIMESTAMP',
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
    column_id: {
      type: DataTypes.INTEGER,
      references: {
        model: TABLE.kanban_columns,
        key: 'id',
      },
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: TABLE.users,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: TABLE.kanban_tasks,
  }
)

export default KanbanTaskModel
