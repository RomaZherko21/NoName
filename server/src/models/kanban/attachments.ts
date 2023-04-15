import { DataTypes, Model, Optional } from 'sequelize'
import { TABLE } from 'shared/consts'

import sequelize from '../init'

interface Attachment {
  id: number
  url: string

  task_id: number
}

interface ModelCreation extends Optional<Attachment, 'id'> {}

class KanbanAttachmentsModel extends Model<Attachment, ModelCreation> {}

KanbanAttachmentsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: TABLE.kanban_attachments,
  }
)

export default KanbanAttachmentsModel
