import { DataTypes } from 'sequelize'

import sequelize from './init'
import PostModel from './post'
import UserModel from './user'

const PostCommentModel = sequelize.define(
  'post_comments',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.BIGINT,
    },
  },
  {
    tableName: 'post_comments', // You can simply tell DataTypes the name of the table directly
  }
)

PostCommentModel.belongsTo(PostModel, {
  foreignKey: 'post_id',
})

PostCommentModel.belongsTo(UserModel, {
  foreignKey: 'user_id',
})

export default PostCommentModel
