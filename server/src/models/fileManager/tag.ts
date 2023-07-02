import { DataTypes, Model, Optional } from 'sequelize'
import { TABLE } from 'shared/consts'

import sequelize from '../init'

interface Tag {
  id: number
  name: string
}

interface ModelCreation extends Optional<Tag, 'id'> {}

class FolderTagModel extends Model<Tag, ModelCreation> {}

FolderTagModel.init(
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
  },
  {
    sequelize,
    tableName: TABLE.folder_tags,
  }
)

export default FolderTagModel
