import { DataTypes } from 'sequelize'

import sequelize from './init'

const GenreModel = sequelize.define(
  'genres',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'genres',
  }
)

export default GenreModel
