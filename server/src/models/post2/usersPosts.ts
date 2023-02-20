import { DataTypes, Model } from 'sequelize'

import UserModel from '../user'
import sequelize from '../init'
import PostModel from 'models/post'

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
        model: UserModel,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PostModel,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'm2m_users_chats',
    timestamps: false,
  }
)

UserModel.belongsToMany(PostModel, {
  through: UsersPostsLikesModel,
  foreignKey: 'user_id',
  as: 'posts',
})
PostModel.belongsToMany(UserModel, {
  through: UsersPostsLikesModel,
  foreignKey: 'post_id',
  as: 'users',
})

export default UsersPostsLikesModel
