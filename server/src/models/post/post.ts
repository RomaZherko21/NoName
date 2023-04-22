import { DataTypes, literal, Model, Optional } from 'sequelize'

import sequelize from '../init'

interface Post {
  id: number
  name: string
  description: string
  created_at: string
  short_description: string | null
  reading_time: number | null
  image: string | null

  user_id: number
  genre_id: number
}

interface ModelCreation extends Optional<Post, 'id'> {}

class PostModel extends Model<Post, ModelCreation> {}

PostModel.init(
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
      allowNull: false,
    },
    short_description: {
      type: DataTypes.TEXT,
    },
    reading_time: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    image: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    genre_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'genres',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'posts',
  }
)

export default PostModel
