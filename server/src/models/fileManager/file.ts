import { DataTypes, literal, Model, Optional } from 'sequelize'

import { TABLE } from 'shared/consts'

import sequelize from '../init'

interface File {
  id: number
  name: string
  url: string
  format: any
  size: number

  created_at: string
  updated_at: string

  folder_id: number
  user_id: number
}

interface ModelCreation extends Optional<File, 'id'> {}

class FileModel extends Model<File, ModelCreation> {}

FileModel.init(
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
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    format: {
      // type: DataTypes.ENUM(...Object.values(FileFormat)),
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.BIGINT,
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
    folder_id: {
      type: DataTypes.INTEGER,
      references: {
        model: TABLE.folders,
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: TABLE.users,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: TABLE.files,
  }
)

export default FileModel
