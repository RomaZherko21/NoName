import { DataTypes } from 'sequelize'

import GenreModel from './genre'
import sequelize from './init'

const PostModel = sequelize.define(
  'posts',
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
    description: {
      type: DataTypes.TEXT,
    },
    short_description: {
      type: DataTypes.TEXT,
    },
    reading_time: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.BIGINT,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'posts', // You can simply tell DataTypes the name of the table directly
  }
)

GenreModel.hasMany(PostModel, {
  foreignKey: 'genre_id',
})

export default PostModel
