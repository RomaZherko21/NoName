import { DataTypes, Model, Optional } from 'sequelize'

import sequelize from '../init'

interface Genre {
  id: number
  name: string
}

interface ModelCreation extends Optional<Genre, 'id'> {}

class GenreModel extends Model<Genre, ModelCreation> {}

GenreModel.init(
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
    tableName: 'genres',
  }
)

export default GenreModel
