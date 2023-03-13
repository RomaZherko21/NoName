import { DataTypes, Model, Optional } from 'sequelize'

import sequelize from '../init'
import PostModel from '../post'
import UserModel from '../user'

interface PostComment {
  id: number
  message: string | null
  created_at: number | null

  user_id: number
  post_id: number
}

interface ModelCreation extends Optional<PostComment, 'id'> {}

class PostCommentModel extends Model<PostComment, ModelCreation> {}

PostCommentModel.init(
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PostModel,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'post_comments',
  }
)

PostCommentModel.belongsTo(UserModel, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

PostCommentModel.belongsTo(PostModel, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
})

export default PostCommentModel
