import { DataTypes, literal, Model, Optional } from 'sequelize'

import { TABLE } from 'shared/consts'

import sequelize from '../init'

interface Folder {
  id: number
  name: string

  created_at: string
  updated_at: string

  created_by: number
}

interface ModelCreation extends Optional<Folder, 'id'> {}

class FolderModel extends Model<Folder, ModelCreation> {}

FolderModel.init(
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
    tableName: TABLE.folders,
  }
)

export default FolderModel
