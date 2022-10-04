import { DataTypes } from 'sequelize'

import sequelize from '.'

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
    createdAt: {
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

export default PostModel