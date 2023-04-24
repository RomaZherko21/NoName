import { DataTypes, Model } from 'sequelize'

import sequelize from '../init'

interface UsersPostsLikes {
  user_id: number
  post_id: number
}

class UsersPostsLikesModel extends Model<UsersPostsLikes> {}

UsersPostsLikesModel.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'm2m_users_posts_likes',
    timestamps: false,
  }
)

export default UsersPostsLikesModel
